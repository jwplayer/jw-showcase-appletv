/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A loading template temporarily displays a progress indicator and some descriptive text while your content is retrieved from the server. It lets the user know something is happening, so your app doesn’t appear frozen.

Keep loading text concise and informative. If loading is quick, users may not have time to read longer text before it disappears, making them feel like they’ve missed out on something important.

Alerts can be displayed as a modal controller or by pushing it on the document stack.

For general guidance on providing a great user experience when loading content, see Text and Keyboards in Interactive Elements.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <loadingTemplate>
    <activityIndicator>
      <text>Loading...</text>
    </activityIndicator>
  </loadingTemplate>
</document>`
}