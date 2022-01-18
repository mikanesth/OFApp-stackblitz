const cacheVersion = "V1.0";

const cachedFiles = [
  "./styles.css",
  "./assets/css/carte1.css",
  "./assets/css/carte2.css",
  "./assets/css/carte3.css",
  "./assets/css/main-page.css",
  "./assets/css/responsive.css",
  "./var.css",
  "./index.js",
  "./offline.html",
  "./assets/img/perfusion.svg",
  "./assets/img/favicon.ico",
];

//installation du sw avec mise en cache des documents des l'installation le fetch completera la mise en cache des fonts
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheVersion).then((cache) => {
      console.log(
        "[Service Worker] Mise en cache globale de l'app et contenu statique working 100% offline"
      );
      return cache.addAll(cachedFiles);
    })
  );
  console.log(cacheVersion + " is installed");
});

//activation de la version du sw avec destruction des caches précédents

self.addEventListener("activate", (e) => {
  clients.claim();
  e.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.map((key) => {
          if (!key.includes(cacheVersion)) {
            return caches.delete(key);
          }
        })
      );
    })()
  );
  console.log(cacheVersion + " is active");
});

// gestion des fetch avec proposition des versions en cache en premier 

self.addEventListener("fetch", (e) => {
  e.respondWith(
      caches.match(e.request).then((r)=>{
          return r || fetch(e.request).then(async (response)=>{
              const cache = await caches.open(cacheVersion);
              console.log('putting new resource into cache' + e.request.url);
              cache.put(e.request, response.clone());
              return response;
          })
      })
  )
});
