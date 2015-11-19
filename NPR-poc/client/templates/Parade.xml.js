/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A parade template shows rotating previews for a focused grouping of content, such as movies or albums in a particular genre. A list of groupings is shown on the right. Focus on one to display non-interactive rotating previews of its elements on the left.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <paradeTemplate>
    <list>
      <header>
        <title>Parade Preview</title>
      </header>
      <section>
        <listItemLockup>
          <title>Title 1</title>
          <relatedContent>
            <imgDeck>
              <img src="${this.BASEURL}resources/images/italy/italy_11_poster_scaled.jpg" />
              <img src="${this.BASEURL}resources/images/italy/italy_12_poster_scaled.jpg" />
              <img src="${this.BASEURL}resources/images/italy/italy_13_poster_scaled.jpg" />
              <img src="${this.BASEURL}resources/images/italy/italy_14_poster_scaled.jpg" />
              <img src="${this.BASEURL}resources/images/italy/italy_15_poster_scaled.jpg" />
              <img src="${this.BASEURL}resources/images/italy/italy_16_poster_scaled.jpg" />
            </imgDeck>
          </relatedContent>
        </listItemLockup>
        <listItemLockup>
          <title>Title 2</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 3</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 4</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 5</title>
        </listItemLockup>
        <listItemLockup>
          <title>Title 6</title>
        </listItemLockup>
      </section>
      <relatedContent>
        <imgDeck>
          <img src="${this.BASEURL}resources/images/italy/italy_5_poster_scaled.jpg" />
          <img src="${this.BASEURL}resources/images/iceland/iceland_14_poster_scaled.jpg" />
          <img src="${this.BASEURL}resources/images/italy/italy_18_poster_scaled.jpg" />
          <img src="${this.BASEURL}resources/images/iceland/iceland_11_poster_scaled.jpg" />
          <img src="${this.BASEURL}resources/images/italy/italy_20_poster_scaled.jpg" />
          <img src="${this.BASEURL}resources/images/iceland/iceland_7_poster_scaled.jpg" />
        </imgDeck>
      </relatedContent>
    </list>
  </paradeTemplate>
</document>`
}
