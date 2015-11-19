/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
An alert template displays a message on screen and asks the user to perform some action, such as confirm a purchase or destructive action. This variation of the alert template presents a shelf of items to the user.

Alerts can be displayed as a modal controller or by pushing it on the document stack.

For specific guidance on providing a great user experience when displaying an alert, see Alerts in Interactive Elements.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
      .showTextOnHighlight {
        tv-text-highlight-style: show-on-highlight;
      }
      .overlayTextLayout {
        tv-position: top;
      }
      .centeredText {
        text-align: center;
      }
    </style>
  </head>
  <descriptiveAlertTemplate>
    <title>Title</title>
    <shelf>
      <section>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_1.lcr" width="450" height="450" />
          <title class="showTextOnHighlight">Title 1</title>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_2.lcr" width="450" height="450" />
          <title class="showTextOnHighlight">Title 2</title>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_3.lcr" width="450" height="450" />
          <title class="showTextOnHighlight">Title 3</title>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_4.lcr" width="450" height="450" />
          <title class="showTextOnHighlight">Title 4</title>
        </lockup>
        <lockup>
        	<img src="${this.BASEURL}resources/images/iceland/iceland_19.jpg" width="752" height="450" />
          <title class="showTextOnHighlight">Title 5</title>
          <overlay>
            <title class="overlayTextLayout">Title</title>
            <text class="overlayTextLayout">Text 1</text>
            <text class="overlayTextLayout">Text 2</text>
            <text class="centeredText">Centered Text</text>
          </overlay>
        </lockup>
      </section>
    </shelf>
    <button>
      <text>Button 1</text>
    </button>
    <button>
      <text>Button 2</text>
    </button>
  </descriptiveAlertTemplate>
</document>`
}
