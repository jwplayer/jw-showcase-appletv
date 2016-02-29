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

/**
 * Analytics module for the TVOS app. Ultimately this should mirror the Player's analytics
 * plugin, but for MVP, we'll hand-roll something simple, with a lot of
 * hard-coded parameters.
 */
var TVOSAnalytics = (function () {
  var serverURL = "jwpltx.com",
    apiVersion = "v1",
    bucketName = "jwplayer6",
    embedId = Utils.genId(12),
    itemId,
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
    function sendEvent(event, data) {
      var parameters = {};
      parameters[PARAM_NONCE] = Math.random().toFixed(16).substr(2, 16);
      parameters[PARAM_ANALYTICS_TOKEN] = CONFIG['analyticsToken'];
      parameters[PARAM_EVENT_TYPE] = event;
      parameters[PARAM_SDK_PLATFORM] = 4; // 4 = AppleTV
      parameters[PARAM_MOBILE_SDK_VERSION] = VERSION;
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
      parameters = Utils.extend(parameters, data);

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

      /** Record the last time a ping was sent **/
      lastPingSent = new Date();

      /** Don't send analytics pings without an analyticsToken **/
      if (!CONFIG['analyticsToken']) return;

      /** Make a request to the analytics endpoint. No need to wait for a result **/
      var xhr = new XMLHttpRequest();
      xhr.open("GET", trackerURL);
      xhr.send();
      console.log(trackerURL);
      return trackerURL;
    }

    function _mediaParams(mediaItem) {
      var params = {};
      params[PARAM_MEDIA_URL] = mediaItem.url;
      params[PARAM_MEDIA_ID] = mediaItem.externalID;
      params[PARAM_TITLE] = mediaItem.title;
      params[PARAM_ITEM_ID] = itemId;
      return params;
    }

    function _sendStart(mediaItem, playReason) {
      itemId = Utils.genId(12);
      var evt = _mediaParams(mediaItem);
      evt[PARAM_VIDEO_LENGTH] = mediaItem.duration;
      evt[PARAM_QUANTILES] = _numQuantiles(mediaItem.duration);
      evt[PARAM_VIDEO_SIZE] = 5; // 5 = adaptive
      evt[PARAM_FIRST_FRAME] = -1; // -1 = unsupported
      evt[PARAM_PROVIDER] = "";
      evt[PARAM_PLAY_REASON] = playReason ? playReason : 1; // 1: User interaction by default

      sendEvent(EVENT_VIDEO_PLAY, evt);
    };

    function _sendEmbed() {
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

      sendEvent(EVENT_VIDEO_EMBED, evt);
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

    function _sendTime(currentTime, mediaItem) {
      // If mediaItem.duration is zero (which will be the case if duration was not set in the RSS feed) don't send time events
      if (mediaItem.duration == 0) return;

      var evt = _mediaParams(mediaItem);

      var currentQuantile = _pctQuantiles(currentTime, mediaItem.duration);
      var lastQuantile = _pctQuantiles(lastTime, mediaItem.duration)
      var numQuantiles = _numQuantiles(mediaItem.duration);

      evt[PARAM_TIME_WATCHED] = currentQuantile;
      evt[PARAM_QUANTILES] = _numQuantiles(mediaItem.duration);
      evt[PARAM_TIME_INTERVAL] = _timeDiff(new Date(), lastPingSent);

      if (currentQuantile != lastQuantile) {
        sendEvent(EVENT_TIME_WATCHED, evt);
      }

      lastTime = currentTime;

    };

    EventBus.subscribe(Events.PLAYLIST_START, _mediaStartHandler);
    EventBus.subscribe(Events.MEDIA_TIME, _timeHandler);
    EventBus.subscribe(Events.MEDIA_COMPLETE, _completeHandler);
    EventBus.subscribe(Events.MEDIA_CHANGED, _mediaStartHandler);
    EventBus.subscribe(Events.CONFIG_LOADED, function(event) {
      _sendEmbed();
    });

    function _mediaStartHandler(event) {
      if (Playback.player.currentMediaItem) {
        if (event.reason &&
          (PlayerStates[event.reason] == 'PLAYED_TO_END' || PlayerStates[event.reason] == 'FORWARDED_TO_END')
          && !event.previousMediaItem.ad) {
          _sendStart(Playback.player.currentMediaItem, 6); // playReason 6 -> playlist progression, see spec.
        } else {
          _sendStart(Playback.player.currentMediaItem);
        }
      }
    }

    function _timeHandler(event) {
      _sendTime(event.time, Playback.player.currentMediaItem);
    }

    function _completeHandler(event) {
      _sendTime(event.item.duration, Playback.player.currentMediaItem);
    }

    return {
      PARAM_PLAYER_HEIGHT: PARAM_PLAYER_HEIGHT,
      sendEvent: sendEvent
    }
})();
