// STX Field "Home" tab, shown on the left edge of every app inside STX Field.
// First tap opens "Back to STX Home"; a second tap goes home, so a stray thumb does nothing.
// The same file is copied into trailer/js/, daily/ and source/visa/public/. Keep the copies identical.
(function () {
  var HOME = "../";
  function add() {
    if (document.getElementById("stx-home-tab")) return;
    var css = document.createElement("style");
    css.textContent =
      "#stx-home-tab{position:fixed;left:0;top:58%;z-index:2147483000;display:flex;align-items:center;" +
      "gap:6px;height:44px;padding:0 10px 0 8px;border:0;border-radius:0 22px 22px 0;background:rgba(12,35,64,.88);" +
      "color:#fff;font:600 14px/1 -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;" +
      "box-shadow:0 4px 14px rgba(0,0,0,.25);text-decoration:none;-webkit-tap-highlight-color:transparent;" +
      "transition:padding .15s;cursor:pointer}" +
      "#stx-home-tab svg{width:20px;height:20px;stroke:#fff;fill:none;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}" +
      "#stx-home-tab span{display:none;white-space:nowrap}" +
      "#stx-home-tab.open{padding:0 16px 0 12px;background:#0C2340}#stx-home-tab.open span{display:inline}" +
      "@media print{#stx-home-tab{display:none}}";
    document.head.appendChild(css);
    var b = document.createElement("a");
    b.id = "stx-home-tab";
    b.href = HOME;
    b.setAttribute("aria-label", "Back to STX Home");
    b.innerHTML = '<svg viewBox="0 0 24 24"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></svg><span>Back to STX Home</span>';
    var timer;
    b.addEventListener("click", function (e) {
      if (!b.classList.contains("open")) {
        e.preventDefault();
        b.classList.add("open");
        clearTimeout(timer);
        timer = setTimeout(function () { b.classList.remove("open"); }, 3500);
      }
    });
    document.body.appendChild(b);
  }
  if (document.body) add(); else document.addEventListener("DOMContentLoaded", add);
})();
