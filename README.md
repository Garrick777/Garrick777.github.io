# Gavin.github.io

GitHub Pages personal website for Gavin: Python & AI, empirical research, and embedded intelligent hardware.

## Local preview

This is a dependency-free static site. From this directory, run:

```bash
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Publish with GitHub Pages

For a user site, the public repository name must match the GitHub username exactly:

- GitHub username `Gavin` -> `Gavin.github.io`
- GitHub username `Garrick777` -> `Garrick777.github.io`

The display name in the site can remain `Gavin` regardless of the account handle. Push the contents of this directory to the matching `main` branch and select **GitHub Actions** as the Pages source. The workflow in `.github/workflows/pages.yml` deploys the repository root.

## Files

- `index.html` — page content and GitHub-style section tabs.
- `styles.css` — responsive visual system.
- `script.js` — language switcher, tabs, filters, mobile navigation, and contribution grid.
- `assets/` — local visual assets.
