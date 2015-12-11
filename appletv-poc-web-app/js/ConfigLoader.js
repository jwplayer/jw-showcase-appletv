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
    "analyticsToken": ""
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
    var analyticsTokenLocation = `http://content.jwplatform.com/accounts/${account_id}.json`;

    _callback = callback;
    _config = extend({ configURL: baseURL }, self.defaults);

    self._getDocument(jsonLocation, _configLoaded);
    self._getDocument(analyticsTokenLocation, _configLoaded);

  }

  function _configLoaded(loadedConfig) {
    _config = extend(_config, loadedConfig);
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
