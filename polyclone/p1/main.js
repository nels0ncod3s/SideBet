(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     MOBILE NAV TOGGLE
     ============================================================ */
  var hamburger = document.getElementById('hamburger');
  var mobileTray = document.getElementById('mobileTray');

  if (hamburger && mobileTray) {
    hamburger.addEventListener('click', function () {
      var isOpen = mobileTray.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    mobileTray.querySelectorAll('a, button').forEach(function (el) {
      el.addEventListener('click', function () {
        mobileTray.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ============================================================
     "CREATE BET" CTA — scrolls to the live composer and focuses it
     ============================================================ */
  var composerInput = document.getElementById('composerInput');
  document.querySelectorAll('[data-action="create-bet"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var hero = document.getElementById('top');
      if (hero) hero.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      if (composerInput) setTimeout(function () { composerInput.focus(); }, 400);
    });
  });

  /* ============================================================
     SCROLL REVEAL — IntersectionObserver
     ============================================================ */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ============================================================
     COUNT-UP NUMBERS
     ============================================================ */
  function formatNumber(n) {
    return Math.round(n).toLocaleString('en-US');
  }

  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1400;
    var startTime = null;

    if (prefersReducedMotion) {
      el.textContent = prefix + formatNumber(target) + suffix;
      return;
    }

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = easeOutExpo(progress);
      el.textContent = prefix + formatNumber(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  var statEls = document.querySelectorAll('.stat__value[data-count]');
  if ('IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(function (el) { statObserver.observe(el); });
  } else {
    statEls.forEach(animateCount);
  }

  /* ============================================================
     LIVE MARKET CARD PREVIEW — composer input syncs the bet card
     ============================================================ */
  var cardQuestion = document.getElementById('cardQuestion');
  var cardTag = document.getElementById('cardTag');
  var pctYes = document.getElementById('pctYes');
  var pctNo = document.getElementById('pctNo');
  var cardPool = document.getElementById('cardPool');
  var cardPlayers = document.getElementById('cardPlayers');

  var defaultQuestion = 'Will Arsenal score in the first half?';

  function classifyQuestion(text) {
    var t = text.toLowerCase();
    if (/(arsenal|match|goal|score|kickoff|team|football|nba|league)/.test(t)) return 'SPORTS';
    if (/(btc|eth|crypto|coin|token|price)/.test(t)) return 'CRYPTO';
    if (/(lecture|exam|class|campus|school|professor|lecturer)/.test(t)) return 'CAMPUS';
    if (/(standup|meeting|office|boss|deadline|work)/.test(t)) return 'OFFICE';
    return 'CUSTOM';
  }

  // Deterministic pseudo-random odds derived from the text, so retyping
  // the same question always yields the same split.
  function hashOdds(text) {
    var hash = 0;
    for (var i = 0; i < text.length; i++) {
      hash = (hash * 31 + text.charCodeAt(i)) % 1000;
    }
    var yes = 35 + (hash % 45); // range 35–79
    return yes;
  }

  function updateCard(rawText) {
    var text = rawText.trim();
    var display = text.length ? text : defaultQuestion;
    if (!/[?]\s*$/.test(display)) display = display.replace(/[.\s]*$/, '') + '?';

    cardQuestion.textContent = display;
    cardTag.textContent = classifyQuestion(display);

    var yes = text.length ? hashOdds(display) : 62;
    var no = 100 - yes;
    pctYes.textContent = yes + '%';
    pctNo.textContent = no + '%';

    var pool = text.length ? 12000 + (hashOdds(display) * 1780) : 148200;
    var players = text.length ? 8 + (hashOdds(display) % 60) * 4 : 213;
    cardPool.textContent = '₦' + Math.round(pool).toLocaleString('en-US') + ' pool';
    cardPlayers.textContent = players + ' in';
  }

  if (composerInput) {
    var debounceId;
    composerInput.addEventListener('input', function (e) {
      clearTimeout(debounceId);
      debounceId = setTimeout(function () {
        updateCard(e.target.value);
      }, 80);
    });
  }

  /* ============================================================
     ODDS BUTTON SELECTION STATE
     ============================================================ */
  var oddsButtons = document.querySelectorAll('.odds-btn');
  oddsButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      oddsButtons.forEach(function (b) { b.classList.remove('is-selected'); });
      btn.classList.add('is-selected');
    });
  });

  /* ============================================================
     TERMINAL TYPED LINE — replay the "type effect" once in view
     ============================================================ */
  var typedEl = document.getElementById('terminalTyped');
  if (typedEl && !prefersReducedMotion) {
    var fullText = typedEl.textContent;
    typedEl.textContent = '';

    var typeObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var i = 0;
          var typeInterval = setInterval(function () {
            typedEl.textContent = fullText.slice(0, i + 1);
            i++;
            if (i >= fullText.length) clearInterval(typeInterval);
          }, 28);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });

    typeObserver.observe(typedEl);
  }
})();
