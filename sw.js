const cacheName = 'kelime-oyunu-v1';
// Buraya çevrimdışı olmasını istediğin tüm dosyaları yaz (örneğin resimler varsa onları da ekle)
const assets = [
  './',
  './index.html',
  // Eğer dışarıdan çektiğin bir CSS veya JS varsa onları da buraya eklemelisin
];

// Dosyaları yükleme (Cache)
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      cache.addAll(assets);
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
