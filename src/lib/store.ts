/**
 * Chamber Store catalog. Static product data; proceeds support Chamber programs.
 * Checkout runs through Stripe (`startStoreCheckout` in src/app/actions/payments.ts)
 * with a keyless simulated fallback for dev/demo. Shape mirrors a future `Product`
 * model for admin management.
 */

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  priceCents: number;
  category: "Apparel" | "Accessories" | "Home & Gift" | "Supporter";
  badge?: string;
  hue: number;
  image: string;
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=85`;

export const products: Product[] = [
  {
    slug: "village-tote",
    name: "The Village Tote",
    tagline: "Heavyweight organic canvas",
    description: "A sturdy, shop-local canvas tote with the Toluca Lake mark — made for the farmers market, the coffee run, and everything in between.",
    priceCents: 2800,
    category: "Accessories",
    badge: "Bestseller",
    hue: 150,
    image: u("1597484661643-2f5fef640dd1"),
  },
  {
    slug: "since-1939-tee",
    name: "Since 1939 Tee",
    tagline: "Soft combed-cotton, forest green",
    description: "Our signature tee celebrating 85 years of the Village — a clean champagne-gold wordmark on deep forest green.",
    priceCents: 3200,
    category: "Apparel",
    hue: 158,
    image: u("1521572163474-6864f9cf17ab"),
  },
  {
    slug: "village-cap",
    name: "Toluca Lake Cap",
    tagline: "Six-panel, adjustable",
    description: "An everyday cap with an embroidered leaf mark. Structured front, soft brushed cotton, fits all.",
    priceCents: 2600,
    category: "Apparel",
    hue: 165,
    image: u("1588850561407-ed78c282e89b"),
  },
  {
    slug: "enamel-mug",
    name: "Village Enamel Mug",
    tagline: "12oz camp-style enamel",
    description: "For the porch, the trail, or the desk. A durable enamel mug with the Chamber seal, packaged in a kraft gift box.",
    priceCents: 2200,
    category: "Home & Gift",
    hue: 172,
    image: u("1514228742587-6b1558fcca3d"),
  },
  {
    slug: "neighborhood-print",
    name: "Riverside Drive Print",
    tagline: "Giclée art print, 12×18",
    description: "An original illustration of the Village's tree-lined Riverside Drive, printed on archival matte stock. Frame not included.",
    priceCents: 4500,
    category: "Home & Gift",
    badge: "Limited",
    hue: 138,
    image: u("1513519245088-0e12902e35ca"),
  },
  {
    slug: "founders-pin",
    name: "Founder's Enamel Pin",
    tagline: "Hard-enamel, gold plating",
    description: "A small piece of Village pride — the Chamber leaf in hard enamel with champagne-gold plating and a rubber clutch.",
    priceCents: 1200,
    category: "Accessories",
    hue: 145,
    image: u("1611591437281-460bfbe1220a"),
  },
  {
    slug: "supporter-bundle",
    name: "Supporter Bundle",
    tagline: "Tote · Tee · Mug · Pin",
    description: "The whole kit — and a meaningful gift to the Chamber. Bundles support community programs, events, and advocacy across the Village.",
    priceCents: 7500,
    category: "Supporter",
    badge: "Best value",
    hue: 152,
    image: u("1607082348824-0a96f2a4b9da"),
  },
  {
    slug: "friend-of-the-village",
    name: "Friend of the Village",
    tagline: "A direct gift to the Chamber",
    description: "Not merch — just support. A one-time contribution that funds clean-ups, the Art Fair, and the programs that keep Toluca Lake thriving.",
    priceCents: 5000,
    category: "Supporter",
    hue: 168,
    image: u("1559027615-cd4628902d4a"),
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
