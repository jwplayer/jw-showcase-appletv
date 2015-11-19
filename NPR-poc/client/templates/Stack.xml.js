/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A stack template shows stacked rows of items beneath a banner, such as movies, TV shows, or products. The user can navigate through the rows and products to focus on one.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
    .imageWithGradient {
      tv-tint-color: linear-gradient(top, 0.33, transparent, 0.66, rgba(0,64,0,0.7), rgba(0,64,0,1.0));
    }
    .showTextOnHighlight {
      tv-text-highlight-style: show-on-highlight;
    }
    .scrollTextOnHighlight {
      tv-text-highlight-style: marquee-on-highlight;
    }
    .showAndScrollTextOnHighlight {
      tv-text-highlight-style: marquee-and-show-on-highlight;
    }

      .darkBackgroundColor {
        background-color: #212c4b;
      }
          .playlist-title {
      color: rgba(255,255,255,.75);
      margin: 0 0 50px 0;
    }

    </style>
  </head>
  <stackTemplate theme="dark" class="darkBackgroundColor">
    <collectionList>

      <carousel>
        <section>
  
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-4.jpg" width="800" height="450" />
            <overlay>
              <title>Music Documentaries</title>
              <subtitle>Subtitle 2</subtitle>
            </overlay>
          </lockup>
            <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-7.jpg" width="800" height="450" />
            <overlay>
              <title>Field Sessions</title>
              <subtitle>Subtitle 1</subtitle>
            </overlay>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-2.jpg" width="800" height="450" />
            <overlay>
              <title>Live in Concert</title>
              <subtitle>Subtitle 3</subtitle>
            </overlay>
          </lockup>
        </section>
      </carousel>

      <shelf>
        <header>
          <title class="playlist-title">Tiny Desk</title>
        </header>
        <section>
          <lockup>${this.BASEURL}resources/images/videos/img-19.jpg
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
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-25.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
        </section>
      </shelf>

      <shelf>
        <header>
          <title class="playlist-title">Field Sessions</title>
        </header>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-1.jpg" width="360" height="202" />
            <title class="scrollTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-2.jpg" width="360" height="202" />
            <title class="showAndScrollTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-3.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-4.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-5.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-6.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-7.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
        </section>
      </shelf>

       <shelf>
        <header>
          <title class="playlist-title">Live in Concert</title>
        </header>
        <section>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-8.jpg" width="360" height="202" />
            <title class="scrollTextOnHighlight">Title 1</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-9.jpg" width="360" height="202" />
            <title class="showAndScrollTextOnHighlight">Title 2</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-10.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 3</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-11.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 4</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-12.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 5</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-13.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 6</title>
          </lockup>
          <lockup>
            <img src="${this.BASEURL}resources/images/videos/img-14.jpg" width="360" height="202" />
            <title class="showTextOnHighlight">Title 7</title>
          </lockup>
        </section>
      </shelf>

    
    </collectionList>
  </stackTemplate>
</document>`
}
