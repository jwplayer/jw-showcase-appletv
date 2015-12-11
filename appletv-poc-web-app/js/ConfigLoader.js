function ConfigLoader() {
  var self = this;

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
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.addEventListener("load", function() {
      callback(xhr.response);
    }, false);
    xhr.open("GET", url, true);
    xhr.send();
    return xhr;
  }

  self._loadConfig = function(account_id, callback) {
    var baseURL = `${OPTIONS.configService}/${account_id}`;
    var jsonLocation = `${baseURL}/config.json`;
    var self = this;

    self._getDocument(jsonLocation, function(config) {
      var returned = {
        configURL: baseURL
      };
      for (var prop in self.defaults) {
        returned[prop] = self.defaults[prop]
      }
      for (prop in config) {
        returned[prop] = config[prop]
      }

      callback(returned);
    });
  }

}

/** Load an mRSS XML feed **/
ConfigLoader.prototype.loadConfig = function(account_id, callback) {
  this._loadConfig(account_id, callback);
}
