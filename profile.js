/**
 * Renders a profile page (/ml-ai/, /full-stack/, /backend-java/, /data-analytics/) from
 * data/profiles.js. The page's <body data-profile="…"> says which one. Shares
 * the language and theme stored by the main site (localStorage 'lang', 'theme').
 */
(function () {
  const { PROJECTS, ROLES, PROFILES } = window.PORTFOLIO_PROFILES;
  const slug = document.body.dataset.profile;
  const profile = PROFILES[slug];

  const UI = {
    en: {
      projects: 'Projects', experience: 'Experience', skills: 'Core skills', also: 'Also',
      problem: 'Problem', solution: 'What I built', results: 'Results', stack: 'Stack',
      cv: 'Download CV (PDF)', cvAlt: 'Versión en español', full: 'Full portfolio',
      others: 'Other profiles', contact: 'Contact', email: 'Email',
      code: 'All code is private. I walk through it in technical interviews.',
      education: 'Software Engineering — Institución Universitaria Pascual Bravo · graduation expected December 2026',
      langBtn: 'ES', langLabel: 'Cambiar a español', themeLabel: 'Toggle light/dark theme',
      names: { 'ml-ai': 'ML / AI', 'full-stack': 'Full Stack', 'backend-java': 'Backend Java', 'data-analytics': 'Data' },
    },
    es: {
      projects: 'Proyectos', experience: 'Experiencia', skills: 'Competencias principales', also: 'También',
      problem: 'Problema', solution: 'Qué construí', results: 'Resultados', stack: 'Tecnologías',
      cv: 'Descargar hoja de vida (PDF)', cvAlt: 'English version', full: 'Portafolio completo',
      others: 'Otros perfiles', contact: 'Contacto', email: 'Correo',
      code: 'Todo el código es privado; lo muestro en entrevistas técnicas.',
      education: 'Ingeniería de Software — Institución Universitaria Pascual Bravo · grado previsto en diciembre de 2026',
      langBtn: 'EN', langLabel: 'Switch to English', themeLabel: 'Cambiar tema claro/oscuro',
      names: { 'ml-ai': 'ML / IA', 'full-stack': 'Full Stack', 'backend-java': 'Backend Java', 'data-analytics': 'Datos' },
    },
  };

  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const root = (path) => (/^(https?:|\.\.\/)/.test(path) ? path : '../' + path);
  // Skill names are strings, or { en, es } when they need translating.
  const word = (i, lang) => (typeof i === 'string' ? i : i[lang]);
  const chips = (items, cls = '', lang = 'en') => items.map((i) => `<li class="pf-chip ${cls}">${esc(word(i, lang))}</li>`).join('');

  function projectCard(id, lang, t) {
    const p = PROJECTS[id];
    const links = p.links.map((l) => {
      const external = /^https?:/.test(l.href);
      return `<a class="pf-btn pf-btn--ghost" href="${esc(l.href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(l.label[lang])}</a>`;
    }).join('');
    return `
      <article class="pf-project">
        ${p.image ? `<img class="pf-project__img" src="${esc(root(p.image))}" alt="" loading="lazy" width="1200" height="750">` : ''}
        <div class="pf-project__body">
          <p class="pf-project__status">${esc(p.status[lang])}</p>
          <h3 class="pf-project__title">${esc(p.name[lang])}</h3>
          <dl class="pf-project__facts">
            <dt>${t.problem}</dt><dd>${esc(p.problem[lang])}</dd>
            <dt>${t.solution}</dt><dd>${esc(p.solution[lang])}</dd>
            <dt>${t.results}</dt><dd><ul>${p.results[lang].map((r) => `<li>${esc(r)}</li>`).join('')}</ul></dd>
          </dl>
          <p class="pf-sr">${t.stack}</p>
          <ul class="pf-chips" aria-label="${t.stack}">${chips(p.stack, 'pf-chip--sm')}</ul>
          ${links ? `<div class="pf-project__links">${links}</div>` : ''}
        </div>
      </article>`;
  }

  function render(lang) {
    const t = UI[lang];
    const other = lang === 'en' ? 'es' : 'en';
    const cvFile = (l) => `../assets/cv/perfiles/CV_Erika_Alexandra_Garcia_${profile.cv}_${l.toUpperCase()}.pdf?v=20261028a`;
    document.documentElement.lang = lang;
    document.getElementById('pfLang').textContent = t.langBtn;
    document.getElementById('pfLang').setAttribute('aria-label', t.langLabel);
    document.getElementById('pfTheme').setAttribute('aria-label', t.themeLabel);
    document.getElementById('pfFull').textContent = t.full;

    document.getElementById('pfMain').innerHTML = `
      <section class="pf-hero container">
        <p class="pf-hero__kicker">Erika Alexandra García Barrios</p>
        <h1 class="pf-hero__title">${esc(profile.headline[lang])}</h1>
        <p class="pf-hero__summary">${esc(profile.summary[lang])}</p>
        <div class="pf-hero__actions">
          <a class="pf-btn" href="${cvFile(lang)}" download>${t.cv}</a>
          <a class="pf-btn pf-btn--ghost" href="${cvFile(other)}" download>${t.cvAlt}</a>
        </div>
      </section>

      <section class="pf-section container" aria-labelledby="pfSkills">
        <h2 id="pfSkills" class="pf-h2">${t.skills}</h2>
        <ul class="pf-chips">${chips(profile.primary, '', lang)}</ul>
        <p class="pf-also"><span>${t.also}:</span> ${profile.secondary.map((i) => esc(word(i, lang))).join(' · ')}</p>
      </section>

      <section class="pf-section container" aria-labelledby="pfProjects">
        <h2 id="pfProjects" class="pf-h2">${t.projects}</h2>
        <p class="pf-note">${t.code}</p>
        <div class="pf-projects">${profile.projects.map((id) => projectCard(id, lang, t)).join('')}</div>
      </section>

      <section class="pf-section container" aria-labelledby="pfExp">
        <h2 id="pfExp" class="pf-h2">${t.experience}</h2>
        <ol class="pf-roles">${profile.roles.map((id) => {
          const r = ROLES[id];
          return `<li class="pf-role"><div><strong>${esc(r.role[lang])}</strong><span> — ${esc(r.org[lang])}</span></div>
            <span class="pf-role__dates">${esc(r.dates[lang])}</span>${r.note ? `<p>${esc(r.note[lang])}</p>` : ''}</li>`;
        }).join('')}</ol>
        <p class="pf-edu">${t.education}</p>
      </section>

      <section class="pf-section container pf-contact" aria-labelledby="pfContact">
        <h2 id="pfContact" class="pf-h2">${t.contact}</h2>
        <p><a href="mailto:alexandra.software.engineer@gmail.com">alexandra.software.engineer@gmail.com</a>
          · <a href="https://www.linkedin.com/in/alexandragarciabarrioseng" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
        <nav class="pf-others" aria-label="${t.others}">
          <span>${t.others}:</span>
          ${Object.keys(PROFILES).filter((s) => s !== slug).map((s) => `<a href="../${s}/">${t.names[s]}</a>`).join('')}
          <a href="../">${t.full}</a>
        </nav>
      </section>`;
  }

  let lang = 'en';
  try { lang = localStorage.getItem('lang') || 'en'; } catch (e) { /* storage blocked */ }
  if (!UI[lang]) lang = 'en';

  document.getElementById('pfLang').addEventListener('click', () => {
    lang = lang === 'en' ? 'es' : 'en';
    try { localStorage.setItem('lang', lang); } catch (e) { /* storage blocked */ }
    render(lang);
  });
  document.getElementById('pfTheme').addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked */ }
  });

  render(lang);
})();
