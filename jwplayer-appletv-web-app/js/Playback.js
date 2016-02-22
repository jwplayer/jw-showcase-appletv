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
 * The Playback class is a wrapper around Apple's TV JS Player class.
 * In addition to the TV JS Player, the Playback object broadcasts certain events during
 * set up and playback.
 */
function Playback() {
  var self = this,
    player;

  self.load = function(playlist) {
    player.playlist = playlist;
    player.addEventListener("timeBoundaryDidCross", timeHandler, [playlist.item(0).duration]);
    EventBus.publish(Events.PLAYLIST_LOADED, playlist);
  }

  self.play = function() {
    player.play();
  }

  self.seek = function(timeSeconds) {
    // EventBus.publish(Events.SEEK, {
    //   time: timeSeconds,
    //   player: self
    // });
    player.seekToTime(timeSeconds);
  }

  self.pause = function() {
    EventBus.publish(Events.PAUSE, self);
    player.pause();
  }

  self.stop = function() {
    player.stop();
  }

  self.present = function() {
    player.present();
  }

  self.setOverlay = function(overlayDocument) {
    EventBus.publish(Events.PLAYER_OVERLAY, {
      overlayDocument: overlayDocument,
      player: self
    });
    player.overlayDocument = overlayDocument;
  }

  function init() {
    player = new Player();
    player.addEventListener("stateDidChange", stateHandler);
    player.addEventListener("timeDidChange", timeHandler, {
      interval: 1
    });
    player.addEventListener("mediaItemWillChange", mediaItemWillChangeHandler);
    player.addEventListener("mediaItemDidChange", mediaItemChangedHandler);
    player.addEventListener("requestSeekToTime", requestSeekToTimeHandler);
    player.addEventListener("timedMetadata", timedMetadataHandler);
  }

  /**
   * Handles player stateDidChange event
   */
  function stateHandler(evt) {
    console.log('stateHandler %O', evt);
    self.currentMediaItem = player.currentMediaItem;
    self.previousMediaItem = player.previousMediaItem;
    self.nextMediaItem = player.nextMediaItem;
    EventBus.publish(Events.PLAYER_STATE, {
      state: evt.state,
      oldState: evt.oldState,
      player: self
    });
  }

  /**
   * Handles player timeDidChange event
   */
  function timeHandler(evt) {
    var time = evt.time ? evt.time : evt.boundary;
    if (time == player.currentMediaItem.duration) {
      EventBus.publish(Events.MEDIA_COMPLETE, {
        item: player.currentMediaItem,
        player: self
      });
    } else {
      EventBus.publish(Events.MEDIA_TIME, {
        time: time,
        player: self
      });
    }
  }

  /**
   * Handles the mediaItemWillChange event.
   */
  function mediaItemWillChangeHandler(evt) {
    console.log('mediaItemWillChangeHandler %O', evt);
    /*
      Valid values for reason (TV JS docs are not correct):
      -  0 (Unknown)
      -  1 (Played to end)
      -  2 (Forwarded to end)
      -  3 (Errored)
      -  4 (Playlist changed)
      -  5 (User initiated)
    */
    EventBus.publish(Events.MEDIA_CHANGE, {
      reason: evt.reason,
      previousMediaItem: player.previousMediaItem,
      nextMediaItem: player.currentMediaItem,
      player: self
    });
  }

  /**
   * Handles the mediaItemDidChange event.
   */
  function mediaItemChangedHandler(evt) {
    console.log('mediaItemChangedHandler %O', evt);

    // Reregister timeBoundaryDidCross handler
    player.removeEventListener("timeBoundaryDidCross", timeHandler);
    if (player.currentMediaItem) {
      player.addEventListener("timeBoundaryDidCross", timeHandler, [player.currentMediaItem.duration]);
    }

    EventBus.publish(Events.MEDIA_CHANGED, {
      reason: evt.reason,
      previousMediaItem: player.previousMediaItem,
      nextMediaItem: player.currentMediaItem,
      player: self
    });
  }

  /**
   * Handles the requestSeekToTime event.
   */
  function requestSeekToTimeHandler(evt) {
    console.log('requestSeekToTimeHandler %O', evt);
    EventBus.publish(Events.SEEK, { // TODO: Should be seeked? TV JS docs seem to be incorrect on this event.
      currentTime: evt.currentTime,
      requestedTime: evt.requestedTime,
      player: self
    });
  }

  function timedMetadataHandler(evt) {
    console.log('timedMetadatahandler %O', evt);
    // TODO: meta event
  }

  init();
}
