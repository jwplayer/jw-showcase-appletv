/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A compilation template displays elements contained by an item, such as songs in an album or tracks in a playlist. It’s most commonly used to display audio-related content.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
    .ordinalLayout {
      margin: 8 0 0 9;
    }
    .whiteButton {
      tv-tint-color: rgb(255, 255, 255);
    }
    </style>
  </head>
  <compilationTemplate theme="dark">
    <list>
      <relatedContent>
        <itemBanner>
          <heroImg src="${this.BASEURL}resources/images/italy/italy_20_square.jpg" />
          <row>
            <buttonLockup>
              <badge src="resource://button-add-alt" class="whiteButton" />
              <title>Title 1</title>
            </buttonLockup>
            <buttonLockup>
              <badge src="resource://button-rate" class="whiteButton" />
              <title>Title 2</title>
            </buttonLockup>
            <buttonLockup>
              <badge src="resource://button-more" class="whiteButton" />
              <title>Title 3</title>
            </buttonLockup>
          </row>
        </itemBanner>
      </relatedContent>
      <header>
        <title>Title</title>
        <subtitle>Subtitle</subtitle>
        <row>
          <text>Text 1</text>
          <text>Text 2</text>
        </row>
      </header>
      <section>
        <header>
          <title>Title</title>
        </header>
        <listItemLockup>
          <ordinal minLength="2" class="ordinalLayout">1</ordinal>
          <title>Title 1</title>
          <subtitle>Subtitle 1</subtitle>
          <decorationLabel>Right label 1</decorationLabel>
        </listItemLockup>
        <listItemLockup>
          <ordinal minLength="2" class="ordinalLayout">2</ordinal>
          <title>Title 2</title>
          <subtitle>Subtitle 2</subtitle>
          <decorationLabel>Right label 2</decorationLabel>
        </listItemLockup>
        <listItemLockup>
          <ordinal minLength="2" class="ordinalLayout">3</ordinal>
          <title>Title 3</title>
          <subtitle>Subtitle 3</subtitle>
          <decorationLabel>Right label 3</decorationLabel>
        </listItemLockup>
        <listItemLockup>
          <ordinal minLength="2" class="ordinalLayout">4</ordinal>
          <title>Title 4</title>
          <subtitle>Subtitle 4</subtitle>
          <decorationLabel>Right label 4</decorationLabel>
        </listItemLockup>
        <listItemLockup>
          <ordinal minLength="2" class="ordinalLayout">5</ordinal>
          <title>Title 5</title>
          <subtitle>Subtitle 5</subtitle>
          <decorationLabel>Right label 5</decorationLabel>
        </listItemLockup>
        <listItemLockup>
          <ordinal minLength="2" class="ordinalLayout">6</ordinal>
          <title>Title 6</title>
          <subtitle>Subtitle 6</subtitle>
          <decorationLabel>Right label 6</decorationLabel>
        </listItemLockup>
        <listItemLockup>
          <ordinal minLength="2" class="ordinalLayout">7</ordinal>
          <title>Title 7</title>
          <subtitle>Subtitle 7</subtitle>
          <decorationLabel>Right label 7</decorationLabel>
        </listItemLockup>
        <listItemLockup>
          <ordinal minLength="2" class="ordinalLayout">8</ordinal>
          <title>Title 8</title>
          <subtitle>Subtitle 8</subtitle>
          <decorationLabel>Right label 8</decorationLabel>
        </listItemLockup>
        <listItemLockup>
          <ordinal minLength="2" class="ordinalLayout">9</ordinal>
          <title>Title 9</title>
          <subtitle>Subtitle 9</subtitle>
          <decorationLabel>Right label 9</decorationLabel>
        </listItemLockup>
      </section>
    </list>
  </compilationTemplate>
</document>`
}