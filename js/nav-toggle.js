/**
 * Nav toggle: MENU button opens/closes the dropdown menu
 * Loaded on all pages.
 */
(function () {
  var toggle = document.querySelector('.nav__toggle');
  var menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', function () {
    var isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
    menu.hidden = isOpen;
  });

  // Close on link click
  menu.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', function () {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !menu.hidden) {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
      toggle.focus();
    }
  });
})();
