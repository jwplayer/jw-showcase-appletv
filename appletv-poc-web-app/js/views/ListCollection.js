ViewManager.registerView("ListCollection", function(doc) {
  var document = doc.ownerDocument;
  var loader = new TemplateLoader(document);
  var listLoader = new PlaylistLoader();
  var collectionDoc = doc;

  var playlists = collectionDoc.firstChild.getAttribute("data-playlists").split(",");
  var collectionList = collectionDoc.getElementsByTagName("collectionList").item(0);
  var listTemplate;
  var itemTemplate;

  loader.loadFragment("templates/List.tvml", listTemplateLoaded, false);
  loader.loadFragment("templates/ListItem.tvml", listItemTemplateLoaded, false);

  function listTemplateLoaded(templateDoc) {
    listTemplate = templateDoc;
    templatesLoaded();
  }

  function listItemTemplateLoaded(templateDoc) {
    itemTemplate = templateDoc;
    templatesLoaded();
  }

  function templatesLoaded() {
    if (listTemplate && itemTemplate) {
      playlists.forEach(insertPlaylist);
    }
  }

  function insertPlaylist(list_id) {
    var newList = listTemplate.cloneNode();
    newList.setAttribute("id", `playlist-id-${list_id}`);
    newList.setAttribute("data-list-id", list_id);
    newList.innerHTML = listTemplate.innerHTML;
    collectionList.appendChild(newList);
    listLoader.loadPlaylist(list_id, renderPlaylist);
  }

  function renderPlaylist(list) {
    var shelf = document.getElementById(`playlist-id-${list.id}`);
    var title = shelf.getElementsByTagName("title").item(0);
    title.innerHTML = loader.evalTemplate.call(list, title.innerHTML);

    var section = shelf.getElementsByTagName("section").item(0);

    insertItems(section, list);
  }

  function insertItems(section, list) {
    for(var i=0; i<list.items.length; i++) {
      var newItem = itemTemplate.cloneNode();
      newItem.innerHTML = loader.evalTemplate.call(list.items.item(i), itemTemplate.innerHTML);
      section.appendChild(newItem);
    }

  }

});
