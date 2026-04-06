const CACHE_NAME = 'ancrage-v2';
const CORE_ASSETS = ['', 'index.html', 'styles.css', 'script.js'];

function toScopeUrl(path) {
  return new URL(path, self.registration.scope).toString();
}

self.addEventListener('install', e => {
  const assetUrls = CORE_ASSETS.map(toScopeUrl);

  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(assetUrls))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => key.startsWith('ancrage-') && key !== CACHE_NAME)
        .map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const reqUrl = new URL(e.request.url);
  const appOrigin = new URL(self.registration.scope).origin;
  const sameOrigin = reqUrl.origin === appOrigin;

  e.respondWith(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      const direct = await cache.match(e.request);
      if (direct) return direct;

      if (sameOrigin) {
        const normalizedUrl = reqUrl.pathname.endsWith('/')
          ? `${reqUrl.origin}${reqUrl.pathname}index.html`
          : `${reqUrl.origin}${reqUrl.pathname}`;

        const normalized = await cache.match(normalizedUrl);
        if (normalized) return normalized;
      }

      try {
        const response = await fetch(e.request);

        if (sameOrigin && response && response.status === 200 && response.type === 'basic') {
          cache.put(e.request, response.clone());
        }

        return response;
      } catch {
        if (sameOrigin && e.request.destination === 'document') {
          const fallbackDoc = await cache.match(toScopeUrl('index.html'));
          if (fallbackDoc) return fallbackDoc;
        }

        if (sameOrigin && e.request.destination === 'style') {
          const fallbackStyle = await cache.match(toScopeUrl('styles.css'));
          if (fallbackStyle) return fallbackStyle;
        }

        if (sameOrigin && e.request.destination === 'script') {
          const fallbackScript = await cache.match(toScopeUrl('script.js'));
          if (fallbackScript) return fallbackScript;
        }

        throw new Error('Offline and no matching cache entry');
      }
    })()
  );
});
