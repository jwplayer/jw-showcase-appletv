/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A product bundle template promotes a series of related TV shows, movies, or other products. It typically includes an image, background, and descriptive information. A shelf below the content displays the products contained by the bundle, such as the episodes of a TV season. The user can scroll down to bring up more information, such as cast and crew listings, ratings, or reviews.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
    .showTextOnHighlight {
      tv-text-highlight-style: show-on-highlight;
    }
    .whiteButton {
      tv-tint-color: rgb(255, 255, 255);
    }
    .shelfLayout {
      padding: 40 90;
    }
    </style>
  </head>
  <productBundleTemplate>
    <background>
      <img src="${this.BASEURL}resources/images/wide_background.jpg" />
      <audio>
        <asset src="${this.BASEURL}resources/audio/Building_Together.mp3" />
      </audio>
    </background>
    <banner>
      <stack>
        <title>Title</title>
        <subtitle>Subtitle</subtitle>
        <text>Text</text>
        <description allowsZooming="true" template="${this.BASEURL}templates/AlertWithDescription.xml.js" presentation="modalDialogPresenter">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</description>
        <row>
          <buttonLockup>
            <badge src="resource://button-rate" class="whiteButton" />
            <title>Title 1</title>
          </buttonLockup>
          <buttonLockup>
            <badge src="resource://button-add" class="whiteButton" />
            <title>Title 2</title>
          </buttonLockup>
          <buttonLockup>
            <text>Text</text>
            <title>Title 3</title>
          </buttonLockup>
        </row>
      </stack>
    </banner>
    <shelf>
      <header>
        <title>Shelf Header</title>
      </header>
      <section>
        <lockup>
          <img src="${this.BASEURL}resources/images/italy/italy_10.jpg" width="252" height="160" />
          <title class="showTextOnHighlight">Title 1</title>
          <overlay>
            <progressBar value="0.1" />
          </overlay>
          <relatedContent>
            <infoTable>
              <header>
                <title>Info Header 1</title>
              </header>
              <info>
                <header>
                  <title>Title 1</title>
                </header>
                <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/italy/italy_2.jpg" width="252" height="160" />
          <title class="showTextOnHighlight">Title 2</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>Info Header 2</title>
              </header>
              <info>
                <header>
                  <title>Title 2</title>
                </header>
                <text>A line of text</text>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/italy/italy_3.jpg" width="252" height="160" />
          <title class="showTextOnHighlight">Title 3</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>Info Header 3</title>
              </header>
              <info>
                <header>
                  <title>Title 3</title>
                </header>
                <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/italy/italy_4.jpg" width="252" height="160" />
          <title class="showTextOnHighlight">Title 4</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>Info Header 4</title>
              </header>
              <info>
                <header>
                  <title>Title 4</title>
                </header>
                <row>
                  <text>A line of text</text>
                </row>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/italy/italy_1.jpg" width="252" height="160" />
          <title class="showTextOnHighlight">Title 5</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>Info Header 5</title>
              </header>
              <info>
                <header>
                  <title>Title 5</title>
                </header>
                <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/italy/italy_6.jpg" width="252" height="160" />
          <title class="showTextOnHighlight">Title 6</title>
          <relatedContent>
            <infoTable>
              <header>
                <title>Info Header 6</title>
              </header>
              <info>
                <header></header>
                <row>
                  <text>A line of text</text>
                </row>
              </info>
              <info>
                <header></header>
                <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
              </info>
            </infoTable>
          </relatedContent>
        </lockup>
      </section>
    </shelf>
    <shelf>
      <header>
        <title>Shelf Header</title>
      </header>
      <section>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_1.lcr" width="250" height="250" />
          <title class="showTextOnHighlight">Title 1</title>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_2.lcr" width="250" height="250" />
          <title class="showTextOnHighlight">Title 2</title>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_3.lcr" width="250" height="250" />
          <title class="showTextOnHighlight">Title 3</title>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_4.lcr" width="250" height="250" />
          <title class="showTextOnHighlight">Title 4</title>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_5.lcr" width="250" height="250" />
          <title class="showTextOnHighlight">Title 5</title>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_6.lcr" width="250" height="250" />
          <title class="showTextOnHighlight">Title 6</title>
        </lockup>
        <lockup>
          <img src="${this.BASEURL}resources/images/music/music_7.lcr" width="250" height="250" />
          <title class="showTextOnHighlight">Title 7</title>
        </lockup>
      </section>
    </shelf>
    <shelf class="shelfLayout" >
      <header>
        <title>Shelf Header</title>
      </header>
      <section>
        <ratingCard>
          <title>Title</title>
          <ratingBadge value="0.7"></ratingBadge>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
        </ratingCard>
        <reviewCard>
          <title>Title 1</title>
          <subtitle>Subtitle 1</subtitle>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
        </reviewCard>
        <reviewCard>
          <title>Title 2</title>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
        </reviewCard>
        <reviewCard>
          <subtitle>Subtitle 3</subtitle>
          <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
        </reviewCard>
      </section>
    </shelf>
  </productBundleTemplate>
</document>`
}
