---
name: toluca-lake-chamber-design-system
description: The governing design system for the Toluca Lake Chamber of Commerce website — its visual language, color, typography, motion, spacing, photography, and component standards. Use this BEFORE and DURING any design, UI, styling, layout, page, component, animation, or front-end decision on this project, and to review whether existing work meets the bar. If a change touches how the site looks, feels, or moves, this skill applies.
---

# Toluca Lake Chamber — Design System

This is the **source of truth** for how the Toluca Lake Chamber website looks, feels, and moves. Every design and front-end decision must be evaluated against it. When in doubt, choose the option that feels more like a magazine and less like a website.

---

## 1. North Star — the feeling

The site must feel like these brands:

- **Apple** — restraint, precision, generous space, motion that feels physical.
- **Airbnb** — warm, human, friendly confidence, beautiful cards and discovery.
- **Aman Resorts** — quiet luxury, calm, cinematic, nothing shouts.
- **Soho House** — members-club intimacy, editorial warmth, tasteful.
- **Monocle Magazine** — editorial layouts, strong typographic hierarchy, curated.

It must **never** feel like:

- ❌ A generic chamber-of-commerce website
- ❌ A government / municipal website
- ❌ A WordPress template
- ❌ A corporate SaaS template

If a section could appear on a city-hall site or a generic SaaS landing page, **redesign it.**

---

## 2. Core principles (the 10)

Evaluate every decision against all ten. They are listed in priority order when they conflict.

1. **Editorial storytelling** — Pages tell a story with a clear narrative arc, not a wall of features. Lead with a strong statement, then unfold. Copy is curated and confident, never filler.
2. **Luxury simplicity** — Remove before adding. The most premium choice is usually the simplest. One strong idea per section.
3. **Cinematic visual hierarchy** — Each screen has one clear focal point. Use scale, space, and contrast to direct the eye. Think shots in a film, not a dashboard.
4. **Large typography** — Headlines are big and editorial (Playfair Display). Let type carry the design. Don't be timid with size.
5. **Exceptional whitespace** — Whitespace is a feature. When unsure, add more. Sections breathe.
6. **Subtle premium animation** — Motion is felt, not noticed. Apple-level easing, short and smooth. Never bouncy, spinning, or attention-seeking.
7. **Community first** — The Village and its people come before the institution. Warmth over bureaucracy. "We/our neighbors," not "the Chamber hereby."
8. **Business discovery** — Make finding and exploring local members feel delightful and effortless (directory, cards, search, maps).
9. **Mobile-first experience** — Design the mobile view first; it must be flawless, not an afterthought. Touch targets, thumb reach, no crowding.
10. **Performance focused** — Premium includes speed. Optimize images, avoid layout shift, keep animations cheap (transform/opacity), respect `prefers-reduced-motion`.

---

## 3. Color system

Green is the **brand**. One complementary color is the **action**. Everything else is neutral. Use color sparingly — a luxury palette is mostly ivory and ink with deliberate green.

| Role | Name | Hex | Usage |
|---|---|---|---|
| Brand (deep) | **Deep Forest Green** | `#003726` | Hero backgrounds, footers, dark sections, primary brand. |
| Brand (mid) | Primary Forest | `#00563F` | Primary green surfaces, the logo green. |
| Accent | **Rich Emerald** | `#00A76D` | Eyebrows, highlights, gradient text, icon tiles, small accents. |
| Canvas | **Warm Ivory** | `#F8F7F3` | Page background. Calm, warm, never stark white. |
| Surface | White | `#FFFFFF` | Cards/panels (often frosted glass — see §7). |
| Ink | **Charcoal** | `#0D2922` | Body text (a near-black green-charcoal). |
| Editorial | **Champagne Gold** | `#C7A867` | Reserved, sparing editorial flourishes — hairline rules, small dividers, numerals, premium detail. Never large fills. |
| Action | Lake Blue | `#2A7FB8` | **Current** CTA / button / active-state color (complement to green). |

Rules:
- **80 / 15 / 5** — ~80% green family, ~15% emerald accent, ~5% gold/spring flourish.
- **No yellow, no orange, no generic blue gradients.** (The lake blue above is the one sanctioned cool accent for actions.)
- Buttons are a **solid** action color (no rainbow gradients). Gradients are for *text* and *ambient* backgrounds only.
- Champagne gold is for *detail*, not buttons or large areas. If a touch of "members-club" luxury is needed, a thin gold rule or a gold numeral — never a gold block.
- **Source of truth in code:** CSS custom properties in `src/app/globals.css` under `@theme` (`--color-brand-*`, `--color-emerald`, `--color-spring`, `--color-canvas`, `--color-ink`, etc.). Add new colors there, never hardcode ad-hoc hexes in components.

> Note on blue vs. gold: CTAs currently use lake blue (`#2A7FB8`, set in `.btn-gradient` in `globals.css`). Champagne gold is reserved for editorial accents. If the action color should ever become gold, it is a one-place change in `.btn-gradient`.

---

## 4. Typography

- **Headlines: Playfair Display** (serif, `--font-display`). Large, editorial, high-contrast. This is the voice of the brand.
- **Body & UI: Inter** (`--font-sans`). Clean, neutral, quiet.
- **Italic accent:** A single italic word in a headline, in emerald/spring gradient (`.display-italic` + `.text-gradient-spring`), e.g. *"elevated."*, *"vitality."* — used as a signature flourish, sparingly.

Rules:
- **Go big.** Hero H1 ≈ `clamp(40px, 6vw, 72px)`. Section H2 ≈ `clamp(30px, 3.4vw, 42px)`. Don't shrink headlines to be safe.
- **Strong hierarchy** — a clear jump between H1 → H2 → body. No flat, same-size text.
- **Minimal text blocks** — short paragraphs, generous line-height (~1.7), `max-width` ~60ch. Break long copy into curated chunks. If a paragraph feels like a brochure, cut it.
- **Magazine layouts** — asymmetric grids, editorial eyebrows (uppercase, tracked, emerald), pull quotes, generous margins. Avoid centered-everything symmetry by default.
- Negative letter-spacing on display headings; never letterspace body text.

---

## 5. Motion

Stack: **Framer Motion** (component animation), **Lenis** (smooth scroll), CSS for ambient loops.

- **Signature easing:** `cubic-bezier(0.16, 1, 0.3, 1)` (a calm ease-out). Use it almost everywhere. Spring only for tactile micro-interactions (magnetic CTA, nav highlight).
- **Durations:** 0.2–0.45s for UI; 0.6–0.9s for reveals. Nothing slow enough to wait on, nothing twitchy.
- **What's allowed:** scroll-reveal fade/rise, gentle hover lift (`-translate-y-1`), image zoom on hover, count-ups, soft ambient drift, page-transition fade, magnetic buttons, animated nav underline.
- **What's banned:** bounce/elastic on entrances, spinning icons, parallax that fights scroll, anything that flashes, blinks, or demands attention. If you notice the animation, it's too much.
- **Always** respect `prefers-reduced-motion` (the project disables animation globally under it; new motion must honor it too).
- Animate only `transform` and `opacity` for performance. No animating `width`, `top`, `box-shadow` on scroll.

---

## 6. Spacing

- **Generous by default.** Section vertical rhythm uses the `.section` / `.section-lg` utilities (`clamp(64–160px)`). When a section feels tight, increase space before adding anything.
- **Breathing room everywhere** — padding inside cards is roomy (`p-6`/`p-7`+), gaps between items are wide.
- **No crowded sections.** One idea per section. If two ideas are fighting, split them.
- Content max-width via `Container` (~1180px). Don't run text full-bleed.
- Mobile keeps the calm: fewer columns, still generous padding, never cramped to fit.

---

## 7. Materials & components (how the system is built)

Tahoe-style **liquid glass** + warm ivory + deep green.

- **Glass surfaces:** `.glass`, `.glass-strong` (frosted, ~88% opaque — readable, content must not bleed through), `.nav-pill` (dark-green glass nav), `card-glass` + `card-glass-lift` (frosted cards with subtle 3D-tilt hover). Overlay menus/dropdowns should be **near-opaque** (`bg-white/95`+) so text behind never shows through.
- **Cards:** large radii (`rounded-3xl`), hairline borders, soft layered shadows, gentle hover lift. Use `Card` (`src/components/ui/card.tsx`) with `tone="glass"` for frosted.
- **Buttons:** `Button` (`src/components/ui/button.tsx`). Primary = solid action color via `.btn-gradient` + shimmer-on-hover. Pill shape (`rounded-full`). Secondary = white/hairline. Never invent a new button style inline; extend the component.
- **Heroes:** `PageHero` (`src/components/layout/page-hero.tsx`) — photographic background under a left-weighted deep-green overlay, Playfair headline, emerald eyebrow, breadcrumb. Pass `image` per page. The home hero is bespoke in `src/styles/home.css` (scoped under `.tlc-home`).
- **Header:** one fixed glass nav pill site-wide, with a mega-menu (icon tiles, descriptions, sliding highlight). In `src/components/layout/site-header.tsx`.
- **Ambient background:** `AuroraBackground` — keep it *whisper-faint*; it must never read as a "glow blob" over content.
- Dashboards (admin/portal) use the same glass language (`glass-strong` panels, frosted sidebar).

---

## 8. Photography

- **Authentic, local, community-focused.** Real Toluca Lake: the Village/Riverside Drive storefronts, the leafy 1920s tree-lined streets, the private park-like lake, neighbors and members, warm California light.
- **No cheesy stock.** No fake handshakes, no generic "diverse team in an office," no clip-art, no alpine/desert scenery that isn't Toluca Lake.
- Warm, natural, golden-hour tones that sit well under the green overlay. Editorial crops, not centered snapshots.
- **Current state:** heroes use license-clear *placeholder* scenery (lake/green/community) as a stand-in. These are temporary. Replace with real licensed Toluca Lake photography by dropping files into `public/images/` (and `public/images/heroes/`) and pointing the `image` prop / `HERO_IMG` at them. Always prefer real local photos over stock.
- Optimize: web-sized, compressed, correct aspect; lazy-load below the fold.

---

## 9. The decision test

Before shipping any design change, it must pass **all**:

- [ ] Could this appear in **Monocle / on Aman's site**? (If it looks like a chamber/gov/SaaS template → no.)
- [ ] Is there **one** clear focal point?
- [ ] Is the typography **big and editorial** with real hierarchy?
- [ ] Is there **enough whitespace** (then add a little more)?
- [ ] Is the motion **subtle** — would a calm person *not notice* it?
- [ ] Does it feel **warm and community-first**, not bureaucratic?
- [ ] Is it **flawless on mobile** first?
- [ ] Is it **fast** (cheap animation, optimized images, no layout shift)?
- [ ] Does it use the **system tokens/components** (not ad-hoc hexes or one-off styles)?
- [ ] Color balance ≈ **80% green / 15% emerald / 5% flourish**, action color solid?

If any box is unchecked, iterate before shipping.

---

## 10. Anti-patterns (delete on sight)

- Walls of text / brochure paragraphs.
- Centered-everything symmetry as a default.
- Tiny timid headlines.
- Cramped sections with no breathing room.
- Rainbow or multi-stop **button** gradients; neon; pure black `#000`; stark white `#FFF` page backgrounds.
- Bouncy/spinning/flashing animation; parallax that fights the scroll.
- Generic stock photography.
- Drop shadows that are harsh or uniform-gray (use soft, green-tinted, layered shadows).
- Inline one-off styles that bypass the design tokens/components.

---

## Tech context (where things live)

- **Next.js 15 App Router + React 19 + TypeScript**, **Tailwind v4** (tokens via `@theme` in `src/app/globals.css`).
- Fonts wired in `src/app/layout.tsx` (Playfair Display + Inter).
- Global ambient + transitions: `AuroraBackground`, `template.tsx`, `SmoothScroll`, `ScrollProgress` in `src/app/layout.tsx`.
- Home page is bespoke (`src/app/page.tsx` + `src/styles/home.css`, scoped `.tlc-home`). Inner pages share `PageHero` + `Container` + `Card` + `Button` + `SectionHeader`.
- **Add to the system, don't fork it:** new colors → `@theme`; new buttons → `Button` variants; new surfaces → glass utilities. Keep one design language.
