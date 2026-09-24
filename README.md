# Alexandra García — Portfolio

Static site, no framework, no build step. Vanilla HTML/CSS/JS, deployed on GitHub Pages.

Live: https://pandorariot.github.io/MiPortafolio/

---

## Status (2026-09-24)

This site briefly went through a full editorial redesign (new palette, new
typography, consolidated sections, case studies instead of project cards).
**That redesign was reverted at the user's explicit request** — she wanted
the original navy/glass-card design back, section by section, exactly as it
was. What's live now is the **original design**, with one real addition on
top: the **Model Lab** (see below), restyled to match the original visual
language instead of introducing a second design system.

If you're looking for the editorial-redesign version for reference, it's in
git history (commit `61d0abf`..`8e7ffd2`, before this revert).

## Files

```
index.html         Main page — original section order: Hero, Metrics, Mindset,
                    Systems Philosophy, Projects (with filters), Model Lab,
                    Cloud & Big Data, Education, LLM Engineering, Stack,
                    Research, Timeline, GitHub, Contact
lab.html            Model Lab detail page — reads location.hash (#/slug) and
                    renders one model's page from models-data.js
styles.css          Original design system (indigo/navy, glass cards, Plus
                    Jakarta Sans + Inter + JetBrains Mono) plus the Model Lab
                    carousel/detail styles appended at the end, reusing the
                    same tokens so it doesn't look like a bolted-on section
main.js             All behavior: i18n, theme, nav, reveal-on-scroll, project
                    filters, GitHub API fetch, Model Lab carousel + detail
i18n.js             EN/ES strings — original content plus a `lab` namespace
                    for the Model Lab UI
models-data.js      The Model Lab registry (see below) — bilingual per field
favicon.svg         Monogram favicon (indigo on navy, matches the site)
data/videos.js      ALL YouTube links (one key per data-video="…" trigger)
data/diagrams.js    Sanitized architecture diagrams for the evidence blocks
data/thesis-architecture.js  Thesis explorer data (unfrozen layers from the repo)
docs/private/       Local CV copy + change report (CAMBIOS-portfolio-v2.md) — git-ignored, never published
```

No `package.json`, no bundler. `<script>` tags load in order:
`i18n.js` → `models-data.js` → `data/*.js` → `main.js`.

## Model Lab

The one genuinely new feature: a data-driven registry of ML/DL architectures,
shown as an **auto-advancing, filterable carousel** on `index.html` (`#lab`),
with a detail page per model on `lab.html`.

- Auto-advances every ~4.2s, pauses on hover/focus/touch, skips autoplay
  under `prefers-reduced-motion: reduce` (manual prev/next/dots/arrow-keys
  still work).
- Filter chips are generated from the models' `type` field — not hardcoded.
  Adding a model with a new type adds a new filter chip automatically.
- Each card has a cover image slot: an auto-generated placeholder (model
  name + type, labeled "cover pending" — "imagen pendiente" in Spanish)
  until a real image is set.
- Every entry has an honest `status`: `planned | research | development |
  trained | deployed`. Only `cnn` (trained) and `transformer` (research) have
  real backing right now — the rest are `planned`, on purpose. No fabricated
  results.

### How to add a model

Everything lives in **`models-data.js`** as one array, `window.MODEL_LAB`.

1. Copy an existing object and fill in every field, in **both** languages
   (`{ en, es }`) for any text field.
2. `status`: only use `trained`/`deployed` when a real artifact or metric
   backs it.
3. `architecture`: ordered list of `{ en, es }` stage strings, rendered as a
   flow diagram on the detail page.
4. `metrics`: `null` until there's a real, reportable result — then
   `[{ label: {en, es}, value: '0.xx' }, …]` with a `metricsNote` caveat
   (sample size, confidence interval, etc.).
5. `inference`: `{ input: {en,es}, output: {en,es} }` describes the *shape*
   of a future demo even before one exists.
6. `order`: sort position (zero-padded string, e.g. `'10'`).
7. `cover`: `null` for the auto-generated placeholder, or a path like
   `assets/model-covers/<slug>.jpg` once a real screenshot exists (create
   that folder — it doesn't exist yet). The carousel switches automatically.

### Connecting a real inference API later

`ModelLabDetailModule` in `main.js` renders an `api` field if present
(`model.api`, e.g. `/predict`) as a `POST` line in the inference panel. To go
from stub to real demo: stand up the endpoint, set `api` (and `demo`) on that
model's entry, then extend `ModelLabDetailModule.render()` to render a real
form/upload widget instead of the static `.inference-stub` panel when
`model.demo` is set. No other file needs to change.

## Content notes (still accurate after the revert)

- The DCE-MRI project's Docker deployment is real but runs on a server on
  loan from a faculty advisor — not committed to the repo. The site's
  existing "Thesis · Production" framing predates this note and wasn't
  changed as part of the revert (that copy lives in `i18n.js` under
  `projects.p1Status` / `p1Desc` if you want to revisit the wording).
- No employer names, clients, certifications, metrics, or dates were
  invented at any point in this process.

## Running locally

No build step. Any static file server works:

```bash
cd portfolio
python3 -m http.server 8765
# → http://localhost:8765/
```

## Deploying

GitHub Pages, deployed from the `main` branch root
(`https://pandorariot.github.io/MiPortafolio/`). Pushing to `main`
redeploys automatically.

```bash
git add -A
git commit -m "…"
git push origin main
```
