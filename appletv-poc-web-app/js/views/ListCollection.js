ViewManager.registerView("ListCollection", function(doc) {
  var document = doc.ownerDocument;
  var loader = new TemplateLoader(document);
  var listLoader = new PlaylistLoader();
  var collectionDoc = doc;

  var playlists = collectionDoc.firstChild.getAttribute("data-playlists").split(",");
  var featured = collectionDoc.firstChild.getAttribute("data-featured");
  console.log("Featured; %s", featured);

  var collectionList = collectionDoc.getElementsByTagName("collectionList").item(0);
  //var featured = OPTIONS.featured;

  var templates = {
    "list": undefined,
    "item": undefined,
    "featured": undefined
  };

  loader.loadFragment("templates/List.tvml", templateLoaded.bind({template:"list"}), false);
  loader.loadFragment("templates/ListItem.tvml", templateLoaded.bind({template:"item"}), false);
  loader.loadFragment("templates/ListItemFeatured.tvml", templateLoaded.bind({template:"featured"}), false);

  function templateLoaded(templateDoc) {
    templates[this.template] = templateDoc;
    templatesLoaded();
  }

  function templatesLoaded() {
    for (var t in templates) {
      if (!templates[t]) return;
    }
    playlists.forEach(insertPlaylist);
  }

  function insertPlaylist(list_id) {
    var newList = templates.list.cloneNode();
    newList.setAttribute("id", `playlist-id-${list_id}`);
    newList.setAttribute("data-list-id", list_id);
    newList.innerHTML = templates.list.innerHTML;

    if (list_id != featured) {
      collectionList.appendChild(newList);
    }

    listLoader.loadPlaylist(list_id, renderPlaylist);
  }

  function renderPlaylist(list) {
    var section, template;

    if (list.id == featured) {
      section = collectionList.getElementsByTagName("carousel").item(0).getElementsByTagName("section").item(0);
      template = templates.featured;
    } else {
      var shelf = document.getElementById(`playlist-id-${list.id}`);
      var title = shelf.getElementsByTagName("title").item(0);
      title.innerHTML = loader.evalTemplate.call(list, title.innerHTML);

      section = shelf.getElementsByTagName("section").item(0);
      template = templates.item;
    }

    insertItems(section, template, list);

  }

  function insertItems(section, template, list) {
    for(var i=0; i<list.items.length; i++) {
      var newItem = template.cloneNode();
      newItem.innerHTML = loader.evalTemplate.call(list.items.item(i), template.innerHTML);
      section.appendChild(newItem);
    }

  }

});
