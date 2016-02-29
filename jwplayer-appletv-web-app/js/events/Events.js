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
 * Events that can be subscribed to on the EventBus.
 */
var Events = (function() {
  return {
    // Media
    PLAYLIST_START: 'playlistStart',
    MEDIA_COMPLETE: 'complete',
    PLAYLIST_COMPLETE: 'playlistComplete',
    MEDIA_SEEK: 'seek',
    MEDIA_SEEKED: 'seeked',
    MEDIA_TIME: 'time',
    MEDIA_META: 'meta',
    MEDIA_CHANGE: 'mediaChange',
    MEDIA_CHANGED: 'mediaChanged',

    // Player
    PLAYLIST_LOADED: 'playlist',
    PLAYER_STATE: 'playerState',
    PLAYER_OVERLAY: 'playerOverlay',

    // Auto Advance
    AUTOADVANCE_INITIALIZED: 'autoAdvanceInitialized',

    // Utility
    ERROR: 'error',
    CONFIG_LOADED: 'configLoaded'
  };
})();
