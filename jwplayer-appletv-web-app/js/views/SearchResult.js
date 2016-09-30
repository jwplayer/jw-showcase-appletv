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

ViewManager.registerView("SearchResult", function(doc) {
  const MEDIA_ID = doc.getAttribute("data-media-id");
  const HREF = doc.getAttribute("data-href");

  doc.addEventListener("select", _docSelected);

  function _docSelected(evt) {
    var loader = new TemplateLoader(doc.ownerDocument, {
      item: MEDIA_ITEMS[MEDIA_ID]
    });
    loader.load(HREF, _detailTemplateLoaded);
  }

  function _detailTemplateLoaded(detailDocument) {
    navigationDocument.pushDocument(detailDocument);
  }

});
