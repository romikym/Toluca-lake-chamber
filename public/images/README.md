# Site photography

All site imagery is managed from **one file**: `src/lib/images.ts`. Drop real photos
into this folder and point the matching entry at the local path — files in `public/`
are served from the site root, so `/images/...` is correct.

## To replace a placeholder

1. Add the optimized file, e.g. `public/images/heroes/directory.jpg`
2. In `src/lib/images.ts`, set that entry to the local path:
   ```ts
   directory: "/images/heroes/directory.jpg",
   ```

The page picks it up automatically. Until then, tonally-matched placeholders are used.

## Recommended hero shots (`public/images/heroes/`)

| File | Where it shows | Suggested subject |
|------|----------------|-------------------|
| `directory.jpg` | Business Directory | Riverside Dr storefronts |
| `events.jpg` | Events | A real Chamber event / crowd |
| `gallery.jpg` | Photo Gallery | The Village, golden hour |
| `store.jpg` | Chamber Store | Chamber merch / flat-lay |
| `newsletter.jpg` | Newsletter | Neighbors, a community moment |
| `perks.jpg` | Member Perks | A member business interior |
| `renew.jpg` | Renew Membership | Members connecting |
| `sponsors.jpg` | Sponsorship | Event with sponsor presence |
| `donate.jpg` | Donate | A community program in action |
| `about.jpg` / `legacy.jpg` | About / Legacy | Tree-lined streets, the lake |

The home hero image is set in `src/app/page.tsx` (`HERO_IMG`); event-card and album/
product/spotlight imagery live in `src/lib/images.ts`, `src/lib/gallery.ts`,
`src/lib/store.ts`, and `src/lib/content.ts` — each value is a URL you can repoint
to a local `/images/...` path.

## Image guidance (per the design system)

- Authentic, local, warm, golden-hour — real Toluca Lake (the Village, the lake,
  neighbors and members). **No cheesy stock** (fake handshakes, generic offices).
- Optimize before committing: web-sized, compressed JPG/WebP (heroes ~1900px wide,
  cards ~800–900px). Match filenames exactly (case-sensitive on the server).
