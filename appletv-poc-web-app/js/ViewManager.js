var ViewManager = {
  _views: {},

  isRegistered: function(viewName) {
    return (typeof ViewManager._views[viewName] == "function");
  },

  registerView: function(viewName, viewClass) {
    console.log("Registering view %s", viewName);
    if (!ViewManager.isRegistered(viewName)) {
      ViewManager._views[viewName] = viewClass;
    }
  },

  get: function(viewName) {
    return ViewManager._views[viewName];
  },

  applyView: function(viewName, docToApply) {
    if (ViewManager.isRegistered(viewName)) {
      ViewManager.get(viewName).call(this, docToApply);
    } else {
      ViewManager.loadAndApply(viewName, docToApply);
    }
  },

  loadAndApply: function(viewName, docToApply) {
    if (ViewManager.isRegistered(viewName)) {
      throw `Loading a view which already exists: ${viewName}`;
    }

    evaluateScripts([`${OPTIONS.baseURL}/js/views/${viewName}.js`], function(success) {
      if (success && ViewManager.isRegistered(viewName)) {
        ViewManager.applyView(viewName, docToApply);
      } else {
        throw `Couldn't apply view ${viewName}`;
      }
    });
  }

}
