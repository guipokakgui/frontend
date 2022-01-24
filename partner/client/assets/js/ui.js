"use strict";

// CSS vh
var vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty("--vh", "".concat(vh, "px")); // Resize

window.addEventListener("resize", function () {
  // CSS vh
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", "".concat(vh, "px"));
});
//# sourceMappingURL=maps/ui.js.map
