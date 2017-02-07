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

var PlaylistLoader = function() {

    function _parseMediaItems(playlist, feedid) {
      var mediaItems = new Playlist();
      var playlistParser = new PlaylistParser();
      playlist.forEach(function(playlistItem) {
        var mediaItem = playlistParser.parseItem(playlistItem, feedid);
        if (mediaItem) {
          mediaItems.push(mediaItem);
        }
      });
      return mediaItems;
    }

    /**
     * Loads a playlist from the platform.
     * Loaded playlists will be cached in the PlaylistManager.
     */
    return {
      load: function(playlistId) {
        return new Promise(function(resolve, reject) {
          http(`https://content.jwplatform.com/feed.json?feed_id=${playlistId}`)
            .get()
            .then(function(response) {
              // At minimum we need playlist.playlist to be defined.
              if (!response.playlist || !response.playlist instanceof Array) {
                reject('Unable to parse playlist ' + playlistId + ':' + ' Unexpected response.');
              }
              // Parse MediaItems out of the playlist.
              response.items = _parseMediaItems(response.playlist, response.feedid);
              resolve(response);
            }, reject);
        });
      }
    };

};
