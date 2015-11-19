/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A stack template shows stacked rows of items beneath a banner, such as movies, TV shows, or products. The user can navigate through the rows and products to focus on one.

This version of the stack template uses a banner element to display a large background image at the top of the page with a full description.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
    .showTextOnHighlight {
      tv-labels-state: show-on-highlight;
    }
    @media -tv-template and (-tv-uber) {
      .darkBackgroundColor {
        background-color: #212c4b;
      }
        .playlist-shelf {
      margin: 0 0 50px 0;
    }
    .playlist-title {
      color: rgba(255,255,255,.75);
      margin: 0 0 50px 0;
    }
    }




    </style>
  </head>
  <stackTemplate class="darkBackgroundColor" theme="dark">
    <banner>
      <background>
        <img src="${this.BASEURL}resources/images/npr/npr-header.png" width="1920" height="400" />
      </background>
    </banner>
    <collectionList>
      <shelf class="playlist-shelf">
        <header>
          <title class="playlist-title">Tiny Desk</title>
        </header>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-19.jpg" width="360" height="202" />
            <title class="scrollTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-20.jpg" width="360" height="202" />
            <title class="showAndScrollTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-21.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-22.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-23.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-24.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-25.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
        </section>
      </shelf>

      <shelf class="playlist-shelf">
        <header>
          <title class="playlist-title">Field Sessions</title>
        </header>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-1.jpg" width="360" height="202" />
            <title class="scrollTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-2.jpg" width="360" height="202" />
            <title class="showAndScrollTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-3.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-4.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-5.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-6.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-7.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
        </section>
      </shelf>

       <shelf class="playlist-shelf">
        <header>
          <title class="playlist-title">Live in Concert</title>
        </header>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-8.jpg" width="360" height="202" />
            <title class="scrollTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-9.jpg" width="360" height="202" />
            <title class="showAndScrollTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-10.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-11.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-12.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-13.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/field-sessions/img-14.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
        </section>
      </shelf>

    </collectionList>
  </stackTemplate>
</document>`
}
