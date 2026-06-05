/* 紡織工具站 · service worker
   殼快取 + HTML network-first（迭代期不卡舊版，離線才回快取）。
   設定/資料在 localStorage、照片在記憶體，不經這裡。borrow stock-tools sw。 */
const CACHE = 'textiletools-v1';
const SHELL = ['./', './index.html', './manifest.json', './icon.svg',
  './card-measure/index.html', './card-measure/manifest.json', './card-measure/icon.svg'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).catch(()=>{}));
});
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const req = e.request;
  if (new URL(req.url).origin !== location.origin) return;
  const isHTML = req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html');
  if (isHTML) {
    e.respondWith(
      fetch(req).then(resp => { const copy = resp.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{}); return resp; })
        .catch(() => caches.match(req).then(h => h || caches.match('./index.html')))
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(hit =>
      hit || fetch(req).then(resp => { const copy = resp.clone(); caches.open(CACHE).then(c => c.put(req, copy)).catch(()=>{}); return resp; })
        .catch(() => caches.match('./index.html'))
    )
  );
});
