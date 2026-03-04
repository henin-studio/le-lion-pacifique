/**
 * Gallery filters: show/hide items by category with GSAP
 * + stagger reveal on load + stagger on filter change
 * Respects prefers-reduced-motion
 */
(function () {
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = typeof gsap !== 'undefined' && !prefersReducedMotion;

  function initGalleryFilters() {
    var buttons = document.querySelectorAll('.gallery-filters__btn');
    var items = document.querySelectorAll('.gallery-grid__item');
    var statusEl = document.getElementById('gallery-status');

    if (!buttons.length || !items.length) return;

    // Remove no-gsap on gallery page too
    if (typeof gsap !== 'undefined') {
      document.documentElement.classList.remove('no-gsap');
    }

    // ===== REVEAL ON LOAD =====
    if (hasGsap) {
      gsap.fromTo(items,
        { y: 40, opacity: 0, visibility: 'visible' },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.08 }
      );
    } else {
      items.forEach(function (item) { item.style.visibility = 'visible'; });
    }

    // ===== FILTER CLICK =====
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.dataset.filter;

        // Update active state
        buttons.forEach(function (b) {
          b.classList.remove('gallery-filters__btn--active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('gallery-filters__btn--active');
        btn.setAttribute('aria-pressed', 'true');

        var toShow = [];
        var toHide = [];

        items.forEach(function (item) {
          var show = filter === 'all' || item.dataset.category === filter;
          if (show) toShow.push(item);
          else toHide.push(item);
        });

        if (hasGsap) {
          if (toHide.length) {
            gsap.to(toHide, {
              scale: 0.95, opacity: 0, duration: 0.2, ease: 'power3.in', stagger: 0.04,
              onComplete: function () {
                toHide.forEach(function (item) { item.style.display = 'none'; });
              },
            });
          }

          var showDelay = toHide.length ? 0.25 : 0;
          toShow.forEach(function (item) { item.style.display = ''; });

          gsap.fromTo(toShow,
            { scale: 0.95, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out', stagger: 0.06, delay: showDelay }
          );
        } else {
          items.forEach(function (item) {
            var show = filter === 'all' || item.dataset.category === filter;
            item.style.display = show ? '' : 'none';
          });
        }

        // Announce result to screen readers
        if (statusEl) {
          statusEl.textContent = toShow.length + ' oeuvre' + (toShow.length > 1 ? 's' : '') + ' affichée' + (toShow.length > 1 ? 's' : '');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryFilters);
  } else {
    initGalleryFilters();
  }
})();
