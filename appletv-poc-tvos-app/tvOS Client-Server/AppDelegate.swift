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

    static let TVBaseURL = "http://localhost/appletv/appletv-poc-web-app"
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

