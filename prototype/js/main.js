/* ================================================================
   BRAUSSE GROUP — Prototype JS
   Sticky header, scroll reveals, count-up, product tabs
================================================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------------
     STICKY HEADER
  ---------------------------------------------------------------- */
  (function initHeader() {
    const header = document.getElementById('site-header');
    const hero   = document.querySelector('.hero');
    if (!header || !hero) return;

    const obs = new IntersectionObserver(
      ([entry]) => header.classList.toggle('is-solid', !entry.isIntersecting),
      { threshold: 0, rootMargin: `-${header.offsetHeight}px 0px 0px 0px` }
    );
    obs.observe(hero);
  })();


  /* ----------------------------------------------------------------
     MOBILE MENU
  ---------------------------------------------------------------- */
  (function initMobileMenu() {
    const btn    = document.getElementById('menu-btn');
    const close  = document.getElementById('menu-close');
    const menu   = document.getElementById('mobile-menu');
    const links  = menu ? menu.querySelectorAll('.mobile-menu__link') : [];
    if (!btn || !menu) return;

    function open() {
      menu.classList.add('is-open');
      menu.setAttribute('aria-hidden', 'false');
      btn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      close && close.focus();
    }

    function closeMenu() {
      menu.classList.remove('is-open');
      menu.setAttribute('aria-hidden', 'true');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      btn.focus();
    }

    btn.addEventListener('click', open);
    close && close.addEventListener('click', closeMenu);
    links.forEach(l => l.addEventListener('click', closeMenu));

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
    });
  })();


  /* ----------------------------------------------------------------
     SCROLL REVEAL
  ---------------------------------------------------------------- */
  (function initReveal() {
    if (prefersReducedMotion) return;

    const items = document.querySelectorAll('.reveal-item');
    if (!items.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    items.forEach(el => obs.observe(el));
  })();


  /* ----------------------------------------------------------------
     COUNT-UP ANIMATION
  ---------------------------------------------------------------- */
  (function initCountUp() {
    const numbers = document.querySelectorAll('.count-up');
    if (!numbers.length) return;

    function easeOutQuart(t) {
      return 1 - Math.pow(1 - t, 4);
    }

    function animateCount(el) {
      const parent = el.closest('[data-target]');
      const target = parseInt(parent ? parent.dataset.target : el.dataset.target, 10);
      if (isNaN(target)) return;

      const duration = prefersReducedMotion ? 0 : 1600;
      const start    = performance.now();

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const value    = Math.floor(easeOutQuart(progress) * target);
        el.textContent = value;
        if (progress < 1) requestAnimationFrame(step);
        else el.textContent = target;
      }

      if (duration === 0) {
        el.textContent = target;
      } else {
        requestAnimationFrame(step);
      }
    }

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    numbers.forEach(el => obs.observe(el));
  })();


  /* ----------------------------------------------------------------
     SVG MAP DOTS — trigger animation when in view
  ---------------------------------------------------------------- */
  (function initMapDots() {
    const mapWrap = document.querySelector('.metrics__map-wrap');
    if (!mapWrap) return;

    if (prefersReducedMotion) {
      mapWrap.querySelectorAll('.map-dot').forEach(d => {
        d.style.opacity = '0.8';
        d.style.animation = 'none';
      });
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          mapWrap.classList.add('map-active');
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    obs.observe(mapWrap);
  })();


  /* ----------------------------------------------------------------
     PRODUCT TABS
  ---------------------------------------------------------------- */
  (function initProductTabs() {
    const tabList = document.querySelector('.products__tabs');
    if (!tabList) return;

    const tabs     = tabList.querySelectorAll('.products__tab');
    const panels   = document.querySelectorAll('.products__content');
    const images   = document.querySelectorAll('.products__img');

    function activateTab(targetTab) {
      const targetKey = targetTab.dataset.tab;

      tabs.forEach(tab => {
        const isActive = tab === targetTab;
        tab.classList.toggle('products__tab--active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
      });

      panels.forEach(panel => {
        const isActive = panel.id === `tab-${targetKey}`;
        if (isActive) {
          panel.removeAttribute('hidden');
        } else {
          panel.setAttribute('hidden', '');
        }
      });

      images.forEach(img => {
        const isActive = img.dataset.tab === targetKey;
        img.classList.toggle('products__img--active', isActive);
      });
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => activateTab(tab));
      tab.addEventListener('keydown', e => {
        let newTab;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          const idx = Array.from(tabs).indexOf(tab);
          newTab = tabs[(idx + 1) % tabs.length];
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          const idx = Array.from(tabs).indexOf(tab);
          newTab = tabs[(idx - 1 + tabs.length) % tabs.length];
        }
        if (newTab) {
          newTab.focus();
          activateTab(newTab);
        }
      });
    });
  })();

})();
