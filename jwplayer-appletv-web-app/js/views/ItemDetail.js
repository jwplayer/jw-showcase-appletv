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

ViewManager.registerView("ItemDetail", function(doc) {
  var self = this;

  var loader = new TemplateLoader(doc, this);

  var media_id = doc.firstChild.getAttribute("data-media-id");
  self.item = MEDIA_ITEMS[media_id];

  var related_id = doc.firstChild.getAttribute("data-related-playlist")
  if (related_id != "undefined" && related_id.length > 0) {
    var related = PLAYLISTS[related_id];
    showRelated();
  } else if (CONFIG.relatedFeed && typeof(CONFIG.relatedFeed) === "string") {
    // A related playlist has not been set, but a relatedFeed has been set.
    // In this case we want to load a Data-Driven recommendations feed.
    var feedLoader = new FeedLoader();
    feedLoader.loadRecommendationsFeed(CONFIG.relatedFeed, media_id,
      function(recommendations) {
        if (recommendations.playlist && recommendations.playlist.length > 0) {
          loader.loadFragment("templates/ListItem.tvml", function(templateDoc) {
            var section = doc.getElementById("related-items");
            recommendations.playlist.forEach(function(recommendation) {
              renderRelatedItem(section, templateDoc,
                 MEDIA_ITEMS[recommendation.mediaid]);
            });
          }, false);
        }
    }, function(error) {
      // noop
    });
  }

  var description = doc.getElementsByTagName("description").item(0);
  if (description && description.textContent === "") {
    description.textContent = "No description";
  }

  description.addEventListener("select", function() {
    loader.load("templates/ItemDescription.tvml", function(descriptionDoc) {
      navigationDocument.pushDocument(descriptionDoc);
    });
  });

  var playButton = doc.getElementById("play-button");
  playButton.addEventListener("select", function() {
    var playlist = new Playlist();
    playlist.push(self.item);
    Playback.load(playlist);
    Playback.play();
  });

  function showRelated() {
    loader.loadFragment("templates/ListItem.tvml", templateLoaded, false);
  }

  function templateLoaded(template) {
    var section = doc.getElementById("related-items");

    for(var i=0; i<related.items.length; i++) {
      var relatedItem = related.items.item(i);
      if (relatedItem.mediaid != media_id) {
        renderRelatedItem(section, template, relatedItem);
      }
    }

  }

  function renderRelatedItem(section, templateDoc, relatedItem) {
    var templateData = Utils.extend(relatedItem, {
      parentView: "ItemDetail"
    });
    var itemDoc = loader.duplicateFragment(templateDoc, templateData);
    loader.applyView(itemDoc);
    section.appendChild(itemDoc);
  }


});
