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
 * Loader for loading Data-Driven Feeds.
 */
 var FeedLoader = function() {

   const BASE_URL = "https://content.jwplatform.com/feed.json";

   /**
    * Loads a Data-Driven search feed.
    */
   this.loadSearchFeed = function(searchFeedId, searchPhrase) {
     // Construct the query URL.
     var url = `${BASE_URL}?feed_id=${searchFeedId}&search=${encodeURIComponent(searchPhrase)}`;
     return new Promise(function(resolve, reject) {
       http(url)
        .get()
        .then(function(response) {
          if (!response.kind || response.kind != "SEARCH") {
            // Feed is not a SEARCH feed.
            reject('Error: Feed ' + searchFeedId + ' is not a search feed!');
            return;
          }
          if (response.playlist) {
            _parseMediaItems(response.playlist);
          }
          resolve(response);
        }, reject);
     });
   }

   this.loadRelatedFeed = function(relatedFeedId, mediaId) {
    // Construct a query URL.
     var url = `${BASE_URL}?feed_id=${relatedFeedId}&related_media_id=${mediaId}`;
     return new Promise(function(resolve, reject) {
       http(url)
        .get()
        .then(function(response) {
          if (!response.kind || response.kind != "FEED") {
            reject('Error: Feed ' + relatedFeedId + ' is not a related feed!');
          }
          if (response.playlist) {
            _parseMediaItems(response.playlist);
          }
          resolve(response);
        }, reject);
     });
   };

   function _parseMediaItems(playlist) {
     var playlistParser = new PlaylistParser();
     playlist.forEach(function(playlistItem) {
       var mediaItem = playlistParser.parseItem(playlistItem);
       if (mediaItem) {
         playlistItem.mediaItem = mediaItem;
       }
     });
   }

 }
