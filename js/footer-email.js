(function () {
  var input = document.getElementById('footer-email');
  var wrap = input ? input.closest('.footer__input-wrap') : null;
  var btn = wrap ? wrap.querySelector('.footer__input-btn') : null;
  if (!input || !wrap) return;

  function validate() {
    if (!input.value || !input.checkValidity()) {
      wrap.style.borderColor = '#c0392b';
      input.focus();
      return false;
    }
    wrap.style.borderColor = '';
    return true;
  }

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      validate();
    }
  });

  input.addEventListener('input', function () {
    if (input.checkValidity()) {
      wrap.style.borderColor = '';
    }
  });

  if (btn) {
    btn.addEventListener('click', function () {
      validate();
    });
  }
})();
