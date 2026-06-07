// Static content for the Astro content layer (Phase 2). Mirrors the chamber data;
// moves to DB-backed SSR in the Phase 3 app layer.

export const site = {
  name: "Toluca Lake Chamber of Commerce",
  email: "info@tolucalakechamber.com",
  phone: "818-761-6594",
  founded: 1939,
};

export const events = [
  { mon: "Jul", day: "15", kicker: "Chamber Mixer", title: "Connections at Golden Hour", copy: "Small bites, drinks, and high-value introductions with Toluca Lake business leaders.", cta: "Register" },
  { mon: "Aug", day: "08", kicker: "Business Forum", title: "Growth, Visibility & Community Influence", copy: "An editorial-style leadership session for members ready to scale their local presence.", cta: "Learn More" },
  { mon: "Sep", day: "12", kicker: "Member Showcase", title: "The Best of Toluca Lake", copy: "A curated evening spotlighting local restaurants, shops, studios, and service leaders.", cta: "Attend" },
  { mon: "Oct", day: "30", kicker: "Community Howl", title: "3rd Annual Halloween Dog Event", copy: "Neighbors, families, and four-legged friends for a festive afternoon in the Village.", cta: "RSVP" },
  { mon: "Dec", day: "04", kicker: "Holiday Open House", title: "An Evening of Village Lights", copy: "Local businesses open their doors for carolers, treats, and photos with Santa.", cta: "Attend" },
];

export const plans = [
  { name: "Resident", price: "$75", audience: "Individuals & advocates", popular: false,
    benefits: ["Member newsletter & event invites", "Community directory presence", "Support local advocacy"] },
  { name: "Business", price: "$150", audience: "Most members choose this", popular: true,
    benefits: ["Full directory listing with profile", "Member pricing on all events", "Marketing & referral exposure", "Networking & ribbon-cuttings", "A voice with local leadership"] },
  { name: "Non-Profit", price: "$100", audience: "Community organizations", popular: false,
    benefits: ["Directory listing", "Event co-promotion", "Partnership opportunities", "Member pricing on events"] },
];

export const categories = ["All", "Dining", "Retail", "Real Estate", "Health & Wellness", "Creative & Media", "Professional Services"];

export const businesses = [
  { name: "Priscilla's Gourmet Coffee", cat: "Dining", blurb: "The Village's morning gathering spot since 1998 — coffee, tea & gifts." },
  { name: "Compass Real Estate", cat: "Real Estate", blurb: "Local agents who know every street in Toluca Lake." },
  { name: "Destiny Home Health", cat: "Health & Wellness", blurb: "Compassionate in-home wellness and care for the community." },
  { name: "The Tolucan Times", cat: "Creative & Media", blurb: "The neighborhood's hometown newspaper and storyteller." },
  { name: "Cathryn Farnsworth Photography", cat: "Creative & Media", blurb: "Branding, headshots, and editorial photography for local brands." },
  { name: "The Kluckin' Chicken", cat: "Dining", blurb: "Village comfort food and a community favorite." },
];

export const board = [
  { name: "Corrie Sommers", role: "President", org: "Compass Real Estate" },
  { name: "Tigran Grigoryan", role: "Vice President", org: "Destiny Home Health" },
  { name: "Cathryn Farnsworth", role: "Secretary", org: "Farnsworth Photography" },
  { name: "Shannon Hartman", role: "Treasurer", org: "Priscilla's Gourmet Coffee" },
];
