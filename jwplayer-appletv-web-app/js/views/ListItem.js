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

ViewManager.registerView("ListItem", function(doc) {
  var document = doc.ownerDocument;

  var media_id = doc.getAttribute("data-media-id");
  var href = doc.getAttribute("data-href");
  var related = doc.getAttribute("data-related-playlist");
  var parent_view = doc.getAttribute("data-parent-view");

  var item = MEDIA_ITEMS[media_id];

  doc.addEventListener("select", docSelected);

  function docSelected(evt) {
    var loader = new TemplateLoader(doc.ownerDocument, {
      item: item,
      related: PLAYLISTS[related]
    });

    loader.load(href, detailTemplateLoaded);
  }

  function detailTemplateLoaded(detailDocument) {
    if (parent_view == "ItemDetail") {
      navigationDocument.replaceDocument(detailDocument, document);
    } else {
      navigationDocument.pushDocument(detailDocument);
    }
  }
});
