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
    /**
     * Loads a playlist from the platform.
     */
    this.load = function(playlistId, callback) {
      var url = `https://content.jwplatform.com/feeds/${playlistId}.json`
      var xhr = new XMLHttpRequest();
      xhr.responseType = "json";
      xhr.addEventListener("load", function(xhr) {
        _playlistLoaded(playlistId, xhr.target.response, callback);
      }, false);
      xhr.addEventListener("error", function(e) {
        _playlistLoadError(playlistId, e);
      }, false);
      xhr.open("GET", url, true);
      xhr.send();
      return xhr;
    }

    function _playlistLoaded(playlistId, playlist, callback) {
      // At minimum we need playlist.playlist to be defined.
      if (!playlist.playlist || !playlist.playlist instanceof Array) {
        console.warn('Unable to parse playlist ' + playlistId + '.');
        return;
      }

      // Parse MediaItems out of the playlist
      playlist.items = _parseMediaItems(playlist.playlist, playlist.feedid);

      // Iff we managed to parse media items out of the playlist
      // register the playlist and execute the callback.
      if (playlist.items.length > 0) {
        // Register the playlist.
        _registerPlaylist(playlist);

        // Execute callback.
        callback(playlist);
      }
    }

    function _registerPlaylist(playlist) {
      // Only register new playlists
      if (PLAYLISTS[playlist.feedid]) {
        return;
      }
      PLAYLISTS[playlist.feedid] = playlist;

      // Register media items
      for (var i = 0; i < playlist.items.length; i++) {
        var item = playlist.items.item(i);
        MEDIA_ITEMS[item.mediaid] = item;
      }
    }

    function _playlistLoadError(playlistId, err) {
      // TODO: Publish error event?
      if (err.target.status == 404) {
        console.error('Error loading playlist ' + playlistId
          + ': playlist does not exist.');
      } else if (err.target.response) {
        console.error('Error loading playlist ' + playlistId
          + ': %O', err.target.response);
      } else {
        console.error('Error loading playlist ' + playlistId);
      }
    }

    function _parseMediaItems(playlist, feedid) {
      var mediaItems = new Playlist();

      playlist.forEach(function(playlistItem) {
        var mediaItem = new MediaItem();
        mediaItem.mediaid = playlistItem.mediaid;
        mediaItem.description = playlistItem.description;
        mediaItem.title = playlistItem.title;
        mediaItem.artworkImageURL = _checkScheme(playlistItem.image);
        // Set the feed id in the MediaItem so it can be retraced to the global playlist.
        mediaItem.feedid = feedid;

        // Figure out the url of the stream for this playlist item.
        var foundStream = false;
        if (playlistItem.sources && playlistItem.sources instanceof Array) {
          foundStream = playlistItem.sources.some(function(source) {
            if (source.type && source.type === 'application/vnd.apple.mpegurl'
                || source.type === 'application/x-mpegURL') {
                  mediaItem.url = _checkScheme(source.file);
                  return true;
                }
            return false;
          });
        }

        if (foundStream) {
          // Figure out the duration of the media item, the HLS stream source does
          // not expose this, but other sources, such as mp4 may.
          var foundDuration = playlistItem.sources.some(function(source) {
            if (source.duration) {
              mediaItem.duration = source.duration;
              return true;
            }
            return false;
          });

          if (!foundDuration) {
            // No duration has been found
            mediaItem.duration = 0;
          }

          mediaItems.push(mediaItem);
        } else {
           console.warn('Warning: No HLS stream available for video with media id: '
            + mediaItem.mediaid);
        }
      });

      return mediaItems;
    }

    function _checkScheme(url) {
      if (url.startsWith("//")) {
        return 'https:' + url;
      }
      return url;
    }
};
