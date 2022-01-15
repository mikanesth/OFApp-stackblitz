const PREFIX = 'V1';

const CACHED_FILES = ["./StyleSheet.css","./assets/css/carte1.css","./assets/css/carte2.css","./assets/css/carte3.css","./assets/css/main-page.css","./assets/css/responsive.css","./var.css","index.js","offline.html","./assets/img/perfusion.svg","./assets/img/favicon.ico"];

self.addEventListener('install', (event)=>{
    self.skipWaiting();
    event.waitUntil((async ()=>{
        const cache = await caches.open(PREFIX);
        await Promise.all(
            CACHED_FILES.map(p => cache.add(new Request(p)))
        );
    })())
    console.log(PREFIX + ' is installed');
})
self.addEventListener('activate', (e)=>{
    clients.claim();
    e.waitUntil(
        (async ()=> {
            const keys = await caches.keys();
            await Promise.all(
                keys.map((key)=>{
                    if(!key.includes(PREFIX)){
                        return caches.delete(key);
                    }
                })
            );
        })()
    );
    console.log(PREFIX + ' is active');
})


self.addEventListener('fetch', (e)=>{
    //console.log(e);
    if(e.request.mode == 'navigate'){
        e.respondWith((async ()=>{
            try {
            const preloadResponse = await e.preloadResponse;
            if(preloadResponse){
                return preloadResponse;
            }
            return await fetch(e.request);
        } catch(e){
            const cache = await caches.open(PREFIX);
            return await cache.match('./offline.html');
        }
        })());
    } else if(CACHED_FILES.includes(e.request.url)){
        e.respondWith(caches.match(e.request));
    }
})