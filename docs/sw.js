/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["docs/app.css","1a0bc11d17712dc6b017bc3e81274685"],["docs/app.css.gz","19a1882cd5987c0e11cfec56934b2b16"],["docs/app.css.map","079fed542c48907aec5d6df1c428ba13"],["docs/app.js","938175dc3de4f558e91d5c9600cb6917"],["docs/app.js.gz","f544741286527bc9989c9d1fa2943bf9"],["docs/app.js.map","74038ce5822f05cd1bcfb3305dc99a7b"],["docs/favicon/android-chrome-192x192.png","72ba00393a6af3fb056cb1319d1cb46f"],["docs/favicon/apple-touch-icon.png","706f9b2cfeb971fd845a1950c66f9407"],["docs/favicon/browserconfig.xml","e602af8b029e0ac4d8a2d6a0f41e89a5"],["docs/favicon/favicon-16x16.png","6c1031145e2750a902a98c838e1a596e"],["docs/favicon/favicon-32x32.png","0a777b245bf2697be47673d54eff1208"],["docs/favicon/favicon.ico","f77e3fadffbebaf66ab5b64b5efdf171"],["docs/favicon/mstile-150x150.png","89f406a39b05ac5fa321b77f95de09cd"],["docs/favicon/safari-pinned-tab.svg","1d2a053c72275796c99f52c18aa04b12"],["docs/fonts/SilverThreadJF.otf","2ab3e4fe205b8c60addb47f34a7ac30d"],["docs/fonts/SilverThreadJF.ttf","9e5504610606357fb9fab850cdef963e"],["docs/fonts/SilverThreadJF.woff","835ed7358045055935d6b9c19e63521b"],["docs/fonts/SilverThreadJF.woff2","7980763b516a97b23e02f96e1283e12e"],["docs/icons/icon-128x128.png","253e8299c2cab5ffec8c4986c1f3ff6e"],["docs/icons/icon-144x144.png","ecfe415739e845a069d9b5f4d5f82dbe"],["docs/icons/icon-152x152.png","34782ea538ce7e2d6d67d987e54f35af"],["docs/icons/icon-192x192.png","168754e13b6691324874c63f24c48291"],["docs/icons/icon-384x384.png","295ed56c6c478d1befa8de5aa01eeeb0"],["docs/icons/icon-512x512.png","27f8ba1e35b3fb3113727eb26d4b46d8"],["docs/icons/icon-72x72.png","cd5d34e72073fa820398dd75d2d8e8ed"],["docs/icons/icon-96x96.png","7aefce21b05a0a97c6b55ea7153e8769"],["docs/icons/maskable_icon-152x.png","d54116eaf5544fbf7edc7a297a3c5ed0"],["docs/images/blankets/blankets0.webp","c30a3090c12a452387ee3839c69071e3"],["docs/images/blankets/blankets1.webp","ccfbc1d1cede2438f048b04b61e6c0cd"],["docs/images/blankets/blankets2.webp","cdb0fc3e2263d60aa5c5caca43557968"],["docs/images/blankets/blankets3.webp","3b0dd85d30938c0db5e004dbf8b32f9e"],["docs/images/burps/burp0.webp","1cc32157b80b57f3d233c896566a7aaa"],["docs/images/burps/burp1.webp","3b17598cc3cb80936af22e7273261615"],["docs/images/burps/burp2.webp","8b8f42f636373750afff3df9efeef040"],["docs/images/burps/burp3.webp","a6d9f5640d4cacbaf4cb0a230c1cee9a"],["docs/images/burps/burp4.webp","96c4cc6713c1e3e7ebb405e4f8574ed4"],["docs/images/collections/collection0.webp","360adeaf97147f78e163440b09fd7e46"],["docs/images/collections/collection1.webp","64e5f3d9a7872e9c5b81033ddc7e039b"],["docs/images/collections/collection2.webp","4e097e272a86084e5a96e9ebc76e166f"],["docs/images/collections/collection3.webp","bfaae9dc2f290487e5a7132a41dc2f7a"],["docs/images/collections/collection4.webp","84513a868f38f189c1222431d06ebbef"],["docs/images/collections/collection5.webp","8c8bbb70ed408dfa51135794da93bb2b"],["docs/images/collections/collection6.webp","67ee497640d349c9d7eac4321c73fb45"],["docs/images/collections/collection7.webp","d883d3e00835d8156e386a94bebf0490"],["docs/images/collections/collection8.webp","726584188c3a4ee9a2cca4b818479b8c"],["docs/index.html","e75f3295cfcb57fbdfcf626d8c39b59b"],["docs/index.html.gz","33c23f5758a38332c1b8ec5cc20d5837"],["docs/manifest.json","eeb7f5fa3cafc1c663b6b7730d3ba68b"],["docs/vendor.js.gz","a085b89eacb41ec868747f93ddf0fc0a"]];
var cacheName = 'sw-precache-v3--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var cleanResponse = function(originalResponse) {
    // If this is not a redirected response, then we don't have to do anything.
    if (!originalResponse.redirected) {
      return Promise.resolve(originalResponse);
    }

    // Firefox 50 and below doesn't support the Response.body stream, so we may
    // need to read the entire body to memory as a Blob.
    var bodyPromise = 'body' in originalResponse ?
      Promise.resolve(originalResponse.body) :
      originalResponse.blob();

    return bodyPromise.then(function(body) {
      // new Response() is happy when passed either a stream or a Blob.
      return new Response(body, {
        headers: originalResponse.headers,
        status: originalResponse.status,
        statusText: originalResponse.statusText
      });
    });
  };

var createCacheKey = function(originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.pathname.match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);
    // Remove the hash; see https://github.com/GoogleChrome/sw-precache/issues/290
    url.hash = '';

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              var request = new Request(cacheKey, {credentials: 'same-origin'});
              return fetch(request).then(function(response) {
                // Bail out of installation unless we get back a 200 OK for
                // every request.
                if (!response.ok) {
                  throw new Error('Request for ' + cacheKey + ' returned a ' +
                    'response with status ' + response.status);
                }

                return cleanResponse(response).then(function(responseToCache) {
                  return cache.put(cacheKey, responseToCache);
                });
              });
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameters and hash fragment, and see if we
    // have that URL in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







