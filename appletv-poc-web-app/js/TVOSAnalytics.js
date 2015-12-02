/**
  Analytics for TVOS app.  Ultimately this should mirror the Player's analytics
  plugin, but for MVP, we'll hand-roll something simple, with a lot of
  hard-coded parameters.
**/
function TVOSAnalytics() {
  var _self = this,
    serverURL = "jwpltx.com",
    apiVersion = "v1",
    bucketName = "jwplayer6",
    analyticsToken = CONFIG['analyticsToken'];


    /** @const */ var PARAM_CHECKSUM = 'h';

    //sent with all events
    /** @const */ var PARAM_TRACKER_VERSION = 'tv';
    /** @const */ var PARAM_NONCE   = 'n';
    /** @const */ var PARAM_ANALYTICS_TOKEN = 'aid';
    /** @const */ var PARAM_EVENT_TYPE      = 'e';
    /** @const */ var PARAM_IFRAME          = 'i';
    /** @const */ var PARAM_IFRAME_DEPTH    = 'ifd';
    /** @const */ var PARAM_PLAYER_VERSION  = 'pv';
    /** @const */ var PARAM_PAGE_URL        = 'pu';
    /** @const */ var PARAM_PAGE_TITLE      = 'pt';
    /** @const */ var PARAM_SDK_PLATFORM    = 'sdk';

    // Tracking Events
    /** @const */ var EVENT_VIDEO_EMBED  = 'e';
    /** @const */ var EVENT_VIDEO_PLAY   = 's';
    /** @const */ var EVENT_TIME_WATCHED = 't';

    //mobile SDK specific
    /** @const */ var PARAM_MOBILE_SDK_VERSION  = 'sv';
    /** @const */ var PARAM_MOBILE_APP_BUNDLEID = 'bi';
    /** @const */ var PARAM_MOBILE_APP_NAME     = 'an';
    /** @const */ var PARAM_MOBILE_DEVICE_ID    = 'did';
    /** @const */ var PARAM_PLAYER_DEVICE_MODEL = 'dm';


    // Tracking Parameter Keys
    /** @const */ var PARAM_EDITION         = 'ed';
    /** @const */ var PARAM_AUTOSTART       = 'd';
    /** @const */ var PARAM_PLAYER_HOSTING  = 'ph';
    /** @const */ var PARAM_MEDIA_URL       = 'mu';
    /** @const */ var PARAM_TITLE           = 't';
    /** @const */ var PARAM_TIME_INTERVAL   = 'ti';
    /** @const */ var PARAM_TIME_WATCHED    = 'pw';
    /** @const */ var PARAM_PLAYER_SIZE     = 'ps';
    /** @const */ var PARAM_VIDEO_SIZE      = 'vs';
    /** @const */ var PARAM_PLAYER_WIDTH    = 'wd';
    /** @const */ var PARAM_PLAYER_HEIGHT   = 'pl';
    /** @const */ var PARAM_VIDEO_LENGTH    = 'l';
    /** @const */ var PARAM_QUANTILES       = 'q';
    /** @const */ var PARAM_RENDERING_MODE  = 'm';
    /** @const */ var PARAM_MEDIA_ID        = 'id';
    /** @const */ var PARAM_FLASH_VERSION   = 'fv';
    /** @const */ var PARAM_AD_BLOCK        = 'eb';
    /** @const */ var PARAM_SETUP_TIME      = 'st';
    /** @const */ var PARAM_FIRST_FRAME     = 'ff';
    /** @const */ var PARAM_PROVIDER        = 'pp';
    /** @const */ var EMBED_ID              = 'emi';
    /** @const */ var ITEM_ID               = 'pli';
    /** @const */ var PARAM_VISUAL_PLAYLIST = 'vp';
    /** @const */ var PARAM_POSTER_IMAGE    = 'po';
    /** @const */ var PARAM_SHARING         = 's';
    /** @const */ var PARAM_RELATED         = 'r';
    /** @const */ var PARAM_SKIN_NAME       = 'sn';
    /** @const */ var PARAM_CASTING_BLOCK   = 'cb';
    /** @const */ var PARAM_GA_BLOCK        = 'ga';
    /** @const */ var PARAM_PLAY_REASON     = 'pr';
    /** @const */ var PARAM_DASHBOARD_CONFIG_KEY  = 'pid';
    /** @const */ var PARAM_DISPLAY_DESCRIPTION   = 'dd';
    /** @const */ var PARAM_CHROMELESS_PLAYER     = 'cp';
    /** @const */ var PARAM_ADVERTISING_BLOCK     = 'ab';



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


  function _sendEvent(parameters) {
    var trackingArgs = [];

    for (var key in parameters) {
      var value = encodeURIComponent(parameters[key]);
      trackingArgs.push(`${key}=${value}`);
    }

    var trackingArgsStr = trackingArgs.join("&");
    var hash = _hashParam(trackingArgsStr);

    var trackerURL = `//${serverURL}/${apiVersion}/${bucketName}/ping.gif?${hash}&${trackingArgsStr}`;

    return trackerURL;

  }


}
