# Repository Guidelines

## Project Structure & Module Organization
This is a dependency-free GitHub Pages site. Keep content split by concern:

- `index.html` for the page shell and section markup.
- `css/` for styling, with tokens in `css/tokens.css`, resets in `css/base.css`, layout in `css/layout.css`, and reusable components in `css/components.css`.
- `js/` for ES modules such as `main.js`, `nav.js`, `language.js`, `render.js`, and `filter.js`.
- `data/` for editable content arrays like `services.js` and `projects.js`.
- `assets/` for local images and visuals.
- `docs/` for internal notes only; do not link it from the public site.

## Build, Test, and Development Commands
There is no build step or package manager. Use a simple static server for local preview:

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173` in a browser. For quick checks, `git status` and `git log --oneline` are useful before you commit.

## Coding Style & Naming Conventions
Use the existing style: 2-space indentation, semicolons in JavaScript, lowercase file names, and descriptive `id`/`data-*` attributes. Keep HTML, CSS, and JS edits small and consistent with the current modular structure. Prefer editing `data/services.js` and `data/projects.js` instead of hardcoding new cards in `index.html`. Avoid placeholders, TODO text, or temporary copy in public content.

## Testing Guidelines
There is no automated test suite. Verify changes manually in the browser after serving locally:

- navigation and section switching
- language toggle persistence
- project filtering
- responsive layout at narrow and wide widths
- image loading and text overflow

## Commit & Pull Request Guidelines
Recent commits use concise conventional prefixes such as `feat:`, `fix:`, and `redesign:`. Follow that pattern, keep subjects short, and describe the user-facing change. PRs should include a brief summary, note any content or layout changes, and attach screenshots for visual updates.

## Security & Configuration Tips
This site is public. Do not add secrets, private history, or unreleased personal details. Keep the deployment simple: push to `main` for GitHub Pages, and avoid adding build tooling or workflows unless the task explicitly requires it.
