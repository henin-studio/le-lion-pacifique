/**
 * Navigation: scroll hide/show, smooth anchor links
 * Menu toggle is handled by nav-toggle.js (loaded on all pages)
 */
(function () {
  function initNavigation() {
    var nav = document.querySelector('.nav');
    var toggle = document.querySelector('.nav__toggle');
    var menu = document.getElementById('nav-menu');

    if (!nav) return;

    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // ===== SCROLL HIDE/SHOW =====
    var lastScroll = 0;
    var navHidden = false;

    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: function () {
        var current = window.scrollY;

        var shouldHide = current > lastScroll && current > 200;
        if (shouldHide && !navHidden) {
          navHidden = true;
          // Close menu when hiding nav
          if (toggle && menu) {
            toggle.setAttribute('aria-expanded', 'false');
            menu.hidden = true;
          }
          gsap.to(nav, { yPercent: -100, duration: 0.3, ease: 'power2.in', overwrite: true });
        } else if (!shouldHide && navHidden) {
          navHidden = false;
          gsap.to(nav, { yPercent: 0, duration: 0.3, ease: 'power2.out', overwrite: true });
        }

        lastScroll = current;
      },
    });

    // ===== SMOOTH ANCHOR SCROLL =====
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
  }

  window.__initNavigation = initNavigation;
})();
