---
version: alpha
name: Portfolio
description: >
  A controlled, technical portfolio — editorial weight without decoration.
  Concept-first. AI executes, the eye decides.

colors:
  primary:           "#0A0A0A"
  surface:           "#111111"
  surface-raised:    "#161616"
  border:            "#1F1F1F"
  border-subtle:     "#161616"
  text-primary:      "#F0EDE8"
  text-secondary:    "#808080"
  text-muted:        "#3A3A3A"
  accent:            "#E8FF5A"
  accent-hover:      "#D4E840"
  accent-dim:        "#2A2E0A"
  on-accent:         "#0A0A0A"
  destructive:       "#FF4545"

typography:
  display:
    fontFamily: Syne
    fontSize: 8rem
    fontWeight: "700"
    lineHeight: "0.95"
    letterSpacing: "-0.04em"
  h1:
    fontFamily: Syne
    fontSize: 5rem
    fontWeight: "700"
    lineHeight: "1.0"
    letterSpacing: "-0.03em"
  h2:
    fontFamily: Syne
    fontSize: 3rem
    fontWeight: "500"
    lineHeight: "1.1"
    letterSpacing: "-0.02em"
  h3:
    fontFamily: Space Grotesk
    fontSize: 1.25rem
    fontWeight: "500"
    lineHeight: "1.3"
    letterSpacing: "-0.01em"
  body-lg:
    fontFamily: Inter
    fontSize: 1.125rem
    fontWeight: "400"
    lineHeight: "1.75"
    letterSpacing: "0em"
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: "400"
    lineHeight: "1.7"
    letterSpacing: "0em"
  label:
    fontFamily: Space Mono
    fontSize: 0.75rem
    fontWeight: "400"
    lineHeight: "1"
    letterSpacing: "0.08em"
  label-lg:
    fontFamily: Space Mono
    fontSize: 0.875rem
    fontWeight: "400"
    lineHeight: "1"
    letterSpacing: "0.06em"
  nav:
    fontFamily: Space Grotesk
    fontSize: 0.9rem
    fontWeight: "400"
    lineHeight: "1"
    letterSpacing: "-0.01em"

spacing:
  xs:   4px
  sm:   8px
  md:   16px
  lg:   24px
  xl:   40px
  2xl:  64px
  3xl:  96px
  4xl:  120px
  5xl:  160px

rounded:
  none: 0px
  xs:   2px
  sm:   3px

components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor:       "{colors.on-accent}"
    typography:      "{typography.label-lg}"
    rounded:         "{rounded.none}"
    padding:         "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor:       "{colors.on-accent}"
  button-ghost:
    backgroundColor: "transparent"
    textColor:       "{colors.text-primary}"
    typography:      "{typography.label-lg}"
    rounded:         "{rounded.none}"
    padding:         "11px 23px"
  button-ghost-hover:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.text-primary}"
  tag:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.text-secondary}"
    typography:      "{typography.label}"
    rounded:         "{rounded.sm}"
    padding:         "4px 10px"
  tag-accent:
    backgroundColor: "{colors.accent-dim}"
    textColor:       "{colors.accent}"
    typography:      "{typography.label}"
    rounded:         "{rounded.sm}"
    padding:         "4px 10px"
  card:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.text-primary}"
    rounded:         "{rounded.none}"
    padding:         "32px"
  card-hover:
    backgroundColor: "{colors.surface-raised}"
  nav-link:
    backgroundColor: "transparent"
    textColor:       "{colors.text-secondary}"
    typography:      "{typography.nav}"
  nav-link-hover:
    textColor:       "{colors.text-primary}"
  nav-link-active:
    textColor:       "{colors.accent}"
  list-item:
    backgroundColor: "transparent"
    textColor:       "{colors.text-primary}"
    padding:         "20px 0"
  list-item-hover:
    backgroundColor: "{colors.surface}"
    padding:         "20px 16px"
  input:
    backgroundColor: "{colors.surface}"
    textColor:       "{colors.text-primary}"
    rounded:         "{rounded.none}"
    padding:         "12px 16px"
    typography:      "{typography.body-md}"
  input-focus:
    textColor:       "{colors.text-primary}"
---

## Overview

Controlled editorial minimalism. Not a landing page — a document with personality.
The UI behaves like a well-made tool: everything where you expect it, nothing you don't need.

One accent colour. One job. Everything else is neutrals and weight.

This system exists because vague prompts produce vague output. Drop this file at the
project root. Every component the AI touches inherits these constraints exactly.
No improvisation on tokens. No filling gaps with defaults.

The concept is already decided. This file is the brief.

## Colors

The palette is near-black surfaces with warm off-white text and a single electric accent.
There are no blues, no gradients, no glass. The accent (`#E8FF5A`) is the only colour
that carries meaning — use it for interaction states, active indicators, and primary CTAs.
Everything else is structural.

- **primary (`#0A0A0A`):** Page background. Near-black, not pure black — avoids harshness.
- **surface (`#111111`):** Cards, sidebars, elevated containers. One step lighter than primary.
- **surface-raised (`#161616`):** Hover state for surfaces. Barely perceptible lift.
- **border (`#1F1F1F`):** Hairline separators. Always `1px`, never thicker in resting state.
- **border-subtle (`#161616`):** Hover-state border. Paradoxically dimmed — the accent carries brightness signal.
- **text-primary (`#F0EDE8`):** Warm off-white for headings and active copy. Never pure white.
- **text-secondary (`#808080`):** Meta, captions, nav links at rest. Clearly subordinate.
- **text-muted (`#3A3A3A`):** Placeholder text, near-invisible separators. Intentional.
- **accent (`#E8FF5A`):** The one colour. Active nav, hover reveals, primary CTA fill.
- **on-accent (`#0A0A0A`):** Text on accent backgrounds. Near-black for contrast.

Do not introduce additional colours. If a new colour feels necessary, a constraint
failed upstream — fix the constraint, not the palette.

## Typography

Three typefaces. One hierarchy. No mixing within a single element.

- **Syne** — Display and H1/H2 headings only. Heavy, compressed, contemporary.
- **Space Grotesk** — H3, subheadings, navigation. Bridges Syne's aggression and Inter's neutrality.
- **Space Mono** — Labels, tags, metadata, index numbers, timestamps. Monospaced signals precision.
- **Inter** — Body copy only. Neutral and legible. Never used for headings.

All heading sizes in the token schema list max values. In code, implement them as
`clamp()` fluid values — `display` becomes `clamp(3.5rem, 8vw, 8rem)`, `h1` becomes
`clamp(2.5rem, 5vw, 5rem)`, `h2` becomes `clamp(1.8rem, 3.5vw, 3rem)`.
Do not hard-code fixed `px` values for display, h1, or h2.

Letter-spacing is always negative on headings — never default or positive.
`display` and `h1` use `line-height` below 1.0 — headings are tight.
`body-md` and `body-lg` are generous at 1.7–1.75.
`label` and `label-lg` are always uppercase in use, never mixed-case.

## Layout

Max content width: `1200px`. Side padding: `clamp(20px, 5vw, 80px)`.
Vertical section rhythm: `{spacing.4xl}` (120px) top and bottom on major sections.
All internal spacing uses the 8px base unit — no arbitrary values.

Grid: 12-column at desktop, 4-column at mobile. Most content sits in 8 of 12 columns,
centred or left-aligned. Full-bleed is the exception.

Section separators: `1px solid {colors.border}`. No decorative dividers, no gradient washes,
no subtle texture overlays.

## Elevation & Depth

No shadows. Depth is created through colour steps only: `primary` → `surface` →
`surface-raised`. That is the entire z-axis vocabulary.

Borders signal containment, not depth. Resting state: `1px solid {colors.border}`.
Hover state: `1px solid {colors.border-subtle}` — intentionally dimmer, because the accent
(not border brightness) signals the active state.

No `box-shadow` on any component. No `text-shadow`. No `backdrop-filter: blur()`.

## Shapes

Sharp edges throughout. `{rounded.none}` (0px) on all interactive components.
`{rounded.sm}` (3px) only on tags and badges — sharp edges read as harsh at small scale.

No pill shapes. No circles except avatar images.

## Components

### Borders (prose — not in token schema)

The DESIGN.md spec does not support `border` as a component sub-token.
Implement borders in CSS directly, referencing token values:

- `button-ghost`: `border: 1px solid {colors.border}`; hover: `border: 1px solid {colors.border-subtle}`
- `card`: `border: 1px solid {colors.border}`; hover: `border: 1px solid {colors.border-subtle}`
- `tag`: `border: 1px solid {colors.border}` — no hover border change
- `list-item` hover: `border-left: 2px solid {colors.accent}` — the only left-border accent usage
- `input` resting: `border: 1px solid {colors.border}`; focus: `border: 1px solid {colors.text-secondary}` — no glow, no outline, no box-shadow. Caret: `{colors.accent}`

### Motion

All transitions: `ease-out`. Entrances use `cubic-bezier(0.16, 1, 0.3, 1)`.

- Micro-interactions (hover colour, border): `150ms ease-out`
- Layout transitions (card hover, padding shift): `200ms ease-out`
- Entrance animations (scroll-triggered): `300ms cubic-bezier(0.16, 1, 0.3, 1)`
- List item stagger: `50ms` delay per item, not per character

### Buttons

Two variants: `button-primary` (accent fill) and `button-ghost` (bordered, transparent).
Never introduce a third. Button labels use `label-lg`, uppercase.

`button-ghost` renders with `1px solid {colors.border}` and transparent background.
On hover: background shifts to `surface`, border dims to `border-subtle`, 150ms.
No scale transform. No shadow. No glow.

### Cards

Flat. `1px solid {colors.border}`. Zero radius. 32px internal padding.
Hover: background → `surface-raised`, border → `border-subtle`. Transition 200ms.
Cards never stack more than two columns on desktop.

### Navigation

Nav links rest at `text-secondary`. Hover → `text-primary` in 150ms.
Active state uses `accent`. No underlines, no background fills.

### List Items

Separated by `1px solid {colors.border}` bottom rule. Resting state: fully transparent.
Hover: background → `surface`, left padding expands to 16px, `2px solid accent` left border appears.
All three properties transition simultaneously at 200ms. Do not stagger within a single item.

### Tags

Two variants: neutral (`tag`) and active (`tag-accent`).
`tag-accent` uses `accent-dim` background with `accent` text — not full accent fill.
Tags are never interactive unless they filter content.

### Inputs

Zero radius. `surface` background. Focus: border colour → `text-secondary`.
No coloured outline. No glow. No `box-shadow`. Caret: `{colors.accent}`.

## Do's and Don'ts

### Do

- Iterate on the constraint that failed, not the output that looks wrong.
- Use `clamp()` for all fluid type sizes — display, h1, h2 as documented in Typography.
- Let whitespace carry structural weight. Spacing is not decoration.
- Apply `accent` sparingly — one or two instances per viewport. Scarcity is its power.
- Use `Space Mono` uppercase for precision signals: timestamps, indices, labels, tags.
- Stagger list entrance animations at 50ms per item maximum.
- Transition entrances with `cubic-bezier(0.16, 1, 0.3, 1)`, hovers with `ease-out`.
- Reference `{colors.border}` and `{colors.border-subtle}` in CSS directly for border rules.

### Don't

- Do not introduce new colours. If something looks off, fix layout or spacing first.
- Do not use `font-weight: 800` or `900` — `700` is the ceiling.
- Do not bounce, spring, or scale on hover — no `transform: scale()` anywhere.
- Do not add parallax effects.
- Do not use `opacity` fades on body text.
- Do not give cards or buttons `border-radius` above `{rounded.sm}` (3px).
- Do not stack multiple accent-coloured elements in the same viewport region.
- Do not use `box-shadow` or `text-shadow` — depth comes from colour steps only.
- Do not let the AI guess. Incomplete brief = incomplete output. Fix the brief.