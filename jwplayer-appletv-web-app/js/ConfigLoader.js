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

function ConfigLoader() {
  var self = this,
    _config,
    _callback,
    _activeRequests = 0;

  self.defaults = {
    "playlists": [],
    "featuredPlaylist": "",
    "splashScreen": "",
    "bannerImage": "",
    "backgroundColor": "#000000",
    "analyticsToken": "",
    "autoAdvance": false,
    "autoAdvanceWarningOffset": 10,
    "autoAdvanceMessage": "The next video will start in ${offset} seconds."
  };

  /** Load a JSON document and send it to a handler **/
  self._getDocument = function(url, callback) {
    // Keep track of the number of active requests
    _activeRequests++;

    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener("load", function() {
      callback(xhr.response);
    }, false);
    xhr.addEventListener("error", _complete, false);
    xhr.open("GET", url, true);
    xhr.send();
    return xhr;
  }

  self._loadConfig = function(account_id, callback) {
    var baseURL = `${OPTIONS.configService}/${account_id}`;
    var jsonLocation = `${baseURL}/config.json`;
    var analyticsTokenLocation = `https://content.jwplatform.com/tvos/account/${account_id}.json`;

    _callback = callback;
    _config = Utils.extend({ configURL: baseURL }, self.defaults);

    self._getDocument(jsonLocation, _configLoaded);
    self._getDocument(analyticsTokenLocation, _configLoaded);

  }

  function _configLoaded(loadedConfig) {
    if (loadedConfig.modules && Array.isArray(loadedConfig.modules)) {
      var isStringArray = true;
      for (var i = 0; i < loadedConfig.modules.length; i++) {
        if (typeof loadedConfig.modules[i] != 'string') {
          isStringArray = false;
          break;
        }
      }
      if (isStringArray) {
        evaluateScripts(loadedConfig.modules, function(success) {
          if (success) {
            console.log('Succesfully loaded modules.');
          } else {
            console.error('Error loading modules.');
          }
        });
      } else {
        console.error('Invalid config parameter: modules');
      }
    }
    _config = Utils.extend(_config, loadedConfig);
    _complete();
  }

  function _complete() {
    _activeRequests--;
    if (_activeRequests == 0) {
      _callback(_config);
    }
  }
}

/** Load an mRSS XML feed **/
ConfigLoader.prototype.loadConfig = function(account_id, callback) {
  this._loadConfig(account_id, callback);
}
