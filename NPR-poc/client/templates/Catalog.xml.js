/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A catalog template allows you to display groupings of related items, such as genres of movies or TV shows. View the list of groupings on the left and focus on one to see its items on the right.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
  <document>
    <head>
      <style>
      .whiteText {
        color: rgb(255, 255, 255);
      }
            .darkBackgroundColor {
        background-color: #212c4b;
      }
      </style>
    </head>
    <stackTemplate theme="dark" class="darkBackgroundColor">
      <banner>
        <title>Browse Videos</title>
      </banner>
      <collectionList>
     <grid>
      <section>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-1.jpg" width="480" height="270" />
              <title>The Puffin</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-2.jpg" width="480" height="270" />
              <title>Lola and Max</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-3.jpg" width="480" height="270" />
              <title>Road to Firenze</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-4.jpg" width="480" height="270" />
              <title>Three Developers and a Baby</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-5.jpg" width="480" height="270" />
              <title>Santa Cruz Surf</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-6.jpg" width="480" height="270" />
              <title>Cinque Terre</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-7.jpg" width="480" height="270" />
              <title>Creatures of the Rainforest</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-8.jpg" width="480" height="270" />
              <title>The Puffin</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-9.jpg" width="480" height="270" />
              <title>Lola and Max</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-10.jpg" width="480" height="270" />
              <title>Road to Firenze</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-11.jpg" width="480" height="270" />
              <title>Three Developers and a Baby</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-12.jpg" width="480" height="270" />
              <title>Santa Cruz Surf</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-13.jpg" width="480" height="270" />
              <title>Cinque Terre</title>
            </lockup>
            <lockup>
              <img src="${this.BASEURL}resources/images/videos/img-14.jpg" width="480" height="270" />
              <title>Creatures of the Rainforest</title>
            </lockup>
          </section>
        </grid>
</collectionList>
    </stackTemplate>
  </document>`
}
