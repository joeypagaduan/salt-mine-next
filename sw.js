// Replaces the old Salt Mine Beta service worker at this address: clears the beta's saved files, removes itself,
// and reloads any open copy so it lands on the "moved" page. It leaves the new app's files (smb-2.0.0 and later) alone.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => /^smb-2\.0\.0-alpha/.test(k)).map(k => caches.delete(k)));
    await self.registration.unregister();
    const open = await self.clients.matchAll({ type: 'window' });
    open.forEach(c => { try { c.navigate(c.url); } catch (err) {} });
  })());
});
