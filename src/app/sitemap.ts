import type { MetadataRoute } from "next";
import { getBusinesses, getEvents, getPrograms } from "@/server/queries";

const base = "https://tolucalakechamber.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "", "/about", "/about/board", "/about/legacy", "/about/spotlight", "/about/faq",
    "/directory", "/events", "/membership", "/membership/benefits", "/membership/apply",
    "/contact", "/donate", "/sponsors", "/privacy", "/terms", "/login",
  ].map((path) => ({ url: `${base}${path}`, lastModified: new Date("2026-05-30") }));

  let dynamicPaths: string[] = [];
  try {
    const [businesses, events, programs] = await Promise.all([
      getBusinesses(), getEvents(), getPrograms(),
    ]);
    dynamicPaths = [
      ...businesses.map((b) => `/directory/${b.slug}`),
      ...events.map((e) => `/events/${e.slug}`),
      ...programs.map((p) => `/events/programs/${p.slug}`),
    ];
  } catch {
    // DB unreachable at build — ship the static routes only.
  }

  const dynamicRoutes = dynamicPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-05-30"),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
