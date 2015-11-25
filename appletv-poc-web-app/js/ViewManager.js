var ViewManager = {
  _views: {},
  _loading: {},

  isRegistered: function(viewName) {
    return (typeof ViewManager._views[viewName] == "function");
  },

  registerView: function(viewName, viewClass) {
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
    var loading = ViewManager._loading;

    if (ViewManager.isRegistered(viewName)) {
      throw `Loading a view which already exists: ${viewName}`;
    }

    if (loading[viewName]) {
      loading[viewName].push(docToApply);
    } else {
      loading[viewName] = [docToApply];
      evaluateScripts([`${OPTIONS.baseURL}/js/views/${viewName}.js`], function(success) {
        if (success && ViewManager.isRegistered(viewName)) {
          loading[viewName].forEach(function(doc) {
            ViewManager.applyView(viewName, doc);
          });
        } else {
          throw `Couldn't apply view ${viewName}`;
        }
        delete loading[viewName];
      });
    }
  }

}
