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
   this.loadSearchFeed = function(searchFeedId, searchPhrase, callback) {
     if (arguments.length < 3) {
       // Nothing to do.
       return;
     }

     // Construct the query URL.
     var url = `${BASE_URL}?feed_id=${searchFeedId}&search=${encodeURIComponent(searchPhrase)}`;

     // Open XHR
     var xhr = new XMLHttpRequest();
     xhr.responseType = "json";
     xhr.addEventListener("load", function(xhr) {
       _onFeedLoaded(searchFeedId, xhr.target.response, callback);
     }, false);
     xhr.addEventListener("error", function(e) {
       _onFeedError(searchFeedId, e);
     }, false);
     xhr.open("GET", url, true);
     xhr.send();
     return xhr;
   };

   function _onFeedLoaded(feedId, response, callback) {
     if (!response.kind || response.kind != "SEARCH") {
       // Feed is not a SEARCH feed.
       // TODO: Publish eror event?
       console.error('Error: Feed ' + feedId + ' is not a search feed!');
       return;
     }

     // Parse and register MediaItems.
     if (response.playlist) {
       var playlistParser = new PlaylistParser();
       response.playlist.forEach(function(playlistItem) {
         var mediaItem = playlistParser.parseItem(playlistItem);
         if (mediaItem) {
           playlistItem.mediaItem = mediaItem;
           // TODO: Find a nicer way to manage MEDIA_ITEMS
           MEDIA_ITEMS[playlistItem.mediaid] = mediaItem;
         }
       });
     }

     callback(response);
   }

   function _onFeedError(feedId, error) {
     // TODO: Publish error event?
     if (err.target.status == 404) {
       console.error('Error loading feed ' + feedId
         + ': feed does not exist. Are you entitled to feeds?');
     } else if (err.target.response) {
       console.error('Error loading feed ' + feedId
         + ': %O', err.target.response);
     } else {
       console.error('Error loading feed ' + feedId);
     }
   }

 }
