(() => {
  'use strict';

  /* =========================================================
     Mobile menu toggle
  ========================================================= */
  const burger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
      mobileMenu.classList.toggle('open', !isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.setAttribute('aria-expanded', 'false');
        burger.setAttribute('aria-label', 'Open menu');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* =========================================================
     Scroll reveal via IntersectionObserver
  ========================================================= */
  const revealTargets = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window && revealTargets.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show everything immediately
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* =========================================================
     Count-up statistics
  ========================================================= */
  const countTargets = document.querySelectorAll('[data-count-to]');

  const formatCount = (value, prefix = '', suffix = '') => {
    const rounded = Math.round(value);
    return `${prefix}${rounded.toLocaleString('en-NG')}${suffix}`;
  };

  const runCountUp = (el) => {
    const target = parseFloat(el.getAttribute('data-count-to'), 10) || 0;
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = formatCount(target * eased, prefix, suffix);

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = formatCount(target, prefix, suffix);
      }
    };

    requestAnimationFrame(tick);
  };

  if ('IntersectionObserver' in window && countTargets.length) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          runCountUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    countTargets.forEach(el => countObserver.observe(el));
  } else {
    countTargets.forEach(runCountUp);
  }

  /* =========================================================
     Marquee: pause on hover/focus for readability
  ========================================================= */
  const marquee = document.querySelector('.marquee');
  const marqueeTrack = document.querySelector('.marquee-track');

  if (marquee && marqueeTrack) {
    const pause = () => { marqueeTrack.style.animationPlayState = 'paused'; };
    const resume = () => { marqueeTrack.style.animationPlayState = 'running'; };

    marquee.addEventListener('mouseenter', pause);
    marquee.addEventListener('mouseleave', resume);
    marquee.addEventListener('focusin', pause);
    marquee.addEventListener('focusout', resume);
  }

  /* =========================================================
     Hero market-creation input (demo behaviour)
  ========================================================= */
  const marketForm = document.getElementById('marketForm');
  const marketInput = document.getElementById('marketQuestion');

  if (marketForm && marketInput) {
    marketForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const question = marketInput.value.trim();
      if (!question) {
        marketInput.focus();
        return;
      }
      const btn = marketForm.querySelector('.hero-input-btn');
      const originalLabel = btn.textContent;
      btn.textContent = 'Market created ✓';
      marketInput.value = '';
      setTimeout(() => { btn.textContent = originalLabel; }, 2200);
    });
  }

  /* =========================================================
     Bento cells: keyboard-friendly hover-card toggle
     (mirrors :hover behaviour for touch/keyboard users)
  ========================================================= */
  const bentoCells = document.querySelectorAll('.bento-cell:not(.bento-cell--featured)');

  bentoCells.forEach(cell => {
    cell.addEventListener('click', (e) => {
      // Ignore clicks on the pill buttons themselves
      if (e.target.closest('.pill')) return;
      cell.classList.toggle('is-open');
      const card = cell.querySelector('.bento-hover-card');
      if (card) {
        const isOpen = cell.classList.contains('is-open');
        card.style.transform = isOpen ? 'translateY(0)' : '';
        card.style.opacity = isOpen ? '1' : '';
        card.style.pointerEvents = isOpen ? 'auto' : '';
      }
    });
  });

})();
