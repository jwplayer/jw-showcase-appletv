# JW Player for Apple TV

This app enables you to easily put your JW Player-hosted video content on the new Apple TV® with no coding and minimal configuration. It works with any JW Player edition, from Free to Enterprise (note that usage will count against your monthly JW streaming limits).

You can use the app with other content delivery platforms (or your own web server), but you will need to modify the source code.

NOTE: The app is only supported on 4th Generation (2015) Apple TV devices.

## Supported features

- Populates your app's media content using RSS feeds. If you are using JW Platform, this happens auto-magically based on playlists that you specify. Using RSS feeds from other sources will require you to hack the source code.
- Video titles, descriptions and hero images populated from RSS feed metadata.
- Playback of HLS video content from JW Platform playlists. You can add external URLs (for example, from your own server or CDN) to your playlists in the Content tab of your JW Player account dashboard, but they must be HLS.
- Auto Advancing of playlists, when a video in a playlist has completed playback, JW Player can automatically play the next item in the playlist.
- Customize the user interface with your own branding. The default app is configured for JW Player branding and content but you can easily change this to use your own assets by modifying the config.json file. Advanced customization is possible, but you will need to modify the source code.
- Basic playback analytics reporting to your JW Dashboard.

### Unsupported Features

Due to the lack of UIWebView support in tvOS, our app framework is not based on the HTML5 JW Player, so some features are not yet implemented. We will continue to add features and always welcome pull requests from the community.

- Ad integrations (VAST, VPAID, GoogleIMA, etc.)
- Security-related features (encrypted HLS, DRM, signed URLs)
- Captions
- Search

## Usage Instructions (JW Platform integration)

1. Log in to your [JW Player Dashboard](https://dashboard.jwplayer.com). If you do not have an account, you can [create a free one](http://www.jwplayer.com).
1. Click Account > API Keys and copy your API key (for example, `WT2yg4NU`).
1. Click Content > Playlists. Click the title of a playlist that you want to include in your app.
1. In the playlist details page that opens, record the Playlist ID (for example, `PQkCnnIH`). Repeat this for all the playlists that you want in your app. You can add as many playlists as you want and also specify one "featured" playlist.
1. Clone this repo or [download the Zip  archive](https://github.com/jwplayer/appletv/archive/master.zip).
1. Copy the `jwplayer-appletv-web-app` directory to your web app server.
1. In the `jwplayer-appletv-web-app/resources/configs` directory, rename the `VCyJXbpY` directory to the JW Player API key that you recorded in step 2.
1. Open the `config.json` file in a text editor and replace the default values with your own. The recommended image sizes are 1920x1080 for the `splashScreen` image and 1920x400 for the `bannerImage`.
1. Open the `jwplayer-appletv-tvos-app/jwplayer-for-tv.xcodeproj` project in Xcode.
1. Open the `AppDelegate.swift` file. Change the `baseURL` variable to your web app server location.
1. Open the `Info.plist` file. Change the `jwplayer.account_key` value to the JW Player API key that you recorded in step 2, and the `Bundle name` to your desired app name.
2. Open the `Assets.xcassets` bundle and replace the top shelf and default app icon assets with your own images. For image specs, see the [AppleTV Branding Guide](jwplayer-appletv-app-branding.pdf) in this repo. You can further customize your app by styling the TVML templates. See the [TVML documentation](https://developer.apple.com/library/tvos/documentation/LanguagesUtilities/Conceptual/ATV_Template_Guide/index.html) for more details.
1. Build the project in Xcode. We recommend running the app in the Xcode Apple TV emulator to test that everything is configured properly. For instructions on using the emulator, see the Xcode documentation.
1. Submit your app to the Apple App Store. (See [instructions and guidelines](https://developer.apple.com/tvos/submit/))

## Auto Advance

You can enable auto advance by editing `config.json`, and setting the `autoAdvance` boolean to true.
The Auto Advance feature has the following configuration options:

* `autoAdvanceWarningOffset`: The amount of seconds before the end of playback of the current item to show the `autoAdvanceMessage`.
* `autoAdvanceMessage`: The message to display before auto advancing to the next playlist item, this message takes one variable, `{$offset}`, which is the number of seconds remaining before the next video starts.

## Requirements

- Apple Xcode 7.1 or later
- Apple TV 4th generation (2015) running tvOS 9.0 or later
- A text editor
- An HTTP server (or Amazon S3 bucket, etc.) to host your app's TVML, JavaScript, and config files.
- An Apple Developer account (only required if you want to list your app in the Apple Store).

Apple TV is a registered trademark of Apple, Inc.
