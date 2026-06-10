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
    if (title) document.getElementById('pageTitle').textContent = title;
    if (desc)  document.getElementById('metaDescription').setAttribute('content', desc);

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
  const META_COLORS = { dark: '#030712', light: '#e8ecf3' };
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

const CounterModule = (() => {
  const animate = (el) => {
    const target   = parseInt(el.dataset.count, 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1800;
    const start    = performance.now();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
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
    document.querySelectorAll('.metric-card__value[data-count]').forEach(el => observer.observe(el));
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

const GitHubModule = (() => {
  const LANG_COLORS = {
    Python: '#3572A5', Java: '#b07219', JavaScript: '#f1e05a',
    TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c',
    Jupyter: '#DA5B0B', Shell: '#89e051',
  };

  const locale = () => I18nModule.getLang() === 'es' ? 'es-ES' : 'en-US';

  const renderRepo = (repo) => {
    const lang  = repo.language || 'Other';
    const color = LANG_COLORS[lang] || '#6366f1';
    const desc  = repo.description || I18nModule.get('github.noDesc');
    const stars = repo.stargazers_count;
    const updatedLabel = I18nModule.get('github.updated');
    const date = new Date(repo.updated_at).toLocaleDateString(locale(), { month: 'short', year: 'numeric' });

    return `
      <a href="${repo.html_url}" class="gh-repo" target="_blank" rel="noopener noreferrer">
        <div class="gh-repo__header">
          <i class="ph ph-book-bookmark"></i>
          <span class="gh-repo__name">${repo.name}</span>
        </div>
        <p class="gh-repo__desc">${desc}</p>
        <div class="gh-repo__meta">
          <span class="gh-repo__lang">
            <span class="gh-repo__lang-dot" style="background:${color}"></span>
            ${lang}
          </span>
          ${stars > 0 ? `<span><i class="ph ph-star"></i> ${stars}</span>` : ''}
          <span>${updatedLabel} ${date}</span>
        </div>
      </a>`;
  };

  const renderFallback = () => {
    const container = document.getElementById('githubRepos');
    container.innerHTML = `
      <a href="https://github.com/${GITHUB_USER}/breast-cancer-dce-mri-classification" class="gh-repo" target="_blank" rel="noopener noreferrer">
        <div class="gh-repo__header">
          <i class="ph ph-book-bookmark"></i>
          <span class="gh-repo__name">breast-cancer-dce-mri-classification</span>
        </div>
        <p class="gh-repo__desc">Deep Learning pipeline for breast cancer classification via DCE-MRI.</p>
        <div class="gh-repo__meta">
          <span class="gh-repo__lang"><span class="gh-repo__lang-dot" style="background:#3572A5"></span>Python</span>
        </div>
      </a>
      <div class="gh-repo" style="display:flex;align-items:center;justify-content:center;min-height:140px;">
        <a href="https://github.com/${GITHUB_USER}" class="btn btn--ghost" target="_blank" rel="noopener noreferrer">
          <i class="ph ph-github-logo"></i> ${I18nModule.get('github.viewAll')}
        </a>
      </div>`;
  };

  const load = async () => {
    const container = document.getElementById('githubRepos');
    container.innerHTML = `
      <div class="github__loading">
        <div class="spinner"></div>
        <span data-i18n="github.loading">${I18nModule.get('github.loading')}</span>
      </div>`;

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USER}`),
        fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=6&type=owner`),
      ]);

      if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API unavailable');

      const user  = await userRes.json();
      const repos = await reposRes.json();

      document.getElementById('ghRepos').textContent     = user.public_repos;
      document.getElementById('ghFollowers').textContent = user.followers;

      container.innerHTML = repos.filter(r => !r.fork).slice(0, 6).map(renderRepo).join('');
    } catch {
      document.getElementById('ghRepos').textContent     = '—';
      document.getElementById('ghFollowers').textContent = '—';
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

document.addEventListener('DOMContentLoaded', () => {
  I18nModule.init();
  ThemeModule.init();
  NavModule.init();
  RevealModule.init();
  CounterModule.init();
  ProjectFilterModule.init();
  GitHubModule.init();
  SmoothScrollModule.init();
  FooterYearModule.init();
});
