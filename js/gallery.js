/**
 * Gallery: Swiper carousel + GLightbox
 */
(function () {
  console.log('[gallery] Module loaded');

  function initGallery() {
    console.log('[gallery] Init started');

    // ===== OEUVRES PHARES SWIPER =====
    var oeuvresSwiper = document.querySelector('.swiper--oeuvres');
    if (oeuvresSwiper && typeof Swiper !== 'undefined') {
      var slideCount = oeuvresSwiper.querySelectorAll('.swiper-slide').length;
      console.log('[gallery] Swiper container found — ' + slideCount + ' slides');

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
          disableOnInteraction: false,
        },
        breakpoints: {
          640: { slidesPerView: 1.8, spaceBetween: 16 },
          768: { slidesPerView: 2.5, spaceBetween: 20 },
          1024: { slidesPerView: 3.2, spaceBetween: 24 },
        },
      });
      console.log('[gallery] Swiper initialized (loop, freeMode, autoplay)');
    } else {
      console.log('[gallery] No .swiper--oeuvres found — skipping Swiper');
    }

    // ===== GLIGHTBOX =====
    var lightboxElements = document.querySelectorAll('.glightbox');
    if (lightboxElements.length && typeof GLightbox !== 'undefined') {
      console.log('[gallery] GLightbox: ' + lightboxElements.length + ' elements found');
      GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        closeOnOutsideClick: true,
        openEffect: 'fade',
        closeEffect: 'fade',
      });
      console.log('[gallery] GLightbox initialized');
    } else {
      console.log('[gallery] No .glightbox elements found — skipping lightbox');
    }

    console.log('[gallery] Init complete');
  }

  window.__initGallery = initGallery;
})();
