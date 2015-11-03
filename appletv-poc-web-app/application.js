var appOptions;

/** Load an XML document and send it to a handler **/
function getDocument(url, callback) {
    var templateXHR = new XMLHttpRequest();
    templateXHR.responseType = "document";
    templateXHR.addEventListener("load", function() {
                                 callback(templateXHR.responseXML);
                                 }, false);
    templateXHR.open("GET", url, true);
    templateXHR.send();
    return templateXHR;
}

/** Adds the root interface to the document stack **/
function pushDoc(document) {
  navigationDocument.pushDocument(document);

  // Load a couple of playlists
  loadPlaylist("cKF0NRAt");
  loadPlaylist("1AxTdxJn");
}

/** Load an mRSS XML feed **/
function loadPlaylist(list_id) {
  getDocument("http://content.jwplatform.com/feeds/"+list_id+".rss", parsePlaylist);
}


/** TVJS doesn't seem to support getElementsByTagNameNS, so here's a polyfill of sorts **/
function getElementsByTagNameNS(elem, ns, tag) {
  var nodes = [];
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (elem.childNodes.item(i).tagName == ns + ":" + tag) {
      nodes.push(elem.childNodes.item(i));
    }
  }
  return nodes;
}

/**
  Parses an mRSS feed; ultimately we might want to use the jwplayer feed parser,
  but this works for now.
**/
function parsePlaylist(playlistXML) {
  var newPlaylist = {
    items: new Playlist()
  };

  var channel = playlistXML.getElementsByTagName("channel").item(0);

  var listTitle = channel.getElementsByTagName("title").item(0).textContent;
  newPlaylist['title'] = listTitle;

  var mediaItems = channel.getElementsByTagName("item");
  for (var i = 0; i < mediaItems.length; i++) {
    var m = parseItem(mediaItems.item(i));
    newPlaylist.items.push(m);
  }

  addPlaylist(newPlaylist);

}

/** Parse an mRSS item tag and return it in a TVJS MediaItem format **/
function parseItem(itemXML) {
  var newItem = new MediaItem();
  newItem.externalID = itemXML.getElementsByTagName("guid").item(0).textContent;
  newItem.title = itemXML.getElementsByTagName("title").item(0).textContent;
  newItem.url = "http://content.jwplatform.com/videos/" + newItem.externalID + ".m3u8";

  var content = getElementsByTagNameNS(itemXML, "media", "content");
  if (content.length > 0) {
    var thumbs = getElementsByTagNameNS(content[0], "media", "thumbnail");
    if (thumbs.length > 0) {
      newItem.artworkImageURL = thumbs[0].getAttribute("url");
    }
  }

  return newItem;
}

/** Playlist template **/
function playlistTemplate(list_title) {
  return `<listItemLockup>
    <title><![CDATA[${list_title}]]></title>
      <relatedContent>
        <grid>
          <section>
          </section>
        </grid>
      </relatedContent>
  </listItemLockup>`;
}

/** Playlist item template **/
function playlistItemTemplate(itemObj) {
  return `<lockup>
      <img height="168" src="${itemObj.artworkImageURL}" width="300"/>
      <title><![CDATA[${itemObj.title}]]></title>
    </lockup>`;
}

/** Apply playlist template to the playlist object and insert it into the DOM **/
function addPlaylist(playlistObj) {
  var currDoc = navigationDocument.documents[navigationDocument.documents.length-1];
  var listContainer = currDoc.getElementById("playlists");

  // This is a workaround to some TVML oddities; there's probably a better way
  // of constructing a TVML node from a template, but this works for now.
  var itemFactory = currDoc.createElement("document");

  itemFactory.innerHTML = playlistTemplate(playlistObj['title']);

  var listItemLockup = itemFactory.firstChild;
  listContainer.appendChild(listItemLockup);

  // Where to put the list items
  var section = listItemLockup.getElementsByTagName("grid").item(0).getElementsByTagName("section").item(0);

  for (var i=0; i < playlistObj.items.length; i++) {
    var mediaItem = playlistObj.items.item(i);
    itemFactory.innerHTML = playlistItemTemplate(mediaItem);
    var newItem = itemFactory.firstChild;

    newItem.addEventListener("select", playMediaItem.bind(mediaItem), false);

    section.appendChild(newItem);
  }

}

/** On a select event, create a Player and play the media **/
function playMediaItem(selectEvent) {
  var player = new Player();
  player.playlist = new Playlist();
  player.playlist.push(this);
  player.present();
  player.play();
}


/** Launch the app **/
App.onLaunch = function(options) {
  console.log("Initing with options %o", options);
  appOptions = options;
  appOptions.baseURL = options.location.split("/").slice(0, -1).join("/");
  getDocument(appOptions.baseURL + "/mainTemplate.tvml", pushDoc);
}
