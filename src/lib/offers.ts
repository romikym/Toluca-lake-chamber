/**
 * Member perks — discounts & offers extended by member businesses to fellow
 * members (and the community). Static placeholder data; shape mirrors a future
 * `Offer` model so members can post/manage their own offers in the portal.
 */

export type Offer = {
  id: string;
  business: string;
  category: string;
  headline: string;
  detail: string;
  /** Short, scannable deal label, e.g. "15% off". */
  deal: string;
  /** "members" = members-only; "community" = open to everyone. */
  audience: "members" | "community";
  code?: string;
  hue: number;
};

export const offers: Offer[] = [
  {
    id: "priscillas-coffee",
    business: "Priscilla's Gourmet Coffee, Tea & Gifts",
    category: "Restaurant & Beverage",
    headline: "Member mornings",
    detail: "Show your member card for a complimentary drip coffee with any pastry, every weekday before 10am.",
    deal: "Free coffee",
    audience: "members",
    code: "TLCMEMBER",
    hue: 168,
  },
  {
    id: "compass-realty",
    business: "Compass Real Estate",
    category: "Real Estate",
    headline: "Reduced listing consultation",
    detail: "Complimentary home-valuation and staging consultation for Chamber members listing in the Village.",
    deal: "Free consult",
    audience: "members",
    hue: 160,
  },
  {
    id: "destiny-home-health",
    business: "Destiny Home Health",
    category: "Health Care",
    headline: "Wellness check package",
    detail: "10% off in-home wellness assessments for members and their families.",
    deal: "10% off",
    audience: "members",
    code: "VILLAGE10",
    hue: 148,
  },
  {
    id: "farnsworth-photo",
    business: "Cathryn Farnsworth Photography",
    category: "Arts & Entertainment",
    headline: "Branding mini-session",
    detail: "Discounted headshot & branding mini-sessions for member businesses — perfect for your directory profile.",
    deal: "20% off",
    audience: "members",
    hue: 138,
  },
  {
    id: "easy-tax",
    business: "Ea$y Tax",
    category: "Finance & Business",
    headline: "Small-business tax review",
    detail: "Free 30-minute year-end tax review for Chamber member businesses.",
    deal: "Free review",
    audience: "members",
    hue: 175,
  },
  {
    id: "kluckin-chicken",
    business: "The Kluckin' Chicken",
    category: "Restaurant & Beverage",
    headline: "Shop-local lunch deal",
    detail: "Show this offer for a free side with any entrée — open to the whole community.",
    deal: "Free side",
    audience: "community",
    hue: 165,
  },
];
