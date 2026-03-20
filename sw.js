const cacheName = 'kelime-oyunu-v9.1';
// Buraya çevrimdışı olmasını istediğin tüm dosyaları yaz (örneğin resimler varsa onları da ekle)
const assets = [
  './',
  './index.html'
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
