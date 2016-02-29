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

Playback.AutoAdvance = (function() {

  var _overlayDocument,
    _overlaySet = false;

  EventBus.subscribe(Events.CONFIG_LOADED, _configLoadedHandler);

  function _configLoadedHandler(event) {
    if (event.config.autoAdvance) {
      EventBus.subscribe(Events.PLAYLIST_LOADED, _playlistLoadedHandler);
      EventBus.subscribe(Events.MEDIA_TIME, _timeHandler);
      EventBus.subscribe(Events.MEDIA_CHANGE, _mediaChangeHandler);
      EventBus.subscribe(Events.PLAYLIST_COMPLETE, _playlistCompleteHandler);
    }
  }

  function _playlistLoadedHandler(event) {
    var playlist = PLAYLISTS[event.playlist.item(0).playlistId];
    // Rebuild the loaded playlist.
    var index;
    for (var i = 0; i < playlist.items.length; i++) {
      if (playlist.items.item(i) == event.playlist.item(0)) {
        index = i;
        break;
      }
    }

    if (typeof index != 'undefined') {
      var newPlaylist = new Playlist();
      for (var i = index; i < playlist.items.length; i++) {
        newPlaylist.push(playlist.items.item(i));
      }
      Playback.load(newPlaylist, false);
    }

    EventBus.publish(Events.AUTOADVANCE_INITIALIZED, {
      playlist: newPlaylist
    });
  }

  function _timeHandler(event) {
    if (Playback.player.nextMediaItem
      && event.time >= Playback.player.currentMediaItem.duration - CONFIG.autoAdvanceWarningOffset
      && !Playback.player.currentMediaItem.ad) {
      // Display the overlay
      _displayOverlay(event.time);
    }
  }

  function _displayOverlay(playbackPosition) {
    // Calculate the offset
    var mediaItem = Playback.player.currentMediaItem;
    var offset = mediaItem.duration - playbackPosition;
    offset = offset.toFixed();
    if (offset <= 0) {
      offset = 0; // Correct -0 to 0
    }
    var autoAdvanceMessage = eval('`' + CONFIG.autoAdvanceMessage + '`');
    if (!_overlayDocument) {
      // We need to load the overlay documents
      var templateLoader = new TemplateLoader();
      templateLoader.loadResource('templates/AutoAdvanceOverlay.tvml', function(templateString) {
        // eval ${autoAdvanceMessage} in the templateString
          var templateString = eval("`" + templateString + "`");
          var parser = new DOMParser();
          _overlayDocument = parser.parseFromString(templateString, 'application/xml');
          Playback.setOverlay(_overlayDocument);
          _overlaySet = true;
      });
    } else {
      var countdown = _overlayDocument.getElementsByTagName('description').item(0);
      countdown.textContent = autoAdvanceMessage;
      if (!_overlaySet) {
        Playback.setOverlay(_overlayDocument);
      }
    }
  }

  function _mediaChangeHandler(event) {
    Playback.setOverlay(null); // Remove the auto advance overlay
    _overlaySet = false;
  }

  function _playlistCompleteHandler(event) {
    // Playlist completed, take the user back to the main screen.
    navigationDocument.popToRootDocument();
  }

  return {};
})();
