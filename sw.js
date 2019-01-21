const VERSION = 2;
const CACHE_NAME = 'cache::' + VERSION;
const URLS = [
  '/',
  '/restaurant.html',
  '/css/styles.css',
  '/js/main.js',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/js/serviceWorkerReg.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];
// Listen out for the install event
self.addEventListener('install', function(event) {
  // Install the Service Worker (open a cache and add some resources to it)
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS);
    })
  );
});
// Listen for network requests
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(cleanURL(event.request.url)).then(response => {
      if (response) {
        // A match has been found in the cache. We supply that.
        return response;
      }
      // No match found. So let's go get it over the network.
      return fetch(event.request).then(response => {
        // Check some things about the response.
        if (
          !response ||
          response.status !== 200 ||
          response.type != 'basic' ||
          response.type != 'cors'
        ) {
          return response;
        }
        const networkResponse = response.clone();
        // Clone the response and add it to the cache.
        caches.open(CACHE_NAME).then(cache => {
          console.log('adding to cache', event.request, networkResponse);
          cache.put(event.request, networkResponse);
        });
        return response;
      });
    })
  );
});
// Listen for update events.
self.addEventListener('activate', function(event) {
  var cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete any old caches (space is not infinite).
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
// Listen for messages
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
const cleanURL = url => {
  const regex = new RegExp(/(\?|\&)([^=]+)\=([^&]+)/gm);
  return url.replace(regex, '');
};
