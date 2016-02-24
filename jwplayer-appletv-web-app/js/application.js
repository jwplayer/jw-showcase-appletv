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

var VERSION = '1.0.0';
var OPTIONS, CONFIG, PLAYLISTS, MEDIA_ITEMS;
var templateLoader;
var domParser;

/** Launch the app **/
App.onLaunch = function(opts) {
  OPTIONS = opts;
  PLAYLISTS = {};
  MEDIA_ITEMS = {};

  domParser = new DOMParser();

  console.log("Initing with options %o", OPTIONS);

  var scripts = [
    `${OPTIONS.baseURL}/js/events/EventBus.js`,
    `${OPTIONS.baseURL}/js/events/Events.js`,
    `${OPTIONS.baseURL}/js/ConfigLoader.js`,
    `${OPTIONS.baseURL}/js/he.js`,
    `${OPTIONS.baseURL}/js/TemplateLoader.js`,
    `${OPTIONS.baseURL}/js/ViewManager.js`,
    `${OPTIONS.baseURL}/js/PlaylistLoader.js`,
    `${OPTIONS.baseURL}/js/analytics/TVOSAnalytics.js`,
    `${OPTIONS.baseURL}/js/playback/Playback.js`
  ];

  evaluateScripts(scripts, function(success) {
    if (success) {
      configLoader = new ConfigLoader();
      configLoader.loadConfig(OPTIONS.account_key, configLoaded);
    } else {
      showAlert("Error", "Unable to evaluate scripts.")
    }
  });

}

function configLoaded(config) {
  CONFIG = config;
  EventBus.publish(Events.CONFIG_LOADED, {
    config: CONFIG
  });
  templateLoader = new TemplateLoader();
  templateLoader.load("templates/index.tvml", function(templateDoc) {
    navigationDocument.pushDocument(templateDoc);
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

function extend(obj) {
  var length = arguments.length;
  if (length < 2 || obj == null) return obj;
  for (var index = 1; index < length; index++) {
    var source = arguments[index];
    var keys = [];
    for (var i in source) {
      if (source.hasOwnProperty(i)) {
        keys.push(i);
      }
    }
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      obj[key] = source[key];
    }
  }
  return obj;
}

function genId(len) {
  return new Array(len + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, len);
}
