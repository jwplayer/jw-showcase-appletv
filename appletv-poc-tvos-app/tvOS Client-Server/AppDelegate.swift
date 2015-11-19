//
//  AppDelegate.swift
//  tvOS Client-Server
//
//  Created by Pablo Schklowsky on 10/30/15.
//  Copyright © 2015 Pablo Schklowsky. All rights reserved.
//

import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate, TVApplicationControllerDelegate {

    var window: UIWindow?
    var appController: TVApplicationController?

    func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
        // Override point for customization after application launch.
        self.window = UIWindow(frame: UIScreen.mainScreen().bounds)
        
        let infoBundle = NSBundle.mainBundle()
        
        let appControllerContext = TVApplicationControllerContext()
        
        let javascriptURL = NSURL(string: "http://localhost/appletv/appletv-poc-web-app/application.js")
        
        appControllerContext.javaScriptApplicationURL = javascriptURL!
        
        if let options = launchOptions {
            for (kind, value) in options {
                if let kindStr = kind as? String {
                    appControllerContext.launchOptions[kindStr] = value
                }
            }
        }

        appControllerContext.launchOptions["playlists"] = infoBundle.infoDictionary?["jwplayer.playlists"]
        appControllerContext.launchOptions["account_key"] = infoBundle.infoDictionary?["jwplayer.account_key"]

        
        self.appController = TVApplicationController(context: appControllerContext, window: self.window, delegate: self)
        
        return true
    }
}

