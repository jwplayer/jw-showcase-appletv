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
 * The Playback module is a wrapper around Apple's TV JS Player class.
 * In addition to the TV JS Player, the Playback module broadcasts certain events during
 * set up and playback.
 */
var Playback = (function() {

  var player = new Player();

  player.addEventListener("stateDidChange", stateHandler);
  player.addEventListener("timeDidChange", timeHandler, {
    interval: 1
  });
  player.addEventListener("mediaItemWillChange", mediaItemWillChangeHandler);
  player.addEventListener("mediaItemDidChange", mediaItemChangedHandler);
  //player.addEventListener("requestSeekToTime", requestSeekToTimeHandler);
  player.addEventListener("timedMetadata", timedMetadataHandler);
  player.addEventListener("shouldHandleStateChange", shouldHandleStateChangeHandler);

  function load(playlist, fireEvent) {
    player.playlist = playlist;
    player.addEventListener("timeBoundaryDidCross", timeHandler, [playlist.item(0).duration]);
    if (arguments.length < 2 || arguments[1] !== false) {
      EventBus.publish(Events.PLAYLIST_LOADED, {
        playlist: playlist
      });
    }
  }

  function play() {
    player.play();
  }

  function seek() {
    player.seek();
  }

  function pause() {
    EventBus.publish(Events.PAUSE);
    player.pause();
  }

  function stop() {
    player.stop();
  }

  function present() {
    player.present();
  }

  function setOverlay(overlayDocument) {
    EventBus.publish(Events.PLAYER_OVERLAY, {
      overlayDocument: overlayDocument
    });
    player.overlayDocument = overlayDocument;
  }

  /**
   * Handles player stateDidChange event
   */
  function stateHandler(evt) {
    //console.log('stateHandler %O', evt);
    EventBus.publish(Events.PLAYER_STATE, {
      state: evt.state,
      oldState: evt.oldState
    });
    if (evt.state == 'begin') {
      EventBus.publish(Events.PLAYLIST_START, {
        mediaItem: player.currentMediaItem
      });
    } else if (evt.state == 'end') {
      EventBus.publish(Events.PLAYLIST_COMPLETE, {
        playlist: player.playlist
      });
    }
  }

  /**
   * Handles player timeDidChange event
   */
  function timeHandler(evt) {
    var time = evt.time ? evt.time : evt.boundary;
    if (time == player.currentMediaItem.duration) {
      EventBus.publish(Events.MEDIA_COMPLETE, {
        item: player.currentMediaItem
      });
    } else if (time) {
      EventBus.publish(Events.MEDIA_TIME, {
        time: time
      });
    }
  }

  /**
   * Handles the mediaItemWillChange event.
   */
  function mediaItemWillChangeHandler(evt) {
    //console.log('mediaItemWillChangeHandler %O', evt);
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
      nextMediaItem: player.currentMediaItem
    });
  }

  /**
   * Handles the mediaItemDidChange event.
   */
  function mediaItemChangedHandler(evt) {
    //console.log('mediaItemChangedHandler %O', evt);
    // Reregister timeBoundaryDidCross handler
    player.removeEventListener("timeBoundaryDidCross", timeHandler);
    if (player.currentMediaItem) {
      player.addEventListener("timeBoundaryDidCross", timeHandler, [player.currentMediaItem.duration]);
    }
    EventBus.publish(Events.MEDIA_CHANGED, {
      reason: evt.reason,
      previousMediaItem: player.previousMediaItem,
      currentMediaItem: player.currentMediaItem
    });
  }

  /**
   * Handles the requestSeekToTime event.
   */
  // function requestSeekToTimeHandler(evt) {
  //   //console.log('requestSeekToTimeHandler %O', evt);
  //   EventBus.publish(Events.SEEK, { // TODO: Should be seeked? TV JS docs seem to be incorrect on this event.
  //     currentTime: evt.currentTime,
  //     requestedTime: evt.requestedTime
  //   });
  // }

  function timedMetadataHandler(evt) {
    //console.log('timedMetadataHandler %O', evt);
    // TODO: meta event
  }

  function shouldHandleStateChangeHandler(event) {
    if (!player.currentMediaItem.duration) {
      player.currentMediaItem.duration = event.duration;
    }
  }

  // Expose public API
  return {
    player: player,
    load: load,
    play: play,
    seek: seek,
    pause: pause,
    stop: stop,
    present: present,
    setOverlay: setOverlay,
    stateHandler: stateHandler,
    timeHandler: timeHandler,
    mediaItemChangedHandler: mediaItemChangedHandler,
    mediaItemWillChangeHandler: mediaItemWillChangeHandler,
    //requestSeekToTimeHandler: requestSeekToTimeHandler,
    timedMetadataHandler: timedMetadataHandler
  }
})();
