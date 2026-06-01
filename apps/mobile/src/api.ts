/**
 * Typed client for the Chamber REST API (/api/v1/*).
 * Set EXPO_PUBLIC_API_URL to your web app's URL (e.g. your LAN IP during dev:
 * http://192.168.1.50:3000). Defaults to localhost for web/simulator.
 */
const BASE = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export type Business = {
  slug: string; name: string; category: string; tagline: string; description: string;
  tier: "STANDARD" | "FEATURED" | "PREMIUM"; phone?: string; website?: string; address: string; hue: number;
};
export type Category = { key: string; name: string; icon: string };
export type ChamberEvent = {
  slug: string; title: string; program: string; start: string; end?: string;
  location: string; address: string; summary: string; description: string;
  membersOnly: boolean; price: number; capacity: number; registered: number; hue: number;
};
export type Program = { slug: string; name: string; blurb: string; icon: string };
export type Plan = {
  key: string; name: string; priceCents: number; audience: string;
  eligibility?: string; popular?: boolean; benefits: string[];
};

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}/api/v1${path}`);
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

export const api = {
  directory: () => get<{ businesses: Business[]; categories: Category[] }>("/directory"),
  business: (slug: string) => get<{ business: Business; related: Business[] }>(`/directory/${slug}`),
  events: () => get<{ events: ChamberEvent[]; programs: Program[] }>("/events"),
  event: (slug: string) => get<{ event: ChamberEvent; program: Program | null }>(`/events/${slug}`),
  plans: () => get<{ plans: Plan[] }>("/plans"),
};

export function formatCurrency(cents: number) {
  return `$${Math.round(cents / 100)}`;
}
