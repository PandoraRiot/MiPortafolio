/**
 * Renders a profile page (/ml-ai/, /full-stack/, /backend-java/, /data-analytics/) from
 * data/profiles.js, using the main site's own components (nav, hero, section
 * headers, .project-card, .stack__group, .xp-card, footer) so every page keeps
 * the portfolio's design. The page's <body data-profile="…"> says which one.
 * Shares the language and theme stored by the main site (localStorage 'lang', 'theme').
 */
(function () {
  const { PROJECTS, ROLES, PROFILES } = window.PORTFOLIO_PROFILES;
  const slug = document.body.dataset.profile;
  const profile = PROFILES[slug];

  const ICONS = {
    thesis: 'ph-brain', jarvis: 'ph-robot', wdbc: 'ph-heartbeat', fruits: 'ph-images',
    lector: 'ph-headphones', vella: 'ph-storefront', fintech: 'ph-chart-line-up',
    accounting: 'ph-receipt', cognia: 'ph-flask',
  };

  const UI = {
    en: {
      badge: 'Profile', skillsLabel: 'Skills', skillsTitle: 'What I work with', core: 'Core', also: 'Also',
      projLabel: 'Selected work', projTitle: 'Projects', projDesc: 'All code is private. I walk through it in technical interviews.',
      problem: 'Problem', solution: 'What I built', results: 'Results',
      expLabel: 'Experience', expTitle: 'Where I have done it',
      education: 'Software Engineering — Institución Universitaria Pascual Bravo · graduation expected December 2026',
      contactLabel: 'Contact', contactTitle: "Let's talk", others: 'Other profiles', full: 'Full portfolio',
      cv: 'Download résumé', cvAlt: 'Versión en español',
      nav: { experience: 'Experience', projects: 'Projects', skills: 'Skills', contact: 'Contact' },
      names: { 'ml-ai': 'ML Engineer', 'full-stack': 'Full Stack', 'backend-java': 'Backend Java', 'data-analytics': 'Data Analyst' },
      role: 'AI Systems Engineer', theme: 'Toggle theme', menu: 'Open menu',
    },
    es: {
      badge: 'Perfil', skillsLabel: 'Competencias', skillsTitle: 'Con qué trabajo', core: 'Principales', also: 'También',
      projLabel: 'Trabajo seleccionado', projTitle: 'Proyectos', projDesc: 'Todo el código es privado; lo muestro en entrevistas técnicas.',
      problem: 'Problema', solution: 'Qué construí', results: 'Resultados',
      expLabel: 'Experiencia', expTitle: 'Dónde lo he hecho',
      education: 'Ingeniería de Software — Institución Universitaria Pascual Bravo · grado previsto en diciembre de 2026',
      contactLabel: 'Contacto', contactTitle: 'Hablemos', others: 'Otros perfiles', full: 'Portafolio completo',
      cv: 'Descargar hoja de vida', cvAlt: 'English version',
      nav: { experience: 'Experiencia', projects: 'Proyectos', skills: 'Competencias', contact: 'Contacto' },
      names: { 'ml-ai': 'ML Engineer', 'full-stack': 'Full Stack', 'backend-java': 'Backend Java', 'data-analytics': 'Analista de datos' },
      role: 'Ingeniera de sistemas de IA', theme: 'Cambiar tema', menu: 'Abrir menú',
    },
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const root = (path) => (/^(https?:|\.\.\/)/.test(path) ? path : '../' + path);
  // Skill names are strings, or { en, es } when they need translating.
  const word = (i, lang) => (typeof i === 'string' ? i : i[lang]);
  const items = (list, lang, cls = 'stack__item') => list.map((i) => `<span class="${cls}">${esc(word(i, lang))}</span>`).join('');

  function projectCard(id, lang, t) {
    const p = PROJECTS[id];
    const links = p.links.map((l) => {
      const external = /^https?:/.test(l.href);
      return `<a href="${esc(l.href)}" class="project-card__link"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>
        <i class="ph ${external ? 'ph-arrow-square-out' : 'ph-arrow-right'}" aria-hidden="true"></i> ${esc(l.label[lang])}</a>`;
    }).join('');
    return `
      <article class="project-card">
        <div class="project-card__top">
          <span class="project-card__icon"><i class="ph ${ICONS[id] || 'ph-cube'}"></i></span>
          <span class="project-card__status">${esc(p.status[lang])}</span>
        </div>
        ${p.image ? `<figure class="project-card__shot project-card__shot--img"><img src="${esc(root(p.image))}" alt="" loading="lazy" decoding="async"></figure>` : ''}
        <h3 class="project-card__title">${esc(p.name[lang])}</h3>
        <p class="project-card__desc">${esc(p.problem[lang])}</p>
        <div class="project-card__flow">
          <span class="project-card__flow-label">${t.solution}</span>
          <p class="project-card__desc">${esc(p.solution[lang])}</p>
        </div>
        <div class="project-card__features">
          <h4>${t.results}</h4>
          <ul>${p.results[lang].map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
        </div>
        <div class="project-card__tags">${p.stack.map((s) => `<span class="tag">${esc(s)}</span>`).join('')}</div>
        <div class="project-card__footer">
          ${links || `<span class="project-card__link project-card__link--muted"><i class="ph ph-lock-simple"></i> ${lang === 'es' ? 'Repositorio privado' : 'Private repository'}</span>`}
        </div>
      </article>`;
  }

  function render(lang) {
    const t = UI[lang];
    const other = lang === 'en' ? 'es' : 'en';
    const cvFile = (l) => `../assets/cv/perfiles/CV_Erika_Alexandra_Garcia_${profile.cv}_${l.toUpperCase()}.pdf?v=20261028c`;
    const [first, ...rest] = profile.headline[lang].split(' · ');
    document.documentElement.lang = lang;
    document.querySelectorAll('.lang-switch__btn').forEach((b) => b.classList.toggle('is-active', b.dataset.lang === lang));
    document.querySelectorAll('[data-nav]').forEach((a) => { a.textContent = t.nav[a.dataset.nav]; });
    document.getElementById('navFull').textContent = t.full;
    document.getElementById('themeToggle').setAttribute('aria-label', t.theme);
    document.getElementById('navBurger').setAttribute('aria-label', t.menu);
    document.getElementById('footerRole').textContent = t.role;

    document.getElementById('pfMain').innerHTML = `
      <section class="hero hero--profile" id="home">
        <div class="hero__bg" aria-hidden="true">
          <div class="hero__orb hero__orb--1"></div>
          <div class="hero__orb hero__orb--2"></div>
          <div class="hero__orb hero__orb--3"></div>
        </div>
        <div class="hero__container container">
          <div class="hero__content">
            <div class="hero__badge">
              <span class="hero__badge-dot"></span>
              <span>${t.badge} · ${esc(t.names[slug])} · Erika Alexandra García Barrios</span>
            </div>
            <h1 class="hero__title">${esc(first)}${rest.length ? `<br /><span class="gradient-text">${esc(rest.join(' · '))}</span>` : ''}</h1>
            <p class="hero__subtitle">${esc(profile.summary[lang])}</p>
            <div class="hero__actions">
              <a href="${cvFile(lang)}" class="btn btn--primary btn--lg" download><i class="ph ph-file-arrow-down"></i> <span>${t.cv}</span></a>
              <a href="${cvFile(other)}" class="btn btn--ghost btn--lg" download><i class="ph ph-translate"></i> <span>${t.cvAlt}</span></a>
              <a href="../" class="btn btn--ghost btn--lg"><span>${t.full}</span> <i class="ph ph-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="skills">
        <div class="container">
          <div class="section__header">
            <span class="section__label">${t.skillsLabel}</span>
            <h2 class="section__title">${t.skillsTitle}</h2>
          </div>
          <div class="stack__grid pf-skills">
            <div class="stack__group">
              <h3><i class="ph ph-star"></i> ${t.core}</h3>
              <div class="stack__items">${items(profile.primary, lang, 'stack__item stack__item--accent')}</div>
            </div>
            <div class="stack__group">
              <h3><i class="ph ph-plus-circle"></i> ${t.also}</h3>
              <div class="stack__items">${items(profile.secondary, lang)}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="section" id="projects">
        <div class="container">
          <div class="section__header">
            <span class="section__label">${t.projLabel}</span>
            <h2 class="section__title">${t.projTitle}</h2>
            <p class="section__desc">${t.projDesc}</p>
          </div>
          <div class="projects__grid pf-projects">${profile.projects.map((id) => projectCard(id, lang, t)).join('')}</div>
        </div>
      </section>

      <section class="section" id="experience">
        <div class="container">
          <div class="section__header">
            <span class="section__label">${t.expLabel}</span>
            <h2 class="section__title">${t.expTitle}</h2>
          </div>
          <div class="pf-roles">${profile.roles.map((id) => {
            const r = ROLES[id];
            return `<article class="xp-card xp-card--technical">
              <div class="xp-card__head"><time class="xp-card__date">${esc(r.dates[lang])}</time></div>
              <h4 class="xp-card__title">${esc(r.role[lang])}</h4>
              <p class="xp-card__context">${esc(r.org[lang])}</p>
              ${r.note ? `<p class="xp-card__desc">${esc(r.note[lang])}</p>` : ''}
            </article>`;
          }).join('')}</div>
          <p class="section__desc pf-edu"><i class="ph ph-graduation-cap"></i> ${t.education}</p>
        </div>
      </section>

      <section class="section" id="contact">
        <div class="container">
          <div class="section__header section__header--center">
            <span class="section__label">${t.contactLabel}</span>
            <h2 class="section__title">${t.contactTitle}</h2>
          </div>
          <div class="pf-contact">
            <a href="mailto:alexandra.software.engineer@gmail.com" class="btn btn--primary btn--lg"><i class="ph ph-envelope-simple"></i> alexandra.software.engineer@gmail.com</a>
            <a href="https://www.linkedin.com/in/alexandragarciabarrioseng" class="btn btn--ghost btn--lg" target="_blank" rel="noopener noreferrer"><i class="ph ph-linkedin-logo"></i> LinkedIn</a>
          </div>
          <nav class="pf-others" aria-label="${t.others}">
            <span class="section__label">${t.others}</span>
            <div class="stack__items">
              ${Object.keys(PROFILES).filter((s) => s !== slug).map((s) => `<a class="stack__item" href="../${s}/">${esc(t.names[s])}</a>`).join('')}
              <a class="stack__item stack__item--accent" href="../">${t.full}</a>
            </div>
          </nav>
        </div>
      </section>`;
  }

  let lang = 'en';
  try { lang = localStorage.getItem('lang') || 'en'; } catch (e) { /* storage blocked */ }
  if (!UI[lang]) lang = 'en';

  document.querySelectorAll('.lang-switch__btn').forEach((b) => b.addEventListener('click', () => {
    lang = b.dataset.lang;
    try { localStorage.setItem('lang', lang); } catch (e) { /* storage blocked */ }
    render(lang);
  }));
  document.getElementById('themeToggle').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
  });

  // Same nav behaviour as the main site: solid on scroll, burger menu on phones.
  const nav = document.getElementById('nav');
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('navBurger');
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) { links.classList.remove('is-open'); burger.classList.remove('is-open'); }
  });
  document.getElementById('footerYear').textContent = new Date().getFullYear();

  render(lang);
})();
