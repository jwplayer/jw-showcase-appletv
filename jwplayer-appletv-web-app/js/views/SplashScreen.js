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

ViewManager.registerView("SplashScreen", function(doc) {

  var delay = doc.firstChild.getAttribute("data-splash-delay");
  var nextScreen = doc.firstChild.getAttribute("data-splash-next");
  var nextDoc;
  var splashWait = false;

  if (!delay) delay = 5;

  if (nextScreen) {
    var loader = new TemplateLoader();
    loader.load(nextScreen, displayNextPage);

    setTimeout(timeoutDone, delay * 1000)

  }

  function timeoutDone() {
    splashWait = true;
    displayNextPage();
  }

  function displayNextPage(newDoc) {
    if (newDoc) {
      nextDoc = newDoc;
    }

    if (splashWait && nextDoc) {
      navigationDocument.replaceDocument(nextDoc, doc);
    }
  }
  
});
