# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # or: node server.js — static dev server on http://localhost:3000
```

That is the whole toolchain. There is **no build step, no bundler, no tests, no linter, and zero npm dependencies** — `package.json` exists only to hold the `dev`/`start` scripts. `server.js` is a hand-rolled zero-dependency static file server that serves the repo root so paths behave exactly as they will in production.

Deployment is the files themselves: Vercel (`vercel.json` sets `cleanUrls` + `trailingSlash: false`), or dropped onto any static host. Nothing is generated, so whatever is committed is what ships.

## Architecture

A 21-page static marketing site. Each page is hand-written HTML sharing one stylesheet (`assets/css/style.css`, ~3.5k lines) and one script (`assets/js/site.js`, ~1.1k lines, one IIFE). Directory structure mirrors the site's information architecture: `why/`, `what/`, `who/`, `where/`, `how/`, `give/`, `seminars/`.

### The `PAGE_DEPTH` contract

Every page **must** declare its nesting depth before loading `site.js`:

```html
<script>const PAGE_DEPTH = 2;</script>
<script src="../../assets/js/site.js?v=20260601"></script>
```

`site.js` turns this into `r = "../".repeat(depth)` and prefixes every link it injects. Depth 0 = repo root, 1 = `why/`, 2 = `where/africa/`. Get it wrong and the page still renders fine while every header, footer and menu link silently points somewhere nonexistent — so set it to match the directory, and match the relative paths in the `<link>`/`<script>` tags too.

### Chrome is injected, never authored

`site.js` inserts all shared chrome at load:

- `navHTML()` → `insertAdjacentHTML("afterbegin")` — header, **logo only**.
- `footerHTML()` → `insertAdjacentHTML("beforeend")` — footer, podcast widget, *and* the floating bottom menu.

Never hand-write a header or footer into a page. The site's actual navigation lives in the floating bottom pill (`.fm-shell`), not the header; to change nav links, edit `fmItemHTML`/`fmParentItemHTML` calls inside `footerHTML()`.

**The three chrome pieces are one unit.** `initHeroChrome()` hides the header logo, the floating menu and the podcast button through the page's opening, then eases all three in together once it scrolls past. The opening is the hero — plus `.section-confront` on the homepage, which is treated as part of it. `initScrollNav()`'s solid-header threshold is deliberately tied to the same point so the header is never white-on-white. Change one of these and you must change the others.

### Scroll reveals

Elements opt in with `data-reveal` and `initReveals()` adds `.is-revealed` via IntersectionObserver. Variants: default (fade + rise), `"cinematic"` (fade + rise + blur), `"left"`, `"right"`, `"scale"`. Stagger with `data-delay="1"`–`"6"` (values outside that range have no CSS rule and so no delay). Children of `.regions-grid`, `.pillars-grid`, `.card-grid`, `.team-grid`, `.giving-options`, `.feature-bullets` are auto-tagged and auto-staggered — don't add `data-reveal` to them manually.

### Init pattern

All modules are invoked through `safe(fn, "name")`, which catches and logs rather than throwing. One broken module therefore does **not** break the rest of the page — when something silently doesn't work, look for a `console.warn` prefixed with the module name.

## The single biggest gotcha: CSS override layering

`style.css` is one file whose later sections **intentionally override earlier ones**. Section numbering restarts and repeats (there are two `23.`/`24.`/`25.`), and several late blocks — the `★ COMPREHENSIVE FIXES`, `★ NAV FIXES`, `40. FINAL POLISH`, `45. HOVER PASS` — exist purely to re-specify rules defined hundreds of lines above, sometimes with `!important`.

**Always `grep` the whole file for a selector before editing it.** Editing the first definition you find is frequently a no-op, and worse, partial overrides produce real bugs: a late block that re-declared `transition` without re-declaring the animated property left `padding-left` snapping instantly; another that added `.podcast-widget` to a `position: relative` group knocked a `position: fixed` widget into normal flow. Both looked correct in isolation.

## Motion conventions

- Hover transforms are small **translates** with `--ease-out`, never `scale()`. Most buttons carry `backdrop-filter`; scaling makes the browser resample the blurred backdrop every frame, which reads as the button vibrating.
- Never animate a property that changes layout (padding, margin, width) on hover — the element's own edge moves under the pointer and the hover flickers on and off.
- When adding a hover, list **every** animated property in that element's `transition`, and check no later block replaces it (see above).
- `@media (prefers-reduced-motion: reduce)` near the end of the file force-settles reveals and kills looping animations; add new looping keyframes to its selector list.

## Third-party at runtime

There is no package manager here, so external code is either vendored or fetched from a CDN at runtime:

- **d3 + Natural Earth land GeoJSON** (globe) are vendored — `lib/d3.min.js`, `assets/ne_110m_land.json` — with the CDN kept only as fallback. This is deliberate: when either was remote-only and the request was slow or blocked, the continents never drew and the globe's region pins appeared to float over an empty sphere. Keep the globe's data local.
- **Leaflet** still loads from unpkg, injected on demand by `initRegionMaps()` for `.region-map[data-map]` elements (region pages only).
- **Google Fonts** (Inter) via `<link>` in every page head.
- Photography is currently `picsum.photos` placeholders.

## Cache busting

Both `style.css` and `site.js` are linked with `?v=20260601` on all 21 pages. If you bump it, bump it everywhere in the same change — a partial bump leaves some pages on stale CSS with new JS.
