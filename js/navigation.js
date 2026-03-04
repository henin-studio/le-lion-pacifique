/**
 * Navigation: scroll effects, smooth anchor links
 */
(function () {
  console.log('[navigation] Module loaded');

  function initNavigation() {
    var nav = document.querySelector('.nav');

    if (!nav) {
      console.warn('[navigation] No .nav element found — aborting');
      return;
    }

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      console.warn('[navigation] GSAP or ScrollTrigger not loaded — skipping scroll effects');
      return;
    }

    // Single ScrollTrigger for both background + hide/show
    var lastScroll = 0;
    var navHidden = false;

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: function () {
        var current = window.scrollY;

        // Background
        if (current > 50) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }

        // Hide/show — only animate when state changes
        var shouldHide = current > lastScroll && current > 200;
        if (shouldHide && !navHidden) {
          navHidden = true;
          gsap.to(nav, { yPercent: -100, duration: 0.3, ease: 'power2.in', overwrite: true });
        } else if (!shouldHide && navHidden) {
          navHidden = false;
          gsap.to(nav, { yPercent: 0, duration: 0.3, ease: 'power2.out', overwrite: true });
        }

        lastScroll = current;
      },
    });

    // Smooth anchor scroll
    var anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();

        if (window.__lenis) {
          window.__lenis.scrollTo(target, { offset: -80 });
        } else {
          gsap.to(window, { scrollTo: { y: target, offsetY: 80 }, duration: 1, ease: 'power3.inOut' });
        }
      });
    });

    console.log('[navigation] Init complete');
  }

  window.__initNavigation = initNavigation;
})();
