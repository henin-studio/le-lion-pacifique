(function () {
  if (window.innerWidth <= 768) return;

  var overlay = document.createElement('div');
  overlay.className = 'mobile-notice';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Version mobile uniquement');
  overlay.innerHTML =
    '<div class="mobile-notice__card">' +
      '<p class="mobile-notice__icon">&#9673;</p>' +
      '<h2 class="mobile-notice__title">Mobile only</h2>' +
      '<p class="mobile-notice__text">' +
        'Ce site a été conçu pour une expérience mobile.<br>' +
        'Ouvrez-le sur votre téléphone pour le découvrir.' +
      '</p>' +
      '<p class="mobile-notice__hint">Redimensionnez votre fenêtre (&le; 768px) pour continuer ici.</p>' +
    '</div>';
  document.body.appendChild(overlay);

  // Dismiss on resize below threshold
  function check() {
    overlay.style.display = window.innerWidth <= 768 ? 'none' : '';
  }
  window.addEventListener('resize', check);
})();
