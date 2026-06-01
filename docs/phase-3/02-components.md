# 02 — Component Design Specs

Specs for the component library (`packages/ui`). Each entry: anatomy, variants, states,
and motion hook (see doc 03). All components mobile-first, tokenized, AA-accessible.

## Buttons
- **Variants:** `primary` (green-500 fill, white text), `secondary` (green-700 outline/
  ghost), `tertiary` (text-only green), `glass` (frosted on imagery), `danger`,
  `subtle` (neutral-100 fill).
- **Sizes:** sm (32h) · md (40h) · lg (48h) · icon (square).
- **Radius:** `radius-md` (12px). **Shadow:** xs at rest, sm on hover.
- **States:** hover (darken + lift 1px + shadow), active (scale .98), focus (2px
  green-500 ring + offset), disabled (neutral-300, no shadow), loading (spinner +
  label hold, width locked).
- **Motion:** 120ms ease-out press; ripple/scale micro-interaction.

## Inputs & forms
- **Field:** label (caption-500), input (44h, `radius-sm`, neutral-200 border,
  neutral-50 fill), helper/error text, optional icon/affix.
- **Focus:** border→green-500 + soft green ring (`0 0 0 3px green-100`).
- **Validation:** inline error (danger text + `danger-bg` tint + shake micro-anim);
  success check on valid blur.
- **Controls:** Select/Combobox (Radix, search), Checkbox/Radio (green-500 check,
  rounded), Switch (green-500 track), Slider, Date/Time picker, File upload
  (drag-drop, image preview, progress ring), Textarea (auto-grow), Tag/Chip input.
- **Multi-step forms:** Stepper header w/ animated progress bar; per-step validation;
  save-and-continue.
- **AI assist affordance:** "✨ Write with AI" button inside relevant fields (opens AI
  generator, see below).

## Cards (base)
- `radius-lg` (16px), `surface` bg, `shadow-sm`, 20–24px padding, hairline border.
- Hover: lift (translateY -2px) + `shadow-md`, 200ms.
- Variants: plain, interactive (link), glass, stat, media (image header).

## Stat / metric tile (dashboard)
- Anatomy: icon chip (green-100 bg), label (caption muted), big value (h2, Geist Mono),
  delta pill (▲/▼ with success/danger, **bronze for neutral** — never bright yellow),
  optional sparkline.
- **Counter animation** on mount (see doc 03). Loading = skeleton shimmer.

## Directory card (business)
- **Grid card:** logo/avatar, business name (h4), category chip(s), tagline (2-line
  clamp), location, tier badge (Featured/Premium), quick actions (save ♥, view).
- **List row:** denser horizontal layout for list view.
- **Map pin/popover:** mini-card on map.
- Premium/Featured cards get a subtle green gradient edge + ribbon.
- Hover: lift + reveal "View profile →"; save toggles with heart pop micro-anim.

## Event card
- Cover image (16:9, rounded top), **date block** (overlay chip: month/day), title (h4),
  time + location with icons, program tag, price/Free or "Members only" badge,
  capacity/"Almost full" indicator, CTA (Register / RSVP / Waitlist).
- States: upcoming, almost-full (capacity bar), sold-out, past (desaturated).
- Calendar variant: compact pill in calendar cell.

## Membership / plan card
- Tier name, price (large, /yr), audience/eligibility, benefit list (check rows),
  primary CTA (Join / Choose), "Most popular" highlight (green ring + lift), current-
  plan state (badge + manage), comparison toggle.
- Selected/hover: elevate + green glow.

## Tables (admin/data)
- DataTable: sticky header, zebra-free with hairline rows, sortable headers (animated
  caret), row hover (green-50 wash), selectable (checkbox), inline actions menu,
  pagination/keyset, column visibility, density toggle.
- Cells: status badges, avatars, currency (mono), relative dates.
- Mobile: collapses to stacked cards.
- Empty/loading/error states standardized.

## Badges & pills
- Status badges (Active/Expiring/Past due/Pending — colors per doc 01), tier badges,
  category chips (green-100), count badges, "New"/"Featured" ribbons. `radius-full`.

## Membership status indicator
- Compact: colored dot + label. Rich: progress ring showing days-to-renewal with
  animated fill; turns bronze when <30 days, danger when overdue.

## Navigation
- **Top app bar:** glass, sticky, condenses on scroll; logo (swan), primary nav, search,
  Join/Donate CTAs, account menu, notification bell.
- **Mega-dropdown:** glass panel, grouped links + featured callout (replaces current
  gold dropdowns).
- **Portal/admin sidebar:** collapsible, icon+label, active item green pill + indicator;
  collapses to icons on tablet.
- **Mobile drawer + bottom nav:** see doc 04.
- **Breadcrumbs:** for deep admin/content pages.
- **Tabs / segmented control:** animated active underline/pill.

## Dashboard components
- Grid of stat tiles, charts (area/bar/donut — green palette, soft grid), activity feed,
  quick-action cards, "completeness" progress, recent items lists, calendar widget,
  map widget. Cards reflow responsively (doc 04).

## Notification components
- **Bell** with unread count badge (pop animation on new).
- **Dropdown/panel:** list of NotificationItems (icon, title, body, time, unread dot),
  mark-all-read, filter, link-through.
- **Toasts:** top-right (desktop) / top (mobile), success/info/warning/danger, auto-
  dismiss + progress bar, slide+fade.
- **Inline banners:** for past-due/renewal prompts (dismissible).

## AI components
- **AIChatPanel** (public assistant): floating launcher (swan + ✨), slide-up glass
  panel, streaming message bubbles, suggested prompts, sources, typing indicator.
- **AIGeneratorModal** (member/admin tools): purpose-built modal — input fields →
  "Generate" → streamed draft → edit/regenerate/insert/approve. Shows token/credit use.
- **AI draft review** (admin): side-by-side draft vs. live, approve/reject/edit.
- Consistent **✨ sparkle** affordance marks every AI entry point.

## Overlays
- **Modal/Dialog:** centered, `radius-xl`, glass scrim (blur), scale+fade in.
- **Sheet/Drawer:** side (desktop) / bottom (mobile), spring slide.
- **Popover/Tooltip/Menu:** small, `shadow-lg`, fade+scale from origin.

## Content components
- **Timeline** (Legacy/history): vertical line, year markers, scroll-reveal era cards.
- **Accordion** (FAQ): animated expand, single/multi.
- **Article/news card** (Spotlight): cover, title, date, excerpt, read-more.
- **Board member card:** photo, name, role, company, email; group sections.
- **Testimonial card:** quote, avatar, name/business.

## States everywhere
Every data component defines: **loading** (skeleton/shimmer), **empty** (illustration +
CTA), **error** (retry), **success**. No raw spinners-only screens.
