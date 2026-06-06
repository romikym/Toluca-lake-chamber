/**
 * Editorial content for the homepage storytelling spine — stat strip, member
 * spotlight, and the 85-year legacy timeline. Static by design (curated copy,
 * not member-managed). Shapes are intentionally simple so they can move to the
 * database later without touching the components that consume them.
 */

export type HomeStat = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  detail: string;
};

/** Social proof for the homepage — member count, legacy, reach. */
export const homeStats: HomeStat[] = [
  { value: 85, label: "Years strong", detail: "Serving the Village since 1939." },
  { value: 120, suffix: "+", label: "Member businesses", detail: "From the corner café to the studio lot." },
  { value: 14, label: "Industries", detail: "A full local economy, one square mile." },
  { value: 30, suffix: "+", label: "Events a year", detail: "Mixers, fairs, clean-ups, and traditions." },
];

export type MemberSpotlight = {
  business: string;
  slug: string;
  category: string;
  person: string;
  role: string;
  quote: string;
  blurb: string;
  since: string;
  hue: number;
  image: string;
};

/** A single, magazine-style featured member for the homepage. */
export const memberSpotlight: MemberSpotlight = {
  business: "Priscilla's Gourmet Coffee, Tea & Gifts",
  slug: "priscillas-gourmet-coffee",
  category: "Restaurant & Beverage",
  person: "Shannon Hartman",
  role: "Owner & Chamber Treasurer",
  quote:
    "The Chamber is why a coffee shop becomes a living room for the whole neighborhood. You don't just get customers — you get a community that shows up for you.",
  blurb:
    "A Village institution and the morning gathering spot for Toluca Lake — and the meeting point for the Chamber's quarterly Community Clean Up.",
  since: "Member since 1998",
  hue: 168,
  image:
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=85",
};

export type Milestone = { year: string; title: string; body: string };

/** The 85-year legacy — a tight, cinematic timeline tease for the homepage. */
export const legacyMilestones: Milestone[] = [
  { year: "1939", title: "The Chamber is founded", body: "A handful of Village merchants band together to look after one square mile of Los Angeles." },
  { year: "1970s", title: "The Village comes of age", body: "Riverside Drive becomes the leafy, walkable heart of Toluca Lake we know today." },
  { year: "2023", title: "A century of community", body: "Toluca Lake marks its 100th anniversary — featured on Good Day LA." },
  { year: "Today", title: "85 years and counting", body: "120+ members strong, still preserving the small-town character of the Village." },
];
