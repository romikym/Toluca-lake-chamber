import type { MetadataRoute } from "next";
import { businesses, events, programs } from "@/lib/data";

const base = "https://tolucalakechamber.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "", "/about", "/about/board", "/about/legacy", "/about/spotlight", "/about/faq",
    "/directory", "/events", "/membership", "/membership/benefits", "/membership/apply",
    "/contact", "/donate", "/sponsors", "/privacy", "/terms", "/login",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date("2026-05-30") }));

  const dynamicRoutes = [
    ...businesses.map((b) => `/directory/${b.slug}`),
    ...events.map((e) => `/events/${e.slug}`),
    ...programs.map((p) => `/events/programs/${p.slug}`),
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date("2026-05-30") }));

  return [...staticRoutes, ...dynamicRoutes];
}
