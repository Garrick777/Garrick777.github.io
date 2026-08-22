# Gavin.github.io

GitHub Pages personal site for Gavin: programming & technical tutoring (Python, SQL, Stata, R, AI-assisted coding), backed by independent projects across hardware, algorithms, and empirical research.

## Local preview

This is a dependency-free static site using native ES modules. From this directory, run:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Publish with GitHub Pages

For a user site, the public repository name must match the GitHub username exactly:

- GitHub username `Garrick777` -> `Garrick777.github.io`

The display name on the site can remain `Gavin` regardless of the account handle. Push the contents of this directory to the `main` branch; GitHub Pages serves the repository root directly (Source: Deploy from a branch).

## Files

- `index.html` — page markup (Hero / About / Services / Work / Contact).
- `css/` — visual system split by concern: `tokens.css` (design tokens), `base.css` (resets), `layout.css` (page shell), `components.css` (cards, buttons, etc).
- `js/` — ES modules: `language.js` (zh/en toggle), `nav.js` (mobile nav + scroll reveal), `render.js` (renders service/project cards from data), `filter.js` (project track filter), `main.js` (entry point).
- `data/` — content as data: `services.js` (tutoring offerings), `projects.js` (technical projects by track). Edit these files to change project content without touching HTML.
- `assets/` — local visual assets.
- `docs/` — internal planning notes (not linked from the site).
