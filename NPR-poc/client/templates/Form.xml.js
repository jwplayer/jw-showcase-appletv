/*
Copyright (C) 2015 Apple Inc. All Rights Reserved.
See LICENSE.txt for this sample’s licensing information

Abstract:
A form template displays a keyboard and one or more text fields where the user can enter information, such as a name and email address.

For specific guidance on providing a great user experience when asking for text input, see Text and Keyboards in Interactive Elements.
*/
var Template = function() { return `<?xml version="1.0" encoding="UTF-8" ?>
<document>
  <head>
    <style>
    .longDescriptionLayout {
      max-width: 1280;
    }
    </style>
  </head>
  <formTemplate>
    <banner>
      <title>Title</title>
      <description class="longDescriptionLayout">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</description>
    </banner>
    <textField>Placeholder text</textField>
    <footer>
      <button>
        <text>Button text</text>
      </button>
    </footer>
  </formTemplate>
</document>`
}