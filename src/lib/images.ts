/**
 * Central image registry — the single place to manage site photography.
 *
 * ▸ To use REAL Toluca Lake / product photos: drop files into `public/images/...`
 *   (see public/images/README.md for the expected names) and replace the matching
 *   URL below with the local path, e.g. "/images/heroes/directory.jpg".
 *   Local files in /public are served from the site root and take priority.
 *
 * Until then these are license-clear, tonally-matched placeholders (warm,
 * golden-hour, community/California) chosen to sit well under the green hero overlay.
 */

const unsplash = (id: string, w = 1900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

/** Page hero backdrops. Swap any value for "/images/heroes/<name>.jpg". */
export const heroImages = {
  directory: unsplash("1559925393-8be0ec4767c8"), // village storefronts / shopping street
  events: unsplash("1511795409834-ef04bbd61622"), // community gathering, string lights
  gallery: unsplash("1460661419201-fd4cecdf8a8b"), // art / makers
  store: unsplash("1441986300917-64674bd600d8"), // boutique retail
  newsletter: unsplash("1507842217343-583bb7270b66"), // reading / letters
  perks: unsplash("1556742502-ec7c0e9f34b1"), // café table, warm
  renew: unsplash("1521737604893-d14cc237f11d"), // people connecting
  sponsors: unsplash("1511795409834-ef04bbd61622"), // event crowd
  donate: unsplash("1500534314209-a25ddb2bd429"), // hands / community
  about: unsplash("1480714378408-67cf0d13bc1b"), // leafy city / village
  legacy: unsplash("1518495973542-4542c06a5843"), // golden-hour trees
  membership: unsplash("1475721027785-f74eccf877e2"), // welcoming, communal
} as const;

/** Rotating imagery for the home page featured-event cards. */
export const eventImages = [
  unsplash("1511795409834-ef04bbd61622", 900),
  unsplash("1500534314209-a25ddb2bd429", 900),
  unsplash("1475721027785-f74eccf877e2", 900),
];
