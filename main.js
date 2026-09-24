/**
 * Alexandra García — Software Engineer / ML & AI Systems
 * i18n · Theme · Nav · Reveal · Counters · Case tabs · Model Lab · GitHub
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

    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const val = get(el.dataset.i18nAria);
      if (val !== null) el.setAttribute('aria-label', val);
    });

    const title = get('meta.title');
    const desc  = get('meta.description');
    if (title) document.getElementById('pageTitle').textContent = title;
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
  const META_COLORS = { dark: '#151413', light: '#faf8f4' };
  let theme = localStorage.getItem('theme') || 'light';

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

  const initScrollSpy = () => {
    const sections = [...links.querySelectorAll('a[href^="#"]')]
      .map(a => ({ link: a, target: document.querySelector(a.getAttribute('href')) }))
      .filter(s => s.target);
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const match = sections.find(s => s.target === entry.target);
        if (!match) return;
        if (entry.isIntersecting) {
          sections.forEach(s => s.link.classList.remove('is-active'));
          match.link.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(s => observer.observe(s.target));
  };

  const init = () => {
    if (!nav || !burger || !links) return;
    window.addEventListener('scroll', handleScroll, { passive: true });
    burger.addEventListener('click', toggleMenu);
    links.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('click', (e) => {
      if (links.classList.contains('is-open') && !nav.contains(e.target)) closeMenu();
    });
    handleScroll();
    initScrollSpy();
  };

  return { init };
})();

const RevealModule = (() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const observer = prefersReduced ? null : new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px', threshold: 0.08 });

  const init = () => {
    const items = document.querySelectorAll('.reveal');
    if (prefersReduced) {
      items.forEach(el => el.classList.add('is-visible'));
      return;
    }
    items.forEach(el => observer.observe(el));
  };

  return { init };
})();

const CounterModule = (() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    if (prefersReduced) { el.textContent = target + suffix; return; }

    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const init = () => {
    document.querySelectorAll('.stat__value[data-count]').forEach(el => observer.observe(el));
  };

  return { init };
})();

/** Case study tab groups — each .case has its own independent tab/panel set. */
const CaseTabsModule = (() => {
  const initGroup = (caseEl) => {
    const tabs = caseEl.querySelectorAll('.case__tab');
    const panels = caseEl.querySelectorAll('.case__panel');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => { t.classList.remove('is-active'); t.setAttribute('aria-selected', 'false'); });
        panels.forEach(p => p.classList.remove('is-active'));
        tab.classList.add('is-active');
        tab.setAttribute('aria-selected', 'true');
        caseEl.querySelector(`[data-panel="${tab.dataset.tab}"]`)?.classList.add('is-active');
      });
    });
  };

  const init = () => {
    document.querySelectorAll('.case').forEach(initGroup);
  };

  return { init };
})();

/** Model Lab — renders the registry list on index.html from models-data.js */
const ModelLabModule = (() => {
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

  const row = (model, i) => {
    const statusLabel = I18nModule.get(`lab.${STATUS_KEY[model.status]}`) || model.status;
    return `
      <a class="lab-row" role="listitem" href="lab.html#/${model.slug}">
        <span class="lab-row__num">${model.order}</span>
        <span class="lab-row__name">
          <span class="lab-row__short">${model.shortName}</span>
          <span class="lab-row__full">${t(model.fullName)}</span>
        </span>
        <span class="lab-row__meta">${t(model.type)} · ${model.framework}</span>
        <span class="status-tag" data-status="${model.status}">${statusLabel}</span>
        <span class="lab-row__link">${I18nModule.get('lab.viewModel') || 'View model'} <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12L12 4M6 4h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </a>`;
  };

  const render = () => {
    const list = document.getElementById('labList');
    if (!list || !window.MODEL_LAB) return;
    const sorted = [...window.MODEL_LAB].sort((a, b) => a.order.localeCompare(b.order));
    list.innerHTML = sorted.map(row).join('');
  };

  const init = () => {
    if (!document.getElementById('labList')) return;
    render();
    document.addEventListener('langchange', render);
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
    if (!model) { root.innerHTML = '<p>Model not found.</p>'; return; }

    const statusLabel = I18nModule.get(`lab.${STATUS_KEY[model.status]}`) || model.status;
    document.title = `${model.shortName} · Model Lab · Alexandra García`;

    const evalBody = model.metrics
      ? `<table class="metric-table"><thead><tr><th>${I18nModule.get('cases.evalMetricCol')}</th><th>${I18nModule.get('cases.evalValueCol')}</th></tr></thead>
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
      <p style="max-width:70ch;color:var(--color-fg-muted);font-size:var(--text-md);line-height:1.7;">${t(model.summary)}</p>
      ${optionalSection('lab.secArchitecture', archFlow(model))}
      ${optionalSection('lab.secDataset', model.dataset ? `<p>${t(model.dataset)}</p>` : '')}
      ${optionalSection('lab.secTraining', model.training ? `<p>${t(model.training)}</p>` : '')}
      <div class="model-detail__section"><h2>${I18nModule.get('lab.secEvaluation')}</h2><div class="body">${evalBody}</div></div>
      ${optionalSection('lab.secInference', inferenceBody)}
      ${model.repo ? optionalSection('lab.secSource', `<a href="${model.repo}" class="eyebrow-link" target="_blank" rel="noopener noreferrer">${t(model.repoLabel) || model.repo} <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12L12 4M6 4h6v6" stroke-linecap="round" stroke-linejoin="round"/></svg></a>`) : ''}
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

const GitHubModule = (() => {
  const LANG_COLORS = {
    Python: '#3572A5', Java: '#b07219', JavaScript: '#f1e05a',
    TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c',
    Jupyter: '#DA5B0B', Shell: '#89e051',
  };

  const locale = () => I18nModule.getLang() === 'es' ? 'es-ES' : 'en-US';

  const renderRepo = (repo) => {
    const lang = repo.language || 'Other';
    const color = LANG_COLORS[lang] || 'var(--color-accent)';
    const desc = repo.description || I18nModule.get('github.noDesc');
    const stars = repo.stargazers_count;
    const updatedLabel = I18nModule.get('github.updated');
    const date = new Date(repo.updated_at).toLocaleDateString(locale(), { month: 'short', year: 'numeric' });

    return `
      <a href="${repo.html_url}" class="gh-row" target="_blank" rel="noopener noreferrer">
        <div>
          <div class="gh-row__name">${repo.name}</div>
          <p class="gh-row__desc">${desc}</p>
        </div>
        <div class="gh-row__meta">
          <span><span class="gh-row__lang-dot" style="background:${color}"></span>${lang}</span>
          ${stars > 0 ? `<span>★ ${stars}</span>` : ''}
          <span>${updatedLabel} ${date}</span>
        </div>
      </a>`;
  };

  const renderFallback = () => {
    const container = document.getElementById('githubRepos');
    container.innerHTML = `
      <a href="https://github.com/${GITHUB_USER}/breast-cancer-dce-mri-classification" class="gh-row" target="_blank" rel="noopener noreferrer">
        <div>
          <div class="gh-row__name">breast-cancer-dce-mri-classification</div>
          <p class="gh-row__desc">Deep Learning pipeline for breast cancer classification via DCE-MRI.</p>
        </div>
        <div class="gh-row__meta"><span><span class="gh-row__lang-dot" style="background:#3572A5"></span>Python</span></div>
      </a>
      <div style="padding:var(--space-md) 0;">
        <a href="https://github.com/${GITHUB_USER}" class="eyebrow-link" target="_blank" rel="noopener noreferrer">${I18nModule.get('github.viewAll')}</a>
      </div>`;
  };

  const load = async () => {
    const container = document.getElementById('githubRepos');
    if (!container) return;
    container.innerHTML = `
      <div class="github__loading">
        <div class="spinner"></div>
        <span>${I18nModule.get('github.loading')}</span>
      </div>`;

    try {
      const reposRes = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6&type=owner`);
      if (!reposRes.ok) throw new Error('GitHub API unavailable');
      const repos = await reposRes.json();
      const rendered = repos.filter(r => !r.fork).slice(0, 6).map(renderRepo).join('');
      container.innerHTML = rendered || '';
      if (!rendered) renderFallback();
    } catch {
      renderFallback();
    }
  };

  const init = () => {
    load();
    document.addEventListener('langchange', load);
  };

  return { init };
})();

const SmoothScrollModule = (() => {
  const NAV_OFFSET = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;

  const init = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const id = anchor.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET,
          behavior: prefersReduced ? 'auto' : 'smooth',
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

document.addEventListener('DOMContentLoaded', () => {
  I18nModule.init();
  ThemeModule.init();
  NavModule.init();
  RevealModule.init();
  CounterModule.init();
  CaseTabsModule.init();
  ModelLabModule.init();
  ModelLabDetailModule.init();
  GitHubModule.init();
  SmoothScrollModule.init();
  FooterYearModule.init();
});
