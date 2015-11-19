/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A stack template shows stacked rows of items beneath a banner, such as movies, TV shows, or products. The user can navigate through the rows and products to focus on one.

This version of the stack template shows an example of a separator element and a button, which can be used to alter the content being presented to the user.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
    .showTextOnHighlight {
      tv-text-highlight-style: show-on-highlight;
    }
    .roundedImageCorners {
      itml-img-treatment: corner-small;
    }
    .customBadgeLayout {
      tv-tint-color: rgb(0, 0, 0);
      margin: 0 0 5 0;
    }
    </style>
  </head>
  <stackTemplate>
    <collectionList>
      <carousel>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/carousel/carousel_3.lcr" width="1740" height="500" />
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/carousel/carousel_1.lcr" width="1740" height="500" />
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/carousel/carousel_2.lcr" width="1740" height="500" />
          </lockup>
        </section>
      </carousel>
      <separator>
        <button>
          <text>Options <badge class="customBadgeLayout" src="resource://button-dropdown" width="31" height="14" /></text>
        </button>
      </separator>
      <shelf>
        <header>
          <title>Shelf title</title>
        </header>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_1.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_2.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_3.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_4.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_5.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_6.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_7.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_1.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_2.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_3.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_4.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 11</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_5.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 12</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_6.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 13</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_7.lcr" width="308" height="308" />
            <title class="showTextOnHighlight">Title 14</title>
          </lockup>
        </section>
      </shelf>
      <shelf>
        <section>
          <lockup>
            <img class="roundedImageCorners" src="${this.BASEURL}resources/images/italy/italy_1.jpg" width="548" height="269" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img class="roundedImageCorners" src="${this.BASEURL}resources/images/italy/italy_2.jpg" width="548" height="269" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img class="roundedImageCorners" src="${this.BASEURL}resources/images/italy/italy_3.jpg" width="548" height="269" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img class="roundedImageCorners" src="${this.BASEURL}resources/images/italy/italy_4.jpg" width="548" height="269" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img class="roundedImageCorners" src="${this.BASEURL}resources/images/italy/italy_5.jpg" width="548" height="269" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
        </section>
      </shelf>
      <shelf>
        <header>
          <title>Shelf title</title>
        </header>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/italy/italy_11_poster.jpg" width="250" height="375" />
            <title class="showTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/italy/italy_12_poster.jpg" width="250" height="375" />
            <title class="showTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/italy/italy_13_poster.jpg" width="250" height="375" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/italy/italy_14_poster.jpg" width="250" height="375" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/italy/italy_15_poster.jpg" width="250" height="375" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/italy/italy_16_poster.jpg" width="250" height="375" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/italy/italy_17_poster.jpg" width="250" height="375" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/italy/italy_18_poster.jpg" width="250" height="375" />
            <title class="showTextOnHighlight">Title 8</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/italy/italy_19_poster.jpg" width="250" height="375" />
            <title class="showTextOnHighlight">Title 9</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/italy/italy_20_poster.jpg" width="250" height="375" />
            <title class="showTextOnHighlight">Title 10</title>
          </lockup>
        </section>
      </shelf>
    </collectionList>
  </stackTemplate>
</document>`
}
