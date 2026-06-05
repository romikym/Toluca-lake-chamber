/**
 * Photo gallery content. Albums group photos by event/theme. Static placeholder
 * imagery (license-clear Unsplash) stands in for real Toluca Lake photography —
 * replace `src` with files in /public/images/gallery/ when available. Shapes
 * mirror a future `GalleryAlbum` / `Photo` model for admin management later.
 */

export type Photo = {
  src: string;
  alt: string;
  /** "wide" photos span two columns in the masonry grid. */
  span?: "wide" | "tall";
};

export type GalleryAlbum = {
  slug: string;
  title: string;
  date: string; // ISO
  category: string;
  cover: string;
  description: string;
  photos: Photo[];
};

const u = (id: string, w = 1100) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=85`;

export const galleryAlbums: GalleryAlbum[] = [
  {
    slug: "holiday-open-house-2025",
    title: "Holiday Open House",
    date: "2025-12-04",
    category: "Signature Events",
    cover: u("1543589077-47d81606c1bf"),
    description: "An evening of lights, carolers, and the whole Village out on Riverside Drive.",
    photos: [
      { src: u("1543589077-47d81606c1bf", 1400), alt: "Holiday lights along the Village storefronts", span: "wide" },
      { src: u("1482350325005-eda5e677279b"), alt: "Neighbors gathering for the holidays" },
      { src: u("1513885535751-8b9238bd345a"), alt: "Festive treats at a member business" },
      { src: u("1576919228236-a097c32a5cd4"), alt: "Carolers performing in the Village", span: "tall" },
      { src: u("1511795409834-ef04bbd61622"), alt: "Evening crowd at the open house" },
      { src: u("1545239351-1141bd82e8a6"), alt: "Holiday window displays" },
    ],
  },
  {
    slug: "community-howl-2025",
    title: "Community Howl",
    date: "2025-10-30",
    category: "Signature Events",
    cover: u("1601758228041-f3b2795255f1"),
    description: "Our annual Halloween dog event — costumes, vendors, and plenty of Village spirit.",
    photos: [
      { src: u("1601758228041-f3b2795255f1", 1400), alt: "Dogs in Halloween costumes", span: "wide" },
      { src: u("1583337130417-3346a1be7dee"), alt: "A festive pup at Community Howl" },
      { src: u("1518717758536-85ae29035b6d"), alt: "Families with their dogs" },
      { src: u("1561037404-61cd46aa615b"), alt: "Costume contest moment", span: "tall" },
      { src: u("1450778869180-41d0601e046e"), alt: "Local vendors at the event" },
      { src: u("1530281700549-e82e7bf110d6"), alt: "Halloween spirit in the Village" },
    ],
  },
  {
    slug: "art-fair",
    title: "Toluca Lake Art Fair",
    date: "2025-04-26",
    category: "Arts & Culture",
    cover: u("1460661419201-fd4cecdf8a8b"),
    description: "Local artists, makers, and creatives fill the Village for a day of art and community.",
    photos: [
      { src: u("1460661419201-fd4cecdf8a8b", 1400), alt: "Art Fair booths along the street", span: "wide" },
      { src: u("1513364776144-60967b0f800f"), alt: "Original artwork on display" },
      { src: u("1499781350541-7783f6c6a0c8"), alt: "A maker at their booth" },
      { src: u("1452860606245-08befc0ff44b"), alt: "Handcrafted goods", span: "tall" },
      { src: u("1493106641515-6b5631de4bb9"), alt: "Visitors browsing the fair" },
      { src: u("1531913764164-f85c52e6e654"), alt: "Live art demonstration" },
    ],
  },
  {
    slug: "community-cleanup",
    title: "Community Clean Up",
    date: "2025-08-30",
    category: "Community",
    cover: u("1532996122724-e3c354a0b15b"),
    description: "Neighbors and businesses keeping the Village clean, welcoming, and connected.",
    photos: [
      { src: u("1532996122724-e3c354a0b15b", 1400), alt: "Volunteers at the Community Clean Up", span: "wide" },
      { src: u("1488521787991-ed7bbaae773c"), alt: "Cleaning the Village sidewalks" },
      { src: u("1497435334941-8c899ee9e8e9"), alt: "Volunteers gathering at Priscilla's" },
      { src: u("1517457373958-b7bdd4587205"), alt: "Teams heading out to clean", span: "tall" },
      { src: u("1559027615-cd4628902d4a"), alt: "Tending the Village planters" },
      { src: u("1542601906990-b4d3fb778b09"), alt: "A cleaner, greener Village" },
    ],
  },
];

export function getAlbum(slug: string) {
  return galleryAlbums.find((a) => a.slug === slug);
}
