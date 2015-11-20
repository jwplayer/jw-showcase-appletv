/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A product template promotes movies, TV shows, or other products. It typically includes a product image, background, and descriptive information. A shelf below the product content displays related products and the user can scroll down to bring up more information, like cast and crew listings, ratings, or reviews.

Consider image and text colors carefully when customizing the background. By default, the background displays a blurred copy of your product image, producing a nice, complementary visual effect. If you decide to customize the background, make sure it doesn’t clash with your other content.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
    .showTextOnHighlight {
      tv-text-highlight-style: show-on-highlight;
    }
    .whiteBadge {
      tv-tint-color: rgb(255, 255, 255);
    }
    .shelfLayout {
      padding: 20 90 50;
    }
    .darkBackgroundColor {
      background-color: #212c4b;
    }
    .playBtn {
      padding: 5px 20px 5px 20px;
      margin: -20px 0 0 0;
    }
    .playlist-title {
      color: rgba(255,255,255,.75);
      margin: 0 0 50px 0;
    }

    </style>
  </head>
  <productTemplate theme="dark" class="darkBackgroundColor">

    <banner>
    <heroImg src="${this.BASEURL}resources/images/videos/img-23.jpg" width="480" />
     <infoList>
     <info>
     </info>
     </infoList>
      <stack>
        <title>Banks</title>

        <description allowsZooming="true" template="${this.BASEURL}templates/AlertWithDescription.xml.js" presentation="modalDialogPresenter"> Tiny Desk Concerts often require creative and logistical transformations, from electric bands going acoustic to big bands squashing into a tiny space to many players gathering around a single microphone.</description>
        <row>
          <button class="playBtn">
            <text>Play Video</text>
          </button>

        </row>
      </stack>
    </banner>
    <shelf>
        <header>
          <title class="playlist-title">Tiny Desk</title>
        </header>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-19.jpg" width="360" height="202" />
            <title class="scrollTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-20.jpg" width="360" height="202" />
            <title class="showAndScrollTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-21.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-22.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-23.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-24.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>

        </section>
      </shelf>
  
  </productTemplate>
</document>`
}
