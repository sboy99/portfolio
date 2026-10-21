# Shoreline design system

Shoreline is a quiet, editorial look: sand paper, serif type and ASCII water.
The reference designs live in `design/shoreline/` (open them in the design
canvas). This file describes how the site implements them.

## Themes

Two themes, set as `data-theme` on `<html>` by `themeInitScript` before first
paint: `light` is **day**, `dark` is **dusk**. A visitor's stored choice wins;
otherwise the system setting decides. Tapping the sun in the top band switches
theme (`ThemeProvider.toggleMode`, with a circular view transition from the sun).

## Colour tokens

Defined in `src/styles/globals.css` and exposed as Tailwind colours. Use the
utilities (`text-body`, `border-line`, `text-accent`), never hex values.

| Token | Use | Day | Dusk |
| --- | --- | --- | --- |
| `bg` | page | `#f4f1ea` | `#0e1a24` |
| `fg` | headings, links | `#0b2a3a` | `#efe7d6` |
| `body` | running text | `#2b4757` | `#cdd5d8` |
| `muted` | labels, notes, meta | `#4b6270` | `#9fb0b8` |
| `line` | borders | `#dcd6c8` | `#26394a` |
| `line-strong` | wave rules at rest | `#b9b09c` | `#3c556a` |
| `accent` | current nav, notes, hover, selection | `#0b6e99` | `#f0b37e` |

The ASCII bands also use `--sun`, `--sky`, `--sea1..3`, `--cloud`, `--boat` and
`--gull`, applied through `data-c` attributes on each run of characters.

## Type

Newsreader for everything you read, Geist Mono for labels and notes, Noto Serif
Bengali only for সাগর. Roles are utilities with phone sizes first and desktop
sizes from `md`:

| Utility | Phone | Desktop |
| --- | --- | --- |
| `type-display` | 34/40, weight 300 | 56/62 |
| `type-title` | 22/28 | 26/32 |
| `type-lead` | 18/29 | 21/34 |
| `type-small` | 16/26 | 18/28 |
| `type-label` | mono 12, caps, 0.08em | same |
| `type-meta` | mono 12/19 | same |

## Layout

A 960px column: 680px main and a 220px margin for numbered notes, 60px apart
(`PageColumns`). Below `lg` the notes follow the content under a wave, with
20px gutters. Sections sit 44px apart; list items 20px.

## Water

- `src/lib/shore/engine.ts` is the pure ASCII engine: horizon, footer sea,
  wave lines and tap ripples. It is unit-tested and must stay in step with the
  design files.
- `MotionProvider` runs one 140ms tick for the whole page. It starts paused
  under `prefers-reduced-motion`, stops while the tab is hidden, and the footer
  button plays or pauses it.
- `WaveRule` replaces every rule: a double wave opens a section; a single wave
  closes each project and takes the accent on hover.
- Tapping the water draws one ring per tap (up to 12), clipped to the water.
- All ASCII is `aria-hidden`; the sun and the pause button are real buttons.
