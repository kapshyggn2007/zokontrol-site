/* Restored runtime bootstrap for archived static build */
(function () {
  "use strict";

  function initSwiper() {
    if (typeof window.Swiper !== "function") return;
    var el = document.querySelector(".homepage-slider");
    if (!el) return;
    var visibleSlides = el.querySelectorAll(".swiper-slide:not([style*='display: none'])").length;
    if (visibleSlides <= 1) return;
    new window.Swiper(el, {
      loop: false,
      autoHeight: true,
      speed: 700,
      autoplay: false,
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  }

  function initParticles() {
    if (!window.particlesJS) return;
    var target = document.getElementById("particles-js");
    if (!target) return;
    window.particlesJS("particles-js", {
      particles: {
        number: { value: 40, density: { enable: true, value_area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.35, random: true },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 120, color: "#ffffff", opacity: 0.15, width: 1 },
        move: { enable: true, speed: 1.1, direction: "none", random: false, straight: false, out_mode: "out" }
      },
      interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
      },
      retina_detect: true
    });
  }

  function initBackToTop() {
    var link = document.querySelector('a.scroll_to_top[href="#wrapper"]');
    if (!link) return;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function safeInitMdc() {
    if (window.mdc && window.mdc.autoInit) {
      try { window.mdc.autoInit(); } catch (_e) {}
    }
  }

  function boot() {
    initSwiper();
    initParticles();
    initBackToTop();
    safeInitMdc();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
