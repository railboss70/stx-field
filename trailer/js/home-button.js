// STX Field "Home" button: a house icon in each app's top bar that goes back to the STX Field home screen.
// Tool Trailer and Visa: placed just left of the Settings (gear) button, styled like it.
// Daily Report: a round button in the top-right corner of the navy header.
// The app redraws its header between screens, so the button is put back whenever it goes missing.
// The same file is copied into trailer/js/, daily/ and source/visa/public/. Keep the copies identical.
(function () {
  var HOME = "../";
  var ID = "stx-home-btn";
  var ICON = '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/>' +
    '<path d="M5 9.5V21h5v-6h4v6h5V9.5"/></svg>';

  function css() {
    if (document.getElementById(ID + "-css")) return;
    var s = document.createElement("style");
    s.id = ID + "-css";
    s.textContent =
      "#" + ID + "{display:inline-flex;align-items:center;justify-content:center;text-decoration:none;" +
      "-webkit-tap-highlight-color:transparent}" +
      "#" + ID + ".stx-corner{position:absolute;top:calc(env(safe-area-inset-top) + 12px);right:12px;width:42px;height:42px;" +
      "border-radius:50%;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.28);color:#fff;z-index:5}" +
      "#" + ID + ".stx-corner:active{background:rgba(255,255,255,.25)}" +
      "@media print{#" + ID + "{display:none}}";
    document.head.appendChild(s);
  }

  function make(className) {
    var a = document.createElement("a");
    a.id = ID;
    a.href = HOME;
    a.className = className || "";
    a.setAttribute("aria-label", "STX Home");
    a.title = "STX Home";
    a.innerHTML = ICON;
    return a;
  }

  function place() {
    if (document.getElementById(ID)) return;
    var header = document.querySelector("header");
    if (!header) return;
    var gear = header.querySelector('[aria-label="Settings"]');
    if (gear) {
      // Same look as the gear next to it
      gear.parentNode.insertBefore(make(gear.className), gear);
    } else {
      if (getComputedStyle(header).position === "static") header.style.position = "relative";
      header.appendChild(make("stx-corner"));
    }
  }

  function start() {
    css();
    place();
    new MutationObserver(place).observe(document.body, { childList: true, subtree: true });
  }
  if (document.body) start(); else document.addEventListener("DOMContentLoaded", start);
})();
