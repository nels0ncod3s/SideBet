/* ============================================
   POLYCLONE — main.js
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initLanguageSwitcher();
  initSmoothNavLinks();
  initScrollReveal();
  initCountUp();
  initCarousel();
  initFlowParallax();
  initMobileNav();
  initFooterWordmarkFit();
});

/* ----------------------------------------------
   Language switcher
   - Hover OR click opens the dropdown (handled in CSS for hover,
     here we add click support for touch devices + keyboard).
   - Selecting a language updates the trigger label and persists
     the choice. Swap translations.json/i18n wiring in here when ready.
---------------------------------------------- */
function initLanguageSwitcher() {
  const switcher = document.querySelector(".lang-switch");
  if (!switcher) return;

  const trigger = switcher.querySelector(".lang-trigger");
  const currentLabel = switcher.querySelector(".lang-current");
  const dropdown = switcher.querySelector(".lang-dropdown");
  const options = Array.from(dropdown.querySelectorAll("li"));

  const STORAGE_KEY = "polyclone_lang";
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    const match = options.find((opt) => opt.dataset.lang === saved);
    if (match) selectLanguage(match);
  }

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle("is-open-mobile");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });

  options.forEach((opt) => {
    opt.setAttribute("tabindex", "0");
    opt.addEventListener("click", () => selectLanguage(opt));
    opt.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectLanguage(opt);
      }
    });
  });

  document.addEventListener("click", () => {
    dropdown.classList.remove("is-open-mobile");
    trigger.setAttribute("aria-expanded", "false");
  });

  function selectLanguage(opt) {
    options.forEach((o) => o.removeAttribute("aria-selected"));
    opt.setAttribute("aria-selected", "true");
    currentLabel.textContent = opt.dataset.label;
    document.documentElement.lang = opt.dataset.lang;
    localStorage.setItem(STORAGE_KEY, opt.dataset.lang);

    // Hook point: wire this into your i18n/translation loader.
    // e.g. loadTranslations(opt.dataset.lang).then(applyTranslations);
    document.dispatchEvent(
      new CustomEvent("polyclone:languagechange", { detail: { lang: opt.dataset.lang } })
    );
  }
}

/* ----------------------------------------------
   Smooth scroll for in-page nav links
---------------------------------------------- */
function initSmoothNavLinks() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

/* ----------------------------------------------
   Scroll reveal — fades/raises elements with [data-reveal]
   once they enter the viewport.
---------------------------------------------- */
function initScrollReveal() {
  const targets = document.querySelectorAll("[data-reveal]");
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ----------------------------------------------
   Count-up animation for the numbers strip.
   Reads data-count-to / data-prefix / data-suffix from each element
   and animates from 0 once visible.
---------------------------------------------- */
function initCountUp() {
  const counters = document.querySelectorAll("[data-count-to]");
  if (!counters.length) return;

  const formatNumber = (num) => Math.round(num).toLocaleString("en-US");

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.countTo, 10);
    const prefix = el.dataset.prefix || "";
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = target * eased;
      el.textContent = `${prefix}${formatNumber(value)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => observer.observe(el));
}

/* ----------------------------------------------
   Social proof marquee:
   - Desktop/tablet: cards duplicated once, then translated
     left continuously for a seamless infinite loop. Pauses on
     hover/focus/touch so people can actually read a card.
   - Mobile (<=760px): animation is skipped entirely and the
     track falls back to plain native horizontal scroll-snap,
     so it's swipeable instead of auto-scrolling.
---------------------------------------------- */
function initCarousel() {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const track = carousel.querySelector("[data-marquee]");
  if (!track) return;

  const isMobile = () => window.matchMedia("(max-width: 760px)").matches;
  const SPEED = 40; // pixels per second

  let originalCards = Array.from(track.children);
  let cloned = false;
  let offset = 0;
  let lastTime = null;
  let paused = false;
  let rafId = null;

  function cloneCardsForLoop() {
    if (cloned) return;
    originalCards.forEach((card) => {
      track.appendChild(card.cloneNode(true));
    });
    cloned = true;
  }

  function uncloneCards() {
    if (!cloned) return;
    track.innerHTML = "";
    originalCards.forEach((card) => track.appendChild(card));
    cloned = false;
    offset = 0;
    track.style.transform = "";
  }

  function setWidth() {
    return originalCards.reduce((sum, card) => sum + card.getBoundingClientRect().width + 18, 0);
  }

  function tick(now) {
    if (lastTime === null) lastTime = now;
    const delta = (now - lastTime) / 1000;
    lastTime = now;

    if (!paused && !isMobile()) {
      const loopWidth = setWidth();
      offset -= SPEED * delta;
      if (Math.abs(offset) >= loopWidth) offset += loopWidth;
      track.style.transform = `translateX(${offset}px)`;
    }
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (isMobile() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      uncloneCards();
      return;
    }
    cloneCardsForLoop();
    if (!rafId) rafId = requestAnimationFrame(tick);
  }

  carousel.addEventListener("mouseenter", () => (paused = true));
  carousel.addEventListener("mouseleave", () => (paused = false));
  carousel.addEventListener("focusin", () => (paused = true));
  carousel.addEventListener("focusout", () => (paused = false));
  carousel.addEventListener("touchstart", () => (paused = true), { passive: true });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(start, 200);
  });

  start();
}

/* ----------------------------------------------
   "How it works" parallax flow:
   - Fills the connecting line and activates each step marker
     based on scroll progress through the section.
---------------------------------------------- */
function initFlowParallax() {
  const section = document.querySelector(".how-it-works");
  if (!section) return;

  const fill = section.querySelector(".flow-line-fill");
  const steps = Array.from(section.querySelectorAll(".flow-step"));

  function update() {
    const rect = section.getBoundingClientRect();
    const viewportH = window.innerHeight;

    // Progress: 0 when section bottom hits viewport bottom, 1 when section top hits viewport top.
    const total = rect.height + viewportH * 0.5;
    const traveled = viewportH * 0.85 - rect.top;
    const progress = Math.min(Math.max(traveled / total, 0), 1);

    if (fill) {
      fill.style.height = `${progress * 100}%`;
    }

    steps.forEach((step, i) => {
      const threshold = i / steps.length;
      step.classList.toggle("is-active", progress >= threshold + 0.06);
    });
  }

  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
}

/* ----------------------------------------------
   Mobile nav toggle — simple slide-down menu using the
   existing nav + cta markup for small screens.
---------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  if (!toggle || !header) return;

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

/* ----------------------------------------------
   Footer wordmark fit:
   - Sizes the "Polyclone" wordmark so it spans roughly 92.5%
     of the footer's width (e.g. ~370px wide inside a 400px
     footer), regardless of viewport size.
---------------------------------------------- */
function initFooterWordmarkFit() {
  const wordmark = document.querySelector(".footer-wordmark");
  const footer = document.querySelector(".site-footer");
  if (!wordmark || !footer) return;

  const TARGET_RATIO = 0.925;

  function fit() {
    const footerWidth = footer.getBoundingClientRect().width;
    const targetWidth = footerWidth * TARGET_RATIO;

    // Measure at a known reference size, then scale proportionally.
    const referenceSize = 200; // px
    wordmark.style.fontSize = `${referenceSize}px`;
    const measuredWidth = wordmark.getBoundingClientRect().width;
    if (!measuredWidth) return;

    const newSize = (targetWidth / measuredWidth) * referenceSize;
    wordmark.style.fontSize = `${newSize}px`;
  }

  fit();
  window.addEventListener("resize", fit);

  // Fonts loading async can change measured width after first paint.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fit);
  }
}
