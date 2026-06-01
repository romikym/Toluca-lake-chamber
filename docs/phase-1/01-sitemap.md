# 01 — Full Sitemap & Information Architecture

Base URL: `https://iamromik.wixstudio.com/tolucalake`

## Primary navigation (rendered header)

Header bar (forest green): **Member Search** · **Join the Chamber** · **Donate Today** · **Log In** · Instagram · Facebook
Main nav (gold band): **Home** · **About Us ▾** · **Events ▾** · **Membership ▾** · **Contact Us**

## Sitemap tree

```
Home  (/)
│
├── About Us  (/aboutus)                         "Our Mission" statement
│   ├── Meet The Board  (/meettheboard)          Full board + directors roster
│   ├── The Toluca Lake Legacy  (/thetolucalakelegacy)   History timeline (1768–today)
│   ├── Toluca Lake Spotlight  (/abouttolucalake)        Community spotlight feed/blog
│   └── Frequently Asked Questions  (/frequentlyaskedquestions)
│
├── Events  (/event-list)                        Wix Events: list + calendar
│   ├── Event detail (dynamic)  (/event-details/{slug})
│   │     e.g. community-cleanup-2 / -3 / -4
│   └── Signature program pages:
│         ├── Community Clean Up  (/communitycleanup)
│         ├── Networking Mixers  (/networkingmixers)
│         ├── Art Fair  (/artfair)
│         ├── Community Howl  (/communityhowl)
│         ├── Health Fair  (/healthfair)
│         ├── Holiday Open House  (/holidayopenhouse)
│         └── Pancake Breakfast Fundraiser  (/pancakebreakfastfundraiser)
│
├── Membership
│   ├── Plans & Pricing  (/pricing-plans/list)   5 tiers, Wix Pricing Plans
│   └── Membership Login  (/membershiplogin)      Member self-service entry
│
├── Business Membership Directory  (/search)      120 members, 14 categories (Wix site search)
│
├── Contact Us  (/contactus)                      Contact form + interest picker
│
├── Donate Today  (button)                        Donation CTA (header + footer)
│
└── Legal
    ├── Privacy Policy  (/privacypolicy)
    └── Terms and Conditions  (/termsandconditions)
```

## Functional grouping (for new IA)

| Area | Existing pages | Notes for rebuild |
|------|----------------|-------------------|
| **Marketing / Public** | Home, About Us, Legacy, Spotlight, FAQ | Brochure content — keep & restyle |
| **Events** | Event list, event detail, 7 program pages | Move to real event system w/ ticketing |
| **Membership** | Pricing plans, Login | Becomes full join → pay → portal flow |
| **Directory** | `/search` | Rebuild as true filterable business directory |
| **Engagement** | Contact, Newsletter (footer), Donate | Forms → backend + notifications |
| **Legal** | Privacy, Terms | Carry forward |

## Observations on current IA

- "About Us" dropdown mixes **mission, board, history, spotlight, FAQ** — five very
  different content types under one menu.
- Page naming is confusing: `/abouttolucalake` is titled **"Toluca Lake Spotlight"**
  (a blog feed), while `/thetolucalakelegacy` is titled **"About Toluca Lake"** (the
  history). These two should be clearly separated and renamed in the new IA.
- The directory is just **Wix's built-in site search** (`/search`) — it returns
  "Members (120), Events (3), Other Pages (20)", i.e. it searches the whole site, not
  a purpose-built directory.
- The 7 "program" pages are thin template pages (1 paragraph + "Upcoming Events"
  button) that don't link to their actual events.
