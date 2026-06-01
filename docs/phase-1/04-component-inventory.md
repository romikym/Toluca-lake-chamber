# 04 — Component Inventory (existing UI)

Reusable UI building blocks observed on the current site, with notes on how each maps
to the new design system.

| Component | Current implementation | Where | Rebuild note |
|-----------|------------------------|-------|--------------|
| **Top header bar** | Forest-green strip w/ utility buttons + social | Global | → Sticky glass app-bar, green-only |
| **Logo lockup** | Swan + serif wordmark | Global | Keep mark; refine lockup |
| **Primary nav + dropdowns** | Gold pill bar, 3 mega-dropdowns | Global | → Glass nav; mobile drawer + bottom nav |
| **Utility CTAs** | Member Search / Join / Donate / Log In | Header | Keep; restyle as button hierarchy |
| **Hero w/ glass card** | Photo bg + frosted green text card + CTA | Home | Strong base for premium hero |
| **Section intro block** | Heading + paragraph + single CTA | Most pages | Standardize as "section header" component |
| **Event card** | Date / title / location / "Details" | Home, Events | → Rich event card w/ image, RSVP, tags |
| **Event calendar widget** | Wix Events month grid | Events | → Custom calendar (month/week/list) |
| **Event detail layout** | Title, date/loc, body, registration state, share | Event detail | → Full ticketing/RSVP detail |
| **Pricing/plan card** | Title, price, eligibility, "Buy Now" | Membership | → Membership tier card w/ benefits + checkout |
| **Directory results list** | Member name list + industry filter + pagination | /search | → Filterable directory (grid/list/map) cards |
| **Industry filter** | 14-item checkbox/list filter | Directory | Keep taxonomy; upgrade UX |
| **Contact form** | Name/email/phone/interest/message | Contact, Home | → Validated form + backend + notifications |
| **Newsletter form** | Email + consent checkbox | Global footer | → Double opt-in + subscriber DB |
| **Board member card** | Photo, name, role, company, email | Board | → Profile card pattern (reused for members) |
| **Spotlight/blog item** | Thumb, title, date, "Read More" | Spotlight | → Article/news card + CMS |
| **History timeline** | Year markers + era cards/images | Legacy | → Animated scroll timeline |
| **FAQ accordion** | Numbered Q/A list | FAQ | → Accordion + AI FAQ assistant |
| **Footer** | Newsletter + contact + legal + social | Global | Keep structure; restyle |
| **Login gate** | Wix Members login | /membershiplogin | → Custom auth + member portal |
| **Wix attribution bar** | "Built on Wix Studio" | Global top | Removed in rebuild |

## Component maturity assessment

- **Brochure components** (hero, section blocks, footer, board/spotlight cards) are
  solid conceptually but visually generic and Wix-templated.
- **App-grade components** (real directory cards, member dashboard, event ticketing,
  invoices, admin tables, AI panels, notifications) **do not exist yet** — these are
  net-new in the rebuild.
- **Forms** are presentational only (Wix form handlers); they need real backend
  validation, storage, anti-spam, and notifications.

## Net-new component families needed (preview of design system)

Dashboard cards · stat/metric tiles · data tables · member profile screens · invoice/
receipt views · notification center · AI chat panel · AI content-generator modals ·
map view · saved-search chips · membership-status badges · onboarding/checkout steps ·
mobile bottom-nav · swipeable cards · admin CRUD tables.
