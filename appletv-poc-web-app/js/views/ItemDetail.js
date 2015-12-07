ViewManager.registerView("ItemDetail", function(doc) {
  var loader = new TemplateLoader(doc);

  var media_id = doc.firstChild.getAttribute("data-media-id");
  var item = MEDIA_ITEMS[media_id];
  var started = false;

  var related_id = doc.firstChild.getAttribute("data-related-playlist")
  if (related_id != "undefined") {
    var related = PLAYLISTS[related_id];
    showRelated();
  }

  var description = doc.getElementsByTagName("description").item(0);
  if (description && description.textContent === "") {
    description.textContent = "No description";
  }

  var playButton = doc.getElementById("play-button");
  playButton.addEventListener("select", playMedia);

  function showRelated() {
    loader.loadFragment("templates/ListItem.tvml", templateLoaded, false);
  }


  function templateLoaded(template) {
    var section = doc.getElementById("related-items");

    for(var i=0; i<related.items.length; i++) {
      var relatedItem = related.items.item(i);
      if (relatedItem.externalID != media_id) {
        var templateData = extend(relatedItem, {
          parentView: "ItemDetail"
        });
        var itemDoc = loader.duplicateFragment(template, templateData);
        loader.applyView(itemDoc);
        section.appendChild(itemDoc);
      }
    }

  }

  /** Handle player stateDidChange event **/
  function stateHandler(evt) {
    if (evt.state == "begin") {
      analytics.start(item);
    } else if (evt.state == "end") {
      analytics.timeWatched(item, item.duration, 0);
    }
  }


  /** On a select event, create a Player and play the media **/
  function playMedia() {
    var player = new Player();
    player.addEventListener("stateDidChange", stateHandler);
    player.playlist = new Playlist();
    player.playlist.push(item);
    player.present();
    player.play();
  }

});
