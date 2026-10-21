# Shoreline design system

Design source for the Shoreline redesign: a sand-coloured, editorial portfolio with the sea drawn in ASCII. These files were exported from the Claude design canvas and are a reference for building the site, not production code.

| File | What it shows |
| --- | --- |
| `ShoreFoundations.dc.html` | Colour tokens (day and dusk), type scale, ASCII primitives, components, layout and motion rules |
| `ShoreHome.dc.html`, `ShoreHomeM.dc.html` | Home, desktop (1280) and mobile (390) |
| `ShoreProjects.dc.html`, `ShoreProjectsM.dc.html` | All ten projects with filters |
| `ShoreResume.dc.html`, `ShoreResumeM.dc.html` | Résumé |
| `ShoreAbout.dc.html`, `ShoreAboutM.dc.html` | About |

Key rules:

- Type: Newsreader for text, Geist Mono for labels, notes and ASCII art.
- Colour: accent is ocean blue (`#0b6e99`) by day and amber (`#f0b37e`) at dusk. Tapping the sun switches modes.
- Waves replace every rule. A double wave opens a section; a single wave under each project turns accent on hover.
- Motion runs on one 140ms tick, can be paused from the footer, and stays still under `prefers-reduced-motion`.
- Tapping the water draws one ripple ring per tap, clipped to the water.

Open items: the résumé PDF link is a placeholder, and the About copy needs a read-through.
