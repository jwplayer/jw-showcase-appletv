function PlaylistLoader() {
  var self = this;

  /** Load an XML document and send it to a handler **/
  self._getDocument = function(url, callback) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {
      callback(templateXHR.responseXML);
    }, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
    return templateXHR;
  }

  /**
    Parses an mRSS feed; ultimately we might want to use the jwplayer feed parser,
    but this works for now.
  **/
  self._parsePlaylist = function(playlistXML) {
    var newPlaylist = {
      items: new Playlist()
    };

    var channel = playlistXML.getElementsByTagName("channel").item(0);

    var listTitle = channel.getElementsByTagName("title").item(0).textContent;
    newPlaylist['title'] = listTitle;
    newPlaylist['id'] = this.id;

    var mediaItems = channel.getElementsByTagName("item");
    for (var i = 0; i < mediaItems.length; i++) {
      var m = self.parseItem(mediaItems.item(i));
      newPlaylist.items.push(m);
    }

    this.callback.call(self, newPlaylist);
  }

  /** TVJS doesn't seem to support getElementsByTagNameNS, so here's a polyfill of sorts **/
  self.getElementsByTagNameNS = function(elem, ns, tag) {
    var nodes = [];
    for (var i = 0; i < elem.childNodes.length; i++) {
      if (elem.childNodes.item(i).tagName == ns + ":" + tag) {
        nodes.push(elem.childNodes.item(i));
      }
    }
    return nodes;
  }


  /** Parse an mRSS item tag and return it in a TVJS MediaItem format **/
  self.parseItem = function(itemXML) {
    var newItem = new MediaItem();
    newItem.externalID = itemXML.getElementsByTagName("guid").item(0).textContent;
    newItem.title = itemXML.getElementsByTagName("title").item(0).textContent;
    newItem.url = "http://content.jwplatform.com/videos/" + newItem.externalID + ".m3u8";

    var content = self.getElementsByTagNameNS(itemXML, "media", "content");
    if (content.length > 0) {
      var thumbs = getElementsByTagNameNS(content[0], "media", "thumbnail");
      if (thumbs.length > 0) {
        newItem.artworkImageURL = thumbs[0].getAttribute("url");
      }
    }

    return newItem;
  }

}


/** Load an mRSS XML feed **/
PlaylistLoader.prototype.loadPlaylist = function(list_id, callback) {
  this._getDocument(`http://content.jwplatform.com/feeds/${list_id}.rss`, this._parsePlaylist.bind({
    list_id: list_id,
    callback: callback
  }));
}
