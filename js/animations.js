/**
 * GSAP + ScrollTrigger animations
 */
(function () {
  console.log('[animations] Module loaded');
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('[animations] GSAP or ScrollTrigger not loaded — skipping');
    window.__initAnimations = function () {};
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  if (typeof ScrollToPlugin !== 'undefined') gsap.registerPlugin(ScrollToPlugin);
  console.log('[animations] GSAP plugins registered');

  // ===== HERO TITLE =====
  function animateHero() {
    var heroTitle = document.querySelector('.hero__title');
    if (!heroTitle) {
      console.log('[animations] No .hero__title found — skipping hero animation');
      return;
    }

    console.log('[animations] Animating hero title');
    gsap.from(heroTitle, {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power4.out',
      delay: 0.3,
    });

    var heroSubtitle = document.querySelector('.hero__subtitle');
    if (heroSubtitle) {
      console.log('[animations] Animating hero subtitle');
      gsap.from(heroSubtitle, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.7,
      });
    }

    var heroFooter = document.querySelector('.hero__footer');
    if (heroFooter) {
      console.log('[animations] Animating hero footer');
      gsap.from(heroFooter, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1,
      });
    }
  }

  // ===== SCROLL REVEAL =====
  function initScrollReveal() {
    var reveals = gsap.utils.toArray('.reveal');
    console.log('[animations] Scroll reveal: ' + reveals.length + ' elements found');

    reveals.forEach(function (el, i) {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    });
  }

  // ===== INIT =====
  window.__initAnimations = function () {
    console.log('[animations] Init started');
    animateHero();
    initScrollReveal();
    console.log('[animations] Init complete');
  };
})();
