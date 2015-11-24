function TemplateLoader(document) {
  this.baseURL = OPTIONS.baseURL;
  this.parser = new DOMParser();
  this.document = document || navigationDocument.documents[0];

  this._createDocument = function(docString) {
    var templateString = this._applyTemplate.call(this, docString);
    return this.parser.parseFromString(templateString, "application/xml");
  }

  this._applyTemplate = function(templateString) {
    return eval("`"+templateString+"`");
  }

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

TemplateLoader.prototype.applyTemplate = function(templateString) {
  var doc = this._createDocument(templateString);
  var viewName = doc.childNodes.item(0).getAttribute("data-view");
  if (viewName) {
    ViewManager.applyView(viewName, doc);
  }
  return doc;
}

TemplateLoader.prototype.load = function(url, callback) {
  var self = this;

  self.loadResource(url, function(response) {
    var doc = self.applyTemplate(response);
    callback.call(self, doc);
  });
}

/**
  Use this when loading part of a document meant to be added to the DOM
  via appendChild, vs. navigationDocument.pushDocument.

  Otherwise, you run the risk of getting a IKDOMException (documents don't match)
**/
TemplateLoader.prototype.loadFragment = function(url, callback) {
  var self = this;

  self.loadResource(url, function(response) {
    var newDoc = self.document.createElement("div");
    newDoc.innerHTML = self._applyTemplate(response);
    callback.call(self, newDoc.firstChild);
  });
}
