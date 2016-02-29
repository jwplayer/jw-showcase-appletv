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
 
var Utils = (function () {

  /**
   * Generates a random id with the specified length.
   */
  function genId(len) {
    return new Array(len + 1).join((Math.random().toString(36) + '00000000000000000').slice(2, 18)).slice(0, len);
  }

  /**
   * Utility method for extending objects.
   */
  function extend(obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index];
      var keys = [];
      for (var i in source) {
        if (source.hasOwnProperty(i)) {
          keys.push(i);
        }
      }
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        obj[key] = source[key];
      }
    }
    return obj;
  }

  return {
    genId: genId,
    extend: extend
  }
})();
