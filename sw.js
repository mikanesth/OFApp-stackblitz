const cacheVersion = "V6";

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

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheVersion).then((cache) => {
      console.log(
        "[Service Worker] Mise en cache globale: app shell et contenu"
      );
      return cache.addAll(cachedFiles);
    })
  );
  console.log(cacheVersion + " is installed");
});
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

// self.addEventListener('fetch', (e)=>{
//     //console.log(e);
//     if(e.request.mode == 'navigate'){
//         e.respondWith((async ()=>{
//             try {
//             const preloadResponse = await e.preloadResponse;
//             if(preloadResponse){
//                 return preloadResponse;
//             }
//             return await fetch(e.request);
//         } catch(e){
//             const cache = await caches.open(cacheVersion);
//             return await cache.match('./offline.html');
//         }
//         })());
//     } else if(cachedFiles.includes(e.request.url)){
//         e.respondWith(caches.match(e.request));
//     }
// })

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
