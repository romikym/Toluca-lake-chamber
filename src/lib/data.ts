/**
 * Seed data derived from the Phase 1 research of the live site.
 * Stands in for the database during the frontend build; the shapes mirror the
 * Prisma models in docs/phase-2/04-database-architecture.md.
 */

export type Category = { key: string; name: string; icon: string };

export const categories: Category[] = [
  { key: "health", name: "Health Care & Personal Service", icon: "HeartPulse" },
  { key: "realestate", name: "Real Estate & Property Management", icon: "Building2" },
  { key: "restaurant", name: "Restaurant & Beverage Service", icon: "UtensilsCrossed" },
  { key: "finance", name: "Finance, Insurance & Business Services", icon: "Landmark" },
  { key: "advertising", name: "Advertising & Public Relations", icon: "Megaphone" },
  { key: "arts", name: "Arts & Entertainment", icon: "Palette" },
  { key: "home", name: "Home & Garden", icon: "Sprout" },
  { key: "retail", name: "Shopping & Retail", icon: "ShoppingBag" },
  { key: "nonprofit", name: "Non-profit Organizations", icon: "HandHeart" },
  { key: "education", name: "Education", icon: "GraduationCap" },
  { key: "pet", name: "Pet & Veterinary", icon: "PawPrint" },
  { key: "automotive", name: "Automotive & Transportation", icon: "Car" },
  { key: "technology", name: "Technology & Communications", icon: "Cpu" },
  { key: "travel", name: "Travel & Hospitality", icon: "Plane" },
];

export type Tier = "STANDARD" | "FEATURED" | "PREMIUM";

export type Business = {
  slug: string;
  name: string;
  category: string; // category key
  tagline: string;
  description: string;
  tier: Tier;
  phone?: string;
  website?: string;
  address: string;
  hue: number; // for avatar gradient
};

const A = "4150 W Riverside Dr, Toluca Lake, CA 91505";

export const businesses: Business[] = [
  { slug: "destiny-home-health", name: "Destiny Home Health Inc", category: "health", tier: "PREMIUM", tagline: "Compassionate in-home care", description: "Skilled nursing and therapy delivered with warmth across the San Fernando Valley.", phone: "818-555-0142", website: "destinyhomehealth.com", address: A, hue: 152 },
  { slug: "skin-agency", name: "Skin Agency", category: "health", tier: "FEATURED", tagline: "Modern medical aesthetics", description: "Results-driven skincare and aesthetic treatments in a calm, luxe Village studio.", address: A, hue: 165 },
  { slug: "the-family-room", name: "The Family Room", category: "arts", tier: "STANDARD", tagline: "A creative gathering space", description: "Community-minded events, classes, and gatherings for Toluca Lake families.", address: A, hue: 140 },
  { slug: "align-define-pilates", name: "Align & Define: A Pilates Studio", category: "health", tier: "FEATURED", tagline: "Strength through precision", description: "Boutique reformer Pilates focused on alignment, mobility, and longevity.", website: "aligndefine.com", address: A, hue: 158 },
  { slug: "purefection-la", name: "Purefection LA, Inc", category: "home", tier: "STANDARD", tagline: "Spotless, every time", description: "Premium residential and commercial cleaning for discerning Village homes.", address: A, hue: 148 },
  { slug: "vanguard-home-health", name: "Vanguard Home Health Care Inc", category: "health", tier: "STANDARD", tagline: "Care you can trust", description: "Personalized home health services supporting independence and recovery.", address: A, hue: 150 },
  { slug: "saul-berger-md", name: "Saul R. Berger, M.D.", category: "health", tier: "STANDARD", tagline: "Pulmonary & sleep medicine", description: "Board-certified physician serving the community for over two decades.", address: A, hue: 172 },
  { slug: "the-strength-code", name: "The Strength Code", category: "health", tier: "PREMIUM", tagline: "Train smarter, live stronger", description: "Personal training and small-group strength coaching led by Sheila Melody.", website: "thestrengthcode.com", address: A, hue: 145 },
  { slug: "belmont-village", name: "Belmont Village Senior Living", category: "health", tier: "FEATURED", tagline: "Vibrant senior living", description: "Award-winning assisted living and memory care in the heart of the Village.", address: A, hue: 160 },
  { slug: "wildflower-acupuncture", name: "Wildflower Acupuncture", category: "health", tier: "STANDARD", tagline: "Balance & renewal", description: "Acupuncture and herbal medicine for whole-body wellness.", address: A, hue: 138 },
  { slug: "nurture-bodywork", name: "Nurture Bodywork & Wellness", category: "health", tier: "STANDARD", tagline: "Restorative bodywork", description: "Therapeutic massage and wellness treatments tailored to you.", address: A, hue: 156 },
  { slug: "golden-fist-martial-arts", name: "Golden Fist Training Method & Martial Arts", category: "education", tier: "STANDARD", tagline: "Discipline, confidence, community", description: "Martial arts instruction for all ages in a supportive Village dojo.", address: A, hue: 142 },
  { slug: "compass-real-estate", name: "Compass Real Estate — Toluca Lake", category: "realestate", tier: "PREMIUM", tagline: "Your Village real estate experts", description: "Local agents Taylor Montana and Corrie Sommers help you buy and sell in Toluca Lake.", website: "compass.com", address: A, hue: 168 },
  { slug: "priscillas-coffee", name: "Priscilla's Gourmet Coffee", category: "restaurant", tier: "PREMIUM", tagline: "The Village's living room", description: "Beloved neighborhood coffee house and gathering spot — and home of our Community Cleanup.", address: "4150 W Riverside Dr A, Burbank, CA 91505", hue: 135 },
  { slug: "tolucan-times", name: "The Tolucan Times", category: "advertising", tier: "FEATURED", tagline: "Local news since 1986", description: "Community newspaper covering Toluca Lake and the greater valley.", address: A, hue: 175 },
  { slug: "ramsey-schilling", name: "Ramsey-Schilling & Associates", category: "realestate", tier: "FEATURED", tagline: "Trusted property advisors", description: "Full-service real estate and property management for the Tolucas.", address: A, hue: 170 },
  { slug: "easy-tax", name: "Ea$y Tax", category: "finance", tier: "STANDARD", tagline: "Stress-free tax prep", description: "Friendly, thorough tax preparation and bookkeeping for individuals and small business.", address: A, hue: 162 },
  { slug: "fresh-bins-la", name: "Fresh Bins LA", category: "home", tier: "STANDARD", tagline: "Cleaner cans, happier curb", description: "Trash bin cleaning and sanitizing that keeps your home fresh.", address: A, hue: 146 },
  { slug: "kali-audio", name: "Kali Audio", category: "technology", tier: "FEATURED", tagline: "Studio sound for everyone", description: "Designers of acclaimed studio monitors and pro-audio gear, based locally.", website: "kaliaudio.com", address: A, hue: 178 },
  { slug: "savvi", name: "Savvi", category: "retail", tier: "STANDARD", tagline: "Activewear with purpose", description: "Community-driven activewear brand represented by Rhoda Minger.", address: A, hue: 154 },
  { slug: "allstate-tigran", name: "Destiny Insurance & Allstate — Tigran Grigoryan", category: "finance", tier: "STANDARD", tagline: "Protecting Village families", description: "Insurance and home health services with a personal, local touch.", address: A, hue: 164 },
  { slug: "toluca-lake-florist", name: "Toluca Lake Florist", category: "retail", tier: "STANDARD", tagline: "Blooms for every occasion", description: "Hand-arranged florals and gifts in the heart of the Village.", address: A, hue: 133 },
  { slug: "village-veterinary", name: "Village Veterinary Care", category: "pet", tier: "FEATURED", tagline: "Gentle care for your pets", description: "Full-service veterinary medicine for the Village's beloved companions.", address: A, hue: 149 },
  { slug: "toluca-auto-works", name: "Toluca Auto Works", category: "automotive", tier: "STANDARD", tagline: "Honest, expert service", description: "Trusted auto repair and maintenance keeping the neighborhood on the road.", address: A, hue: 167 },
];

export type Plan = {
  key: string;
  name: string;
  priceCents: number;
  audience: "Business" | "Non-Profit" | "Resident";
  eligibility?: string;
  popular?: boolean;
  benefits: string[];
};

export const plans: Plan[] = [
  {
    key: "business_small",
    name: "Business",
    priceCents: 15000,
    audience: "Business",
    eligibility: "1–10 employees",
    benefits: ["Full directory listing with photo gallery", "Social media exposure (FB + IG)", "Members-only mixers", "Toluca Lake Magazine subscription", "Grand-opening invitations"],
  },
  {
    key: "business_mid",
    name: "Business",
    priceCents: 20000,
    audience: "Business",
    eligibility: "11–25 employees",
    popular: true,
    benefits: ["Everything in the smaller tier", "Featured directory placement", "Priority event sponsorship access", "Advertising opportunities", "Ribbon-cutting support"],
  },
  {
    key: "business_large",
    name: "Business",
    priceCents: 30000,
    audience: "Business",
    eligibility: "More than 25 employees",
    benefits: ["Everything in mid tier", "Premium directory profile", "Annual member spotlight", "Logo on chamber sponsor wall", "Dedicated account support"],
  },
  {
    key: "nonprofit",
    name: "Non-Profit",
    priceCents: 13000,
    audience: "Non-Profit",
    benefits: ["Directory listing", "Community program participation", "Social media features", "Mixer access", "Event collaboration"],
  },
  {
    key: "resident",
    name: "Resident / Non-Merchant",
    priceCents: 5000,
    audience: "Resident",
    benefits: ["Merchant discounts", "Community program access", "Event invitations", "Chamber newsletter", "Support the Village you love"],
  },
];

export type Program = { slug: string; name: string; blurb: string; icon: string };

export const programs: Program[] = [
  { slug: "community-cleanup", name: "Community Clean Up", blurb: "Held quarterly, the Community Clean Up brings neighbors, businesses, and volunteers together to keep Toluca Lake clean, welcoming, and connected. Gather at Priscilla's Gourmet Coffee, then head out in teams to clean streets, sidewalks, planters, and public spaces — gloves, bags, and refreshments provided.", icon: "Trash2" },
  { slug: "networking-mixers", name: "Networking Mixers", blurb: "Relaxed evenings that bring together local business owners, professionals, creatives, and community leaders for connection, collaboration, and community engagement — hosted at restaurants, venues, and member businesses throughout Toluca Lake.", icon: "Users" },
  { slug: "art-fair", name: "Art Fair", blurb: "The Toluca Lake Art Fair brings together local artists, makers, photographers, and creatives for a day dedicated to art, culture, and community — original artwork, handcrafted goods, live demonstrations, and unique pieces from talented exhibitors.", icon: "Palette" },
  { slug: "community-howl", name: "Community Howl", blurb: "Our annual Halloween dog event! Neighbors, families, and their four-legged friends come together for a dog costume contest, local vendors, photo opportunities, treats, and plenty of Halloween spirit.", icon: "PartyPopper" },
  { slug: "health-fair", name: "Health Fair", blurb: "Local healthcare providers, wellness professionals, and fitness experts come together for a day focused on health, wellness, and community — screenings, wellness information, demonstrations, and family-friendly activities for every stage of life.", icon: "HeartPulse" },
  { slug: "holiday-open-house", name: "Holiday Open House", blurb: "One of the community's most anticipated traditions — local businesses open their doors for an evening of holiday lights, live entertainment, seasonal treats, special promotions, photos with Santa, and festive village charm.", icon: "Gift" },
  { slug: "pancake-breakfast", name: "Old-Fashioned Pancake Breakfast", blurb: "A longstanding community tradition held in partnership with LAFD Station 86 — pancakes, breakfast favorites, community booths, and family-friendly fun that supports important community and firefighter causes.", icon: "Utensils" },
];

export type ChamberEvent = {
  slug: string;
  title: string;
  program: string;
  start: string; // ISO
  end?: string;
  location: string;
  address: string;
  summary: string;
  description: string;
  membersOnly: boolean;
  price: number; // cents, 0 = free
  capacity: number;
  registered: number;
  hue: number;
};

export const events: ChamberEvent[] = [
  { slug: "community-cleanup-fall", title: "Community Clean Up", program: "community-cleanup", start: "2026-08-29T07:45:00", location: "Priscilla's Gourmet Coffee", address: "4150 W Riverside Dr A, Burbank, CA 91505", summary: "Our quarterly Village clean up with neighbors and local businesses.", description: "Held quarterly, the Toluca Lake Community Clean Up brings neighbors, local businesses, and volunteers together to help keep our neighborhood clean, welcoming, and connected. Gather at Priscilla's Gourmet Coffee, Tea & Gifts before heading out in teams to clean streets, sidewalks, planters, and public spaces throughout Toluca Lake. Gloves, trash bags, and supplies are provided, along with coffee and refreshments.", membersOnly: false, price: 0, capacity: 80, registered: 31, hue: 150 },
  { slug: "community-howl-2026", title: "3rd Annual Community Howl", program: "community-howl", start: "2026-10-30T16:00:00", end: "2026-10-30T19:00:00", location: "Toluca Lake Village", address: "Riverside Dr, Toluca Lake, CA", summary: "Our annual Halloween dog event for the whole neighborhood.", description: "The Toluca Lake Community Howl is our annual Halloween dog event, bringing neighbors, families, and their four-legged friends together for a fun, festive celebration in the heart of the community. Enjoy a dog costume contest, local vendors, photo opportunities, treats, and plenty of Halloween spirit.", membersOnly: false, price: 0, capacity: 300, registered: 124, hue: 165 },
  { slug: "holiday-open-house-2026", title: "Toluca Lake Holiday Open House", program: "holiday-open-house", start: "2026-12-04T17:00:00", end: "2026-12-04T20:00:00", location: "Toluca Lake Village", address: "Riverside Dr, Toluca Lake, CA", summary: "The community's most anticipated holiday tradition.", description: "The Toluca Lake Holiday Open House is one of the community's most anticipated annual traditions. Local businesses open their doors for an evening filled with holiday lights, live entertainment, seasonal treats, special promotions, and festive experiences. Stroll the neighborhood, enjoy carolers and musicians, and take photos with Santa.", membersOnly: false, price: 0, capacity: 1000, registered: 318, hue: 142 },
  { slug: "winter-networking-mixer", title: "Winter Networking Mixer", program: "networking-mixers", start: "2027-01-21T18:00:00", location: "Toluca Lake (member venue)", address: "Toluca Lake, CA", summary: "A relaxed evening of connection for the local business community.", description: "The Toluca Lake Chamber Networking Mixers bring together local business owners, professionals, creatives, and community leaders for relaxed evenings focused on connection, collaboration, and community engagement. Enjoy food, drinks, and conversation while meeting new people and supporting local business.", membersOnly: false, price: 0, capacity: 120, registered: 42, hue: 158 },
  { slug: "health-fair-2027", title: "Toluca Lake Health Fair", program: "health-fair", start: "2027-03-14T10:00:00", end: "2027-03-14T15:00:00", location: "Toluca Lake Village", address: "Riverside Dr, Toluca Lake, CA", summary: "A community day focused on health, wellness, and connection.", description: "The Toluca Lake Health Fair brings together local healthcare providers, wellness professionals, fitness experts, and community organizations for a day focused on health, wellness, and community connection. Explore health screenings, wellness information, fitness and nutrition guidance, demonstrations, and family-friendly activities.", membersOnly: false, price: 0, capacity: 400, registered: 58, hue: 172 },
  { slug: "art-fair-2027", title: "Toluca Lake Art Fair", program: "art-fair", start: "2027-04-24T10:00:00", end: "2027-04-24T16:00:00", location: "Toluca Lake Village", address: "Riverside Dr, Toluca Lake, CA", summary: "A day celebrating local artists, makers, and creatives.", description: "The Toluca Lake Art Fair brings together local artists, makers, photographers, and creatives for a day dedicated to art, culture, and community. Explore a curated mix of original artwork, handcrafted goods, live demonstrations, and unique pieces — from paintings and prints to jewelry, ceramics, and textiles.", membersOnly: false, price: 0, capacity: 500, registered: 96, hue: 138 },
  { slug: "pancake-breakfast-2027", title: "Old-Fashioned Pancake Breakfast", program: "pancake-breakfast", start: "2027-05-15T08:00:00", end: "2027-05-15T11:00:00", location: "LAFD Station 86", address: "Toluca Lake, CA", summary: "A longstanding tradition in partnership with LAFD Station 86.", description: "The Toluca Lake Pancake Breakfast Fundraiser is a longstanding community tradition held in partnership with LAFD Station 86, bringing neighbors, families, local businesses, and first responders together for a morning of food, fun, and community support. Enjoy pancakes, breakfast favorites, community booths, and family-friendly activities.", membersOnly: false, price: 1500, capacity: 250, registered: 64, hue: 168 },
];

export type BoardMember = {
  name: string;
  role: string;
  company?: string;
  email?: string;
  group: "Executive" | "Director" | "Honorary" | "Staff";
  hue: number;
};

export const board: BoardMember[] = [
  // Executive Board
  { name: "Corrie Sommers", role: "President", company: "Compass Real Estate", email: "president@tolucalakechamber.com", group: "Executive", hue: 152 },
  { name: "Tigran Grigoryan", role: "Vice President", company: "Destiny Home Health", email: "vp@tolucalakechamber.com", group: "Executive", hue: 148 },
  { name: "Cathryn Farnsworth", role: "Secretary", company: "Cathryn Farnsworth Photography", email: "secretary@tolucalakechamber.com", group: "Executive", hue: 160 },
  { name: "Shannon Hartman", role: "Treasurer", company: "Priscilla's Gourmet Coffee, Tea, & Gifts", email: "cfo@tolucalakechamber.com", group: "Executive", hue: 168 },
  { name: "Taylor Montana Catlin", role: "Immediate Past President", company: "Craig Strong Group | Compass Real Estate", group: "Executive", hue: 145 },
  { name: "Fritz Coleman", role: "Honorary Mayor", group: "Executive", hue: 140 },
  // Board of Directors
  { name: "Michael Argento", role: "Director", company: "The Tolucan Times", group: "Director", hue: 150 },
  { name: "Rosie Blosser", role: "Director", company: "Resident", group: "Director", hue: 158 },
  { name: "Allen Budzichowski", role: "Director", company: "Ea$y Tax", group: "Director", hue: 162 },
  { name: "Vic Hairapetian", role: "Director", company: "Fresh Bins LA · The Kluckin' Chicken · VisitTolucaLake.com", group: "Director", hue: 155 },
  { name: "Tim Hawkins", role: "Director", company: "Resident", group: "Director", hue: 143 },
  { name: "Tom Hilt", role: "Director", company: "Ramsey-Shilling and Associates", group: "Director", hue: 170 },
  { name: "Jon Molin", role: "Director", company: "Ramsey-Shilling and Associates", group: "Director", hue: 166 },
  // Honorary Directors
  { name: "Britta Engstrom", role: "Honorary Director", company: "NBCUniversal", group: "Honorary", hue: 153 },
  { name: "Diane McCreary", role: "Honorary Director", company: "Campo de Cahuenga", group: "Honorary", hue: 159 },
  { name: "Rhoda Minger", role: "Honorary Director", company: "Savvi", group: "Honorary", hue: 164 },
  // Administration
  { name: "Maria Suarez", role: "Administrative Assistant", group: "Staff", hue: 147 },
];

export const faqs = [
  { q: "What does the Toluca Lake Chamber of Commerce do?", a: "The Toluca Lake Chamber of Commerce supports local businesses, community engagement, and neighborhood initiatives throughout Toluca Lake and the surrounding area. Through events, partnerships, advocacy, and networking opportunities, the Chamber helps bring together businesses, residents, and community leaders while supporting the character and growth of the neighborhood." },
  { q: "How do I become a Chamber member?", a: "Joining the Chamber is easy. Simply visit our Membership page, choose the membership level that best fits your business or organization, and complete the online application. If you have questions before joining, we're always happy to help." },
  { q: "Who can join the Chamber?", a: "The Chamber welcomes local businesses, entrepreneurs, nonprofits, community organizations, and individuals who want to support and stay connected to the Toluca Lake community. You do not need to be physically located in Toluca Lake to become a member." },
  { q: "What are the benefits of membership?", a: "Chamber members receive access to networking events, community exposure, promotional opportunities, sponsorship opportunities, and connections with other local businesses and community leaders. Membership also helps support the Chamber's ongoing community initiatives and events throughout the year." },
  { q: "How much does membership cost?", a: "Membership pricing varies depending on the type of business or organization and the membership level selected. Please visit our Membership page for current membership rates and details." },
  { q: "Do I have to own a business in Toluca Lake to join?", a: "No. While the Chamber is focused on supporting the Toluca Lake community, many members do business throughout Los Angeles and the surrounding areas. We welcome anyone who wants to be involved in and support the community." },
  { q: "How can I sponsor an event or community initiative?", a: "The Chamber offers a variety of sponsorship opportunities throughout the year, including community events, mixers, holiday celebrations, and local initiatives. Sponsorships are a great way to support the community while increasing visibility for your business or organization. Please contact us to learn more about current opportunities." },
  { q: "Are Chamber events open to the public?", a: "Many Chamber events are open to both members and non-members, though some events may offer discounted pricing or exclusive access for Chamber members. Event details and registration information can be found on our Events page." },
  { q: "How can I stay updated on upcoming events and news?", a: "You can stay connected by subscribing to our newsletter, following us on social media, and regularly checking our website for upcoming events, announcements, and community updates." },
  { q: "When was the Chamber founded?", a: "The Toluca Lake Chamber of Commerce was founded in 1939 and has remained an active part of the community for more than 85 years. Throughout its history, the Chamber has worked to support local businesses, strengthen community relationships, and help preserve the unique character of Toluca Lake." },
];

export type Testimonial = { quote: string; name: string; business: string; hue: number };

export const spotlightArticles = [
  { slug: "good-day-la-100th", title: "Good Day LA — Toluca Lake's 100th Anniversary", date: "2023-12-26", excerpt: "Celebrating a century of the Village with a look back at the people and places that made Toluca Lake home.", hue: 155 },
  { slug: "village-small-business-saturday", title: "Small Business Saturday in the Village", date: "2024-11-30", excerpt: "How Toluca Lake shows up for its local shops during the busiest weekend of the year.", hue: 148 },
  { slug: "meet-priscillas-coffee", title: "Meet the Maker: Priscilla's Gourmet Coffee", date: "2025-03-14", excerpt: "The story behind the Village's beloved coffee house and community gathering spot.", hue: 168 },
];

export const sponsors = [
  { name: "NBC Universal", tier: "Title", hue: 152 },
  { name: "Compass Real Estate", tier: "Platinum", hue: 160 },
  { name: "Kali Audio", tier: "Gold", hue: 175 },
  { name: "The Tolucan Times", tier: "Gold", hue: 145 },
  { name: "Belmont Village", tier: "Silver", hue: 158 },
  { name: "Priscilla's Coffee", tier: "Silver", hue: 135 },
];

export function categoryName(key: string) {
  return categories.find((c) => c.key === key)?.name ?? key;
}
export function getBusiness(slug: string) {
  return businesses.find((b) => b.slug === slug);
}
export function getEvent(slug: string) {
  return events.find((e) => e.slug === slug);
}
export function getProgram(slug: string) {
  return programs.find((p) => p.slug === slug);
}
export function eventsForProgram(slug: string) {
  return events.filter((e) => e.program === slug);
}
