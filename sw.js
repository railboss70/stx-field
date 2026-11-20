// Saved copies are fetched fresh ({ cache: "reload" }); otherwise GitHub Pages' 10-minute browser cache
// can lock an old file into the offline copy until the next version.
// STX Field service worker: keeps the home screen (and the Visa app, which has no
// service worker of its own) working with no signal.
// Bump VERSION (and APP_VERSION in index.html) whenever anything changes, so phones
// show the "new version is ready" banner.
const VERSION = "stx-field-v1.5";
const PREFIX = "stx-field-v";
const FILES = ["./", "index.html", "manifest.webmanifest", "assets/stx-logo.png",
  "assets/icon-180.png", "assets/icon-192.png", "assets/icon-512.png",
  "assets/icon-maskable-512.png", "assets/favicon-32.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES.map((f) => new Request(f, { cache: "reload" })))));
});
// The new version waits until the supervisor taps Update on the home screen.
self.addEventListener("message", (e) => {
  if (e.data === "update") self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== VERSION).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});
// Network first, so changes show up right away; fall back to the saved copy offline.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  // no-cache: ask GitHub whether the file changed (a quick check), instead of trusting the browser's copy.
  e.respondWith(fetch(new Request(e.request.url, { cache: "no-cache" })).then((res) => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(e.request, copy)); }
    return res;
  }).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
