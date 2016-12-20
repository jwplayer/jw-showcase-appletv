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

ViewManager.registerView("ListCollection", function(doc) {
  var document = doc.ownerDocument;
  var loader = new TemplateLoader(document);
  var collectionDoc = doc;

  var playlists = collectionDoc.firstChild.getAttribute("data-playlists").split(",");
  var featured = collectionDoc.firstChild.getAttribute("data-featured");
  if (featured === "undefined") featured = undefined;

  var collectionList = collectionDoc.getElementsByTagName("collectionList").item(0);

  var templates = {
    "list": undefined,
    "item": undefined,
    "featured": undefined
  };

  loader.loadFragment("templates/List.tvml", templateLoaded.bind({template:"list"}), false);
  loader.loadFragment("templates/ListItem.tvml", templateLoaded.bind({template:"item"}), false);
  loader.loadFragment("templates/ListItemFeatured.tvml", templateLoaded.bind({template:"featured"}), false);

  function templateLoaded(templateDoc) {
    templates[this.template] = templateDoc;
    templatesLoaded();
  }

  function templatesLoaded() {
    for (var t in templates) {
      if (!templates[t]) return;
    }

    // First insert the featured playlist.
    if (featured) {
      insertPlaylist(featured);
    }

    // Then insert the rest.
    for (var i = 0; i < playlists.length; i++) {
      insertPlaylist(playlists[i]);
    }
  }

  function insertPlaylist(playlistId) {
    var placeholder;

    if (playlistId != featured) {
      placeholder = document.createElement("div");
       // Create a placecholder in the CollectionList so the lists are inserted in order
      collectionList.appendChild(placeholder);
    }

    PlaylistManager.getPlaylist(playlistId)
      // Bind the placeholder to the callback so it can be replaced with the templated markup
      .then(renderPlaylist.bind(placeholder))
      .catch(function(error) {
        console.log("Failed to load playlist " + playlistId + ".\n" + error);
      });
  }

  function renderPlaylist(list) {
    var section,
      template,
      placeholder = this;

    if (list.feedid == featured) {
      renderFeaturedPlaylist(list);
    } else {
      // Create a new List fragment from the template
      var listShelf = loader.duplicateFragment(templates.list, list);

      // Replace the placeholder div with the templated list
      collectionList.replaceChild(listShelf, placeholder);

      section = listShelf.getElementsByTagName("section").item(0);
      template = templates.item;
      insertItems(section, template, list);
    }
  }

  function renderFeaturedPlaylist(list) {
    // Create a carousel.
    // We're doing this in JavaScript in order to prevent
    // a crash when populating a carousel that is already
    // present in the view hierarchy in tvOS 10.1.
    var carousel = document.createElement('carousel');
    
    // Create a new section within the carousel.
    section = document.createElement('section');
    section.id = 'featured-playlist';
    carousel.appendChild(section);

    // Populate the section with plalist items.
    insertItems(section, templates.featured, list);
    
    // Insert the featured playlist as first child of the collectionList.
    // In order to ensure it's always being displayed at the top.
    if (!collectionList.firstChild) {
      collectionList.appendChild(carousel);
    } else {
      collectionList.insertBefore(carousel, collectionList.firstChild);
    }
  }

  function insertItems(section, template, list) {
    for(var i=0; i<list.items.length; i++) {
      var item = list.items.item(i);
      item.related = list.feedid;
      item.parentView = "ListCollection"
      var itemDoc = loader.duplicateFragment(template, item);
      loader.applyView(itemDoc);
      section.appendChild(itemDoc);
    }
  }

});
