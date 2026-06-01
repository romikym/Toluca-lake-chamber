import { MapPin, ExternalLink } from "lucide-react";
import { gradientStyle } from "@/components/ui/gradient";

/**
 * Per-listing location map.
 * - With GOOGLE_MAPS_API_KEY set: renders a Google Maps Embed iframe.
 * - Without a key: a styled fallback that links out to Google Maps (always works).
 * The key is referrer-restricted at Google; it's safe to appear in the iframe URL.
 */
export function BusinessMap({ address, name, hue }: { address: string; name: string; hue: number }) {
  const key = process.env.GOOGLE_MAPS_API_KEY;
  const query = encodeURIComponent(`${name}, ${address}`);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${query}`;

  if (key) {
    return (
      <div className="overflow-hidden rounded-xl border border-line shadow-sm">
        <iframe
          title={`Map showing ${name}`}
          className="block aspect-video w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/place?key=${key}&q=${query}`}
        />
      </div>
    );
  }

  return (
    <a
      href={mapsLink}
      target="_blank"
      rel="noreferrer"
      className="group relative flex aspect-video items-end overflow-hidden rounded-xl border border-line shadow-sm"
      style={gradientStyle(hue, true)}
      aria-label={`View ${name} on Google Maps`}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="relative flex w-full items-center justify-between gap-2 bg-gradient-to-t from-brand-900/75 to-transparent p-3 text-xs font-medium text-white">
        <span className="flex min-w-0 items-center gap-1"><MapPin className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{address}</span></span>
        <span className="flex shrink-0 items-center gap-1 opacity-90 group-hover:opacity-100">Maps <ExternalLink className="h-3 w-3" /></span>
      </div>
    </a>
  );
}
