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

function TemplateLoader(document, context) {
  var _self = this;
  if (!context) context = this;

  _self.baseURL = OPTIONS.baseURL;
  _self.parser = new DOMParser();
  _self.document = document || navigationDocument.documents[0];

  _self._createDocument = function(docString, evaluate) {
    var templateString = evaluate ? _self.evalTemplate.call(context, docString) : docString;
    return _self.parser.parseFromString(templateString, "application/xml");
  }

  _self._applyTemplate = function(templateString, evaluate) {
    if (typeof evaluate == "undefined") evaluate = true;
    var doc = _self._createDocument(templateString, evaluate);
    _self.applyView(doc);
    return doc;
  }

  _self._createFragment = function(fragmentString, evaluate) {
    var newDoc = _self.document.createElement("div");
    newDoc.innerHTML = evaluate ? _self.evalTemplate.call(context, fragmentString) : fragmentString;
    return newDoc;
  }

}

TemplateLoader.prototype.applyView = function(doc) {
  try {
    var viewName = doc.firstChild.getAttribute("data-view") || doc.getAttribute("data-view");
    if (viewName) {
      ViewManager.applyView(viewName, doc);
    }
  } catch(e) {
    // No view found
    return;
  }

}


TemplateLoader.prototype.evalTemplate = function(templateString) {
  return eval("`"+templateString+"`");
}


TemplateLoader.prototype.loadResource = function(url, callback) {
  var toLoad = url;
  if (url.toLowerCase().indexOf("http") != 0) {
    toLoad = `${this.baseURL}/${url}`;
  }

  var templateXHR = new XMLHttpRequest();
  templateXHR.responseType = "text";
  templateXHR.addEventListener("load", function() {
    callback.call(this, templateXHR.responseText);
  }, false);
  templateXHR.open("GET", toLoad, true);
  templateXHR.send();
  return templateXHR;
};

TemplateLoader.prototype.load = function(url, callback, evaluate) {
  var self = this;
  if (typeof evaluate == "undefined") evaluate = true;

  self.loadResource(url, function(response) {
    var doc = self._applyTemplate(response, evaluate);
    callback.call(self, doc);
  });
}

/**
  Use this when loading part of a document meant to be added to the DOM
  via appendChild, vs. navigationDocument.pushDocument.

  Otherwise, you run the risk of getting a IKDOMException (documents don't match)
**/
TemplateLoader.prototype.loadFragment = function(url, callback, evaluate) {
  var self = this;
  if (typeof evaluate == "undefined") evaluate = true;

  self.loadResource(url, function(response) {
    var doc = self._createFragment(response, evaluate);
    callback.call(self, doc);
  });
}

/** Evaluate a template from the context, and return a copy **/
TemplateLoader.prototype.duplicateFragment = function(templateDoc, context) {
  var newElement = templateDoc.cloneNode();
  var newHTML = templateDoc.innerHTML;
  if (context) newHTML = this.evalTemplate.call(context, newHTML);
  newElement.innerHTML = newHTML;
  return newElement.firstChild;
}
