/* ============================================================
   Service Worker — حكايات العراق (PWA)
   ------------------------------------------------------------
   يوفّر عملاً دون اتصال (offline) عبر تخزين الملف الرئيسي.
   ملاحظة: يعمل فقط عند تقديم الموقع عبر http/https (وليس file://)،
   وعند التحويل لتطبيق موبايل (TWA / Capacitor / WebView).
   ============================================================ */
const CACHE = 'hikayat-iraq-v2';
const ASSETS = ['./', './index.html'];

self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      const net = fetch(e.request).then(res => {
        // خزّن نسخة محدّثة (للخطوط والصفحة) عند توفر الشبكة
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
