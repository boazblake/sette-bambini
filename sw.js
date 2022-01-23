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
    "revision": "1a0bc11d17712dc6b017bc3e81274685"
  },
  {
    "url": "app.css.gz",
    "revision": "19a1882cd5987c0e11cfec56934b2b16"
  },
  {
    "url": "app.css.map",
    "revision": "079fed542c48907aec5d6df1c428ba13"
  },
  {
    "url": "app.js",
    "revision": "938175dc3de4f558e91d5c9600cb6917"
  },
  {
    "url": "app.js.gz",
    "revision": "f544741286527bc9989c9d1fa2943bf9"
  },
  {
    "url": "app.js.map",
    "revision": "74038ce5822f05cd1bcfb3305dc99a7b"
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
    "url": "images/blankets/blankets0.webp",
    "revision": "c30a3090c12a452387ee3839c69071e3"
  },
  {
    "url": "images/blankets/blankets1.webp",
    "revision": "ccfbc1d1cede2438f048b04b61e6c0cd"
  },
  {
    "url": "images/blankets/blankets2.webp",
    "revision": "cdb0fc3e2263d60aa5c5caca43557968"
  },
  {
    "url": "images/blankets/blankets3.webp",
    "revision": "3b0dd85d30938c0db5e004dbf8b32f9e"
  },
  {
    "url": "images/burps/burp0.webp",
    "revision": "1cc32157b80b57f3d233c896566a7aaa"
  },
  {
    "url": "images/burps/burp1.webp",
    "revision": "3b17598cc3cb80936af22e7273261615"
  },
  {
    "url": "images/burps/burp2.webp",
    "revision": "8b8f42f636373750afff3df9efeef040"
  },
  {
    "url": "images/burps/burp3.webp",
    "revision": "a6d9f5640d4cacbaf4cb0a230c1cee9a"
  },
  {
    "url": "images/burps/burp4.webp",
    "revision": "96c4cc6713c1e3e7ebb405e4f8574ed4"
  },
  {
    "url": "images/collections/collection0.webp",
    "revision": "360adeaf97147f78e163440b09fd7e46"
  },
  {
    "url": "images/collections/collection1.webp",
    "revision": "64e5f3d9a7872e9c5b81033ddc7e039b"
  },
  {
    "url": "images/collections/collection2.webp",
    "revision": "4e097e272a86084e5a96e9ebc76e166f"
  },
  {
    "url": "images/collections/collection3.webp",
    "revision": "bfaae9dc2f290487e5a7132a41dc2f7a"
  },
  {
    "url": "images/collections/collection4.webp",
    "revision": "84513a868f38f189c1222431d06ebbef"
  },
  {
    "url": "images/collections/collection5.webp",
    "revision": "8c8bbb70ed408dfa51135794da93bb2b"
  },
  {
    "url": "images/collections/collection6.webp",
    "revision": "67ee497640d349c9d7eac4321c73fb45"
  },
  {
    "url": "images/collections/collection7.webp",
    "revision": "d883d3e00835d8156e386a94bebf0490"
  },
  {
    "url": "images/collections/collection8.webp",
    "revision": "726584188c3a4ee9a2cca4b818479b8c"
  },
  {
    "url": "index.html",
    "revision": "e75f3295cfcb57fbdfcf626d8c39b59b"
  },
  {
    "url": "index.html.gz",
    "revision": "33c23f5758a38332c1b8ec5cc20d5837"
  },
  {
    "url": "manifest.json",
    "revision": "eeb7f5fa3cafc1c663b6b7730d3ba68b"
  },
  {
    "url": "vendor.js.gz",
    "revision": "a085b89eacb41ec868747f93ddf0fc0a"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
