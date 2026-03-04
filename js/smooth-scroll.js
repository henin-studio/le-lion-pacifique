/**
 * Lenis smooth scroll + GSAP ScrollTrigger sync
 * Disabled on touch devices — native scroll is better there
 */
(function () {
  console.log('[smooth-scroll] Module loaded');

  var isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  var isNarrow = window.innerWidth < 768;
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    console.log('[smooth-scroll] Reduced motion preferred — Lenis disabled');
    window.__lenis = null;
    return;
  }

  if (isTouchDevice || isNarrow) {
    console.log('[smooth-scroll] Touch device or narrow viewport (' + window.innerWidth + 'px) — Lenis disabled');
    window.__lenis = null;
    return;
  }

  if (typeof Lenis === 'undefined') {
    console.warn('[smooth-scroll] Lenis not loaded — skipping');
    window.__lenis = null;
    return;
  }

  console.log('[smooth-scroll] Desktop detected (' + window.innerWidth + 'px) — initializing Lenis');

  var lenis = new Lenis({
    duration: 1.2,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    orientation: 'vertical',
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add(function (time) {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  window.__lenis = lenis;
  console.log('[smooth-scroll] Lenis initialized and synced with GSAP ticker');
})();
