/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "app.css",
    "revision": "66d11cdea0232fac569c6578f0fd3117"
  },
  {
    "url": "app.js",
    "revision": "3fc4a70ba6902be8ea96e3d338c742e6"
  },
  {
    "url": "favicon/android-chrome-192x192.png",
    "revision": "72ba00393a6af3fb056cb1319d1cb46f"
  },
  {
    "url": "favicon/apple-touch-icon.png",
    "revision": "706f9b2cfeb971fd845a1950c66f9407"
  },
  {
    "url": "favicon/browserconfig.xml",
    "revision": "e602af8b029e0ac4d8a2d6a0f41e89a5"
  },
  {
    "url": "favicon/favicon-16x16.png",
    "revision": "6c1031145e2750a902a98c838e1a596e"
  },
  {
    "url": "favicon/favicon-32x32.png",
    "revision": "0a777b245bf2697be47673d54eff1208"
  },
  {
    "url": "favicon/favicon.ico",
    "revision": "f77e3fadffbebaf66ab5b64b5efdf171"
  },
  {
    "url": "favicon/mstile-150x150.png",
    "revision": "89f406a39b05ac5fa321b77f95de09cd"
  },
  {
    "url": "favicon/safari-pinned-tab.svg",
    "revision": "1d2a053c72275796c99f52c18aa04b12"
  },
  {
    "url": "fonts/SilverThreadJF.otf",
    "revision": "2ab3e4fe205b8c60addb47f34a7ac30d"
  },
  {
    "url": "fonts/SilverThreadJF.ttf",
    "revision": "9e5504610606357fb9fab850cdef963e"
  },
  {
    "url": "fonts/SilverThreadJF.woff",
    "revision": "835ed7358045055935d6b9c19e63521b"
  },
  {
    "url": "fonts/SilverThreadJF.woff2",
    "revision": "7980763b516a97b23e02f96e1283e12e"
  },
  {
    "url": "icons/icon-128x128.png",
    "revision": "253e8299c2cab5ffec8c4986c1f3ff6e"
  },
  {
    "url": "icons/icon-144x144.png",
    "revision": "ecfe415739e845a069d9b5f4d5f82dbe"
  },
  {
    "url": "icons/icon-152x152.png",
    "revision": "34782ea538ce7e2d6d67d987e54f35af"
  },
  {
    "url": "icons/icon-192x192.png",
    "revision": "168754e13b6691324874c63f24c48291"
  },
  {
    "url": "icons/icon-384x384.png",
    "revision": "295ed56c6c478d1befa8de5aa01eeeb0"
  },
  {
    "url": "icons/icon-512x512.png",
    "revision": "27f8ba1e35b3fb3113727eb26d4b46d8"
  },
  {
    "url": "icons/icon-72x72.png",
    "revision": "cd5d34e72073fa820398dd75d2d8e8ed"
  },
  {
    "url": "icons/icon-96x96.png",
    "revision": "7aefce21b05a0a97c6b55ea7153e8769"
  },
  {
    "url": "icons/maskable_icon-152x.png",
    "revision": "d54116eaf5544fbf7edc7a297a3c5ed0"
  },
  {
    "url": "index.html",
    "revision": "5e7a680f80d3880f7c45330a70626829"
  },
  {
    "url": "manifest.json",
    "revision": "44a858edaa257b25edf8be2c52dcef67"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
