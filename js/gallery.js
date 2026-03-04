/**
 * Gallery: Swiper carousel + GLightbox
 * A11y: keyboard nav, pause on interaction, screen reader labels
 */

(function () {
  function initGallery() {
    // ===== OEUVRES PHARES SWIPER =====
    var oeuvresSwiper = document.querySelector('.swiper--oeuvres');
    if (oeuvresSwiper && typeof Swiper !== 'undefined') {
      new Swiper('.swiper--oeuvres', {
        slidesPerView: 1.4,
        spaceBetween: 12,
        centeredSlides: false,
        loop: true,
        grabCursor: true,
        speed: 4000,
        freeMode: {
          enabled: true,
          momentum: false,
        },
        autoplay: {
          delay: 0,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        },
        keyboard: {
          enabled: true,
        },
        a11y: {
          prevSlideMessage: 'Diapositive précédente',
          nextSlideMessage: 'Diapositive suivante',
          firstSlideMessage: 'Première diapositive',
          lastSlideMessage: 'Dernière diapositive',
          containerMessage: 'Carrousel des oeuvres phares',
          containerRoleDescriptionMessage: 'carrousel',
          itemRoleDescriptionMessage: 'diapositive',
        },
        breakpoints: {
          640: { slidesPerView: 1.8, spaceBetween: 16 },
          768: { slidesPerView: 2.5, spaceBetween: 20 },
          1024: { slidesPerView: 3.2, spaceBetween: 24 },
        },
      });
    }

    // ===== GLIGHTBOX =====
    var lightboxElements = document.querySelectorAll('.glightbox');
    if (lightboxElements.length && typeof GLightbox !== 'undefined') {
      GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        closeOnOutsideClick: true,
        openEffect: 'fade',
        closeEffect: 'fade',
        keyboardNavigation: true,
      });
    }
  }

  window.__initGallery = initGallery;
})();
