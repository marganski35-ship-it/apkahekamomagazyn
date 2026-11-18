// Pamięć podręczna plików apki, żeby otwierała się też przy słabym zasięgu w magazynie.
// Po każdej zmianie plików podnieś numer wersji.
const VERSION = 'spis-palet-v1';
const SHELL = [
  './',
  'index.html',
  'config.js',
  'css/app.css',
  'js/app.js',
  'js/core.js',
  'js/store.js',
  'js/lookup.js',
  'js/scanner.js',
  'js/export.js',
  'js/feedback.js',
  'vendor/idb-keyval.js',
  'vendor/xlsx.mini.min.js',
  'vendor/barcode-detector.js',
  'vendor/zxing_reader.wasm',
  'manifest.webmanifest',
  'icons/icon-180.png',
  'icons/icon-192.png',
  'icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSION).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  // webhooki n8n i wszystko spoza apki idzie zawsze przez sieć
  if (event.request.method !== 'GET' || url.origin !== self.location.origin) return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(VERSION).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request, { ignoreSearch: true }).then(hit => hit || caches.match('index.html')))
  );
});
