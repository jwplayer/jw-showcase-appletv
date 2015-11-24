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
