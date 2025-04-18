const CACHE_NAME = "qr-generator-cache-v1";
const urlsToCache = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./manifest.json",
  "./images/icon-192.png",
  "./images/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
  });

  
  self.addEventListener("sync", (event) => {
    if (event.tag === "sync-qr") {
      event.waitUntil(sendDataToServer());
    }
  });
  
  async function sendDataToServer() {
    // Example function: can use IndexedDB to queue requests
    console.log("Syncing data to server...");
  }

  self.addEventListener("push", (event) => {
    const data = event.data?.json() || { title: "Default Title", body: "Default body" };
  
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: "images/icon-192.png"
    });
  });
  
  