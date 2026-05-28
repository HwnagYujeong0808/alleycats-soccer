# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Development server with auto-reload (Nodemon), port 3000
npm start      # Production server
```

No build step, test runner, or linter is configured.

## Architecture

**Stack:** Node.js + Express + Handlebars (HBS) backend serving vanilla CSS/JS frontend. No bundler, no framework, no database — static content only.

**Entry point:** [server.js](server.js) — sets up Handlebars, Express static serving from `public/`, routes for all pages, and two hardcoded JSON API endpoints (`GET /api/news`, `GET /api/coaches`). News and coach data live directly in `server.js` as arrays — there is no database or external data source.

**Template system (Handlebars):**
- [views/layouts/main.hbs](views/layouts/main.hbs) — the single shared shell: `<html>`, navbar, `{{{body}}}`, footer. Edit the navbar or footer **here only**.
- `views/*.hbs` — one file per page; each renders into `{{{body}}}` inside the layout.

**CSS — two files, different scopes:**
- [public/css/style.css](public/css/style.css) — global design system: CSS variables, reset, navbar, footer, home-page sections (hero, stats, news cards, testimonial slider, sponsors). All home-specific component styles live here.
- [public/css/pages.css](public/css/pages.css) — inner-page components only: `.page-hero`, `.page-section`, `.two-col`, `.value-card`, `.match-card`, `.resource-card`, `.coaches-full-grid`, etc. Use this file for anything that appears on a non-home page.

**JavaScript:** [public/js/main.js](public/js/main.js) — runs on every page via the layout. Handles: scroll-triggered navbar style, hamburger + mobile accordion menu, fade-up Intersection Observer, stat counters, testimonial slider IIFE, news card tilt.

## Pages

| Route | Template | Title |
|---|---|---|
| `/` | `views/index.hbs` | Home |
| `/about` | `views/about.hbs` | About Us |
| `/values` | `views/values.hbs` | Values & Philosophy |
| `/coaches` | `views/coaches.hbs` | Coaching Staff & Directors |
| `/join` | `views/join.hbs` | Join the Cats |
| `/news` | `views/news.hbs` | Cats in the News |
| `/match-recap` | `views/match-recap.hbs` | Match Recaps |
| `/college-recruiting` | `views/college-recruiting.hbs` | College Recruiting |
| `/coaching-resources` | `views/coaching-resources.hbs` | Coaching Resources |
| `/external-resources` | `views/external-resources.hbs` | External Resources |

## Design System

**Colors (`:root`):** `--navy: #00142E`, `--red: #ED1A2B`, `--white: #FFFFFF`, `--offwhite: #F5F5F5`, `--gray: #838383`, `--gray-lt: #E3E3E3`, `--gray-mid: #7E7E7E`.

**Side padding:** 260px on desktop → 40px at ≤1400px → 20px at ≤768px. Applied consistently to `.page-section { padding: 80px 260px }`, `.footer { padding: 60px 260px 0 }`, `.ts-slider { margin: 0 260px }`, and section-level padding in `style.css`.

**Fonts:** `--font-primary: 'Pretendard'` (body/general), `--font-vietnam: 'Be Vietnam Pro'` (headings/store), `--font-inter: 'Inter'` (stats/scores) — loaded via Google Fonts + CDN in the layout `<head>`.

**Scroll animations:** Add class `fade-up` to any element; `main.js` adds `.visible` when it scrolls into view. Stat counter: add `data-target="450"` to any `.stat-number` element.

## Key Components

**Testimonial slider** (`style.css` + `main.js` IIFE):
- Container: `<section class="ts-slider">` — fixed aspect ratio `1400/701`, `margin: 0 260px`.
- Each slide: `<div class="ts-slide ts-slide--light|ts-slide--dark">` — `position: absolute; inset: 0`, fades via `opacity`.
  - `ts-slide--light` = dark background (red/navy SVG) → white text.
  - `ts-slide--dark` = light background (gray SVG) → navy text; also toggles `data-dark-dots` on the slider for dark dot colors.
- Slide structure: `<img class="ts-bg">` (SVG background) + `<div class="ts-inner">` (icon + blockquote, scrollable) + `<div class="ts-bottom">` (author/role, pinned to bottom via `flex-shrink: 0`).
- Dot nav: `.ts-dots` / `.ts-dot[data-slide="n"]`. Arrows exist in HTML but are hidden via `.ts-arrow { display: none }`.
- Auto-advances every 6s; pauses on `mouseenter`, resumes on `mouseleave`.

**Inner-page layout pattern** (`pages.css`):
```html
<div class="page-hero">
  <div class="page-hero-bg" style="background-image: url(...)"></div>
  <div class="page-hero-content">
    <p class="page-hero-breadcrumb">Home / Page</p>
    <h1>Page Title</h1>
  </div>
</div>
<section class="page-section">  <!-- add --gray or --navy modifier as needed -->
  <div class="section-rule"></div>
  <h2 class="page-section-title">...</h2>
  <p class="page-section-subtitle">...</p>
  <!-- content -->
</section>
```

**Available `pages.css` component classes:**
- Layout: `.two-col`, `.two-col-img`, `.two-col-img-placeholder`
- Cards: `.value-card`, `.news-full-card`, `.resource-card`, `.ext-link-item`, `.join-info-card`
- Match recaps: `.match-list`, `.match-card`, `.badge-win/.badge-loss/.badge-draw`
- Recruiting: `.timeline`, `.timeline-item`, `.timeline-dot`
- Coaches: `.coaches-full-grid` (4-column CSS grid)
- CTA: `.cta-block` (full-width red band)

## Images

All real images live in `public/images/home/`. There are no images in the `heroes/`, `coaches/`, `news/`, or `teams/` subdirectories — those pages still use Unsplash placeholder URLs.

Real assets available at `/images/home/`:
- `Header.png`, `Proven.svg` — home hero/section assets
- `Teams1.png`, `Teams2.png` — teams section
- `Skip.png`, `Besty.png`, `Chris.png`, `Afrim.png` — staff headshots
- `testimonial1.svg`, `testimonial2.svg`, `testimonial3.svg` — slider backgrounds (1400×701)
- `testimonial_icon.png` — quote icon
- `facebook.svg`, `twitter.svg`, `youtube.svg`, `instagram.svg` — social icons (white fill)
- `sponsor/1.svg` through `sponsor/10.svg` — sponsor logos
- `ECNL.png`, `MID-ATLANTIC.png`, `PUMA.png`, `US-CLUB-SOCCER.png`, `NJ-YOUTH-SOCCER.png`, `ALLEYCATS.png` — league/partner logos
- `pants.png`, `top.png` — apparel images

## Adding a New Page

1. Add a route in [server.js](server.js): `app.get('/slug', (req, res) => res.render('slug', { title: '...' }));`
2. Create `views/slug.hbs` — content only (no `<html>`, no navbar/footer).
3. Use `.page-hero` + `.page-section` from [pages.css](public/css/pages.css) for consistent layout.
4. Update nav links in [views/layouts/main.hbs](views/layouts/main.hbs) if needed.
