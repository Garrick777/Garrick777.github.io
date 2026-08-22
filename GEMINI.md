# Gavin Site Context

## Product Direction

This repository contains Gavin's personal technical archive, not a tutoring sales landing page and not a copy of GitHub's repository UI. The public page uses a high-fidelity personal digital-garden structure inspired by editorial developer portfolios:

`sidebar navigation -> timeline -> latest notes -> shelves -> series -> project index -> about -> contact`

The site should communicate identity, skills, practical experience, and the way Gavin works. Tutoring is one part of the practice, not the sole homepage narrative.

## Identity Constraints

- Display name: `Gavin`
- GitHub handle: `Garrick777`
- Email: `qwqhhc1120@gmail.com`
- Education: South China University of Technology (bachelor's degree)
- Do not add or infer private master's-degree or employment details.

## Implementation

The site is dependency-free and served directly from the repository root. Keep the visual system split across `css/tokens.css`, `css/base.css`, `css/layout.css`, and `css/components.css`. `js/main.js` owns language switching, theme persistence, project filtering, and section highlighting. Keep public copy final-form; do not add TODOs, placeholders, or invented external project links.

## Verification

Run `python3 -m http.server 4173`, then verify the light/dark themes, Chinese/English toggle, sidebar hash navigation, project filters, keyboard focus, and no horizontal overflow at desktop and narrow widths. GitHub Pages publishes the `main` branch at `https://garrick777.github.io/`.
