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

    console.log('[navigation] Nav element found');

    // Scroll: add background
    ScrollTrigger.create({
      start: 'top -50',
      onUpdate: function (self) {
        if (self.direction === 1 && window.scrollY > 50) {
          nav.classList.add('nav--scrolled');
        }
        if (window.scrollY <= 50) {
          nav.classList.remove('nav--scrolled');
        }
      },
    });
    console.log('[navigation] Scroll background trigger created');

    // Hide/show on scroll direction
    var lastScroll = 0;
    ScrollTrigger.create({
      onUpdate: function () {
        var current = window.scrollY;
        if (current > lastScroll && current > 200) {
          gsap.to(nav, { yPercent: -100, duration: 0.3, ease: 'power2.in' });
        } else {
          gsap.to(nav, { yPercent: 0, duration: 0.3, ease: 'power2.out' });
        }
        lastScroll = current;
      },
    });
    console.log('[navigation] Hide/show scroll trigger created');

    // Smooth anchor scroll via GSAP
    var anchors = document.querySelectorAll('a[href^="#"]');
    console.log('[navigation] Anchor links found: ' + anchors.length);

    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (!target) {
          console.warn('[navigation] Anchor target not found: ' + href);
          return;
        }
        e.preventDefault();
        console.log('[navigation] Scrolling to: ' + href);

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
