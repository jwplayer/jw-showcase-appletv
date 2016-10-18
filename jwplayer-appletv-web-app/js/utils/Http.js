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

/**
 * Utility for making XMLHttpRequests.
 *
 * Usage:
 * http(url)
 *  .get(payload)
 *  .then(callback.success)
 *  .catch(callback.error);
 */
 function http(url) {

   return {

     ajax: function(method, url, options) {
       var promise = new Promise(function(resolve, reject) {
         var client = new XMLHttpRequest();
         if (options) {
           for (property in options) {
             if (options.hasOwnProperty(property)) {
               client[property] = options[property];
             }
           }
         }
         client.onload = function() {
           if (this.status >= 200 && this.status < 300) {
             resolve(this.response);
           } else {
             reject(this.statusText);
           }
         };
         client.onerror = function() {
           reject(this.statusText);
         };
         client.open(method, url, true);
         client.send();
       });
       return promise;
     },

     get: function(options) {
       if (!options) {
         // If options are not defined, assume that we want to load a JSON document.
         options = {
           responseType: "json"
         };
       }
       return this.ajax('GET', url, options);
     }
   };

 }
