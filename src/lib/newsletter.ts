/**
 * Newsletter archive. Static for now (curated issues); the shape mirrors a future
 * `NewsletterIssue` model so it can move to the database + admin without changing
 * the page. `subscribeNewsletter` (src/app/actions/forms.ts) handles signups.
 */

export type NewsletterIssue = {
  slug: string;
  title: string;
  date: string; // ISO
  season: string;
  excerpt: string;
  highlights: string[];
  hue: number;
  /** Optional external link to a hosted issue (e.g. Mailchimp/Beehiiv). */
  url?: string;
};

export const newsletterIssues: NewsletterIssue[] = [
  {
    slug: "spring-2026",
    title: "Blooms, Mixers & a Busy Spring in the Village",
    date: "2026-04-02",
    season: "Spring 2026",
    excerpt:
      "Patios are open, the Art Fair is on the calendar, and three new members joined the Village this quarter. Here's everything happening this spring.",
    highlights: ["Art Fair returns to Riverside Drive", "Three new member businesses", "Spring networking mixer recap"],
    hue: 138,
  },
  {
    slug: "winter-2025",
    title: "Holiday Open House & a Year of Community",
    date: "2025-12-04",
    season: "Winter 2025",
    excerpt:
      "Santa, carolers, and a glowing Village — a look back at the Holiday Open House and the year that brought the neighborhood closer.",
    highlights: ["Holiday Open House photos", "2025 by the numbers", "Member spotlight: Priscilla's"],
    hue: 152,
  },
  {
    slug: "fall-2025",
    title: "Community Howl, Clean-Ups & New Faces",
    date: "2025-10-01",
    season: "Fall 2025",
    excerpt:
      "Costumed pups, cleaner streets, and a warm welcome to our newest members as the Village heads into fall.",
    highlights: ["3rd Annual Community Howl", "Fall Clean Up recap", "Welcoming new members"],
    hue: 165,
  },
  {
    slug: "summer-2025",
    title: "Summer in Toluca Lake",
    date: "2025-07-01",
    season: "Summer 2025",
    excerpt:
      "Long evenings, full patios, and a season of connection — mixers, the Health Fair, and how the Village supports its own.",
    highlights: ["Health Fair highlights", "Summer mixer series", "Shop-local spotlight"],
    hue: 172,
  },
];

export function getNewsletterIssue(slug: string) {
  return newsletterIssues.find((n) => n.slug === slug);
}
