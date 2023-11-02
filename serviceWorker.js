const cachedName = "version2";
const cachedAssets = [
  "index.html",
  "about.html",
  "./js/main.js",
  "./css/index.css",
];

self.addEventListener("install", (event) => {
  console.log("service worker installed");
  //Cache files
  event.waitUntil(
    caches
      .open(cachedName)
      .then((cache) => {
        console.log("caching files");
        cache.addAll(cachedAssets);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});
self.addEventListener("activate", (event) => {
  console.log("service worker activated");
  //Step - Keep Cache light
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cachedName) {
            console.log("Cached Service worker is being cleared");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("fetchting service worker");
  event.respondWith(
    fetch(event.request).catch(() => {
      caches.match(event.request);
    })
  );
});
