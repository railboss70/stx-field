// If Visa hits an error, show what went wrong (instead of a blank screen or a button that
// does nothing), with Reload and STX Home buttons. A screenshot of this card tells Matthew
// exactly what failed and on which iPhone version.
(function () {
  var shown = false;
  function ios() {
    var m = navigator.userAgent.match(/OS (\d+)_(\d+)/);
    return m ? "iOS " + m[1] + "." + m[2] : navigator.userAgent.slice(0, 60);
  }
  function show(msg) {
    if (shown || !document.body) return;
    msg = String(msg || "Unknown error");
    if (/ResizeObserver loop|Script error\.?$/.test(msg)) return; // harmless browser noise
    shown = true;
    var box = document.createElement("div");
    box.setAttribute("role", "alert");
    box.style.cssText = "position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom));z-index:2147483646;" +
      "background:#fff;border:2px solid #9b1c1c;border-radius:14px;padding:14px 16px;box-shadow:0 10px 30px rgba(0,0,0,.25);" +
      "font:15px/1.4 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#142033";
    var esc = function (t) { return t.replace(/[&<>]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]; }); };
    box.innerHTML =
      '<b style="color:#9b1c1c;font-size:16px">Something went wrong in Visa</b>' +
      '<div style="margin:6px 0 2px">Your packets are saved. Take a screenshot of this and text it to Matthew.</div>' +
      '<div style="font:12px/1.4 ui-monospace,Menlo,monospace;color:#5c6570;word-break:break-word;max-height:6em;overflow:auto">' +
      esc(msg.slice(0, 300)) + "<br>" + esc(ios()) + " · Visa " + (window.__VISA_VERSION || "") + "</div>" +
      '<div style="display:flex;gap:10px;margin-top:10px">' +
      '<button type="button" id="stx-err-reload" style="flex:1;border:0;border-radius:10px;padding:12px;background:#0C2340;color:#fff;font:inherit;font-weight:700">Reload</button>' +
      '<a href="../" style="flex:1;text-align:center;border:1.5px solid #0C2340;border-radius:10px;padding:11px;color:#0C2340;font-weight:700;text-decoration:none">STX Home</a></div>';
    document.body.appendChild(box);
    document.getElementById("stx-err-reload").onclick = function () { location.reload(); };
  }
  window.addEventListener("error", function (e) {
    // A file that failed to load (e.g. lost signal) or a code error
    var t = e.target;
    if (t && t !== window && t.tagName) {
      // Only the app's own code matters; fonts, pictures and other sites failing (e.g. weak signal) are fine.
      if (t.tagName === "SCRIPT" && t.src && t.src.indexOf(location.origin) === 0) show("Could not load " + t.src.split("/").pop());
      return;
    }
    show(e.message);
  }, true);
  window.addEventListener("unhandledrejection", function (e) {
    var r = e.reason;
    show(r && (r.message || r.name) ? (r.name ? r.name + ": " : "") + r.message : r);
  });
  // A crash that empties the app leaves a blank page: catch that too.
  setInterval(function () {
    var root = document.getElementById("root");
    if (root && document.readyState === "complete" && !root.firstChild) show("The app stopped drawing (blank screen).");
  }, 2000);
})();
