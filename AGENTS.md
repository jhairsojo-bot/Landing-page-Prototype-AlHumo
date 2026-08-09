# AGENTS.md

Static single-page prototype site for "AL HUMO" (a Putumayo restaurant demo). No build tooling, no package.json, no tests, no lint. All UI text is Spanish; new demo content should keep the `[Texto demostrativo]` / `nota-demo` conventions.

## Run / verify

- No build step. Serve the folder (`python -m http.server` or `npx serve`) and open the URL; hash routing and scripts load fine from `file://` too.
- No automated tests — verify changes in a browser, especially hash navigation.

## Architecture

- `index.html` contains two views toggled by `hidden`: `#vista-inicio` (landing) and `#vista-menu`.
- Hash routing is plain classic scripts (no modules, shared globals), loaded `defer` in this exact order: `js/data.js` → `js/destacados.js` → `js/menu.js` → `js/router.js` → `js/navbar.js`. `data.js` must stay first (defines globals `platosDestacados` and `menuCompleto`).
- Content for "Platos destacados" cards and the menu page lives in `js/data.js`, not in HTML.

## Router / scroll gotchas (easy to break)

- `js/router.js` `cambiarVista()`: hash `#/menu` toggles views; other hashes (`#inicio`, `#resenas`, `#ubicacion`, ...) scroll to the matching section id via `scrollIntoView()` and focus it with `focus({ preventScroll: true })` (via helper `enfocar()`).
- NEVER call `.focus()` without `preventScroll` inside a hashchange handler: with `scroll-behavior: smooth` (base.css) it starts a smooth scroll to the focused element and overrides section navigation (hero/top steals the scroll — the bug fixed here).
- When a section hash is clicked while on `#/menu`, the native anchor scroll silently fails (target view is `display:none` at click time), so the router must scroll manually after unhiding the view.
- `scroll-padding-top: 5rem` (base.css) offsets sections under the sticky navbar — don't remove it; don't add per-section `scroll-margin` on top of it.
