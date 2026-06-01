# Phase 1 — Research & Content Extraction

**Project:** Toluca Lake Chamber of Commerce — Custom Platform Rebuild
**Source analyzed:** https://iamromik.wixstudio.com/tolucalake (Wix Studio)
**Date:** 2026-05-30
**Status:** Phase 1 complete (research & documentation only — no code written)

This folder documents the **entire existing website** before rebuild. Nothing is
discarded; all copy, structure, assets, and features are preserved here so they can
be carried forward (and improved) in the new custom platform.

## Documents

| # | File | Purpose |
|---|------|---------|
| 1 | [01-sitemap.md](01-sitemap.md) | Full sitemap & information architecture |
| 2 | [02-content-inventory.md](02-content-inventory.md) | Page-by-page content (copy, CTAs, forms) — verbatim |
| 3 | [03-asset-inventory.md](03-asset-inventory.md) | Branding, logo, colors, fonts, imagery |
| 4 | [04-component-inventory.md](04-component-inventory.md) | Reusable UI components observed |
| 5 | [05-feature-inventory.md](05-feature-inventory.md) | Functional features & integrations |
| 6 | [06-gaps-and-opportunities.md](06-gaps-and-opportunities.md) | Weak areas, bugs, and improvement opportunities |

## How the research was done

The live Wix Studio site is fully client-side rendered, so static fetching returned
only an empty shell. All content was extracted by driving a real Chrome browser:
rendering each page, reading the DOM text, enumerating every internal link, and
sampling computed styles (colors/fonts) directly from the live CSS.

## Headline findings

- **23 distinct URLs** across 6 functional areas (Home, About, Events, Membership,
  Directory, Legal).
- **120 member businesses** in the directory across **14 industry categories**.
- **5 membership tiers** ($50–$300/yr).
- **7 signature programs** + a Wix Events calendar/registration system.
- Current branding is **forest green + heavy gold/yellow**. The rebuild removes all
  yellow per the brief.
- Several **content bugs** found (duplicate copy, founding-year inconsistency) —
  see doc 6.
- The platform the client wants (member portal, AI tools, admin dashboard, payments,
  events ticketing) is **far beyond** what Wix currently delivers — current site is
  essentially a brochure + Wix-native directory/events/pricing widgets.
