/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A search template lets users search your content and view found results. It includes a search field, a keyboard, and a list of results.
*/
var Template = function() {
  return `<?xml version="1.0" encoding="UTF-8" ?>
  <document>
    <head>
      <style>
        .suggestionListLayout {
          margin: -150 0;
        }
      </style>
    </head>
    <searchTemplate>
      <searchField>Search</searchField>
      <collectionList>
                <grid>
          <header>
            <title>Results</title>
          </header>

          <section>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-1.jpg" width="360" height="202" />
              <title>The Puffin</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-2.jpg" width="360" height="202" />
              <title>Lola and Max</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-3.jpg" width="360" height="202" />
              <title>Road to Firenze</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-4.jpg" width="360" height="202" />
              <title>Three Developers and a Baby</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-5.jpg" width="360" height="202" />
              <title>Santa Cruz Surf</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-6.jpg" width="360" height="202" />
              <title>Cinque Terre</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-7.jpg" width="360" height="202" />
              <title>Creatures of the Rainforest</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-8.jpg" width="360" height="202" />
              <title>The Puffin</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-9.jpg" width="360" height="202" />
              <title>Lola and Max</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-10.jpg" width="360" height="202" />
              <title>Road to Firenze</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-11.jpg" width="360" height="202" />
              <title>Three Developers and a Baby</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-12.jpg" width="360" height="202" />
              <title>Santa Cruz Surf</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-13.jpg" width="360" height="202" />
              <title>Cinque Terre</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-14.jpg" width="360" height="202" />
              <title>Creatures of the Rainforest</title>
            </lockup>
          </section>
        </grid>
      </collectionList>
    </searchTemplate>
  </document>`
}
