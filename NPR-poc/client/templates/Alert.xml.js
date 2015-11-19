/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
An alert template displays a message on screen and asks the user to perform some action, such as confirm a purchase or destructive action. 

Alerts can be displayed as a modal controller or by pushing it on the document stack.

For specific guidance on providing a great user experience when displaying an alert, see Alerts in Interactive Elements in the Human Interface Guide.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <alertTemplate>
    <title>Confirmation</title>
    <description>Are you sure?</description>
    <button>
      <text>Yes</text>
    </button>
    <button>
      <text>No</text>
    </button>
  </alertTemplate>
</document>`
}