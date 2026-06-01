# 01 — Design Foundations (Tokens)

All tokens are the source values for `packages/tokens`, emitted as CSS variables (web)
and a JS theme object (mobile). Values are finalized for contrast (WCAG AA) and
green-only direction; tune to the dashboard image when received.

## Color

### Brand green scale (derived from the existing logo greens)
| Token | Hex | Use |
|-------|-----|-----|
| `green-50` | `#EAF3EE` | Tints, hover wash, subtle fills |
| `green-100` | `#D2E7DB` | Chips, selected rows |
| `green-200` | `#A9CFB9` | Borders on green surfaces |
| `green-300` | `#6FB07A` | Soft accents, illustrations |
| `green-400` | `#478D3C` | Secondary accent (existing leaf) |
| `green-500` | `#007854` | **Primary** (buttons, links) — existing emerald |
| `green-600` | `#016A4A` | Primary hover |
| `green-700` | `#01563C` | Headings, header bar — existing forest |
| `green-800` | `#013D2B` | Deep surfaces |
| `green-900` | `#003021` | Darkest text/overlay — existing deep green |

Primary CTA = `green-500`; deep brand/ink = `green-900`; dark surfaces/dark theme =
`green-800/900`.

### Neutrals (soft white → charcoal)
| Token | Hex | Use |
|-------|-----|-----|
| `neutral-0` | `#FFFFFF` | Base background |
| `neutral-50` | `#F7F9F8` | App canvas (very soft green-white) |
| `neutral-100` | `#EEF1F0` | Cards on canvas, dividers |
| `neutral-200` | `#E1E6E4` | Borders |
| `neutral-300` | `#C7CFCC` | Disabled borders |
| `neutral-400` | `#9AA4A1` | Placeholder |
| `neutral-500` | `#6B7472` | Muted text |
| `neutral-700` | `#3A413F` | Body text (secondary) |
| `neutral-900` | `#1A201E` | Charcoal — primary text |

### Glass (glassmorphism)
| Token | Value | Use |
|-------|-------|-----|
| `glass-light` | `rgba(255,255,255,0.55)` + blur(16px) | Frosted cards on imagery |
| `glass-tint` | `rgba(234,243,238,0.6)` + blur(16px) | Green-tinted frosted panels |
| `glass-dark` | `rgba(0,48,33,0.45)` + blur(18px) | Dark frosted (hero overlay, dark theme) |
| `glass-border` | `rgba(255,255,255,0.35)` | Hairline edge on glass |

### Semantic (all green-compatible; NO yellow)
| Token | Hex | Use |
|-------|-----|-----|
| `success` | `#007854` | Success (reuses primary green) |
| `info` | `#2F6F8F` | Informational (muted teal-blue) |
| `warning` | `#B8862A` | Caution — **muted bronze/amber, not bright yellow** |
| `danger` | `#B23B3B` | Errors, destructive |
| `danger-bg` | `#FBEDED` | Error surface |

> Note: `warning` is a desaturated bronze used sparingly for status only — it is **not**
> the old brand gold and never appears as a brand/background color.

### Membership status colors
- Active → `green-500` · Expiring soon → `warning` (bronze) · Past due/Expired →
  `danger` · Pending → `neutral-500`.

## Typography

Two families, intentional:

| Role | Font | Notes |
|------|------|-------|
| **Display / headings** | **"Fraunces" or "Canela"** (high-end serif) *or* **"Clash Display"** (modern sans) | Pick one in image review; serif nods to the heritage wordmark, sans reads more SaaS. Default plan: **Fraunces** for marketing headings, **Geist/Inter** for app UI. |
| **UI / body** | **Inter** (or **Geist Sans**) | Clean, legible, great at small sizes; used across portal/admin/forms |
| **Numeric/code** | **Geist Mono** | Stats, tables, invoice numbers |

### Type scale (1.250 major-third, fluid via clamp)
| Token | Size (desktop) | Use |
|-------|----------------|-----|
| `display-2xl` | 60 / 64px | Hero |
| `display-xl` | 48 / 56px | Page hero |
| `h1` | 38 / 46px | Page title |
| `h2` | 30 / 38px | Section |
| `h3` | 24 / 32px | Subsection / card title |
| `h4` | 20 / 28px | Card header |
| `body-lg` | 18 / 28px | Lead paragraph |
| `body` | 16 / 26px | Default |
| `body-sm` | 14 / 22px | Secondary, table |
| `caption` | 12 / 16px | Labels, meta |

Weights: 400 / 500 / 600 / 700. Body weight 400, UI labels 500, headings 600–700.
Letter-spacing: tighten large display (-0.02em), normal body.

## Spacing (4px base)
`0,1=4,2=8,3=12,4=16,5=20,6=24,8=32,10=40,12=48,16=64,20=80,24=96,32=128`.
Section vertical rhythm: 80–128px desktop, 48–64px mobile. Card padding: 20–24px.

## Radius (soft, rounded)
| Token | Value | Use |
|-------|-------|-----|
| `radius-sm` | 8px | Inputs, chips, badges |
| `radius-md` | 12px | Buttons |
| `radius-lg` | 16px | Cards |
| `radius-xl` | 24px | Panels, modals |
| `radius-2xl` | 32px | Hero/glass containers |
| `radius-full` | 9999px | Pills, avatars |

## Elevation / shadow (soft, green-tinted)
| Token | Value | Use |
|-------|-------|-----|
| `shadow-xs` | `0 1px 2px rgba(0,48,33,.06)` | Inputs |
| `shadow-sm` | `0 2px 8px rgba(0,48,33,.06)` | Cards (rest) |
| `shadow-md` | `0 8px 24px rgba(0,48,33,.08)` | Cards (hover), dropdowns |
| `shadow-lg` | `0 16px 40px rgba(0,48,33,.12)` | Modals, popovers |
| `shadow-glass` | `0 8px 32px rgba(0,48,33,.10)` + inset hairline | Glass panels |

Borders are hairline `1px neutral-200`; prefer shadow + tint over heavy borders.

## Layout & grid
- Max content width: 1280px (`container`), wide sections 1440px.
- 12-column grid, 24px gutters desktop / 16px mobile.
- Dashboard: 12-col with responsive card spans (e.g. stat cards 3-col → 6-col → 12-col).

## Breakpoints (mobile-first)
| Token | Min width | Target |
|-------|-----------|--------|
| `base` | 0 | Phone |
| `sm` | 480 | Large phone |
| `md` | 768 | Tablet |
| `lg` | 1024 | Small laptop |
| `xl` | 1280 | Desktop |
| `2xl` | 1536 | Wide |

## Iconography
- **Lucide** icon set (consistent, rounded, 1.5–2px stroke) — matches soft geometry.
- Sizes 16/20/24; stroke inherits `currentColor`.
- Category icons for the 14 industries (mapped in `Category.icon`).
- Custom brand marks: the **swan** (brand), membership badges, AI sparkle.

## Imagery style
- Warm, natural Toluca Lake photography; green-graded.
- Frosted-glass cards over photos for text legibility.
- Heritage motif (vintage newspaper) used as subtle texture, not loud backgrounds.
- All imagery responsive (next/image), AVIF/WebP, blur-up placeholders.

## CSS variable contract (excerpt)
```css
:root {
  --color-bg: #F7F9F8; --color-surface: #FFFFFF; --color-ink: #1A201E;
  --color-muted: #6B7472; --color-border: #E1E6E4;
  --color-primary: #007854; --color-primary-hover: #016A4A;
  --color-brand-deep: #003021; --color-brand-forest: #01563C;
  --glass-bg: rgba(255,255,255,.55); --glass-blur: 16px; --glass-border: rgba(255,255,255,.35);
  --radius-card: 16px; --radius-pill: 9999px;
  --shadow-card: 0 2px 8px rgba(0,48,33,.06);
  --ease-emphasized: cubic-bezier(.2,.8,.2,1); --dur-base: 220ms;
}
[data-theme="forest"] { --color-bg:#013D2B; --color-surface:#013D2B; --color-ink:#EAF3EE; /* ... */ }
```
