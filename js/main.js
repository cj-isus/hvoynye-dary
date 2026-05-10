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

  // Map embed URLs — fill these after receiving embed codes from customer
  const mapUrls = {
    yandex: '',   // e.g. 'https://yandex.ru/map-widget/v1/?ll=...'
    google: '',   // e.g. 'https://www.google.com/maps/embed?pb=...'
    dgis: ''      // e.g. 'https://widgets.2gis.com/...'
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

    const address = 'адрес базы'; // Replace with real address
    const links = {
      yandex: `https://yandex.ru/maps/?rtext=~${encodeURIComponent(address)}&rtt=auto`,
      google: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`,
      dgis: `https://2gis.ru/search/${encodeURIComponent(address)}`
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
