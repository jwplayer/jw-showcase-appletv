/**
* Copyright 2015 Longtail Ad Solutions Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
* express or implied. See the License for the specific language
* governing permissions and limitations under the License.
**/

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
