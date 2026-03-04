/**
 * GSAP + ScrollTrigger animations
 * Elements start hidden via CSS (visibility: hidden) on html.no-gsap
 * Respects prefers-reduced-motion
 */
(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    // Keep no-gsap class — CSS fallback shows everything
    window.__initAnimations = function () {};
    return;
  }

  // GSAP available — remove fallback class
  document.documentElement.classList.remove('no-gsap');
  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);

  // If reduced motion: just show everything, no animation
  if (prefersReducedMotion) {
    window.__initAnimations = function () {
      gsap.set('[style*="visibility"],.hero__title,.hero__subtitle,.hero__footer,.oeuvres__title,.swiper--oeuvres,.oeuvres__cta,.about__image,.about__title,.about__text,.about__quote,.about .btn,.exposition__title,.exposition__image,.exposition__text,.exposition__event,.footer__inner', {
        visibility: 'visible', opacity: 1, y: 0, x: 0, clipPath: 'none',
      });
    };
    return;
  }

  // Helper: reveal with fromTo (prevents flash)
  function reveal(el, from, to, trigger, opts) {
    if (!el) return;
    var targets = el.length !== undefined ? el : [el];
    if (!targets.length) return;

    var triggerEl = trigger || targets[0];
    var defaults = {
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: triggerEl,
        start: 'top 85%',
        once: true,
      },
    };

    gsap.fromTo(targets,
      Object.assign({ visibility: 'visible' }, from),
      Object.assign(defaults, to, opts || {})
    );
  }

  // ===== HERO =====
  function animateHero() {
    var title = document.querySelector('.hero__title');
    if (!title) return;

    var tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(title,
      { y: 60, opacity: 0, visibility: 'visible' },
      { y: 0, opacity: 1, duration: 1.2 }
    );

    var subtitle = document.querySelector('.hero__subtitle');
    if (subtitle) {
      tl.fromTo(subtitle,
        { y: 30, opacity: 0, visibility: 'visible' },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );
    }

    var footer = document.querySelector('.hero__footer');
    if (footer) {
      tl.fromTo(footer,
        { y: 20, opacity: 0, visibility: 'visible' },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      );
    }
  }

  // ===== OEUVRES =====
  function animateOeuvres() {
    var title = document.querySelector('.oeuvres__title');
    if (!title) return;

    reveal(title, { y: 40, opacity: 0 }, { y: 0, opacity: 1 });
    reveal(
      document.querySelector('.swiper--oeuvres'),
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );
    reveal(
      document.querySelector('.oeuvres__cta'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 }
    );
  }

  // ===== ABOUT =====
  function animateAbout() {
    var image = document.querySelector('.about__image');
    var title = document.querySelector('.about__title');
    if (!title) return;

    if (image) {
      reveal(image,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'power4.inOut' },
        image,
        { scrollTrigger: { trigger: image, start: 'top 80%', once: true } }
      );
    }

    var cascade = [
      title,
      document.querySelector('.about__text'),
      document.querySelector('.about__quote'),
      document.querySelector('.about .btn'),
    ].filter(Boolean);

    gsap.set(cascade, { visibility: 'visible' });
    gsap.fromTo(cascade,
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: title, start: 'top 85%', once: true },
      }
    );
  }

  // ===== EXPOSITION =====
  function animateExposition() {
    var title = document.querySelector('.exposition__title');
    if (!title) return;

    reveal(title, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 },
      title, { scrollTrigger: { trigger: title, start: 'top 80%', once: true } }
    );

    var image = document.querySelector('.exposition__image');
    if (image) {
      reveal(image, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 });
    }

    var text = document.querySelector('.exposition__text');
    if (text) {
      reveal(text, { y: 30, opacity: 0 }, { y: 0, opacity: 1 });
    }

    var events = gsap.utils.toArray('.exposition__event');
    if (events.length) {
      gsap.set(events, { visibility: 'visible' });
      gsap.fromTo(events,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: { trigger: events[0], start: 'top 88%', once: true },
        }
      );
    }
  }

  // ===== FOOTER =====
  function animateFooter() {
    reveal(
      document.querySelector('.footer__inner'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      null,
      { scrollTrigger: { trigger: '.footer__inner', start: 'top 92%', once: true } }
    );
  }

  // ===== INIT =====
  window.__initAnimations = function () {
    animateHero();
    animateOeuvres();
    animateAbout();
    animateExposition();
    animateFooter();
  };
})();
