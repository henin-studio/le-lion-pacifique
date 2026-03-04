/**
 * Gallery filters: show/hide items by category with GSAP
 */
(function () {
  console.log('[gallery-filters] Module loaded');

  function initGalleryFilters() {
    var buttons = document.querySelectorAll('.gallery-filters__btn');
    var items = document.querySelectorAll('.gallery-grid__item');

    if (!buttons.length || !items.length) {
      console.log('[gallery-filters] No filter buttons (' + buttons.length + ') or grid items (' + items.length + ') — skipping');
      return;
    }

    console.log('[gallery-filters] Found ' + buttons.length + ' filter buttons, ' + items.length + ' grid items');

    // Log categories
    var categories = {};
    items.forEach(function (item) {
      var cat = item.dataset.category || 'uncategorized';
      categories[cat] = (categories[cat] || 0) + 1;
    });
    console.log('[gallery-filters] Categories:', categories);

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.dataset.filter;
        console.log('[gallery-filters] Filter clicked: ' + filter);

        buttons.forEach(function (b) {
          b.classList.remove('gallery-filters__btn--active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('gallery-filters__btn--active');
        btn.setAttribute('aria-pressed', 'true');

        var shown = 0;
        var hidden = 0;

        items.forEach(function (item) {
          var category = item.dataset.category;
          var show = filter === 'all' || category === filter;

          if (show) {
            shown++;
            item.style.display = '';
            if (typeof gsap !== 'undefined') {
              gsap.to(item, { scale: 1, opacity: 1, duration: 0.35, ease: 'power3.out' });
            } else {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }
          } else {
            hidden++;
            if (typeof gsap !== 'undefined') {
              gsap.to(item, {
                scale: 0.95,
                opacity: 0,
                duration: 0.25,
                ease: 'power3.in',
                onComplete: function () { item.style.display = 'none'; },
              });
            } else {
              item.style.display = 'none';
            }
          }
        });

        console.log('[gallery-filters] Result: ' + shown + ' shown, ' + hidden + ' hidden');
      });
    });

    console.log('[gallery-filters] Init complete');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleryFilters);
  } else {
    initGalleryFilters();
  }
})();
