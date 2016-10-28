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

ViewManager.registerView("Search", function(doc) {
  if (!CONFIG.searchPlaylistId || !typeof(CONFIG.searchPlaylistId) === "string"
    || CONFIG.searchPlaylistId.length < 1) {
    // Search hasn't been setup.
    console.error("Search hasn't been set-up, please configure a searchFeed in your config.");
    return;
  }

  var _templateLoader = new TemplateLoader(doc),
    _searchField = doc.getElementsByTagName("searchField").item(0),
    _keyboard = _searchField.getFeature("Keyboard"),
    _collectionList = doc.getElementsByTagName("collectionList").item(0),
    _resultTemplate;

  const SEARCH_RESULTS_TEMPLATE = `<shelf>
    <header>
      <title>Search Results</title>
    </header>
    <section/>
  </shelf>`;

  const NO_SEARCH_RESULTS_TEMPLATE = `<header>
    <title>No search results</title>
  </header>
  `;

  _templateLoader.loadFragment("templates/SearchResult.tvml", function(templateDoc) {
    _resultTemplate = templateDoc;
  }, false);

  _keyboard.onTextChange = function() {
    // Don't _search until the templates have been loaded.
    if (_keyboard.text.length > 3 && _resultTemplate) {
      _search(_keyboard.text);
    } else {
      // Display an empty shelf.
      while (_collectionList.firstChild) {
        _collectionList.removeChild(_collectionList.firstChild);
      }
    }
  };

  function _search(query) {
    PlaylistManager.getSearchFeed(CONFIG.searchPlaylistId, query)
      .then(function(results) {
        if (!results.playlist) {
          // No search results
          _renderNoSearchResults();
        } else {
          _renderSearchResults(results.playlist);
        }
    });
  }

  function _renderSearchResults(results) {
    if (_collectionList.getElementsByTagName("section").length === 0) {
      _collectionList.innerHTML = SEARCH_RESULTS_TEMPLATE;
    }
    var resultsSection = _collectionList.getElementsByTagName("section").item(0);
    // We're just simply clearing out the resultsSection for every updated search feed.
    while (resultsSection.firstChild) {
      resultsSection.removeChild(resultsSection.firstChild);
    }
    results.forEach(function(result) {
      var resultDoc = _templateLoader.duplicateFragment(_resultTemplate, result);
      _templateLoader.applyView(resultDoc);
      resultsSection.appendChild(resultDoc);
    });
  }

  function _renderNoSearchResults() {
    _collectionList.innerHTML = NO_SEARCH_RESULTS_TEMPLATE;
  }

});
