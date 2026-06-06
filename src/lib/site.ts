export const site = {
  name: "Toluca Lake Chamber of Commerce",
  shortName: "Toluca Lake Chamber",
  tagline: "Empowering Local Businesses",
  description:
    "The Toluca Lake Chamber of Commerce empowers local businesses with resources, networking, and advocacy — serving the Village since 1939.",
  founded: 1939,
  email: "Info@TolucaLakeChamber.Com",
  phone: "818-761-6594",
  phoneHref: "tel:+18187616594",
  address: {
    line1: "P.O. Box 2312",
    city: "Toluca Lake",
    state: "California",
    zip: "91610",
  },
  social: {
    instagram: "https://www.instagram.com/tolucalakechamber/",
    facebook: "https://www.facebook.com/TolucaLakeChamberOfCommerce",
  },
} as const;

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "About Us", href: "/about", description: "Our mission & purpose" },
      { label: "Meet the Board", href: "/about/board", description: "Volunteer leadership" },
      { label: "The Toluca Lake Legacy", href: "/about/legacy", description: "A history of the Village" },
      { label: "FAQ", href: "/about/faq", description: "Membership questions answered" },
    ],
  },
  { label: "Directory", href: "/directory" },
  {
    label: "Events",
    href: "/events",
    children: [
      { label: "All Events", href: "/events", description: "Calendar & upcoming" },
      { label: "Community Cleanup", href: "/events/programs/community-cleanup" },
      { label: "Networking Mixers", href: "/events/programs/networking-mixers" },
      { label: "Art Fair", href: "/events/programs/art-fair" },
      { label: "Community Howl", href: "/events/programs/community-howl" },
      { label: "Health Fair", href: "/events/programs/health-fair" },
      { label: "Holiday Open House", href: "/events/programs/holiday-open-house" },
      { label: "Pancake Breakfast", href: "/events/programs/pancake-breakfast" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
    children: [
      { label: "Plans & Pricing", href: "/membership", description: "Five ways to join" },
      { label: "Member Benefits", href: "/membership/benefits", description: "What you get" },
      { label: "Apply / Join", href: "/membership/apply", description: "Become a member" },
      { label: "Renew Membership", href: "/membership/renew", description: "Keep your spot in the Village" },
      { label: "Member Perks", href: "/membership/perks", description: "Discounts & offers for members" },
    ],
  },
  {
    label: "Community",
    href: "/gallery",
    children: [
      { label: "Photo Gallery", href: "/gallery", description: "Moments from the Village" },
      { label: "Newsletter", href: "/newsletter", description: "Read & subscribe" },
      { label: "Community Spotlight", href: "/about/spotlight", description: "People & places we love" },
      { label: "Sponsors", href: "/sponsors", description: "The partners behind it all" },
    ],
  },
  { label: "Store", href: "/store" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  Explore: [
    { label: "Business Directory", href: "/directory" },
    { label: "Events", href: "/events" },
    { label: "Membership", href: "/membership" },
    { label: "Member Perks", href: "/membership/perks" },
    { label: "Chamber Store", href: "/store" },
  ],
  Chamber: [
    { label: "About Us", href: "/about" },
    { label: "Meet the Board", href: "/about/board" },
    { label: "The Toluca Lake Legacy", href: "/about/legacy" },
    { label: "Community Spotlight", href: "/about/spotlight" },
    { label: "Sponsors", href: "/sponsors" },
  ],
  Connect: [
    { label: "Photo Gallery", href: "/gallery" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Contact", href: "/contact" },
    { label: "Donate", href: "/donate" },
    { label: "Join the Chamber", href: "/membership/apply" },
    { label: "Member Login", href: "/login" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};
