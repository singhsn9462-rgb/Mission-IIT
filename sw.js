/* StudyOrbit IIT S7.9 — update-aware PWA cache. */
const CACHE_NAME = 'studyorbit-tracker-s7930-focus-navigation-1';
const CACHE_PREFIX = 'studyorbit-tracker-';
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './studyorbit-features.js?v=7930',
  './studyorbit-features.css?v=7930',
  './studyorbit-todo.js?v=7802',
  './studyorbit-todo.css?v=7802'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    // Cache the app shell for offline startup. A failed optional URL should not
    // prevent the worker from installing; each core URL is attempted separately.
    await Promise.all(CORE.map(async url => {
      try {
        const response = await fetch(url, { cache: 'reload' });
        if (response.ok) await cache.put(url, response);
      } catch (_) { /* Keep installing; online fetch will retry later. */ }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  const path = url.pathname;
  const isNavigation = request.mode === 'navigate';
  const isAppCode = /\.(?:html|js|css|json)$/i.test(path);
  if (isNavigation || isAppCode) {
    // Network-first keeps updated app files current; cache is only the offline fallback.
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      const cachedFallback = async () => (await caches.match(request)) || (isNavigation ? await caches.match('./index.html') : null);
      try {
        // Bound the network-first wait so a slow connection cannot leave the app shell spinning indefinitely.
        const network = fetch(request, { cache: 'no-cache' }).then(async response => {
          if (response && response.ok) await cache.put(request, response.clone());
          return response;
        });
        const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('network timeout')), 2800));
        return await Promise.race([network, timeout]);
      } catch (_) {
        const cached = await cachedFallback();
        return cached || Response.error();
      }
    })());
    return;
  }

  // Static images/icons: serve cached copies quickly, populate cache on first fetch.
  event.respondWith((async () => {
    const cached = await caches.match(request);
    if (cached) return cached;
    try {
      const response = await fetch(request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, response.clone());
      }
      return response;
    } catch (_) { return Response.error(); }
  })());
});
