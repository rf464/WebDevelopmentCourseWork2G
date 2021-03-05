
let cacheName = 'lessons-v1';
let cachFiles = [
    "CourseWork1.js",
    "index.html",
    "lessons.js",
    "lessons.json",
    "lessons.webmanifest",
    

    "images/english.png",
    "images/french.png",
    "images/geography.png",
    "images/history.png",
    "images/IT.png",
    "images/maths.png",
    "images/music.png",
    "images/schoolicon.png",
    "images/science.png",
    "images/spanish.png",
    "images/sports.png",
]

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all the files');
            return cache.addAll(cachFiles);
        })
    );
});


self.addEventListener('fetch', function (e){
    e.respondWith(
        caches.match(e.request).then(function (r){
            console.log('[Service Worker] Fetching resources: ' + e.request.url);
            return r || fetch(e.request).then(function (cache){
                return caches.open(cacheName).then(function (cache) {
                    cache.put(e.request, response.clone());
                    return response;
                })
            })
        })
    )
})