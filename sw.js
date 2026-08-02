const CACHE="crease-v811-summary-actions";
const ASSETS=[
  "./",
  "./index.html",
  "./icon-192-v802.png",
  "./icon-512-v802.png",
  "./icon-1024-v802.png",
  "./brand-logo-v802.png",
  "./favicon-v802.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  const freshAsset = /manifest-v724|icon-(192|512|1024)-v724|brand-logo-v724|favicon-v724/.test(url.pathname);

  if (freshAsset) {
    event.respondWith(fetch(event.request, {cache: "reload"}));
    return;
  }

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put("./index.html", copy));
        return response;
      }).catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (event.request.method === "GET") {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
