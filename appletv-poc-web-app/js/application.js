var OPTIONS;
var templateLoader;
var domParser;

/** Launch the app **/
App.onLaunch = function(opts) {
  OPTIONS = opts;
  domParser = new DOMParser();

  console.log("Initing with options %o", OPTIONS);

  var scripts = [
    `${OPTIONS.baseURL}/js/TemplateLoader.js`,
    `${OPTIONS.baseURL}/js/ViewManager.js`,
    `${OPTIONS.baseURL}/js/PlaylistLoader.js`
  ];

  evaluateScripts(scripts, function(success) {
    if (success) {
      templateLoader = new TemplateLoader();
      templateLoader.load("templates/index.tvml", function(templateDoc) {
        navigationDocument.pushDocument(templateDoc);
      });
    } else {
      showAlert("Error", "Unable to evaluate scripts.")
    }
  });

}

function resetApp() {
  while (navigationDocument.documents.length > 0) {
    navigationDocument.removeDocument(navigationDocument.documents[0]);
  }
  App.onLaunch(OPTIONS);
}

function showAlert(alertTitle, alertText) {
  var alertTVML = `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <alertTemplate>
    <title>${alertTitle}</title>
    <description>${alertText}</description>
  </alertTemplate>
</document>`;

  var alertDoc = domParser.parseFromString(alertTVML, "application/xml");
  navigationDocument.pushDocument(alertDoc);

  throw (alertText);

}
