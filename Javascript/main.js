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
   Carousel — horizontal scroll-snap track driven by
   prev/next buttons (in addition to native touch/drag scroll).
---------------------------------------------- */
function initCarousel() {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const buttons = carousel.querySelectorAll(".carousel-btn");

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dir = parseInt(btn.dataset.dir, 10);
      const card = track.querySelector(".bet-card");
      const step = card ? card.getBoundingClientRect().width + 18 : 280;
      track.scrollBy({ left: dir * step, behavior: "smooth" });
    });
  });

  // Keyboard support when the track itself is focused
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") track.scrollBy({ left: 280, behavior: "smooth" });
    if (e.key === "ArrowLeft") track.scrollBy({ left: -280, behavior: "smooth" });
  });
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
  const isVertical = () => window.matchMedia("(max-width: 980px)").matches;

  function update() {
    const rect = section.getBoundingClientRect();
    const viewportH = window.innerHeight;

    // Progress: 0 when section bottom hits viewport bottom, 1 when section top hits viewport top.
    const total = rect.height + viewportH * 0.5;
    const traveled = viewportH * 0.85 - rect.top;
    const progress = Math.min(Math.max(traveled / total, 0), 1);

    if (fill) {
      if (isVertical()) {
        fill.style.height = `${progress * 100}%`;
        fill.style.width = "100%";
      } else {
        fill.style.width = `${progress * 100}%`;
        fill.style.height = "100%";
      }
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
