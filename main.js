/**
 * Alexandra García — AI Systems Engineer Portfolio
 * i18n · Theme · Nav · Reveal · Counters · GitHub
 */

'use strict';

const GITHUB_USER = 'PandoraRiot';

const I18nModule = (() => {
  let currentLang = localStorage.getItem('lang') || 'en';

  const get = (key) => {
    const parts = key.split('.');
    let val = window.I18N[currentLang];
    for (const p of parts) {
      if (!val || val[p] === undefined) return null;
      val = val[p];
    }
    return val;
  };

  const apply = () => {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const val = get(el.dataset.i18n);
      if (val !== null) el.textContent = val;
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const val = get(el.dataset.i18nHtml);
      if (val !== null) el.innerHTML = val;
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const val = get(el.dataset.i18nAlt);
      if (val !== null) el.setAttribute('alt', val);
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const val = get(el.dataset.i18nAria);
      if (val !== null) el.setAttribute('aria-label', val);
    });

    document.querySelectorAll('[data-i18n-tags]').forEach(el => {
      const val = get(el.dataset.i18nTags);
      if (val !== null) {
        el.innerHTML = val.split(',').map(t => `<span>${t.trim()}</span>`).join('');
      }
    });

    const title = get('meta.title');
    const desc  = get('meta.description');
    const pageTitleEl = document.getElementById('pageTitle');
    if (title && pageTitleEl) pageTitleEl.textContent = title;
    if (desc)  document.getElementById('metaDescription')?.setAttribute('content', desc);

    const logo = document.getElementById('navLogoLabel');
    if (logo) logo.setAttribute('aria-label', get('nav.home') || '');

    document.documentElement.setAttribute('lang', currentLang);
  };

  const setLang = (lang) => {
    if (!window.I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.querySelectorAll('.lang-switch__btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === lang);
    });
    apply();
    ThemeModule.updateAriaLabel();
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
  };

  const init = () => {
    document.querySelectorAll('.lang-switch__btn').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.lang === currentLang);
      btn.addEventListener('click', () => setLang(btn.dataset.lang));
    });
    apply();
  };

  return { init, get, getLang: () => currentLang, setLang };
})();

const ThemeModule = (() => {
  const META_COLORS = { dark: '#000000', light: '#e8ecf3' };
  let theme = localStorage.getItem('theme') || 'dark';

  const apply = (t) => {
    theme = t;
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
    const meta = document.getElementById('themeColorMeta');
    if (meta) meta.setAttribute('content', META_COLORS[t]);
    updateAriaLabel();
  };

  const updateAriaLabel = () => {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    const key = theme === 'dark' ? 'theme.light' : 'theme.dark';
    btn.setAttribute('aria-label', I18nModule.get(key) || 'Toggle theme');
  };

  const toggle = () => apply(theme === 'dark' ? 'light' : 'dark');

  const init = () => {
    apply(theme);
    document.getElementById('themeToggle')?.addEventListener('click', toggle);
  };

  return { init, updateAriaLabel };
})();

const NavModule = (() => {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const links  = document.getElementById('navLinks');

  const handleScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);

  const toggleMenu = () => {
    const isOpen = links.classList.toggle('is-open');
    burger.classList.toggle('is-open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMenu = () => {
    links.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  const init = () => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    burger.addEventListener('click', toggleMenu);
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => {
      if (links.classList.contains('is-open') && !nav.contains(e.target)) closeMenu();
    });
    handleScroll();
  };

  return { init };
})();

const RevealModule = (() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

  const init = () => {
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  return { init };
})();

/**
 * Metric counters. The static HTML already holds the FINAL value (so a
 * JS failure or reduced motion never shows "0"); only when JS runs and
 * motion is allowed do we reset to 0 and count up on first view.
 */
const CounterModule = (() => {
  const finalText = (el) => `${parseInt(el.dataset.count, 10)}${el.dataset.suffix || ''}`;

  const animate = (el) => {
    const target   = parseInt(el.dataset.count, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = (progress < 1 ? Math.floor(eased * target) : target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  };

  const init = () => {
    const els = document.querySelectorAll('.metric-card__value[data-count]');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach(el => { el.textContent = finalText(el); });
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animate(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    els.forEach(el => { el.textContent = `0${el.dataset.suffix || ''}`; observer.observe(el); });
  };

  return { init };
})();

const ProjectFilterModule = (() => {
  const filters = document.querySelectorAll('.projects__filter');
  const cards   = document.querySelectorAll('.project-card');

  const filter = (category) => {
    cards.forEach(card => {
      const cats = card.dataset.category.split(' ');
      card.classList.toggle('is-hidden', category !== 'all' && !cats.includes(category));
    });
    document.dispatchEvent(new CustomEvent('projectsfilterchange'));
  };

  const init = () => {
    filters.forEach(btn => {
      btn.addEventListener('click', () => {
        filters.forEach(f => {
          f.classList.remove('is-active');
          f.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');
        filter(btn.dataset.filter);
      });
    });
  };

  return { init };
})();

/**
 * Projects carousel — same pause/nav/dots mechanics as the Model Lab
 * carousel, applied to the existing static .project-card markup. Autoplay
 * is a slow continuous drift (not a jump every few seconds): it holds at
 * the end, rewinds to the start, and pauses on hover/focus/touch or when
 * the carousel is off-screen.
 * Rebuilds its dots/position whenever ProjectFilterModule changes which
 * cards are visible (listens for 'projectsfilterchange').
 */
const ProjectCarouselModule = (() => {
  const DRIFT_PX_PER_S = 18;
  const END_HOLD_MS = 2500;
  const REWIND_MS = 1500;
  let viewport, track, dotsEl, prevBtn, nextBtn;
  let rafId = null;
  let lastTs = 0;
  let pos = 0;
  let holdUntil = 0;
  let rewindPending = false;
  let inView = false;
  let paused = false;
  let resumeTimer = null;

  const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const visibleCards = () => [...track.querySelectorAll('.project-card')].filter(c => !c.classList.contains('is-hidden'));

  const cardStep = () => {
    const first = visibleCards()[0];
    if (!first) return 0;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '0');
    return first.getBoundingClientRect().width + gap;
  };

  const updateActiveDot = () => {
    const step = cardStep();
    if (!step) return;
    const idx = Math.round(viewport.scrollLeft / step);
    dotsEl?.querySelectorAll('.lab-carousel__dot').forEach((d, i) => d.classList.toggle('is-active', i === idx));
    if (prevBtn) prevBtn.disabled = viewport.scrollLeft < 8;
    if (nextBtn) nextBtn.disabled = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 8;
  };

  const goTo = (index) => {
    const step = cardStep();
    viewport.scrollTo({ left: step * index, behavior: prefersReduced() ? 'auto' : 'smooth' });
  };

  const advance = (dir) => {
    const step = cardStep();
    if (!step) return;
    const atEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 8;
    const atStart = viewport.scrollLeft < 8;
    if (dir > 0 && atEnd) { viewport.scrollTo({ left: 0, behavior: prefersReduced() ? 'auto' : 'smooth' }); return; }
    if (dir < 0 && atStart) { viewport.scrollTo({ left: viewport.scrollWidth, behavior: prefersReduced() ? 'auto' : 'smooth' }); return; }
    viewport.scrollBy({ left: dir * step, behavior: prefersReduced() ? 'auto' : 'smooth' });
  };

  const renderDots = () => {
    if (!dotsEl) return;
    const cards = visibleCards();
    dotsEl.innerHTML = cards.map((c, i) => {
      const label = c.querySelector('.project-card__title')?.textContent?.trim() || `Project ${i + 1}`;
      return `<button type="button" class="lab-carousel__dot${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-label="${label}"></button>`;
    }).join('');
    dotsEl.querySelectorAll('.lab-carousel__dot').forEach(dot => {
      dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index, 10)));
    });
  };

  const refresh = () => {
    viewport.scrollLeft = 0;
    pos = 0;
    rewindPending = false;
    renderDots();
    requestAnimationFrame(updateActiveDot);
  };

  // scrollLeft is kept as a float in `pos` because browsers round it, which
  // would stall a sub-pixel-per-frame drift.
  const tick = (ts) => {
    rafId = requestAnimationFrame(tick);
    const dt = lastTs ? Math.min(ts - lastTs, 100) : 0;
    lastTs = ts;
    if (paused || !inView || document.hidden || ts < holdUntil) { pos = viewport.scrollLeft; return; }
    const max = viewport.scrollWidth - viewport.clientWidth;
    if (max <= 0) return;
    // Something else moved it (dot click, filter, resize) — follow it.
    if (Math.abs(viewport.scrollLeft - pos) > 2) pos = viewport.scrollLeft;
    if (rewindPending) {
      rewindPending = false;
      viewport.scrollTo({ left: 0, behavior: 'smooth' });
      holdUntil = ts + REWIND_MS;
      return;
    }
    if (pos >= max - 1) { rewindPending = true; holdUntil = ts + END_HOLD_MS; return; }
    pos = Math.min(max, pos + (DRIFT_PX_PER_S * dt) / 1000);
    viewport.scrollLeft = pos;
  };

  const startAutoplay = () => {
    if (prefersReduced() || rafId) return;
    viewport.classList.add('is-drifting');
    rafId = requestAnimationFrame(tick);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; }, { threshold: 0.3 }).observe(viewport);
    } else {
      inView = true;
    }
  };

  const pause = () => { paused = true; clearTimeout(resumeTimer); };
  const resume = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(() => { paused = false; }, 1200); };

  const bindInteraction = () => {
    [viewport, prevBtn, nextBtn, dotsEl].forEach(el => {
      el?.addEventListener('pointerenter', pause);
      el?.addEventListener('pointerleave', resume);
      el?.addEventListener('focusin', pause);
      el?.addEventListener('focusout', resume);
      el?.addEventListener('touchstart', pause, { passive: true });
      el?.addEventListener('touchend', resume, { passive: true });
    });
    prevBtn?.addEventListener('click', () => advance(-1));
    nextBtn?.addEventListener('click', () => advance(1));
    viewport?.addEventListener('scroll', () => requestAnimationFrame(updateActiveDot), { passive: true });
    viewport?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); advance(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); advance(-1); }
    });
  };

  const init = () => {
    viewport = document.getElementById('projViewport');
    track = document.getElementById('projectsGrid');
    dotsEl = document.getElementById('projDots');
    prevBtn = document.getElementById('projPrev');
    nextBtn = document.getElementById('projNext');
    if (!viewport || !track) return;

    // Cards scrolled in horizontally never cross the vertical reveal
    // observer, so they would stay invisible — the carousel itself reveals.
    track.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));

    refresh();
    bindInteraction();
    startAutoplay();

    document.addEventListener('projectsfilterchange', refresh);
    window.addEventListener('resize', () => requestAnimationFrame(updateActiveDot));
  };

  return { init };
})();

/**
 * GitHub activity — public REST API (no token) with a localStorage cache
 * (1 h) so repeat visits and language switches don't burn the 60 req/h
 * anonymous limit. If the API fails: stale cache → curated fallback.
 * Forks and empty repos are filtered out so only original work is shown.
 * Third-party stat cards (images) hide themselves if their service fails.
 */
const GitHubModule = (() => {
  const CACHE_KEY = 'gh-cache-v2';
  const TTL_MS = 60 * 60 * 1000;
  const LANG_COLORS = {
    Python: '#3572A5', Java: '#b07219', JavaScript: '#f1e05a',
    TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c',
    'Jupyter Notebook': '#DA5B0B', Shell: '#89e051', 'C#': '#178600',
  };
  // Shown only when the API and the cache both fail. Public, original repos.
  const FALLBACK = [
    { name: 'MRI_BreastCancer_Classification', language: 'Jupyter Notebook', description: { en: 'DCE-MRI breast-lesion classification — thesis experiments (ResNet50, EfficientNet-B3, MobileViT-S).', es: 'Clasificación de lesiones mamarias en DCE-MRI — experimentos de la tesis (ResNet50, EfficientNet-B3, MobileViT-S).' } },
    { name: 'fintech_NovaAI', language: 'Python', description: { en: 'Fintech solution that segments users by banking activity (DATAHACKA 2026, Pascual Bravo).', es: 'Solución fintech que segmenta usuarios por movimientos bancarios (DATAHACKA 2026, Pascual Bravo).' } },
    { name: 'Clasificaciondefrutas.udea.novateam', language: 'Jupyter Notebook', description: { en: 'CNN fruit classification — AI Diploma, UdeA + Talento Tech.', es: 'Clasificación de frutas con CNN — Diplomado IA, UdeA + Talento Tech.' } },
    { name: 'Nova_Ecommerce', language: 'Java', description: { en: 'E-commerce with Spring Boot, MySQL and React.', es: 'E-commerce con Spring Boot, MySQL y React.' } },
  ];

  let data = null;     // { user, repos, source: 'live' | 'cache' | 'fallback' }

  const locale = () => I18nModule.getLang() === 'es' ? 'es-ES' : 'en-US';
  const esc = (v) => String(v ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  const readCache = () => {
    try { return JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); } catch { return null; }
  };
  const writeCache = (payload) => {
    try { localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), ...payload })); } catch { /* storage blocked */ }
  };

  const fetchJSON = async (url) => {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 8000);
    try {
      const res = await fetch(url, { signal: ctrl.signal, headers: { Accept: 'application/vnd.github+json' } });
      if (!res.ok) throw new Error(`GitHub ${res.status}`);
      return await res.json();
    } finally { clearTimeout(timer); }
  };

  const original = (repos) => repos.filter(r => !r.fork && !r.archived && r.size > 0);

  const primaryLanguage = (repos) => {
    const count = {};
    original(repos).forEach(r => { if (r.language) count[r.language] = (count[r.language] || 0) + 1; });
    return Object.entries(count).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
  };

  const repoCard = (repo) => {
    const lang  = repo.language || 'Other';
    const color = LANG_COLORS[lang] || '#6366f1';
    const rawDesc = repo.description;
    const desc  = (rawDesc && typeof rawDesc === 'object') ? (rawDesc[I18nModule.getLang()] || rawDesc.en) : (rawDesc || I18nModule.get('github.noDesc'));
    const stars = repo.stargazers_count || 0;
    const date  = repo.pushed_at
      ? `<span>${I18nModule.get('github.updated')} ${new Date(repo.pushed_at).toLocaleDateString(locale(), { month: 'short', year: 'numeric' })}</span>`
      : '';
    const url = repo.html_url || `https://github.com/${GITHUB_USER}/${repo.name}`;
    return `
      <a href="${esc(url)}" class="gh-repo" target="_blank" rel="noopener noreferrer">
        <div class="gh-repo__header">
          <i class="ph ph-book-bookmark"></i>
          <span class="gh-repo__name">${esc(repo.name)}</span>
        </div>
        <p class="gh-repo__desc">${esc(desc)}</p>
        <div class="gh-repo__meta">
          <span class="gh-repo__lang"><span class="gh-repo__lang-dot" style="background:${color}"></span>${esc(lang)}</span>
          ${stars > 0 ? `<span><i class="ph ph-star"></i> ${stars}</span>` : ''}
          ${date}
        </div>
      </a>`;
  };

  const setStat = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val ?? '—'; };

  const render = () => {
    const container = document.getElementById('githubRepos');
    const note = document.getElementById('ghNote');
    if (!container || !data) return;

    if (data.source === 'fallback') {
      setStat('ghRepos', '—'); setStat('ghOriginal', '—'); setStat('ghFollowers', '—'); setStat('ghLanguage', 'Python');
      container.innerHTML = FALLBACK.map(repoCard).join('') + `
        <div class="gh-repo gh-repo--more">
          <a href="https://github.com/${GITHUB_USER}" class="btn btn--ghost" target="_blank" rel="noopener noreferrer">
            <i class="ph ph-github-logo"></i> ${I18nModule.get('github.viewAll')}
          </a>
        </div>`;
      if (note) { note.textContent = I18nModule.get('github.offline'); note.hidden = false; }
      return;
    }

    const own = original(data.repos)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
      .slice(0, 6);
    setStat('ghRepos', data.user.public_repos);
    setStat('ghOriginal', original(data.repos).length);
    setStat('ghFollowers', data.user.followers);
    setStat('ghLanguage', primaryLanguage(data.repos) || '—');
    container.innerHTML = own.map(repoCard).join('');
    if (note) {
      note.hidden = data.source !== 'cache';
      if (data.source === 'cache') note.textContent = I18nModule.get('github.cached');
    }
  };

  const load = async () => {
    const cached = readCache();
    if (cached && Date.now() - cached.t < TTL_MS) {
      data = { user: cached.user, repos: cached.repos, source: 'live' };
      render();
      return;
    }
    try {
      const [user, repos] = await Promise.all([
        fetchJSON(`https://api.github.com/users/${GITHUB_USER}`),
        fetchJSON(`https://api.github.com/users/${GITHUB_USER}/repos?sort=pushed&per_page=100&type=owner`),
      ]);
      // Keep only what we render — smaller cache, nothing sensitive (public data)
      const slim = repos.map(({ name, html_url, description, language, stargazers_count, pushed_at, fork, archived, size }) =>
        ({ name, html_url, description, language, stargazers_count, pushed_at, fork, archived, size }));
      const slimUser = { public_repos: user.public_repos, followers: user.followers };
      writeCache({ user: slimUser, repos: slim });
      data = { user: slimUser, repos: slim, source: 'live' };
    } catch {
      data = cached ? { user: cached.user, repos: cached.repos, source: 'cache' } : { source: 'fallback' };
    }
    render();
  };

  /* Third-party stat cards: hide any card whose image fails; hide the
     whole block if all of them fail. */
  const initCards = () => {
    const wrap = document.getElementById('ghCards');
    if (!wrap) return;
    const cards = [...wrap.querySelectorAll('.gh-card')];
    const check = () => { if (cards.every(c => c.hidden)) wrap.hidden = true; };
    cards.forEach(card => {
      const img = card.querySelector('img');
      if (!img) return;
      const fail = () => { card.hidden = true; check(); };
      img.addEventListener('error', fail);
      if (img.complete && img.naturalWidth === 0 && img.currentSrc) fail();
    });
  };

  const init = () => {
    initCards();
    load();
    document.addEventListener('langchange', render);   // re-render text only, no refetch
  };

  return { init };
})();

const SmoothScrollModule = (() => {
  const NAV_OFFSET = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;

  const init = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
          behavior: 'smooth',
        });
      });
    });
  };

  return { init };
})();

const FooterYearModule = (() => {
  const init = () => {
    const el = document.getElementById('footerYear');
    if (el) el.textContent = new Date().getFullYear();
  };
  return { init };
})();

/**
 * Model Lab carousel — auto-advancing, filterable, data-driven from
 * models-data.js. Placeholder covers are generated inline (labeled with
 * the model name) until a real `cover` image is set on that model's entry.
 */
const ModelLabModule = (() => {
  const STATUS_KEY = {
    planned: 'statusPlanned', research: 'statusResearch', development: 'statusDevelopment',
    trained: 'statusTrained', deployed: 'statusDeployed',
  };
  const AUTOPLAY_MS = 4200;

  let track, viewport, dotsEl, filtersEl, prevBtn, nextBtn;
  let activeFilter = 'all';
  let current = [];
  let autoplayTimer = null;
  let paused = false;
  let resumeTimer = null;

  const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const t = (field) => {
    if (field === null || field === undefined) return '';
    if (typeof field === 'string') return field;
    const lang = I18nModule.getLang();
    return field[lang] || field.en || '';
  };

  const cover = (model) => {
    if (model.cover) {
      return `<img src="${model.cover}" alt="${model.shortName} — ${t(model.fullName)}" loading="lazy" />`;
    }
    const pending = (I18nModule.get('lab.coverPending') || 'Cover pending').toUpperCase();
    return `
      <svg viewBox="0 0 400 300" role="img" aria-label="${model.shortName} — ${pending}">
        <rect width="400" height="300" style="fill:var(--color-bg-alt)"/>
        <rect x="12" y="12" width="376" height="276" fill="none" style="stroke:var(--color-border-hover)" stroke-width="1.5" stroke-dasharray="6 6"/>
        <text x="200" y="152" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="42" style="fill:var(--color-text-faint)">${model.shortName}</text>
        <text x="200" y="184" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="12" letter-spacing="1" style="fill:var(--color-text-faint)">${t(model.type)}</text>
        <text x="200" y="268" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-size="9.5" letter-spacing="1.5" style="fill:var(--color-text-faint)">${pending}</text>
      </svg>`;
  };

  const card = (model) => {
    const statusLabel = I18nModule.get(`lab.${STATUS_KEY[model.status]}`) || model.status;
    return `
      <article class="lab-card" role="listitem">
        <a href="lab.html#/${model.slug}" class="lab-card__cover" tabindex="-1" aria-hidden="true">${cover(model)}</a>
        <div class="lab-card__body">
          <span class="lab-card__num">${model.order}</span>
          <h3 class="lab-card__name">${model.shortName}</h3>
          <p class="lab-card__full">${t(model.fullName)}</p>
          <p class="lab-card__meta">${t(model.type)} · ${model.framework}</p>
          <div class="lab-card__foot">
            <span class="status-tag" data-status="${model.status}">${statusLabel}</span>
            <a href="lab.html#/${model.slug}" class="lab-card__link">${I18nModule.get('lab.viewModel') || 'View model'} <i class="ph ph-arrow-up-right"></i></a>
          </div>
        </div>
      </article>`;
  };

  const uniqueTypes = () => {
    const seen = new Map();
    (window.MODEL_LAB || []).forEach(m => { seen.set(m.type.en, t(m.type)); });
    return [...seen.entries()];
  };

  const renderFilters = () => {
    if (!filtersEl) return;
    const allLabel = I18nModule.get('lab.filterAll') || 'All';
    const chips = [{ key: 'all', label: allLabel }, ...uniqueTypes().map(([key, label]) => ({ key, label }))];
    filtersEl.innerHTML = chips.map(c => `
      <button type="button" class="lab-filter${c.key === activeFilter ? ' is-active' : ''}" data-filter="${c.key}">${c.label}</button>
    `).join('');
    filtersEl.querySelectorAll('.lab-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        renderFilters();
        renderTrack();
      });
    });
  };

  const renderDots = () => {
    if (!dotsEl) return;
    dotsEl.innerHTML = current.map((m, i) => `
      <button type="button" class="lab-carousel__dot${i === 0 ? ' is-active' : ''}" data-index="${i}" aria-label="${m.shortName}"></button>
    `).join('');
    dotsEl.querySelectorAll('.lab-carousel__dot').forEach(dot => {
      dot.addEventListener('click', () => goTo(parseInt(dot.dataset.index, 10)));
    });
  };

  const cardStep = () => {
    const first = track.querySelector('.lab-card');
    if (!first) return 0;
    const style = getComputedStyle(track);
    const gap = parseFloat(style.columnGap || style.gap || '0');
    return first.getBoundingClientRect().width + gap;
  };

  const updateActiveDot = () => {
    const step = cardStep();
    if (!step) return;
    const idx = Math.round(viewport.scrollLeft / step);
    dotsEl?.querySelectorAll('.lab-carousel__dot').forEach((d, i) => d.classList.toggle('is-active', i === idx));
    if (prevBtn) prevBtn.disabled = viewport.scrollLeft < 8;
    if (nextBtn) nextBtn.disabled = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 8;
  };

  const goTo = (index) => {
    const step = cardStep();
    viewport.scrollTo({ left: step * index, behavior: prefersReduced() ? 'auto' : 'smooth' });
  };

  const advance = (dir) => {
    const step = cardStep();
    if (!step) return;
    const atEnd = viewport.scrollLeft + viewport.clientWidth >= viewport.scrollWidth - 8;
    const atStart = viewport.scrollLeft < 8;
    if (dir > 0 && atEnd) { viewport.scrollTo({ left: 0, behavior: prefersReduced() ? 'auto' : 'smooth' }); return; }
    if (dir < 0 && atStart) { viewport.scrollTo({ left: viewport.scrollWidth, behavior: prefersReduced() ? 'auto' : 'smooth' }); return; }
    viewport.scrollBy({ left: dir * step, behavior: prefersReduced() ? 'auto' : 'smooth' });
  };

  const renderTrack = () => {
    if (!track || !window.MODEL_LAB) return;
    current = window.MODEL_LAB
      .filter(m => activeFilter === 'all' || m.type.en === activeFilter)
      .sort((a, b) => a.order.localeCompare(b.order));
    track.innerHTML = current.map(card).join('');
    viewport.scrollLeft = 0;
    renderDots();
    requestAnimationFrame(updateActiveDot);
  };

  const stopAutoplay = () => { if (autoplayTimer) clearInterval(autoplayTimer); autoplayTimer = null; };

  const startAutoplay = () => {
    stopAutoplay();
    if (prefersReduced()) return;
    autoplayTimer = setInterval(() => { if (!paused) advance(1); }, AUTOPLAY_MS);
  };

  const pause = () => { paused = true; clearTimeout(resumeTimer); };
  const resume = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(() => { paused = false; }, 1200); };

  const bindInteraction = () => {
    [viewport, prevBtn, nextBtn].forEach(el => {
      el?.addEventListener('pointerenter', pause);
      el?.addEventListener('pointerleave', resume);
      el?.addEventListener('focusin', pause);
      el?.addEventListener('focusout', resume);
      el?.addEventListener('touchstart', pause, { passive: true });
      el?.addEventListener('touchend', resume, { passive: true });
    });
    prevBtn?.addEventListener('click', () => advance(-1));
    nextBtn?.addEventListener('click', () => advance(1));
    viewport?.addEventListener('scroll', () => requestAnimationFrame(updateActiveDot), { passive: true });
    viewport?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); advance(1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); advance(-1); }
    });
  };

  const init = () => {
    track = document.getElementById('labTrack');
    viewport = document.getElementById('labViewport');
    dotsEl = document.getElementById('labDots');
    filtersEl = document.getElementById('labFilters');
    prevBtn = document.getElementById('labPrev');
    nextBtn = document.getElementById('labNext');
    if (!track || !viewport) return;

    renderFilters();
    renderTrack();
    bindInteraction();
    startAutoplay();

    document.addEventListener('langchange', () => { renderFilters(); renderTrack(); });
    window.addEventListener('resize', () => requestAnimationFrame(updateActiveDot));
  };

  return { init };
})();

/** Model Lab detail — renders lab.html from location.hash (#/slug) */
const ModelLabDetailModule = (() => {
  const STATUS_KEY = {
    planned: 'statusPlanned', research: 'statusResearch', development: 'statusDevelopment',
    trained: 'statusTrained', deployed: 'statusDeployed',
  };

  const t = (field) => {
    if (field === null || field === undefined) return '';
    if (typeof field === 'string') return field;
    const lang = I18nModule.getLang();
    return field[lang] || field.en || '';
  };

  const findModel = () => {
    const slug = (location.hash || '').replace(/^#\/?/, '');
    return window.MODEL_LAB?.find(m => m.slug === slug) || window.MODEL_LAB?.[0];
  };

  const archFlow = (model) => {
    if (!model.architecture?.length) return '';
    return `<ul class="arch-flow-list">${model.architecture.map(step => `<li>${t(step)}</li>`).join('')}</ul>`;
  };

  const optionalSection = (titleKey, bodyHtml) => {
    if (!bodyHtml) return '';
    return `
      <div class="model-detail__section">
        <h2>${I18nModule.get(titleKey)}</h2>
        <div class="body">${bodyHtml}</div>
      </div>`;
  };

  const render = () => {
    const root = document.getElementById('labRoot');
    if (!root) return;
    const model = findModel();
    if (!model) { root.innerHTML = `<p>${I18nModule.get('lab.notFound') || 'Model not found.'}</p>`; return; }

    const statusLabel = I18nModule.get(`lab.${STATUS_KEY[model.status]}`) || model.status;
    document.title = `${model.shortName} · Model Lab · Alexandra García`;

    const evalBody = model.metrics
      ? `<table class="metric-table"><thead><tr><th>Metric</th><th>Value</th></tr></thead>
         <tbody>${model.metrics.map(m => `<tr><td>${t(m.label)}</td><td>${m.value}</td></tr>`).join('')}</tbody></table>
         ${model.metricsNote ? `<p class="metric-note">${t(model.metricsNote)}</p>` : ''}`
      : (model.metricsNote ? `<p>${t(model.metricsNote)}</p>` : `<p>${I18nModule.get('lab.noneYet')}</p>`);

    const inferenceBody = model.inference
      ? `<div class="inference-stub">
           <p><strong>${I18nModule.get('lab.factType')}:</strong> ${t(model.inference.input)} → ${t(model.inference.output)}</p>
           <p>${I18nModule.get('lab.inferenceNote')}</p>
           ${model.api ? `<p><code>POST ${model.api}</code></p>` : ''}
         </div>`
      : '';

    root.innerHTML = `
      <div class="model-detail__head">
        <a href="index.html#lab" class="model-detail__back">← ${I18nModule.get('lab.backToLab')}</a>
        <h1 class="model-detail__title">${model.shortName}</h1>
        <p class="model-detail__full">${t(model.fullName)}</p>
        <dl class="model-detail__facts">
          <div class="mfact"><dt>${I18nModule.get('lab.factType')}</dt><dd>${t(model.type)}</dd></div>
          <div class="mfact"><dt>${I18nModule.get('lab.factFramework')}</dt><dd>${model.framework}</dd></div>
          <div class="mfact"><dt>${I18nModule.get('lab.factTask')}</dt><dd>${t(model.task)}</dd></div>
          <div class="mfact"><dt>${I18nModule.get('lab.factStatus')}</dt><dd><span class="status-tag" data-status="${model.status}">${statusLabel}</span></dd></div>
        </dl>
      </div>
      <p style="max-width:70ch;color:var(--color-text-muted);font-size:var(--text-md);line-height:1.7;">${t(model.summary)}</p>
      ${optionalSection('lab.secArchitecture', archFlow(model))}
      ${optionalSection('lab.secDataset', model.dataset ? `<p>${t(model.dataset)}</p>` : '')}
      ${optionalSection('lab.secTraining', model.training ? `<p>${t(model.training)}</p>` : '')}
      <div class="model-detail__section"><h2>${I18nModule.get('lab.secEvaluation')}</h2><div class="body">${evalBody}</div></div>
      ${optionalSection('lab.secInference', inferenceBody)}
      ${model.repo ? optionalSection('lab.secSource', `<a href="${model.repo}" class="eyebrow-link" style="color:var(--color-accent-light);font-family:var(--font-mono);font-size:var(--text-sm);" target="_blank" rel="noopener noreferrer">${t(model.repoLabel) || model.repo} <i class="ph ph-arrow-up-right"></i></a>`) : ''}
    `;
  };

  const init = () => {
    if (!document.getElementById('labRoot')) return;
    render();
    window.addEventListener('hashchange', render);
    document.addEventListener('langchange', render);
  };

  return { init };
})();

/**
 * Shared media modal (<dialog id="mediaModal">). One modal for every
 * YouTube video, architecture diagram and the thesis explorer.
 * - Esc closes (native dialog `cancel`), so do the × button and a click
 *   on the backdrop.
 * - Closing empties the body, which unloads the iframe and stops playback.
 * - Focus returns to the element that opened it.
 * - Content is re-rendered on language change while open.
 */
const MediaModalModule = (() => {
  let dialog, titleEl, bodyEl, current = null, lastTrigger = null;

  const render = () => {
    if (!current) return;
    titleEl.textContent = typeof current.title === 'function' ? current.title() : current.title;
    bodyEl.innerHTML = '';
    current.render(bodyEl);
  };

  const open = ({ title, render: renderFn, trigger, wide = false }) => {
    if (!dialog) return;
    current = { title, render: renderFn };
    lastTrigger = trigger || document.activeElement;
    dialog.classList.toggle('media-modal--wide', wide);
    if (!dialog.open) dialog.showModal();   // open first so render() can measure the body
    render();
    document.documentElement.classList.add('modal-open');
  };

  const close = () => { if (dialog?.open) dialog.close(); };

  const onClosed = () => {
    bodyEl.innerHTML = '';           // unloads the iframe → video stops
    current = null;
    document.documentElement.classList.remove('modal-open');
    if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus({ preventScroll: true });
    lastTrigger = null;
  };

  const init = () => {
    dialog  = document.getElementById('mediaModal');
    titleEl = document.getElementById('mediaModalTitle');
    bodyEl  = document.getElementById('mediaModalBody');
    if (!dialog || typeof dialog.showModal !== 'function') { dialog = null; return; }

    document.getElementById('mediaModalClose')?.addEventListener('click', close);
    dialog.addEventListener('close', onClosed);
    // A click whose target is the <dialog> itself landed on the backdrop.
    dialog.addEventListener('click', (e) => { if (e.target === dialog) close(); });
    document.addEventListener('langchange', () => { if (dialog.open) render(); });
  };

  return { init, open, close, isReady: () => !!dialog };
})();

/**
 * YouTube videos. Links live in data/videos.js (window.PORTFOLIO_VIDEOS).
 * Any element with data-video="<key>" opens the modal; an empty link shows
 * the "coming soon" state; a list of links shows a clip switcher.
 */
const VideoModule = (() => {
  const parseId = (raw) => {
    if (!raw || typeof raw !== 'string') return null;
    const s = raw.trim();
    if (/^[\w-]{11}$/.test(s)) return s;
    try {
      const u = new URL(s);
      if (u.hostname.endsWith('youtu.be')) return u.pathname.slice(1).split('/')[0] || null;
      if (u.searchParams.get('v')) return u.searchParams.get('v');
      const m = u.pathname.match(/\/(embed|shorts|live)\/([\w-]{11})/);
      if (m) return m[2];
    } catch { /* not a URL */ }
    return null;
  };

  const idsFor = (key) => {
    const v = (window.PORTFOLIO_VIDEOS || {})[key];
    const list = Array.isArray(v) ? v : [v];
    return list.map(parseId).filter(Boolean);
  };

  const iframe = (id, title) => `
    <div class="video-frame">
      <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0"
        title="${title.replace(/"/g, '&quot;')}" loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>`;

  const comingSoon = () => `
    <div class="video-frame video-frame--empty">
      <div class="video-soon">
        <span class="video-soon__icon" aria-hidden="true"><i class="ph ph-video-camera"></i></span>
        <p class="video-soon__title">${I18nModule.get('modal.comingSoon')}</p>
        <p class="video-soon__desc">${I18nModule.get('modal.comingSoonDesc')}</p>
      </div>
    </div>`;

  const renderVideo = (key, title) => (body) => {
    const ids = idsFor(key);
    if (!ids.length) { body.innerHTML = comingSoon(); return; }
    body.innerHTML = `<div class="video-player">${iframe(ids[0], title)}</div>` + (ids.length > 1 ? `
      <div class="video-clips" role="group" aria-label="${I18nModule.get('modal.clip')}">
        ${ids.map((id, i) => `<button type="button" class="video-clips__btn${i === 0 ? ' is-active' : ''}" data-clip="${id}" aria-pressed="${i === 0}">${I18nModule.get('modal.clip')} ${i + 1}</button>`).join('')}
      </div>` : '');
    body.querySelectorAll('.video-clips__btn').forEach(btn => btn.addEventListener('click', () => {
      body.querySelector('.video-player').innerHTML = iframe(btn.dataset.clip, title);
      body.querySelectorAll('.video-clips__btn').forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-pressed', String(b === btn));
      });
    }));
  };

  const openVideo = (key, trigger) => {
    const titleKey = trigger?.dataset.videoTitle;
    const title = () => (titleKey && I18nModule.get(titleKey)) || trigger?.textContent.trim() || I18nModule.get('modal.video');
    MediaModalModule.open({ title, render: (body) => renderVideo(key, title())(body), trigger, wide: true });
  };

  const init = () => {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-video]');
      if (!trigger || !MediaModalModule.isReady()) return;
      e.preventDefault();
      openVideo(trigger.dataset.video, trigger);
    });
  };

  return { init, parseId };
})();

/**
 * "End-to-end AI pipeline" — each stage is a tab; selecting (click, hover,
 * arrow keys) shows the tools and projects behind it. Auto-advances while
 * visible until the user interacts; never under prefers-reduced-motion.
 */
const PipelineModule = (() => {
  const STEPS = 5;
  const AUTOPLAY_MS = 3800;
  let root, steps, detail, active = 1, timer = null, touched = false;

  const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderDetail = () => {
    const g = (k) => I18nModule.get(`systems.pipe${active}${k}`) || '';
    detail.querySelector('[data-pipe="desc"]').textContent = g('Desc');
    detail.querySelector('[data-pipe="project"]').textContent = g('Project');
    detail.querySelector('[data-pipe="tools"]').innerHTML =
      g('Tools').split(',').map(t => `<span>${t.trim()}</span>`).join('');
    detail.setAttribute('aria-labelledby', `pipeStep${active}`);
  };

  const select = (n, { focus = false } = {}) => {
    active = ((n - 1 + STEPS) % STEPS) + 1;
    steps.forEach(btn => {
      const on = Number(btn.dataset.step) === active;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-selected', String(on));
      btn.tabIndex = on ? 0 : -1;
      if (on && focus) btn.focus();
    });
    root.style.setProperty('--pipe-progress', String((active - 1) / (STEPS - 1)));
    root.querySelectorAll('.pipeline__line').forEach((line, i) => line.classList.toggle('is-done', i < active - 1));
    renderDetail();
  };

  const stop = () => { touched = true; clearInterval(timer); timer = null; };

  const init = () => {
    root = document.getElementById('pipeline');
    if (!root) return;
    steps = [...root.querySelectorAll('.pipeline__step')];
    detail = document.getElementById('pipelineDetail');

    steps.forEach(btn => {
      btn.addEventListener('click', () => { stop(); select(Number(btn.dataset.step)); });
      btn.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { stop(); select(Number(btn.dataset.step)); } });
      btn.addEventListener('keydown', (e) => {
        const map = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
        if (map[e.key]) { e.preventDefault(); stop(); select(active + map[e.key], { focus: true }); }
        if (e.key === 'Home') { e.preventDefault(); stop(); select(1, { focus: true }); }
        if (e.key === 'End') { e.preventDefault(); stop(); select(STEPS, { focus: true }); }
      });
    });

    select(1);
    document.addEventListener('langchange', renderDetail);

    if (prefersReduced() || !('IntersectionObserver' in window)) return;
    new IntersectionObserver(([entry]) => {
      if (touched) return;
      if (entry.isIntersecting && !timer) timer = setInterval(() => select(active + 1), AUTOPLAY_MS);
      if (!entry.isIntersecting && timer) { clearInterval(timer); timer = null; }
    }, { threshold: 0.4 }).observe(root);
  };

  return { init };
})();

/**
 * Architecture diagrams (data/diagrams.js) rendered as inline SVG in the
 * shared modal. Horizontal flow on wide screens, vertical on phones.
 * Any element with data-diagram="<key>" opens one.
 */
const DiagramModule = (() => {
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const tr = (f) => (f ? (f[I18nModule.getLang()] || f.en || '') : '');

  const svg = (d, vertical) => {
    const n = d.nodes.length;
    const W = vertical ? 240 : 168, H = vertical ? 62 : 76, GAP = vertical ? 42 : 58;
    const padX = 28, padTop = d.group ? 46 : 24, padBottom = d.group ? 30 : 24;
    const width  = vertical ? W + padX * 2 : padX * 2 + n * W + (n - 1) * GAP;
    const height = vertical ? padTop + n * H + (n - 1) * GAP + padBottom : padTop + H + padBottom;
    const pos = (i) => vertical ? { x: padX, y: padTop + i * (H + GAP) } : { x: padX + i * (W + GAP), y: padTop };

    let out = `<svg class="diagram__svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(tr(d.title))}">
      <defs><marker id="dgArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" class="diagram__arrowhead"/></marker></defs>`;

    if (d.group) {
      const a = pos(d.group.from), b = pos(d.group.to), m = 14;
      const gx = a.x - m, gy = a.y - m - 12, gw = (b.x + W) - a.x + m * 2, gh = (b.y + H) - a.y + m * 2 + 12;
      out += `<rect class="diagram__group" x="${gx}" y="${gy}" width="${gw}" height="${gh}" rx="14"/>
        <text class="diagram__group-label" x="${gx + 12}" y="${gy + 16}">${esc(tr(d.group.label))}</text>`;
    }

    for (let i = 0; i < n - 1; i++) {
      const a = pos(i), b = pos(i + 1);
      const [x1, y1, x2, y2] = vertical
        ? [a.x + W / 2, a.y + H + 4, b.x + W / 2, b.y - 6]
        : [a.x + W + 4, a.y + H / 2, b.x - 6, b.y + H / 2];
      out += `<line class="diagram__edge" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#dgArrow)"/>
        <line class="diagram__flow" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
    }

    d.nodes.forEach((node, i) => {
      const { x, y } = pos(i);
      out += `<g class="diagram__node diagram__node--${node.kind}">
        <rect x="${x}" y="${y}" width="${W}" height="${H}" rx="12"/>
        <text class="diagram__label" x="${x + W / 2}" y="${y + H / 2 - 3}" text-anchor="middle">${esc(tr(node.label))}</text>
        <text class="diagram__sub" x="${x + W / 2}" y="${y + H / 2 + 15}" text-anchor="middle">${esc(tr(node.sub))}</text>
      </g>`;
    });
    return out + '</svg>';
  };

  const open = (key, trigger) => {
    const d = (window.PORTFOLIO_DIAGRAMS || {})[key];
    if (!d) return;
    MediaModalModule.open({
      title: () => tr(d.title),
      trigger,
      wide: true,
      render: (body) => {
        const vertical = body.clientWidth < 620 || window.innerWidth < 680;
        body.innerHTML = `<figure class="diagram">${svg(d, vertical)}<figcaption class="diagram__note">${esc(tr(d.note))}</figcaption></figure>`;
      },
    });
  };

  const init = () => {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-diagram]');
      if (!trigger || !MediaModalModule.isReady()) return;
      e.preventDefault();
      open(trigger.dataset.diagram, trigger);
    });
  };

  return { init };
})();

/**
 * Thesis architecture explorer (data/thesis-architecture.js). Opened from
 * the thesis card's "Explore architecture" button, in the shared modal.
 * Shows each model as a flow of blocks, a data pulse travelling through
 * them, and which blocks train in each fine-tuning phase — taken from the
 * repo's freeze_backbone() / unfreeze_top_layers(), not invented.
 */
const ThesisArchModule = (() => {
  const ICON = { conv: 'ph-squares-four', transformer: 'ph-graph', head: 'ph-target' };
  let state = { model: 0, phase: 2, block: null };

  const tr = (f) => (f ? (f[I18nModule.getLang()] || f.en || '') : '');
  const T = (k) => I18nModule.get(`arch.${k}`) || '';

  const effective = (b) => (b.state === 'unfrozen' ? (state.phase === 2 ? 'unfrozen' : 'frozen') : b.state);

  const stateText = (b) => ({
    frozen: T('stateFrozen'),
    unfrozen: T('stateUnfrozen'),
    head: T('stateHead'),
  }[b.state]);

  const render = (body) => {
    const data = window.THESIS_ARCH;
    if (!data) return;
    const m = data.models[state.model];
    const sel = m.blocks.find(b => b.id === state.block) || m.blocks.find(b => b.state === 'unfrozen') || m.blocks[0];
    state.block = sel.id;

    body.innerHTML = `
      <div class="tarch">
        <div class="tarch__controls">
          <div class="tarch__seg" role="group" aria-label="${T('modelLabel')}">
            ${data.models.map((mm, i) => `<button type="button" class="tarch__seg-btn${i === state.model ? ' is-active' : ''}" data-model="${i}" aria-pressed="${i === state.model}">${mm.name}</button>`).join('')}
          </div>
          <div class="tarch__seg" role="group" aria-label="${T('phaseLabel')}">
            ${[1, 2].map(p => `<button type="button" class="tarch__seg-btn${p === state.phase ? ' is-active' : ''}" data-phase="${p}" aria-pressed="${p === state.phase}">${T('phase' + p)}</button>`).join('')}
          </div>
        </div>

        <p class="tarch__meta"><strong>${m.name}</strong> · ${tr(m.family)} · ${T('input')}: ${tr(data.input)} · ${m.inputSize}</p>

        <ol class="tarch__flow" aria-label="${m.name}">
          ${m.blocks.map((b, i) => `
            <li class="tarch__item" style="--i:${i}">
              <button type="button" class="tarch__block tarch__block--${effective(b)} tarch__block--${b.kind}${b.id === sel.id ? ' is-selected' : ''}" data-block="${b.id}" aria-pressed="${b.id === sel.id}">
                <span class="tarch__block-top"><i class="ph ${ICON[b.kind] || 'ph-cube'}" aria-hidden="true"></i>${effective(b) === 'frozen' ? '<i class="ph ph-lock-simple tarch__lock" aria-hidden="true"></i>' : '<i class="ph ph-lightning tarch__lock" aria-hidden="true"></i>'}</span>
                <span class="tarch__block-name">${b.label}</span>
                <span class="tarch__block-shape">${b.shape}</span>
                <span class="visually-hidden">${stateText(b)}</span>
              </button>
            </li>`).join('')}
        </ol>

        <div class="tarch__detail" aria-live="polite">
          <p class="tarch__detail-head"><code>${sel.label}</code><span class="tarch__pill tarch__pill--${sel.state}">${stateText(sel)}</span>${sel.params !== '—' ? `<span class="tarch__params">${sel.params} ${T('params')}</span>` : ''}</p>
          <p>${tr(sel.detail)}</p>
        </div>

        <div class="tarch__legend">
          <span><i class="tarch__swatch tarch__swatch--frozen"></i>${T('legendFrozen')}</span>
          <span><i class="tarch__swatch tarch__swatch--unfrozen"></i>${T('legendUnfrozen')}</span>
          <span><i class="tarch__swatch tarch__swatch--head"></i>${T('legendHead')}</span>
          <span><i class="ph ph-graph" aria-hidden="true"></i>${T('legendTransformer')}</span>
        </div>

        <p class="tarch__phase">${tr(data.training['phase' + state.phase])}</p>
        <p class="tarch__note">${tr(data.training.note)} <a href="https://github.com/PandoraRiot/MRI_BreastCancer_Classification" target="_blank" rel="noopener noreferrer">${T('source')} <i class="ph ph-arrow-up-right" aria-hidden="true"></i></a></p>
      </div>`;

    body.querySelectorAll('[data-model]').forEach(btn => btn.addEventListener('click', () => { state.model = +btn.dataset.model; state.block = null; rerender(body, '[data-model="' + btn.dataset.model + '"]'); }));
    body.querySelectorAll('[data-phase]').forEach(btn => btn.addEventListener('click', () => { state.phase = +btn.dataset.phase; rerender(body, '[data-phase="' + btn.dataset.phase + '"]'); }));
    body.querySelectorAll('[data-block]').forEach(btn => btn.addEventListener('click', () => { state.block = btn.dataset.block; rerender(body, '[data-block="' + btn.dataset.block + '"]'); }));
  };

  // Re-render and keep keyboard focus on the control that was used
  const rerender = (body, focusSel) => { render(body); body.querySelector(focusSel)?.focus(); };

  const open = (trigger) => {
    MediaModalModule.open({ title: () => T('title'), trigger, wide: true, render });
  };

  const init = () => {
    document.addEventListener('click', (e) => {
      const trigger = e.target.closest('[data-arch-explorer]');
      if (!trigger || !MediaModalModule.isReady()) return;
      e.preventDefault();
      open(trigger);
    });
  };

  return { init };
})();

/**
 * Hero CV button — only shown when data/cv.js points to a real file.
 * Picks the file for the current language, falling back to the other one.
 */
const CvModule = (() => {
  const update = () => {
    const btn = document.getElementById('heroCv');
    const cv = window.PORTFOLIO_CV || {};
    if (!btn) return;
    const lang = I18nModule.getLang();
    const href = (cv[lang] || cv[lang === 'es' ? 'en' : 'es'] || '').trim();
    btn.hidden = !href;
    if (href) btn.setAttribute('href', href);
  };
  const init = () => { update(); document.addEventListener('langchange', update); };
  return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
  I18nModule.init();
  ThemeModule.init();
  NavModule.init();
  RevealModule.init();
  CounterModule.init();
  ProjectFilterModule.init();
  ProjectCarouselModule.init();
  ModelLabModule.init();
  ModelLabDetailModule.init();
  GitHubModule.init();
  CvModule.init();
  MediaModalModule.init();
  VideoModule.init();
  DiagramModule.init();
  ThesisArchModule.init();
  PipelineModule.init();
  SmoothScrollModule.init();
  FooterYearModule.init();
});
