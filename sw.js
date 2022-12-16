const CACHE_NAME = 'cassowaryV2-cache';
const OFFLINE_URL = 'offline.html';

self.addEventListener('install', function(event) {
  console.log('[ServiceWorker] Install');
  
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
  })());
  
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil((async () => {
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
    }
  })());

  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  // console.log('[Service Worker] Fetch', event.request.url);
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }
});

if(!self.define){let e,c={};const i=(i,o)=>(i=new URL(i+".js",o).href,c[i]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=c,document.head.appendChild(e)}else e=i,importScripts(i),c()})).then((()=>{let e=c[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(o,n)=>{const a=e||("document"in self?document.currentScript.src:"")||location.href;if(c[a])return;let f={};const r=e=>i(e,a),d={module:{uri:a},exports:f,require:r};c[a]=Promise.all(o.map((e=>d[e]||r(e)))).then((e=>(n(...e),f)))}}define(["./workbox-e3735399"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"css/reset.min.css",revision:"93e42565f156d067f72108759177a957"},{url:"css/styles.css",revision:"be2330cb441daaa3ad4725f97122ac7e"},{url:"favicon/android-chrome-192x192.png",revision:"e81029b379c94bacd7f1ab2780f70fbc"},{url:"favicon/android-chrome-384x384.png",revision:"d7aaf13010a3cf628dd256e2a62e05cb"},{url:"favicon/apple-touch-icon-120x120-precomposed.png",revision:"edbfd910e3d5422408a0f861fd959933"},{url:"favicon/apple-touch-icon-120x120.png",revision:"c62896ce5d393140cb919ffb967b9299"},{url:"favicon/apple-touch-icon-152x152-precomposed.png",revision:"50b36dfda14dd770f91eb844afc6ba74"},{url:"favicon/apple-touch-icon-152x152.png",revision:"a9e52d0e528a4afa2110cb42d48fb0c1"},{url:"favicon/apple-touch-icon-180x180-precomposed.png",revision:"a4230ced7d2200885cc740d9c5af42ef"},{url:"favicon/apple-touch-icon-180x180.png",revision:"35a856b30d82d8efe044bdfa2bc9ad5c"},{url:"favicon/apple-touch-icon-60x60-precomposed.png",revision:"d8b971d4b123a1a1f877268468203015"},{url:"favicon/apple-touch-icon-60x60.png",revision:"09a86c37b72cc58715eb30f24ee059d8"},{url:"favicon/apple-touch-icon-76x76-precomposed.png",revision:"528098a1abffadb7a6356a82a0f38a96"},{url:"favicon/apple-touch-icon-76x76.png",revision:"432c3753f90de98d7c098ca17379eb35"},{url:"favicon/apple-touch-icon-precomposed.png",revision:"a4230ced7d2200885cc740d9c5af42ef"},{url:"favicon/apple-touch-icon.png",revision:"35a856b30d82d8efe044bdfa2bc9ad5c"},{url:"favicon/browserconfig.xml",revision:"db04e3572400826167e84c04992b15ff"},{url:"favicon/favicon-16x16.png",revision:"2b786f1dfa14c475ef16f6d515795325"},{url:"favicon/favicon-32x32.png",revision:"ad5e3895889293074e131703bd209752"},{url:"favicon/favicon-512x512.png",revision:"574abcab05ebc76395acee3cb2744c4f"},{url:"favicon/favicon.ico",revision:"fbc127a2b9fd11c9609c433d5ddc8413"},{url:"favicon/mstile-150x150.png",revision:"39212bd36b0a542cb0714c66e878e39b"},{url:"favicon/safari-pinned-tab.svg",revision:"a2b37e0b69fc23c74f33fca946b28206"},{url:"index.html",revision:"3b4c3596d85ed1b58df913c076c22626"},{url:"js/app.js",revision:"23b58def11b45727d3351702515f86af"},{url:"js/budget.json",revision:"8c7e68e115a92cff82fbd7e2f3d04dd4"},{url:"js/index-header.js",revision:"a181bf7637ca653c043ef56aae1f48bb"},{url:"site.webmanifest",revision:"f0b6390564d5fafb8ee6ab611a65cb51"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]})}));
//# sourceMappingURL=sw.js.map
