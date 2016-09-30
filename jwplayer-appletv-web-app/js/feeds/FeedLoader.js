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
     return Utils.get(url, function(xhr) {
       _onSearchFeedLoaded(searchFeedId, xhr.target.response, callback);
     }, function(error) {
       _onFeedError(searchFeedId, e);
     });
   };

   this.loadRecommendationsFeed = function(recommendationsFeedId, mediaId, callback) {
     if (arguments.length < 3) {
       // Nothing to do.
       return;
     }

     // Check if we already downloaded a related feed for this media id.
     if (RELATED_FEEDS[mediaId]) {
       // TODO: Build some proper model that manages this data.
       callback(RELATED_FEEDS[mediaId]);
       return;
     }

     var url = `${BASE_URL}?feed_id=${recommendationsFeedId}&related_media_id=${mediaId}`;
     return Utils.get(url, function(xhr) {
        _onRecommendationsFeedLoaded(recommendationsFeedId,
          mediaId, xhr.target.response, callback);
     }, function(error) {
       _onFeedError(recommendationsFeedId, error);
     });
   };

   function _onSearchFeedLoaded(feedId, response, callback) {
     if (!response.kind || response.kind != "SEARCH") {
       // Feed is not a SEARCH feed.
       // TODO: Publish eror event?
       console.error('Error: Feed ' + feedId + ' is not a search feed!');
       return;
     }

     // Parse and register MediaItems.
     if (response.playlist) {
       _registerMediaItems(response.playlist);
     }

     callback(response);
   }

   function _onRecommendationsFeedLoaded(feedId, mediaId, response, callback) {
     if (!response.kind || response.kind != "FEED") {
       console.error('Error: Feed ' + feedid + ' is not a related feed!');
     }

     if (response.playlist) {
       _registerMediaItems(response.playlist);
       RELATED_FEEDS[mediaId] = response;
     }

     callback(response);
   }

   function _onFeedError(feedId, error) {
     // TODO: Publish error event?
     if (error.target.status == 404) {
       console.error('Error loading feed ' + feedId
         + ': feed does not exist. Are you entitled to feeds?');
     } else if (error.target.response) {
       console.error('Error loading feed ' + feedId
         + ': %O', error.target.response);
     } else {
       console.error('Error loading feed ' + feedId);
     }
   }

   function _registerMediaItems(playlist) {
     var playlistParser = new PlaylistParser();
     playlist.forEach(function(playlistItem) {
       var mediaItem = playlistParser.parseItem(playlistItem);
       if (mediaItem) {
         playlistItem.mediaItem = mediaItem;
         // TODO: Find a nicer way to manage MEDIA_ITEMS
         MEDIA_ITEMS[playlistItem.mediaid] = mediaItem;
       }
     });
   }

 }
