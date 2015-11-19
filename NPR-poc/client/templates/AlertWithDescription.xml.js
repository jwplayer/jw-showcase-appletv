/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
An alert template displays a message on screen and asks the user to perform some action, such as confirm a purchase or destructive action. This variation of the alert template uses a description to provide added detail for the user.

Alerts can be displayed as a modal controller or by pushing it on the document stack.

For specific guidance on providing a great user experience when displaying an alert, see Alerts in Interactive Elements.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <alertTemplate>
    <title>Title</title>
    <description>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</description>
    <button>
      <text>Button 1</text>
    </button>
    <button>
      <text>Button 2</text>
    </button>
  </alertTemplate>
</document>`
}