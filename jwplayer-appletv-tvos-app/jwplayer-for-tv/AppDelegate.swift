/**
 * Copyright 2015 Longtail Ad Solutions Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 **/

import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, TVApplicationControllerDelegate {

    var window: UIWindow?
    var appController: TVApplicationController?

    // Uncomment the following line to debug
    // static let TVBaseURL = "http://localhost/appletv/jwplayer-appletv-web-app"
    static let TVBaseURL = "https://tvos.jwpsrv.com"
    static let TVConfigURL = "\(AppDelegate.TVBaseURL)/resources/configs"
    static let TVBootURL = "\(AppDelegate.TVBaseURL)/js/application.js"

    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        // Override point for customization after application launch.
        self.window = UIWindow(frame: UIScreen.mainScreen().bounds)

        let infoBundle = NSBundle.mainBundle()

        let appControllerContext = TVApplicationControllerContext()


        appControllerContext.launchOptions["baseURL"] = AppDelegate.TVBaseURL
        appControllerContext.launchOptions["configService"] = AppDelegate.TVConfigURL
        appControllerContext.launchOptions["account_key"] = infoBundle.infoDictionary?["jwplayer.account_key"]
        appControllerContext.javaScriptApplicationURL = NSURL(string: AppDelegate.TVBootURL)!

        if let options = launchOptions {
            for (kind, value) in options {
                if let kindStr = kind as? String {
                    appControllerContext.launchOptions[kindStr] = value
                }
            }
        }

        self.appController = TVApplicationController(context: appControllerContext, window: self.window, delegate: self)

        return true
    }
}
