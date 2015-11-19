/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A menu bar template is designed for top-level navigation, as an entry page to your content. It includes a menu of items across the top. Focus on an item to display its related content below the menu.

Keep the menu bar clutter-free. Each additional item you display adds more choices and increases the complexity to your app.

Keep menu items on screen. When the menu bar is in focus, all of its items should be visible. In general, include seven items or less with short labels to avoid crowding content and causing items to scroll off screen.

For specific guidance on providing a great user experience in a menu bar, see Tab Bars in Interactive Elements.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <menuBarTemplate>
    <menuBar>
      <menuItem template="${this.BASEURL}templates/Parade.xml.js" presentation="menuBarItemPresenter">
        <title>Tab 1</title>
      </menuItem>
      <menuItem template="${this.BASEURL}templates/Catalog.xml.js" presentation="menuBarItemPresenter">
        <title>Tab 2</title>
      </menuItem>
    </menuBar>
  </menuBarTemplate>
</document>`
}