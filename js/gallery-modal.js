(function () {
  var items = document.querySelectorAll('.gallery-grid__item');
  if (!items.length) return;

  // Build modal DOM
  var modal = document.createElement('div');
  modal.className = 'oeuvre-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-label', 'Fiche oeuvre');
  modal.setAttribute('aria-hidden', 'true');
  modal.innerHTML =
    '<div class="oeuvre-modal__overlay"></div>' +
    '<div class="oeuvre-modal__panel">' +
      '<button class="oeuvre-modal__close" aria-label="Fermer">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
      '</button>' +
      '<div class="oeuvre-modal__image-wrap">' +
        '<img class="oeuvre-modal__image" src="" alt="">' +
      '</div>' +
      '<div class="oeuvre-modal__info">' +
        '<p class="oeuvre-modal__desc"></p>' +
        '<div class="oeuvre-modal__meta">' +
          '<p class="oeuvre-modal__title"></p>' +
          '<p class="oeuvre-modal__year"></p>' +
          '<p class="oeuvre-modal__dimensions"></p>' +
        '</div>' +
      '</div>' +
      '<a class="oeuvre-modal__cta btn btn--dark" href="contact.html">Envoyer une demande</a>' +
    '</div>';
  document.body.appendChild(modal);

  var overlay = modal.querySelector('.oeuvre-modal__overlay');
  var closeBtn = modal.querySelector('.oeuvre-modal__close');
  var imgEl = modal.querySelector('.oeuvre-modal__image');
  var descEl = modal.querySelector('.oeuvre-modal__desc');
  var titleEl = modal.querySelector('.oeuvre-modal__title');
  var yearEl = modal.querySelector('.oeuvre-modal__year');
  var dimsEl = modal.querySelector('.oeuvre-modal__dimensions');

  function openModal(figure) {
    var link = figure.querySelector('a');
    var img = figure.querySelector('img');
    imgEl.src = link.href;
    imgEl.alt = img.alt;
    descEl.textContent = figure.dataset.description || '';
    titleEl.textContent = figure.dataset.title || '';
    yearEl.textContent = figure.dataset.year || '';
    dimsEl.textContent = figure.dataset.dimensions || '';

    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('oeuvre-modal--open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    modal.setAttribute('aria-hidden', 'true');
    modal.classList.remove('oeuvre-modal--open');
    document.body.style.overflow = '';
  }

  // Open on click
  items.forEach(function (figure) {
    var link = figure.querySelector('a');
    if (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openModal(figure);
      });
    }
  });

  // Close
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  document.addEventListener('keydown', function (e) {
    if (modal.getAttribute('aria-hidden') === 'true') return;
    if (e.key === 'Escape') closeModal();
  });
})();
