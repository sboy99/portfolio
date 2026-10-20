# Design system

The site is a quiet, monochrome reading surface laid on a dashed page grid. One
accent color carries emphasis; everything else is neutral. Tokens live in
[`src/styles/globals.css`](../src/styles/globals.css) and
[`src/styles/palettes.css`](../src/styles/palettes.css).

## Color

Two layers:

1. **Palettes** (`palettes.css`): `--neutral-*` and `--primary-*` ramps. The theme
   panel swaps them via `data-neutral` / `data-primary` on `<html>`.
2. **Roles** (`globals.css`): what components use. Components never reference a
   ramp step directly.

| Role | Utility | Use |
| --- | --- | --- |
| `background` / `foreground` | `bg-background`, `text-foreground` | Page and primary text |
| `card` | `bg-card` | Raised sheets (resume, theme panel) |
| `muted` | `bg-muted` | Fills: table header, hovered controls |
| `muted-foreground` | `text-muted-foreground` | Secondary text, meta, links at rest |
| `surface-hover` | `bg-surface-hover` | Hover fill on full-width list rows |
| `border` / `border-strong` | `border-border`, `border-border-strong` | Dashed grid and dividers / hovered outlines, list markers |
| `accent` / `accent-foreground` | `bg-accent`, `text-accent` | Primary action, email, origin badge |
| `accent-hover` | `hover:bg-accent-hover` | Primary button hover |
| `accent-soft` | `bg-accent-soft` | Tinted chip background |
| `ring` | `ring-ring` | Focus rings |

Contrast rules baked into the roles:

- Light mode uses `primary-700` for `accent`, so accent text reads on light
  surfaces for every primary, with no per-color overrides.
- Light `muted-foreground` sits between neutral 500 and 700 so secondary text
  also clears 4.5:1 on `muted` fills, not just on the page background.

**Accent is scarce.** Use it for one thing per item at most. Tags default to the
neutral badge; metrics inside body copy are emphasised with `text-foreground`
and weight, not color.

## Typography

Geist Sans for prose, Geist Mono for anything data-like (dates, places, tags,
links in meta rows). Type roles set font, size, weight and tracking only; pair
each with a color utility.

| Role | Spec | Use |
| --- | --- | --- |
| `type-display` | 2xl / semibold / tight, balanced | Page `h1` |
| `type-heading` | sm / semibold / tight | Section headings |
| `type-title` | sm / medium | Item titles in lists |
| `type-body` | sm / 24px leading, pretty wrap | Paragraphs and bullet lists |
| `type-meta` | mono xs | Dates, locations, link rows |
| `type-eyebrow` | mono 2xs / medium / uppercase / wider | Labels, table headers, skill groups |

`text-2xs` (11px) is the only step below Tailwind's scale; don't use arbitrary
`text-[..px]` sizes.

## Spacing and layout

- `Container` is `max-w-5xl px-4`; the dashed vertical rules sit on that edge.
- `gutter` (`px-gutter`, `p-gutter`, 0.75rem) is the inset that lines content up
  inside those rules. Sections, rows and headings all use it.
- Sections are separated by `DashedSection` (`py-6`) and the page chrome by
  `SectionGap`.

## Radius

| Radius | Use |
| --- | --- |
| `rounded-sm` | Badges |
| `rounded-md` | Buttons, swatches, other controls |
| `rounded-lg` | Sheets and panels (`Card`, `ResumeSheet`, theme panel) |

## Motion

- `ease-standard` (`cubic-bezier(0.2, 0, 0, 1)`) for all transitions.
- 150ms for controls and links; 300ms with a 75ms delay for list-row hover so
  scanning the page doesn't flicker.
- Decorative motion (`BeamField`, the theme view transition) is disabled under
  `prefers-reduced-motion`.

## Components (`src/components/ui`)

| Component | Variants | Notes |
| --- | --- | --- |
| `Button` / `buttonClassName()` | `primary`, `secondary`, `ghost`; sizes `sm`, `icon` | Use `buttonClassName({ variant })` to style a `Link` |
| `Badge` | `neutral` (default), `accent` | Mono 2xs chip |
| `TextLink` | `muted` (default), `accent`; `external` | `external` adds `target` and a safe `rel` |
| `List` / `ListItem` | `row` (default), `flush` | Dashed dividers; `row` spans the frame with a hover fill, `flush` sits inside padded sheets |
| `SectionHeading` | | Heading plus full-bleed dashed rule |
| `DashedFrame` / `DashedSection` | | Page frame and section separators |
| `Card` | | Bordered sheet on `bg-card` |
| `Metric` | | Inline emphasised number in body copy |

## Accessibility

- A global `:focus-visible` outline in `ring` covers links; buttons use a ring
  with an offset.
- Text selection uses a tinted accent.
