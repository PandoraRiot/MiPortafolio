# Alexandra García — Portfolio

Static site, no framework, no build step. Vanilla HTML/CSS/JS, deployed on GitHub Pages.

Live: https://pandorariot.github.io/MiPortafolio/

---

## What this is

A technical-editorial portfolio for a Software Engineer specializing in Machine
Learning / AI Systems: three flagship case studies, a data-driven **Model Lab**
(a registry of ML/DL architectures, each with an honest status), an AI Systems
section for LLM/RAG/agent work, research, technologies, education timeline,
GitHub, and contact. Fully bilingual (EN/ES).

## Files

```
index.html        Main page — hero, selected work, model lab list, ai systems,
                   research, technologies, education, github, contact
lab.html           Model Lab detail page — reads location.hash (#/slug) and
                   renders one model's page from models-data.js
styles.css         Design system: tokens, layout, components (single file,
                   no preprocessor, no Tailwind)
main.js            All behavior: i18n, theme, nav, reveal-on-scroll, case-study
                   tabs, GitHub API fetch, Model Lab rendering
i18n.js            EN/ES strings for navigation, hero, section intros, the three
                   case studies (including the DCE-MRI evaluation numbers),
                   research, stack, education, contact — fully bilingual
models-data.js     The Model Lab registry (see below) — bilingual per field
favicon.svg        Monogram favicon
```

No `package.json`, no bundler. `<script>` tags load in order:
`i18n.js` → `models-data.js` → `main.js`.

## Redesign — what changed (2026-09)

This replaced an earlier version built around a navy/purple-glow "AI startup"
aesthetic (gradient headings, glass cards, orb glows, marquee ticker, dense
pill grids). The new direction is deliberately editorial/technical instead:

- **Design system**: warm ivory + charcoal, one accent (deep cobalt/ink blue),
  one restrained secondary (dust mauve, used only for small marks — never a
  background fill). Light mode is now the default; dark mode is a proper
  charcoal/graphite palette, not an inverted navy.
- **Typography**: four-tier system — `Fraunces` (display serif, for the name
  and section titles — the single biggest lever against the generic-AI-portfolio
  look), `Instrument Sans` (headings/UI), `IBM Plex Sans` (body), `IBM Plex Mono`
  (metadata, code, technical labels, status tags).
- **Fewer cards**: identity/mindset content is a numbered bordered grid, not
  icon-cards. Research went from 9 cards to 3 editorial groups. Technologies
  went from a pill dump + marquee to grouped text rows ordered by actual
  priority (ML first, backend/infra underneath).
- **Selected Work** is now 3 real case studies (DCE-MRI, Career Ops, ML Systems
  & Infra) with tabbed sections (Overview / Architecture / Dataset / Evaluation
  / Deployment) instead of project cards. Two smaller real projects (classical
  ML benchmark, customer segmentation) moved to a compact "Also built" list
  instead of being cards of equal visual weight to the flagships.
- **Education**: merged two previously duplicated sections (an "Education"
  card grid and a separate "Timeline" section that repeated the same academic
  facts) into one timeline.
- **GitHub**: removed follower/repo counts as headline stats; kept a plain
  repo list as evidence, not a vanity metric.
- **Icons**: dropped the Phosphor Icons CDN script (external runtime JS
  dependency) in favor of a handful of inline SVGs. Fewer, better-behaved,
  no FOUC.
- **New: Model Lab**, see below.
- Content-honesty pass on real repos (see "Corrections made" below).

### Corrections made against the previous copy

The previous site's DCE-MRI project card said "Thesis · Production" and
implied a finished Docker/API deployment. Checking the actual repo
(`~/breast-cancer-dce-mri-classification`) turned up:

- No `Dockerfile` or API code in the repo itself — the real Docker deployment
  runs on a server on loan from a faculty advisor (confirmed with Alexandra
  directly), not committed to the repository. The case study now describes
  this honestly instead of implying a polished production service.
- A real `test_metrics.csv` with an actual holdout result (ResNet18, n=35
  patients, AUC-ROC 0.629). This is now published **with its confidence
  interval and sample-size caveat**, framed as a preliminary result guiding
  the next iteration — not as a finished clinical claim. Status changed from
  "Production" to "Research."
- The real GitHub README (not the local one) contains a full, genuinely
  strong methodology diagram (patient-level stratified 70/15/15 split, 5-fold
  CV over ResNet50/EfficientNet/MobileViT, isolated holdout, Grad-CAM) — this
  is now the backbone of the case study's Architecture tab, verbatim in
  substance.

No employer names, clients, certifications, metrics, or dates were invented.
Everything in Selected Work, Model Lab, Research, Education, and Contact
traces back to the previous site's content or a real repo/file checked during
this redesign.

### Known gaps (flagged, not silently skipped)

- **CV download button** (brief section 26) was intentionally **not** added.
  Publishing a CV to a public GitHub Pages repo means committing a document
  with personal data (phone, address, etc.) to a public history — that's
  Alexandra's call, not a default I should make. Wire it in by dropping the
  chosen PDF at e.g. `assets/cv/alexandra-garcia-cv-en.pdf` and adding a
  `.btn` link to it in the Contact section of `index.html`.
- **Model Lab detail content is EN/ES**, but each entry currently has no demo,
  API, or metrics for 8 of 9 architectures (`planned`/`research` status) —
  by design, per the "don't invent results" instruction. See below for how
  that grows over time.

## Model Lab — how to add a model

Everything lives in **`models-data.js`** as one array, `window.MODEL_LAB`.
`index.html` renders it as an **auto-advancing, filterable carousel**
(`ModelLabModule` in `main.js`), and `lab.html` (`#labRoot`, via
`location.hash`) renders the detail page — adding a model never touches
HTML or CSS.

1. Copy an existing object in `models-data.js` and fill in every field, in
   **both** languages (`{ en, es }`) for any text field.
2. `status` must be one of `planned | research | development | trained |
   deployed`. Only use `trained`/`deployed` when a real artifact or metric
   backs it — the whole point of this registry is that the status is
   trustworthy.
3. `architecture` is an ordered list of `{ en, es }` strings rendered as a
   simple flow diagram on the detail page.
4. `metrics` is `null` until you have a real, reportable result. When you add
   one, use the shape `[{ label: {en, es}, value: '0.xx' }, …]` and set
   `metricsNote` to the caveat (sample size, confidence interval, etc.) —
   see the pattern used in the DCE-MRI case study for the tone to match.
5. `inference` (`{ input: {en,es}, output: {en,es} }`) describes the *shape*
   of a future demo even before one exists — this is what lets the detail
   page render a "planned inference" panel without a redesign later.
6. `order` controls sort position in the carousel (zero-padded string, e.g. `'10'`).
7. `cover`: leave `null` for an auto-generated placeholder slide (labeled
   with the model's name and type, so it's obvious which slot each future
   screenshot belongs in). Once you have a real image, drop it at
   `assets/model-covers/<slug>.jpg` (create that folder — it doesn't exist
   yet) and set `cover: 'assets/model-covers/<slug>.jpg'`. The carousel
   switches to it automatically.

### Carousel filters

The filter chips above the carousel (`#labFilters`) are **not** hardcoded —
they're generated from the distinct `type` values across `MODEL_LAB`. Adding
a model with a new `type` (e.g. `{ en: 'Reinforcement Learning', es: '...' }`)
automatically adds a new filter chip; no other change needed. Filtering
rebuilds the carousel track and resets scroll position.

### Carousel behavior

- Auto-advances every ~4.2s, pauses on hover/focus/touch, and skips autoplay
  entirely under `prefers-reduced-motion: reduce` (manual prev/next/dots and
  arrow-key navigation still work).
- Implemented with native scroll-snap + `scrollBy`/`scrollTo` — no carousel
  library. If this ever needs more (e.g. real drag/swipe physics), that's a
  reasonable place to introduce one; not before.

## Connecting a real inference API later

`ModelLabDetailModule` in `main.js` already renders an `api` field if present
(`model.api`, a string like `/predict`) as a `POST` line in the inference
panel. To go from stub to real demo for a given model:

1. Stand up the inference endpoint wherever the model is actually served.
2. Set `api: '/predict'` (or the real path) on that model's entry.
3. Extend `ModelLabDetailModule.render()` in `main.js` to render an actual
   `<form>`/upload widget instead of the static `.inference-stub` panel when
   `model.demo` is set — the data model already carries `demo` for exactly
   this. No other file needs to change.

## Running locally

No build step. Any static file server works:

```bash
cd portfolio
python3 -m http.server 8765
# → http://localhost:8765/
```

## Deploying

This repo deploys via **GitHub Pages** from the `main` branch root — already
configured (`https://pandorariot.github.io/MiPortafolio/`). Pushing to `main`
redeploys automatically; no CI config needed for a static site this size.

```bash
git add -A
git commit -m "…"
git push origin main
```

## Notes on scope

- No JS framework, no bundler, no CSS preprocessor — the whole point of the
  Model Lab's data-driven design is to let it grow without needing one. If it
  ever needs real client-side routing, per-model demo widgets with real
  interactivity, or a CMS, that's the point to reach for something heavier —
  not before.
- `overflow-x: hidden` on `<body>` plus `min-width: 0` on grid items holding
  `<pre>`/long unbroken strings (case-study architecture diagrams, emails) —
  needed to stop CSS Grid's default content-based sizing from forcing
  horizontal scroll on narrow viewports. If you add another `<pre>`, code
  block, or long unbroken string inside a grid layout, give its grid-item
  ancestor `min-width: 0` too.
