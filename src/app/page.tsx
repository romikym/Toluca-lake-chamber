import Link from "next/link";
import { Leaf, Search } from "lucide-react";
import { getEvents, getCategories } from "@/server/queries";
import "@/styles/home.css";

export const dynamic = "force-dynamic";

// Hero + event imagery (license-clear placeholders from the approved design).
// Drop real photos into /public/images and swap these src values to use them.
const HERO_IMG =
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=90";
const EVENT_IMGS = [
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=85",
];

const mission = [
  { icon: "↗", title: "Grow", body: "Strategic programs and advocacy that support local business and sustainable growth." },
  { icon: "☷", title: "Connect", body: "Networking events and community gatherings that build relationships and opportunity." },
  { icon: "☰", title: "Promote", body: "Marketing exposure and visibility that showcases our members and the Village." },
  { icon: "♢", title: "Protect", body: "Advocacy and leadership that protect our local voice and the future of our community." },
];

function eventCategory(slug: string) {
  if (/network|mixer/.test(slug)) return "Networking";
  if (/state|board|leader/.test(slug)) return "Leadership";
  return "Community";
}

export default async function HomePage() {
  const [events, categories] = await Promise.all([getEvents(), getCategories()]);
  const featured = events.slice(0, 3);

  return (
    <div className="tlc-home">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      {/* Utility bar */}
      <header className="topline">
        <div className="container top-inner">
          <span>Serving the Village of Toluca Lake since 1939</span>
          <div className="socials">
            <a href="https://www.instagram.com/tolucalakechamber/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/TolucaLakeChamberOfCommerce" target="_blank" rel="noopener noreferrer">Facebook</a>
            <Link href="/login">Member Login</Link>
          </div>
        </div>
      </header>

      {/* Floating glass nav */}
      <nav className="container nav-glass">
        <Link href="/" className="brand">
          <Leaf className="mark" width={38} height={38} strokeWidth={1.5} />
          <div><strong>TOLUCA LAKE</strong><span>Chamber of Commerce</span></div>
        </Link>
        <div className="nav-links">
          <Link href="/about">About</Link>
          <Link href="/directory">Directory</Link>
          <Link href="/events">Events</Link>
          <Link href="/membership">Membership</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="nav-actions">
          <Link href="/directory" className="icon-btn" aria-label="Search the directory"><Search width={20} height={20} /></Link>
          <Link href="/donate" className="ghost">Donate</Link>
          <Link href="/membership/apply" className="primary small">Join the Chamber</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="glass-arc arc-one" />
        <div className="glass-arc arc-two" />
        <div className="container hero-grid">
          <div className="hero-copy reveal">
            <div className="pill"><span />Serving Toluca Lake since 1939</div>
            <h1>The village<br />business community,<br /><em>elevated.</em></h1>
            <p>Connecting Toluca Lake businesses, residents, and leaders through advocacy, events, and meaningful local relationships.</p>
            <div className="hero-buttons">
              <Link href="/membership/apply" className="primary">Join the Chamber <span>→</span></Link>
              <Link href="/directory" className="outline">Explore Members <span>→</span></Link>
            </div>
          </div>
          <div className="hero-image reveal">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={HERO_IMG} alt="Toluca Lake — lakeside village" />
            <div className="image-glow" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container stats-card reveal">
        <div className="stat"><div className="stat-icon">☷</div><strong>120+</strong><span>Member Businesses</span></div>
        <div className="stat"><div className="stat-icon">▣</div><strong>40+</strong><span>Community Events Each Year</span></div>
        <div className="stat"><div className="stat-icon">◷</div><strong>{new Date().getFullYear() - 1939}</strong><span>Years Serving the Village</span></div>
        <div className="stat"><div className="stat-icon">◇</div><strong>{categories.length || 14}</strong><span>Industry Categories</span></div>
      </section>

      <div className="main-content">
        {/* Mission */}
        <section className="container mission-grid">
          <div className="section-copy reveal">
            <span className="eyebrow">Our Mission</span>
            <h2>A driving force behind<br />our community&rsquo;s <em>vitality.</em></h2>
            <p>Since 1939, the Toluca Lake Chamber of Commerce has brought together local businesses, residents, and community leaders to support the neighborhood we all care about.</p>
            <p>From local events and business networking to community partnerships and advocacy, the Chamber plays an active role in preserving the character of Toluca Lake while helping it continue to grow and thrive.</p>
            <Link className="text-link" href="/about">Learn more about us <span>→</span></Link>
          </div>
          <div className="feature-grid reveal">
            {mission.map((m) => (
              <article key={m.title}>
                <div>{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
                <span>→</span>
              </article>
            ))}
          </div>
        </section>

        {/* Events */}
        <section className="container events-grid">
          <div className="section-copy events-copy reveal">
            <span className="eyebrow">Upcoming Events</span>
            <h2>Bringing people<br />together.<br /><em>Creating impact.</em></h2>
            <Link className="text-link" href="/events">View all events <span>→</span></Link>
          </div>
          <div className="event-cards reveal">
            {featured.map((e, i) => {
              const d = new Date(e.start);
              const mon = d.toLocaleString("en-US", { month: "short" }).toUpperCase();
              const day = d.getDate();
              const time = d.toLocaleString("en-US", { hour: "numeric", minute: "2-digit" });
              const end = e.end ? new Date(e.end).toLocaleString("en-US", { hour: "numeric", minute: "2-digit" }) : null;
              return (
                <Link key={e.slug} href={`/events/${e.slug}`} className="event-card">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={EVENT_IMGS[i % EVENT_IMGS.length]} alt={e.title} />
                  <div className="date">{mon}<br /><b>{day}</b></div>
                  <small>{eventCategory(e.slug)}</small>
                  <h3>{e.title}</h3>
                  <p>{time}{end ? ` to ${end}` : ""}<br />📍 {e.location}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* CTA band */}
        <section className="container cta-band reveal">
          <div className="seal"><Leaf width={30} height={30} strokeWidth={1.5} /><span>1939</span></div>
          <h2>Stronger together.<br />Better for <em>Toluca Lake.</em></h2>
          <Link href="/membership/apply" className="primary light">Join the Chamber <span>→</span></Link>
        </section>
      </div>
    </div>
  );
}
