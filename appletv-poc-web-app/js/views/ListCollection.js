ViewManager.registerView("ListCollection", function(doc) {
  var loader = new TemplateLoader(doc.ownerDocument);
  var collectionDoc = doc;

  loader.loadFragment("templates/List.tvml", listFragmentLoaded);
  loader.loadFragment("templates/List.tvml", listFragmentLoaded);
  loader.loadFragment("templates/List.tvml", listFragmentLoaded);

  function listFragmentLoaded(listFragment) {
    var collectionList = collectionDoc.getElementsByTagName("collectionList").item(0);
    collectionList.appendChild(listFragment);
  }

});
