// Saved copies are fetched fresh ({ cache: "reload" }); otherwise GitHub Pages' 10-minute browser cache
// can lock an old file into the offline copy until the next version.
// Offline support: caches the app so it opens with no cell signal.
// Bump VERSION whenever you change any file so phones pick up the update.
const VERSION = "stx-field-trailer-v3";
const FILES = [
  "./", "index.html", "css/style.css",
  "js/items.js", "js/signature.js", "js/pdf.js", "js/app.js", "js/home-button.js",
  "vendor/jspdf.umd.min.js", "assets/logo.js", "assets/stx-logo.jpg",
  "assets/icon-180.png", "assets/icon-192.png", "assets/icon-512.png",
  "assets/icon-maskable-512.png", "assets/favicon-32.png", "assets/icon.svg",
];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: "reload" })))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k.startsWith("stx-field-trailer-") && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
// Network first (so updates show up), fall back to cache when offline.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // no-cache: ask GitHub whether the file changed (a quick check), instead of trusting the browser's copy.
  e.respondWith(
    fetch(new Request(e.request.url, { cache: "no-cache" }))
      .then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
