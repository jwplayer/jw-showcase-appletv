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

ViewManager.registerView("Menu", function(doc) {
  var documents = {};
  var menuBarDocument = doc.getElementsByTagName("menuBar").item(0).getFeature("MenuBarDocument");

  doc.addEventListener("select", function(event) {
    var selectedElement = event.target;
    var href = selectedElement.getAttribute("href");
    if (!href) {
      return;
    }

    if (documents[href]) {
      menuBarDocument.setDocument(documents[href], selectedElement);
    } else {
      var templateLoader = new TemplateLoader(doc.ownerDocument);
      templateLoader.load(href, function(templateDoc) {
        documents[href] = templateDoc;
        menuBarDocument.setDocument(templateDoc, selectedElement);
      });
    }
  });

});
