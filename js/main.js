/**
 * ХВОЙНЫЕ ДАРЫ — Main JS
 * Scroll animations, mobile menu, map tabs, lazy iframes
 */

(function() {
  'use strict';

  /* ==========================================
     SCROLL ANIMATIONS (IntersectionObserver)
     ========================================== */
  const animateElements = document.querySelectorAll('[data-animate]');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Optionally unobserve after first appearance:
          // observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for old browsers
    animateElements.forEach(el => el.classList.add('is-visible'));
  }

  /* ==========================================
     MOBILE MENU
     ========================================== */
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu?.querySelectorAll('a');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-active');
      mobileMenu.classList.toggle('is-open');
      document.body.style.overflow = mobileMenu.classList.contains('is-open') ? 'hidden' : '';
    });

    mobileLinks?.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('is-active');
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ==========================================
     MAP TABS (lazy iframe loading)
     ========================================== */
  const mapTabs = document.querySelectorAll('.maps-tab');
  const mapPanels = document.querySelectorAll('.map-panel');

  // Map embed URLs — already embedded in HTML for Yandex & Google; 2GIS is placeholder
  const mapUrls = {
    yandex: 'https://yandex.ru/map-widget/v1/?ll=50.825134%2C58.825336&z=16&pt=50.825134%2C58.825336%2Cpm2dbll',
    google: 'https://maps.google.com/maps?q=%D0%91%D0%B5%D0%BB%D0%B0%D1%8F+%D0%A5%D0%BE%D0%BB%D1%83%D0%BD%D0%B8%D1%86%D0%B0%2C+%D0%9A%D0%B8%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C&hl=ru&t=m&z=16&ie=UTF8&iwloc=&output=embed',
    dgis: ''      // Placeholder until 2GIS embed is provided
  };

  function loadMapIframe(panelId, url) {
    const panel = document.getElementById(panelId);
    if (!panel || !url) return;

    // Only load once
    if (panel.dataset.loaded) return;

    panel.innerHTML = `<iframe src="${url}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" style="width:100%;height:100%;border:0;display:block;"></iframe>`;
    panel.dataset.loaded = 'true';
  }

  mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetMap = tab.dataset.map;
      if (!targetMap) return;

      // Update tabs
      mapTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Update panels
      mapPanels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById('map-' + targetMap);
      if (activePanel) {
        activePanel.classList.add('active');
        loadMapIframe('map-' + targetMap, mapUrls[targetMap]);
      }

      // Update deep link
      updateDeepLink(targetMap);
    });
  });

  // Load default map on first visible
  const mapsSection = document.getElementById('contacts');
  if (mapsSection && 'IntersectionObserver' in window) {
    const mapObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const activeTab = document.querySelector('.maps-tab.active');
          if (activeTab) {
            const targetMap = activeTab.dataset.map;
            loadMapIframe('map-' + targetMap, mapUrls[targetMap]);
          }
          mapObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    mapObserver.observe(mapsSection);
  }

  /* ==========================================
     DEEP LINK UPDATER
     ========================================== */
  function updateDeepLink(activeMap) {
    const deepLink = document.querySelector('.map-deep-link');
    if (!deepLink) return;

    const coords = '58.825336,50.825134';
    const address = 'Белая Холуница, Кировская область';
    const links = {
      yandex: `https://yandex.ru/maps/?rtext=~${coords}&rtt=auto&z=16&pt=${coords}`,
      google: `https://www.google.com/maps/dir/?api=1&destination=${coords}`,
      dgis: `https://2gis.ru/belaya_holunitsa`
    };

    deepLink.href = links[activeMap] || links.yandex;
  }

  /* ==========================================
     HEADER SCROLL EFFECT
     ========================================== */
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > 100) {
      header?.classList.add('is-scrolled');
    } else {
      header?.classList.remove('is-scrolled');
    }

    lastScroll = currentScroll;
  }, { passive: true });

  /* ==========================================
     MEDIA TABS
     ========================================== */
  const mediaTabs = document.querySelectorAll('.media-tab');
  const mediaPanels = document.querySelectorAll('.media-panel');

  mediaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.mediatarget;
      if (!target) return;

      mediaTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      mediaPanels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById('media-' + target);
      if (activePanel) activePanel.classList.add('active');
    });
  });

  /* ==========================================
     LIGHTBOX
     ========================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxVideo = document.getElementById('lightboxVideo');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(src, caption, isVideo = false) {
    if (!lightbox) return;
    if (isVideo) {
      lightboxImg.style.display = 'none';
      lightboxVideo.style.display = 'block';
      lightboxVideo.src = src;
      lightboxVideo.load();
    } else {
      lightboxVideo.style.display = 'none';
      lightboxVideo.pause();
      lightboxVideo.src = '';
      lightboxImg.style.display = 'block';
      lightboxImg.src = src;
    }
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxVideo.pause();
    lightboxVideo.src = '';
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

  // Attach click handlers to media items
  document.querySelectorAll('.media-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const video = item.querySelector('video source');
      const captionEl = item.querySelector('.media-overlay span');
      const caption = captionEl ? captionEl.textContent : '';
      if (video) {
        openLightbox(video.src, caption, true);
      } else if (img) {
        openLightbox(img.src, caption, false);
      }
    });
  });

  /* ==========================================
     PRICE MODAL
     ========================================== */
  const priceModal = document.getElementById('priceModal');
  const priceModalClose = document.getElementById('priceModalClose');

  function openPriceModal() {
    if (!priceModal) return;
    priceModal.classList.add('is-open');
    priceModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closePriceModal() {
    if (!priceModal) return;
    priceModal.classList.remove('is-open');
    priceModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (priceModalClose) priceModalClose.addEventListener('click', closePriceModal);
  if (priceModal) {
    priceModal.addEventListener('click', (e) => {
      if (e.target === priceModal || e.target.classList.contains('modal__backdrop')) closePriceModal();
    });
  }

  // Attach to all "Узнать цену" buttons
  document.querySelectorAll('.js-price-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openPriceModal();
    });
  });

  /* ==========================================
     GLOBAL KEYBOARD HANDLERS
     ========================================== */
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (priceModal && priceModal.classList.contains('is-open')) {
      closePriceModal();
      return;
    }
    if (lightbox && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  /* ==========================================
     SCROLL TO TOP BUTTON
     ========================================== */
  const scrollTopBtn = document.getElementById('scrollTop');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScroll > 400) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ==========================================
     YANDEX METRIKA PHONE CLICK TRACKING
     ========================================== */
  document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
      if (typeof ym === 'function') {
        ym(109376585, 'reachGoal', 'phone_click');
      }
    });
  });

  /* ==========================================
     SMOOTH SCROLL FOR ANCHOR LINKS
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
