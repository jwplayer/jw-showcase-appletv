/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A stack template shows stacked rows of items beneath a banner, such as movies, TV shows, or products. The user can navigate through the rows and products to focus on one.

This version of the stack template uses the light theme to automatically adjust text color to display properly on a light background. It also uses an alternate version of the banner element to display a small image at the top of the page with text and actionable buttons.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
      .lightBackgroundColor {
        background-color: #e49c36;
      }
    </style>
  </head>
  <stackTemplate theme="light" class="lightBackgroundColor" >
    <identityBanner>
      <heroImg src="${this.BASEURL}resources/images/iceland/iceland_11.jpg" width="200" height="200" />
      <title>Lorem Ipsum Dolor</title>
      <subtitle>Lorem Ipsum</subtitle>
      <row>
        <buttonLockup>
          <badge src="resource://button-add" />
          <title>Title 1</title>
        </buttonLockup>
        <buttonLockup>
          <badge src="resource://button-rate" />
          <title>Title 2</title>
        </buttonLockup>
        <buttonLockup>
          <badge src="resource://button-more" />
          <title>Title 3</title>
        </buttonLockup>
      </row>
    </identityBanner>
    <collectionList>
      <shelf>
        <header>
          <title>Shelf title</title>
        </header>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_1.lcr" width="390" height="390" />
            <title>Title 1</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_2.lcr" width="390" height="390" />
            <title>Title 2</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_3.lcr" width="390" height="390" />
            <title>Title 3</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_4.lcr" width="390" height="390" />
            <title>Title 4</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_5.lcr" width="390" height="390" />
            <title>Title 5</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_6.lcr" width="390" height="390" />
            <title>Title 6</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/music/music_7.lcr" width="390" height="390" />
            <title>Title 7</title>
          </lockup>
        </section>
      </shelf>
      <shelf>
        <header>
          <title>Shelf title</title>
        </header>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/iceland/iceland_10_square.jpg" width="390" height="390" />
            <title>Title 1</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/iceland/iceland_12_square.jpg" width="390" height="390" />
            <title>Title 2</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/iceland/iceland_13_square.jpg" width="390" height="390" />
            <title>Title 3</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/iceland/iceland_14_square.jpg" width="390" height="390" />
            <title>Title 4</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/iceland/iceland_15_square.jpg" width="390" height="390" />
            <title>Title 5</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/iceland/iceland_16_square.jpg" width="390" height="390" />
            <title>Title 6</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/iceland/iceland_17_square.jpg" width="390" height="390" />
            <title>Title 7</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/iceland/iceland_18_square.jpg" width="390" height="390" />
            <title>Title 8</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/iceland/iceland_19_square.jpg" width="390" height="390" />
            <title>Title 9</title>
          </lockup>
        </section>
      </shelf>
    </collectionList>
  </stackTemplate>
</document>`
}
