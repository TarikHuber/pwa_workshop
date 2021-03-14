self.addEventListener("install", (event) => {
  console.log("[ServiceWorker] Install");
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
});

self.addEventListener("fetch", (event) => {
  console.log("[ServiceWorker] Fetch", event.request.url);

  event.respondWith(
    (async function () {
      return fetch(event.request.url);
    })()
  );
});
