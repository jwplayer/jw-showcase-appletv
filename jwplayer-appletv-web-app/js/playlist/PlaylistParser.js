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

var PlaylistParser = function() {

  /**
   * Parses a JW Player playlist item into a TVJS MediaItem.
   */
  this.parseItem = function(playlistItem, feedId) {
    var mediaItem = new MediaItem();
    mediaItem.mediaid = playlistItem.mediaid;
    mediaItem.description = playlistItem.description;
    mediaItem.title = playlistItem.title;
    mediaItem.artworkImageURL = playlistItem.image ?
      _checkScheme(playlistItem.image) : "";
    // Set the feed id in the MediaItem so it can be retraced to the global playlist.
    if (feedId) {
      mediaItem.feedid = feedId;
    }

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
      var foundDuration = false;

      if (playlistItem.duration) {
          mediaItem.duration = playlistItem.duration;
          foundDuration = true;
      }

      if (!foundDuration) {
          foundDuration = playlistItem.sources.some(function(source) {
            if (source.duration) {
              mediaItem.duration = source.duration;
              return true;
            }
            return false;
          });
      }

      if (!foundDuration) {
        // No duration has been found
        mediaItem.duration = 0;
      }

      return mediaItem;
    } else {
       console.warn('Warning: No HLS stream available for video with media id: '
        + mediaItem.mediaid);
      return null;
    }
  };

  function _checkScheme(url) {
    if (url.startsWith("//")) {
      return 'https:' + url;
    }
    return url;
  }

};
