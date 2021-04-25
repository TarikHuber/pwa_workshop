const SW_VERSION = 7;
const CACHE_NAME = `OFFLINE_VERSION_${SW_VERSION}`;
const OFFLINE_URL = "offline.html";

self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] install event");
  //self.skipWaiting();

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
      console.log("Offline page cached");
    })()
  );
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] activate event");
  //self.skipWaiting();

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            caches.delete(cacheName);
          } else {
            return null;
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  console.log("[ServiceWorker] fetch event" + event.request.url);

  self.clients.matchAll().then((clients) => {
    clients.forEach((client) => {
      client.postMessage(
        `Hi ${client.id} you are loading the path ${event.request.url}`
      );
    });
  });

  event.respondWith(
    (async () => {
      try {
        const networkRequest = await fetch(event.request);
        return networkRequest;
      } catch (error) {
        console.log(
          "[ServiceWorker] Fetch failed; returning offline page instead."
        );

        const cache = await caches.open(CACHE_NAME);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })()
  );
  //self.skipWaiting();
});

self.addEventListener("message", function (event) {
  if (event.data === "skipWaiting") {
    self.skipWaiting();
  }
});

self.addEventListener("sync", function (event) {
  console.log("tag: ", event.tag);

  if (event.tag == "myFirstSync") {
    console.log("Doing some sync stuff!");
  }
});
