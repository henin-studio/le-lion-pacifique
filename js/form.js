
    (function () {
      // Remove no-gsap fallback
      if (typeof gsap !== 'undefined') {
        document.documentElement.classList.remove('no-gsap');
      }

      // Lucide icons
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }

      // Footer visibility
      var footer = document.querySelector('.footer__inner');
      if (footer) footer.style.visibility = 'visible';

      // Upload label — keyboard a11y
      var uploadLabel = document.querySelector('.request-form__upload');
      if (uploadLabel) {
        uploadLabel.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            document.getElementById('request-upload').click();
          }
        });
      }

      // --- Character counter ---
      var messageArea = document.getElementById('request-message');
      var countEl = document.getElementById('request-message-count');
      if (messageArea && countEl) {
        messageArea.addEventListener('input', function () {
          countEl.textContent = messageArea.value.length;
        });
      }

      // --- Request form validation ---
      var form = document.querySelector('.request-form');
      if (form) {
        var fields = [
          { input: 'request-name', error: 'request-name-error' },
          { input: 'request-email', error: 'request-email-error' },
          { input: 'request-message', error: 'request-message-error' }
        ];

        function validateField(field) {
          var el = document.getElementById(field.input);
          var err = document.getElementById(field.error);
          var valid = el.checkValidity();
          el.classList.toggle('request-form__input--invalid', !valid);
          el.classList.toggle('request-form__textarea--invalid', !valid);
          err.hidden = valid;
          el.setAttribute('aria-invalid', !valid);
          return valid;
        }

        // Live: clear error on input
        fields.forEach(function (field) {
          var el = document.getElementById(field.input);
          el.addEventListener('input', function () {
            if (el.checkValidity()) {
              var err = document.getElementById(field.error);
              el.classList.remove('request-form__input--invalid', 'request-form__textarea--invalid');
              err.hidden = true;
              el.setAttribute('aria-invalid', 'false');
            }
          });
        });

        // Build confirmation modal
        var confirmModal = document.createElement('div');
        confirmModal.className = 'confirm-modal';
        confirmModal.setAttribute('role', 'dialog');
        confirmModal.setAttribute('aria-label', 'Confirmation');
        confirmModal.setAttribute('aria-hidden', 'true');
        confirmModal.innerHTML =
          '<div class="confirm-modal__overlay"></div>' +
          '<div class="confirm-modal__card">' +
            '<svg class="confirm-modal__icon" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
            '<h2 class="confirm-modal__title">Demande envoyée</h2>' +
            '<p class="confirm-modal__text">Vérifiez votre boîte mail pour une confirmation rapide.<br>Alpha vous répondra personnellement dès que possible.</p>' +
          '</div>';
        document.body.appendChild(confirmModal);

        var confirmOverlay = confirmModal.querySelector('.confirm-modal__overlay');

        function closeConfirm() {
          confirmModal.classList.remove('confirm-modal--open');
          confirmModal.setAttribute('aria-hidden', 'true');
          document.body.style.overflow = '';
        }

        confirmOverlay.addEventListener('click', closeConfirm);
        document.addEventListener('keydown', function (e) {
          if (confirmModal.getAttribute('aria-hidden') === 'true') return;
          if (e.key === 'Escape') closeConfirm();
        });

        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var allValid = true;
          fields.forEach(function (field) {
            if (!validateField(field)) allValid = false;
          });
          if (!allValid) {
            var firstInvalid = form.querySelector('[aria-invalid="true"]');
            if (firstInvalid) firstInvalid.focus();
            return;
          }
          // Show confirmation modal
          confirmModal.classList.add('confirm-modal--open');
          confirmModal.setAttribute('aria-hidden', 'false');
          document.body.style.overflow = 'hidden';
          form.reset();
          if (countEl) countEl.textContent = '0';
        });
      }

      // Reveal animations
      if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var animatedEls = '.request-header__title, .request-image__figure, .request-form-section';

        if (prefersReducedMotion) {
          gsap.set(animatedEls, { visibility: 'visible', opacity: 1, y: 0 });
          return;
        }

        // Header
        gsap.fromTo('.request-header__title',
          { visibility: 'visible', opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );

        // Image
        gsap.fromTo('.request-image__figure',
          { visibility: 'visible', opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.25, ease: 'power2.out' }
        );

        // Form section
        gsap.fromTo('.request-form-section',
          { visibility: 'visible', opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
            scrollTrigger: { trigger: '.request-form-section', start: 'top 85%', once: true }
          }
        );

      }
    })();