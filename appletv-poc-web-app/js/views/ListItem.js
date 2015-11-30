ViewManager.registerView("ListItem", function(doc) {
  var document = doc.ownerDocument;

  var media_id = doc.getAttribute("data-media-id");
  var href = doc.getAttribute("data-href");
  var related = doc.getAttribute("data-related-playlist");
  var parent_view = doc.getAttribute("data-parent-view");

  var item = MEDIA_ITEMS[media_id];

  doc.addEventListener("select", docSelected);

  function docSelected(evt) {
    var loader = new TemplateLoader(doc.ownerDocument, {
      item: item,
      related: PLAYLISTS[related]
    });

    loader.load(href, detailTemplateLoaded);
  }

  function detailTemplateLoaded(detailDocument) {
    if (parent_view == "ItemDetail") {
      navigationDocument.replaceDocument(detailDocument, document);
    } else {
      navigationDocument.pushDocument(detailDocument);
    }
  }
});