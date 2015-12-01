/**
  Analytics for TVOS app.  Ultimately this should mirror the Player's analytics
  plugin, but for MVP, we'll hand-roll something simple, with a lot of
  hard-coded parameters.
**/
function TVOSAnalytics() {
  var serverURL = "jwpltx.com",
    apiVersion = "v1",
    bucketName = "tvos";

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
