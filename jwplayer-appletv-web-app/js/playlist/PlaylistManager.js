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
  * Manages Playlists and Related lists.
  * This object should be used to load playlists and feeds.
  */
var PlaylistManager = (function() {

  var _playlists = {},
    _relatedFeeds = {},
    _mediaItems = {},
    _playlistLoader = new PlaylistLoader(),
    _feedLoader = new FeedLoader();

  /**
   * Registers a playlist and all the containing MediaItems with the PlaylistManager.
   */
  function _registerPlaylist(playlist) {
    if (_playlists[playlist.feedid]
        && _playlists[playlist.feedid].length === playlist.length) {
      // Nothing to do.
      return;
    }

    // Register all the MediaItems in this playlist.
    for (var i = 0; i < playlist.items.length; i++) {
      var item = playlist.items.item(i);
      _registerMediaItem(item);
    }

    _playlists[playlist.feedid] = playlist;
  }

  /*
   * getPlaylist returns a promise which resolves to either a playlist or an error.
   */
  function getPlaylist(playlistId) {
    return new Promise(function(resolve, reject) {
      if (hasPlaylist(playlistId)) {
        // For some reason the promise does not resolve without
        // this ugly timeout hack.
        // Might be related to: https://bugs.webkit.org/show_bug.cgi?id=151482
        setTimeout(function() {
          resolve(_playlists[playlistId]);
        }, 0);
      } else {
        _playlistLoader.load(playlistId)
          .then(function(playlist) {
            // Register the playlist.
            _registerPlaylist(playlist);
            // Return the playlist.
            resolve(playlist);
          }, reject);
      }
    });
  }

  /**
   * Returns a promise which either resolves to a Related Feed or an error.
   */
  function getRelatedFeed(relatedFeedId, mediaId) {
    return new Promise(function(resolve, reject) {
        if (_relatedFeeds[mediaId]) {
          // For some reason the promise does not resolve without
          // this ugly timeout hack.
          // Might be related to: https://bugs.webkit.org/show_bug.cgi?id=151482
          setTimeout(function() {
            resolve(_relatedFeeds[mediaId]);
          }, 0);
        } else {
          _feedLoader.loadRelatedFeed(relatedFeedId, mediaId)
            .then(function(response) {
              if (response.playlist) {
                response.playlist.forEach(function(playlistItem) {
                  // Register MediaItems.
                  _registerMediaItem(playlistItem.mediaItem);
                });
                _relatedFeeds[mediaId] = response;
                resolve(response);
              }
            }, reject);
        }
    });
  }

  /**
   * Returns a promise which either resolves to a Search Feed or an error.
   */
  function getSearchFeed(searchFeedId, searchPhrase) {
    return new Promise(function(resolve, reject) {
      _feedLoader.loadSearchFeed(searchFeedId, searchPhrase)
        .then(function(response) {
          if (response.playlist) {
            response.playlist.forEach(function(playlistItem) {
              _registerMediaItem(playlistItem.mediaItem);
            });
          }
          resolve(response);
        }, reject);
    });
  }

  /**
   * Returns whether the PlaylistManager has a specific playlist.
   */
  function hasPlaylist(playlistId) {
    return _playlists[playlistId] !== undefined || _playlists[playlistId] != null;
  }

  /**
   * Registers a media item with the PlaylistManager.
   */
  function _registerMediaItem(mediaItem) {
    _mediaItems[mediaItem.mediaid] = mediaItem;
  }

  /**
   * Returns a MediaItem or undefined if the MediaItem is not available.
   */
  function getMediaItem(mediaId) {
    return _mediaItems[mediaId];
  }

  /**
   * Empties the caches.
   */
  function reset() {
    _playlists = {};
    _mediaItems = {};
    _relatedFeeds = {};
  }

  // Expose public methods.
  return {
    getPlaylist: getPlaylist,
    getRelatedFeed: getRelatedFeed,
    getSearchFeed: getSearchFeed,
    hasPlaylist: hasPlaylist,
    getMediaItem: getMediaItem,
    reset: reset
  };
})();
