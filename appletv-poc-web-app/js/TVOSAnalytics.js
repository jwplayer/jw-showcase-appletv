/**
  Analytics for TVOS app.  Ultimately this should mirror the Player's analytics
  plugin, but for MVP, we'll hand-roll something simple, with a lot of
  hard-coded parameters.
**/
function TVOSAnalytics(item) {
  var _self = this,
    serverURL = "jwpltx.com",
    apiVersion = "v1",
    bucketName = "jwplayer6",
    analyticsToken = CONFIG['analyticsToken'],
    embedId = _genId(12),
    lastTime = 0,
    lastPingSent;


  /** @const */ var PARAM_CHECKSUM = 'h';

  //sent with all events
  /** @const */ var PARAM_TRACKER_VERSION     = 'tv';
  /** @const */ var PARAM_NONCE               = 'n';
  /** @const */ var PARAM_ANALYTICS_TOKEN     = 'aid';
  /** @const */ var PARAM_EVENT_TYPE          = 'e';
  /** @const */ var PARAM_IFRAME              = 'i';
  /** @const */ var PARAM_IFRAME_DEPTH        = 'ifd';
  /** @const */ var PARAM_PLAYER_VERSION      = 'pv';
  /** @const */ var PARAM_PAGE_URL            = 'pu';
  /** @const */ var PARAM_PAGE_TITLE          = 'pt';
  /** @const */ var PARAM_SDK_PLATFORM        = 'sdk';
  /** @const */ var PARAM_AUTOSTART           = 'd';
  /** @const */ var PARAM_AD_BLOCK            = 'eb';
  /** @const */ var PARAM_EMBED_ID            = 'emi';
  /** @const */ var PARAM_RENDERING_MODE      = 'm';
  /** @const */ var PARAM_MEDIA_URL           = 'mu';
  /** @const */ var PARAM_PLAYER_HOSTING      = 'ph';
  /** @const */ var PARAM_ITEM_ID             = 'pli';
  /** @const */ var PARAM_PLAYER_SIZE         = 'ps';
  /** @const */ var PARAM_MOBILE_SDK_VERSION  = 'sv';
  /** @const */ var PARAM_TITLE               = 't';

  //mobile SDK specific
  /** @const */ var PARAM_MOBILE_APP_BUNDLEID = 'bi';
  /** @const */ var PARAM_MOBILE_APP_NAME     = 'an';
  /** @const */ var PARAM_MOBILE_DEVICE_ID    = 'did';
  /** @const */ var PARAM_PLAYER_DEVICE_MODEL = 'dm';

  // Tracking Parameter Keys
  /** @const */ var PARAM_EDITION               = 'ed';
  /** @const */ var PARAM_TIME_INTERVAL         = 'ti';
  /** @const */ var PARAM_TIME_WATCHED          = 'pw';
  /** @const */ var PARAM_VIDEO_SIZE            = 'vs';
  /** @const */ var PARAM_PLAYER_WIDTH          = 'wd';
  /** @const */ var PARAM_PLAYER_HEIGHT         = 'pl';
  /** @const */ var PARAM_VIDEO_LENGTH          = 'l';
  /** @const */ var PARAM_QUANTILES             = 'q';
  /** @const */ var PARAM_MEDIA_ID              = 'id';
  /** @const */ var PARAM_FLASH_VERSION         = 'fv';
  /** @const */ var PARAM_SETUP_TIME            = 'st';
  /** @const */ var PARAM_FIRST_FRAME           = 'ff';
  /** @const */ var PARAM_PROVIDER              = 'pp';
  /** @const */ var PARAM_VISUAL_PLAYLIST       = 'vp';
  /** @const */ var PARAM_POSTER_IMAGE          = 'po';
  /** @const */ var PARAM_SHARING               = 's';
  /** @const */ var PARAM_RELATED               = 'r';
  /** @const */ var PARAM_SKIN_NAME             = 'sn';
  /** @const */ var PARAM_CASTING_BLOCK         = 'cb';
  /** @const */ var PARAM_GA_BLOCK              = 'ga';
  /** @const */ var PARAM_PLAY_REASON           = 'pr';
  /** @const */ var PARAM_DASHBOARD_CONFIG_KEY  = 'pid';
  /** @const */ var PARAM_DISPLAY_DESCRIPTION   = 'dd';
  /** @const */ var PARAM_CHROMELESS_PLAYER     = 'cp';
  /** @const */ var PARAM_ADVERTISING_BLOCK     = 'ab';

  // Tracking Events
  /** @const */ var EVENT_VIDEO_EMBED  = 'e';
  /** @const */ var EVENT_VIDEO_PLAY   = 's';
  /** @const */ var EVENT_TIME_WATCHED = 't';


  function _genId(len) {
      return new Array(len+1).join((Math.random().toString(36)+'00000000000000000').slice(2, 18)).slice(0, len);
  }

  function _hashParam(s) {
    s = decodeURIComponent(s);
    var h = 0;

    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      h = ((h << 5) - h) + c;
      h &= h;
    }

    return `h=${h}`;
  }

  /** Generate ping URL and send it **/
  function _sendEvent(event, data) {
    if (!analyticsToken) {
      // Don't send analytics pings without an analyticsToken
      return;
    }

    var parameters = {};
    parameters[PARAM_NONCE] = Math.random().toFixed(16).substr(2, 16);
    parameters[PARAM_ANALYTICS_TOKEN] = analyticsToken;
    parameters[PARAM_EVENT_TYPE] = event;
    parameters[PARAM_SDK_PLATFORM] = 4; // 4 = AppleTV
    parameters[PARAM_MOBILE_SDK_VERSION] = "tvos-0.1";
    parameters[PARAM_TRACKER_VERSION] = "";
    parameters[PARAM_IFRAME] = "";
    parameters[PARAM_IFRAME_DEPTH] = 0;
    parameters[PARAM_PLAYER_VERSION] = "";
    parameters[PARAM_PAGE_URL] = "";
    parameters[PARAM_PAGE_TITLE] = "";
    parameters[PARAM_AUTOSTART] = 1;
    parameters[PARAM_AD_BLOCK] = 0;
    parameters[PARAM_EMBED_ID] = embedId;
    parameters[PARAM_RENDERING_MODE] = "";
    parameters[PARAM_PLAYER_HOSTING] = 0;
    parameters[PARAM_PLAYER_SIZE] = "";
    parameters = extend(parameters, data);

    /** Generate list of key/value URL parameter pairs **/
    var trackingArgs = [];
    for (var key in parameters) {
      var value = encodeURIComponent(parameters[key]);
      trackingArgs.push(`${key}=${value}`);
    }

    /** Generate ping request argument string **/
    var trackingArgsStr = trackingArgs.join("&");

    /** MD5 hash for server-side integrity check **/
    var hash = _hashParam(trackingArgsStr);

    /** Compose ping URL **/
    var trackerURL = `https://${serverURL}/${apiVersion}/${bucketName}/ping.gif?${hash}&${trackingArgsStr}`;

    /** Make a request to the analytics endpoint. No need to wait for a result **/
    var xhr = new XMLHttpRequest();
    xhr.open("GET", trackerURL);
    xhr.send();

    /** Record the last time a ping was sent **/
    lastPingSent = new Date();

    return trackerURL;

  }

  function _mediaParams() {
    var params = {};
    params[PARAM_MEDIA_URL] = item.url;
    params[PARAM_ITEM_ID] = item.externalID;
    params[PARAM_TITLE] = item.title;
    return params;
  }

  _self._sendStart = function() {
    var evt = _mediaParams();
    evt[PARAM_VIDEO_LENGTH] = item.duration;
    evt[PARAM_QUANTILES] = _numQuantiles(item.duration);
    evt[PARAM_VIDEO_SIZE] = 5; // 5 = adaptive
    evt[PARAM_FIRST_FRAME] = -1; // -1 = unsupported
    evt[PARAM_PROVIDER] = "";
    evt[PARAM_PLAY_REASON] = 1; // User interaction  TODO: If we implement auto-play recommendations, this needs to be dynamic

    _sendEvent(EVENT_VIDEO_PLAY, evt);
  };

  _self._sendEmbed = function() {
    var evt = {};
    evt[PARAM_FLASH_VERSION] = "";
    evt[PARAM_PLAYER_HEIGHT] = "1080"; // Hard-coded to 1080p
    evt[PARAM_PLAYER_WIDTH] = "1920"; // Hard-coded to 1080p
    evt[PARAM_SETUP_TIME] = -1; // TODO: instrument app setup time
    evt[PARAM_VISUAL_PLAYLIST] = 0;
    evt[PARAM_POSTER_IMAGE] = 1;
    evt[PARAM_DISPLAY_DESCRIPTION] = 0;
    evt[PARAM_SKIN_NAME] = "";
    evt[PARAM_CHROMELESS_PLAYER] = 0;
    evt[PARAM_SHARING] = 0;
    evt[PARAM_RELATED] = 0;
    evt[PARAM_CASTING_BLOCK] = 0;
    evt[PARAM_GA_BLOCK] = 0;
    evt[PARAM_DASHBOARD_CONFIG_KEY] = "";
    evt[PARAM_ADVERTISING_BLOCK] = 0; // TODO: Set this appropriately if/when ads are implemented

    _sendEvent(EVENT_VIDEO_EMBED, evt);
  };

  function _numQuantiles(duration) {
    if (duration == 0) return 0;
    else if (duration < 30) return 1;
    else if (duration < 60) return 4;
    else if (duration < 180) return 8;
    else if (duration < 300) return 16;
    else return 32;
  }

  function _pctQuantiles(current, duration) {
    var numq = _numQuantiles(duration);
    var q = 128 / numq;
    var currentQuantile = Math.floor( ( (current / duration) * 128) / q) * q;
    return currentQuantile;
  }

  function _timeDiff(now, last) {
    return Math.floor((now.getTime() - last.getTime())/1000);
  }

  _self._sendTime = function(currentTime) {
    var evt = _mediaParams();

    var currentQuantile = _pctQuantiles(currentTime, item.duration);
    var lastQuantile = _pctQuantiles(lastTime, item.duration)
    var numQuantiles = _numQuantiles(item.duration);

    evt[PARAM_TIME_WATCHED] = currentQuantile;
    evt[PARAM_QUANTILES] = _numQuantiles(item.duration);
    evt[PARAM_TIME_INTERVAL] = _timeDiff(new Date(), lastPingSent);

    if (currentQuantile != lastQuantile) {
      _sendEvent(EVENT_TIME_WATCHED, evt);
    }

    lastTime = currentTime;

  };

}

TVOSAnalytics.prototype.start = function() {
  return this._sendStart();
}

TVOSAnalytics.prototype.embed = function() {
  return this._sendEmbed();
}

TVOSAnalytics.prototype.timeWatched = function(currentTime) {
  return this._sendTime(currentTime);
}
