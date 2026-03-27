/**
 * Le Lion Pacifique — Main entry point
 * Initializes all modules after DOM ready
 */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    console.log('[app] DOM ready — initializing modules');

    // Navigation (GSAP scroll effects)
    if (window.__initNavigation) {
      console.log('[app] → initNavigation');
      window.__initNavigation();
    } else {
      console.warn('[app] __initNavigation not found');
    }

    // Animations (GSAP + ScrollTrigger)
    if (window.__initAnimations) {
      console.log('[app] → initAnimations');
      window.__initAnimations();
    } else {
      console.warn('[app] __initAnimations not found');
    }

    // Gallery (Swiper + GLightbox)
    if (window.__initGallery) {
      console.log('[app] → initGallery');
      window.__initGallery();
    } else {
      console.log('[app] __initGallery not available (gallery page uses own init)');
    }

    console.log('[app] All modules initialized');
  });
})();
