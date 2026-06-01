# Phase 3 — Visual Design System & Animation Framework

**Project:** Toluca Lake Chamber of Commerce — Custom Platform
**Date:** 2026-05-30
**Status:** Design system specification (source of truth for the build; no app code yet)
**Note:** Built from the written brief. To be reconciled with the client's dashboard
reference image when provided (not yet received).

This is the **single source of truth** for the platform's look and motion. Every token
here feeds `packages/tokens` and the Tailwind preset (web) and the React Native theme
(mobile), so web and the future app stay visually identical.

## Documents

| # | File | Covers |
|---|------|--------|
| 1 | [01-design-foundations.md](01-design-foundations.md) | Color (green-only), type, spacing, radius, shadow, glass, grid, breakpoints, icons |
| 2 | [02-components.md](02-components.md) | Buttons, cards, forms, tables, directory/event/membership cards, dashboard, notifications, AI, badges, nav |
| 3 | [03-animation-framework.md](03-animation-framework.md) | Motion tokens, transitions, scroll reveals, micro-interactions, states, reduced-motion |
| 4 | [04-responsive-and-app-ready.md](04-responsive-and-app-ready.md) | Mobile-first rules, bottom nav, touch, key screens, tablet/desktop |

## Design north star

> **"A civic SaaS for the Village."** Premium, calm, and confident — like a modern
> finance/health dashboard wearing Toluca Lake's green. Soft rounded geometry, layered
> glass panels, generous whitespace, restrained motion. Nothing bright, nothing busy,
> nothing that reads "default chamber template."

### The 7 rules
1. **Green is the whole palette.** No yellow/gold anywhere. Hierarchy comes from green
   shades + neutrals + glass, not from a second hue.
2. **Soft, not sharp.** Rounded corners (lg/xl/2xl), soft shadows, frosted layers.
3. **Whitespace is a feature.** Airy spacing; let content breathe.
4. **One display + one UI font.** Tight, intentional type. No font soup.
5. **Depth via layering & blur,** not heavy gradients or borders.
6. **Motion is purposeful and quiet.** It guides attention; it never performs. Apple-
   quality easing, short durations, always reduced-motion-safe.
7. **Designed once for every screen.** Mobile-first; each component has a phone, tablet,
   and desktop form, and a clear native counterpart.

## Theming
- Light theme is primary. A **dark "forest" theme** is supported via the same tokens
  (deep-green surfaces) — defined as token sets, switchable later.
- All values are CSS variables → instant theme switching and brand consistency across
  web + mobile.
