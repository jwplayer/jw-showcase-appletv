# TVML Catalog: Using TVML Templates

## Requirements
Build Requirements: Xcode 7.1, tvOS 9.0 SDK
Runtime Requirements: tvOS 9.0 or later

## Introduction
This sample demonstrates how to use the TVMLKit framework to display TVML content in a tvOS application, and provides a catalog of the primary TVML templates. For a complete list of templates and available elements, see the Apple TV Markup Language Reference.

## Structure
The project is split into two parts:
- TVMLCatalog: this directory contains the Xcode project and related files. The AppDelegate.swift file handles the setup of the TVMLKit framework and launching the JavaScript context to manage the app.
- client: this directory contains the JavaScript and XML files needed to render the application. The contents of this directory must be hosted on a server accessible from the device.

After the application has been setup and is running you will primarily be working in the client directory. This is where you define the templates you want to present to the user and control the presentation and lifecyle of the application with JavaScript. As you define new templates to present, experiment with the available styles to get a feel for the flexibility provided in TVMLKit and how customizable they are.

To help debug and experiment, you can use the Safari WebInspector to attach to the JavaScript context. WebInspector provides you with a full JavaScript debugging environment. You will need to turn on the Develop menu from Safari > Preferences > Advanced. Select your device from the Develop drop down menu to see a list of running JavaScript contexts.

When you are ready to add more advanced features to your application, open the client files and read through the Apple TV Markup Language Reference. You can add new JavaScript APIs, create new XML templates or elements, and pass additional information into the JavaScript context at launch. You can also expand the capabilities of your application by creating a TopShelfExtenstion for presenting items in the top shelf when your application is moved to the first row of Apple TV main menu.

## Installation instructions:
To start a local server run the following command in a terminal within the 'client' folder to create a simple webserver.

```
python -m SimpleHTTPServer 9001
```

- Open the TVMLCatalog.xcodeproj project in Xcode
- If the client code is hosted on a remote server, or you are running this app on the Apple TV change the following property in AppDelegate.swift:
	- Change the TVBaseURL value to the URL hosting the contents of the client directory
    - Note that the Info.plist currently disables App Transport Security via NSAllowsArbitraryLoads. This is only to simplify the process of reviewing the sample. Your own apps should rely on properly secured servers that do not require App Transport Security to be disabled.
- Build and run the application
- When running this application on a device you will need to add a signing profile in the projects Build Settings.


Copyright (C) 2015 Apple Inc. All rights reserved.