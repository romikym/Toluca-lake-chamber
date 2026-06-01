# 03 — Animation Framework

Premium, quiet, Apple-quality motion. Implemented with **Framer Motion** + CSS, driven
by shared **motion tokens**. Every animation has a **reduced-motion** fallback. Motion
guides attention and communicates state — it never decorates for its own sake.

## Motion tokens

### Duration
| Token | ms | Use |
|-------|----|----|
| `dur-instant` | 80 | Tiny feedback (press) |
| `dur-fast` | 140 | Hover, toggles |
| `dur-base` | 220 | Most transitions |
| `dur-slow` | 320 | Modals, page sections |
| `dur-slower` | 480 | Hero, large reveals |

### Easing
| Token | Curve | Use |
|-------|-------|-----|
| `ease-standard` | `cubic-bezier(.2,0,0,1)` | General |
| `ease-emphasized` | `cubic-bezier(.2,.8,.2,1)` | Entrances, attention |
| `ease-exit` | `cubic-bezier(.4,0,1,1)` | Exits |
| `spring-soft` | spring(stiffness 220, damping 26) | Sheets, cards, playful |
| `spring-snappy` | spring(stiffness 360, damping 30) | Toggles, pops |

### Distance/scale defaults
- Reveal offset: 12–24px. Hover lift: -2px. Press scale: .98. Pop: 1→1.06→1.

## Global principles
- **Stagger** lists/grids at 40–60ms per item (cap ~8 items, then fade group).
- **Origin-aware**: popovers/menus scale from their trigger.
- **Layout animations** via Framer `layout` for reflow (filters, reorder).
- **No motion on scroll-jacking**; never block input; never exceed ~500ms for UI.
- **Respect `prefers-reduced-motion`**: replace movement/scale with simple opacity
  fades (≤120ms); disable parallax, counters animate instantly to final value.

## Catalog (maps to brief's animation list)

| # | Animation | Spec |
|---|-----------|------|
| 1 | **Page transitions** | Route change: outgoing fade/slide-up 8px (exit 140ms), incoming fade/slide-down (base, emphasized). Shared-element for cards→detail where possible. |
| 2 | **Scroll animations** | IntersectionObserver reveal: opacity 0→1 + translateY 16→0, emphasized, once. Staggered for groups. |
| 3 | **Fade reveals** | Section content fades/rises as it enters viewport (threshold ~0.2). |
| 4 | **Card animations** | Mount: stagger fade-rise. Hover: lift -2px + shadow-sm→md. Tap (mobile): scale .98 spring. |
| 5 | **Button animations** | Press scale .98 (instant), hover lift + shadow, loading spinner swap with width lock. |
| 6 | **Micro-interactions** | Heart/save pop, copy→check, toggle slide, input affix bounce — `spring-snappy`. |
| 7 | **Hover states** | Links: underline grow from left. Nav: green pill slides between items (layout). |
| 8 | **Loading animations** | Skeleton shimmer (1.4s linear gradient sweep), progress rings, branded swan pulse for full-page loads. |
| 9 | **Success states** | Animated check draw (SVG path), confetti-free subtle green burst, toast slide-in. |
| 10 | **Dashboard transitions** | Stat tiles stagger-in; charts draw/grow from baseline (path/length animation). |
| 11 | **Modal animations** | Scrim blur+fade; dialog scale .96→1 + fade (slow, emphasized); exit reverse (exit ease). |
| 12 | **Mobile menu** | Drawer spring-slide from edge; bottom-sheet spring-up; backdrop fade; items stagger. |
| 13 | **Form progress** | Stepper bar fills with `spring-soft`; step content cross-fades/slides horizontally. |
| 14 | **Directory filter** | Results re-layout with Framer `layout` (FLIP); chips add/remove pop; count ticks. |
| 15 | **Event registration** | CTA → loading → success check morph; capacity bar animates; ticket "issued" slide. |
| 16 | **Counter animations** | Stats count up (easeOut, ~1s) when scrolled into view; comma-formatted. |
| 17 | **Interactive maps** | Smooth pan/zoom; pin drop bounce; cluster expand; hover sync between list & map. |
| 18 | **Background motion** | Very subtle: slow gradient/par­allax on hero (≤ a few px), drifting glass blobs at low opacity. Off under reduced-motion. |
| 19 | **Animated statistics** | Community impact section: counters + progress arcs + bar grow, staggered. |
| 20 | **Membership status indicator** | Renewal ring animates fill on load; color transition green→bronze→danger as state changes. |

## Implementation notes
- Centralize variants in `packages/ui/motion.ts` (`fadeRise`, `stagger`, `pop`,
  `sheet`, `dialog`, `counter`) so usage is consistent and tunable in one place.
- Use `MotionConfig` with reduced-motion handling at app root.
- GPU-friendly props only (transform/opacity); avoid animating layout-thrashing props.
- Counters/charts use `useInView` + `useReducedMotion` guards.
- Keep total motion budget low per view (avoid >2–3 simultaneous large animations).

## Reduced-motion contract
```ts
const prefersReduced = useReducedMotion();
const fadeRise = prefersReduced
  ? { initial:{opacity:0}, animate:{opacity:1}, transition:{duration:.12} }
  : { initial:{opacity:0,y:16}, animate:{opacity:1,y:0}, transition:{duration:.22, ease:[.2,.8,.2,1]} };
```
Parallax, background motion, counters→instant, confetti/bursts → disabled.
