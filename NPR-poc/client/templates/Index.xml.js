/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A list template shows a list of items on the right, such as movies or TV shows. Focus on one to see its related content on the left, such as its artwork or description.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
      .descriptionLayout {
        tv-text-max-lines: 8;
      }
    </style>
  </head>
  <listTemplate>
    <list>
      <header>
        <title>NPR Music POC</title>
      </header>
      <section>

        <listItemLockup template="${this.BASEURL}templates/Stack.xml.js" accessibilityText="Accessible stack template">
          <title>Home Screen</title>
        </listItemLockup>

        <listItemLockup template="${this.BASEURL}templates/Product.xml.js" accessibilityText="Accessible product template">
          <title>Video Detail</title>
        </listItemLockup>


      </section>
    </list>
  </listTemplate>
</document>`
}
