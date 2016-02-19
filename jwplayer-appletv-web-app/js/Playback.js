/**
* Copyright 2015 Longtail Ad Solutions Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
* express or implied. See the License for the specific language
* governing permissions and limitations under the License.
**/

/**
  Component for handling playback
**/
function Playback(mediaItem) {
  var self = this,
    item = mediaItem,
    sendComplete = false,
    analytics,
    player,
    templateLoader,
    parser,
    autoAdvance = false,
    autoAdvanceOverlay,
    playlistConfig;

  function init() {
    player = new Player();
    player.addEventListener("stateDidChange", stateHandler);
    player.addEventListener("timeDidChange", timeHandler, { interval: 1 });
    player.addEventListener("timeBoundaryDidCross", timeHandler, [item.duration]);
    player.addEventListener("mediaItemWillChange", mediaItemWillChangeHandler);
    player.playlist = new Playlist();
    player.playlist.push(item);
    analytics = new TVOSAnalytics(item);
    initAutoAdvance();
  }

  function initAutoAdvance() {
    var playlist = PLAYLISTS[item.playlistId];

    // Check if auto advance is enabled for this playlist
    if (playlist.config.autoAdvance) {
      autoAdvance = true;
      playlistConfig = playlist.config;
      // In case of auto advance we need to rebuild the playlist.
      var index;
      for (var i = 0; i < playlist.items.length; i++) {
        if (playlist.items.item(i) == item) {
          index = i;
          break;
        }
      }

      if (typeof index != 'undefined') {
        var newPlaylist = new Playlist();
        for (var i = index; i < playlist.items.length; i++) {
          newPlaylist.push(playlist.items.item(i));
        }
        player.playlist = newPlaylist;
      }
    }
  }

  /** Handles mediaItemWillChange event */
 function mediaItemWillChangeHandler(evt) {
   /*
   Valid values for reason (TV JS docs are not correct):
   -  0 (Unknown)
   -  1 (Played to end)
   -  2 (Forwarded to end)
   -  3 (Errored)
   -  4 (Playlist changed)
   -  5 (User initiated)
   */
   //console.log('mediaitemWillChangeHandler %O', evt);
   var reason = evt.reason;
   if (autoAdvance) {
     if (reason == 1 || reason == 2) {
       analytics.timeWatched(item.duration);
     }
     item = player.currentMediaItem;
     if (item) {
       // If there is a new media item, setup a new analytics object.
       analytics = new TVOSAnalytics(item);
       analytics.start(6); // playReason 6 -> playlist progression, see spec.
     }
     player.overlayDocument = null; // Remove the auto advance overlay.
   }
 }

  /** Handle player stateDidChange event **/
  function stateHandler(evt) {
    //console.log('stateHandler %O', evt);
    if (evt.state == "begin") {
      sendComplete = false;
      analytics.start();
    } else if (evt.state == "end" && sendComplete && !autoAdvance) {
      analytics.timeWatched(item.duration);
    } else if (evt.state == 'end' && autoAdvance) {
      // Playlist completed, take the user back to the main screen.
      navigationDocument.popToRootDocument();
    }
  }

  /** Handle player timeDidChange event **/
  function timeHandler(evt) {
    var time = evt.time ? evt.time : evt.boundary;
    if (time == item.duration) {
      sendComplete = true;
    } else {
      analytics.timeWatched(time);
    }
    updateAutoAdvanceOverlay(time);
  }

  /** Checks if the autoAdvanceOverlay should be displayed */
  function updateAutoAdvanceOverlay(playbackPosition) {
    if (autoAdvance && player.nextMediaItem &&
      playbackPosition >= item.duration - playlistConfig.autoAdvanceWarningOffset) {
      // Display the overlay

      var offset = item.duration - playbackPosition;
      offset = offset.toFixed();
      if (offset <= 0) {
        offset = 0;
      }
      var autoAdvanceMessage = eval("`" + CONFIG.autoAdvanceMessage + "`");

      if (!autoAdvanceOverlay) {
        // Load the Auto Advance overlay document
        templateLoader = templateLoader || new TemplateLoader();
        templateLoader.loadResource('templates/AutoAdvanceOverlay.tvml', function(templateString) {
          // eval {$autoAdvanceMessage} in the templateString
          var templateString = eval("`" + templateString + "`");
          parser = parser || new DOMParser();
          autoAdvanceOverlay = parser.parseFromString(templateString, 'application/xml');
          player.overlayDocument = autoAdvanceOverlay;
        });
      } else {
        // Update the overlay
        if (!player.overlayDocument) {
          player.overlayDocument = autoAdvanceOverlay;
        }
        var countdown = autoAdvanceOverlay.getElementsByTagName('description').item(0);
        countdown.textContent = autoAdvanceMessage;
      }
    }
  }

  /** On a select event, create a Player and play the media **/
  self.play = function() {
    if (!player.playlist) {
      player.playlist = new Playlist();
      player.playlist.push(item);
    }
    player.present();
    player.play();
  }

  init();

}
