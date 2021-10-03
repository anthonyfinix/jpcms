/* eslint-disable no-restricted-globals */
const cacheName = "v1";
self.addEventListener("install", () => { console.log('install') });
self.addEventListener("activate", (e) => {
    e.awaitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache)
                    }
                })
            )
        })
    )
});
self.addEventListener("fetch", (e) => { 
    e.respondWith(
        fetch(e.request)
            .then(response => {
                let responseClone = response.clone();
                if (e.request.url.indexOf('http') === 0) {
                    caches.open(cacheName)
                        .then(cache => {
                            cache.put(e.request, responseClone)
                        })
                }
                return response;
            })
            .catch(() => caches.match(e.request).then(res => res))
    )
});