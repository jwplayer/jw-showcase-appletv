ViewManager.registerView("ListCollection", function(doc) {
  var document = doc.ownerDocument;
  var loader = new TemplateLoader(document);
  var listLoader = new PlaylistLoader();
  var collectionDoc = doc;

  var playlists = collectionDoc.firstChild.getAttribute("data-playlists").split(",");
  var featured = collectionDoc.firstChild.getAttribute("data-featured");
  if (featured === "undefined") featured = undefined;

  var collectionList = collectionDoc.getElementsByTagName("collectionList").item(0);

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

    // Display the featured playlist
    if (featured) insertPlaylist(featured);

    // Insert the rest of the playlists
    playlists.forEach(insertPlaylist);
  }

  function duplicateFragment(templateDoc, context) {
    var newElement = templateDoc.cloneNode();
    var newHTML = templateDoc.innerHTML;
    if (context) newHTML = loader.evalTemplate.call(context, newHTML);
    newElement.innerHTML = newHTML;
    return newElement.firstChild;
  }

  function insertPlaylist(list_id) {
    var placeholder;

    if (list_id != featured) {
      placeholder = document.createElement("div");
       // Create a placecholder in the CollectionList so the lists are inserted in order
      collectionList.appendChild(placeholder);
    }

    // Bind the placeholder to the callback so it can be replaced with the templated markup
    listLoader.loadPlaylist(list_id, renderPlaylist.bind(placeholder));
  }

  function renderPlaylist(list) {
    var section,
      template,
      placeholder = this;

    if (list.id == featured) {
      section = document.getElementById("featured-playlist");
      template = templates.featured;

    } else {
      // Create a new List fragment from the template
      var listShelf = duplicateFragment(templates.list, list);

      // Replace the placeholder div with the templated list
      collectionList.insertBefore(listShelf, placeholder);

      section = listShelf.getElementsByTagName("section").item(0);
      template = templates.item;
    }

    insertItems(section, template, list);

  }

  function insertItems(section, template, list) {
    for(var i=0; i<list.items.length; i++) {
      var newItem = duplicateFragment(template, list.items.item(i));
      loader.applyView(newItem);
      section.appendChild(newItem);
    }

  }

});
