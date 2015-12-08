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
    player.addEventListener("timedMetadata", metaHandler, ["time"]);
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
