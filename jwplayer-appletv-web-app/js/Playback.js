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
    player;

  function init() {
    player = new Player();
    player.addEventListener("stateDidChange", stateHandler);
    player.addEventListener("timeDidChange", timeHandler, { interval: 1 });
    player.addEventListener("timeBoundaryDidCross", timeHandler, [item.duration]);
    player.playlist = new Playlist();
    player.playlist.push(item);

    analytics = new TVOSAnalytics(item);
  }

  /** Handle player stateDidChange event **/
  function stateHandler(evt) {
    if (evt.state == "begin") {
      sendComplete = false;
      analytics.start();
    } else if (evt.state == "end" && sendComplete) {
      analytics.timeWatched(item.duration);
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

  }

  /** On a select event, create a Player and play the media **/
  self.play = function() {
    player.present();
    player.play();
  }

  init();

}
