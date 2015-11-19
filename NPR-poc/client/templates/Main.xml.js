/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A main template displays a full-screen image with a menu along the bottom. It’s commonly used for the home screen of a movie, with menu options for playing the movie and accessing chapters or extras.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <mainTemplate>
    <background>
      <img src="${this.BASEURL}resources/images/npr/npr-main.png" />
    </background>
    <menuBar>
      <section>
        <menuItem>
          <title>Browse Videos</title>
        </menuItem>
        <menuItem>
          <title>Views Playlists</title>
        </menuItem>
        <menuItem>
          <title>Search</title>
        </menuItem>
      </section>
    </menuBar>
  </mainTemplate>
</document>`
}