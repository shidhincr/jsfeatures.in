importScripts('/cache-polyfill.js');

var staticCache = 'jsfeatures-v3';

var myCaches = [staticCache];

var files = [
	'/',
	'/images/touch/apple-touch-icon.png',
	'/images/touch/chrome-touch-icon-192x192.png',
	'/images/touch/icon-128x128.png',
	'/images/touch/ms-touch-icon-144x144-precomposed.png',
	'/manifest.json',
	'/index.html',
	'./bundle.js',
	'/styles/vendor/highlight.min.css',
];

self.addEventListener('install', function (event) {
    event.waitUntil(
    caches.open(staticCache)
		.then(function (cache) {
    return cache.addAll(files.map(function (fileUrl) {
        return new Request(fileUrl);
    }))
				.then(function () {
    console.log('All the files are cached.');
				})
				.
			catch(function (error) {
    console.error('Failed to cache the files.', error);
			});
		})
	);
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
    caches.match(event.request)
		.then(function (response) {
    return response || fetch(event.request);
		})
		.
		catch(function (error) {
    console.error('Error: ', error);
		})
	);
});

self.addEventListener('activate', function (event) {
    var cacheWhitelist = ['jsfeatures-v1'];
    event.waitUntil(
    caches.keys()
		.then(function (caches) {
    caches.map(function (cacheName) {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
        }
    });
		})
	);
});
