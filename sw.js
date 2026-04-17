const cacheName = 'kelime-oyunu-v17.9';
const assets = [
  './',
  './index.html',
  './words.json',
  './sounds/kazan.mp3',
  './sounds/kaybet.mp3'
];

// Dosyaları yükleme (Cache) - Güncellenmiş Halı
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      // return eklemek tüm dosyaların indiğinden emin olmanı sağlar
      return cache.addAll(assets);
    })
  );
});

// İnternet yokken dosyaları "Kutu"dan getirme
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});
