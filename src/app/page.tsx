import Link from "next/link";
import { Leaf, TrendingUp, Network, Megaphone, ShieldCheck } from "lucide-react";
import { getEvents } from "@/server/queries";
import { Magnetic } from "@/components/ui/magnetic";
import "@/styles/home.css";

export const dynamic = "force-dynamic";

const HERO_IMG =
  "https://static.wixstatic.com/media/824d26_9e779a2e8be74bb390e4202007c2096f~mv2.png";
const EVENT_IMGS = [
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=85",
];

const mission = [
  { icon: TrendingUp, title: "Grow", body: "Strategic programs and advocacy that support local business and sustainable growth." },
  { icon: Network, title: "Connect", body: "Networking events and community gatherings that build relationships and opportunity." },
  { icon: Megaphone, title: "Promote", body: "Marketing exposure and visibility that showcases our members and the Village." },
  { icon: ShieldCheck, title: "Protect", body: "Advocacy and leadership that protect our local voice and the future of our community." },
];

function eventCategory(slug: string) {
  if (/network|mixer/.test(slug)) return "Networking";
  if (/state|board|leader/.test(slug)) return "Leadership";
  return "Community";
}

export default async function HomePage() {
  const events = await getEvents();
  const featured = events.slice(0, 3);

  return (
    <div className="tlc-home">
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-bg" src={HERO_IMG} alt="" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="container hero-inner">
          <div className="hero-copy reveal">
            <div className="pill"><span />Serving the Village since 1939</div>
            <h1>The village business community,<br /><em>elevated.</em></h1>
            <p>Connecting Toluca Lake&rsquo;s businesses, residents, and leaders &mdash; through advocacy, events, and the relationships that keep the neighborhood thriving.</p>
            <div className="hero-buttons">
              <Magnetic><Link href="/membership/apply" className="primary">Join the Chamber <span>&rarr;</span></Link></Magnetic>
              <Link href="/directory" className="outline">Explore Members <span>&rarr;</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial statement — the cinematic Monocle moment */}
      <section className="editorial reveal">
        <div className="container">
          <span className="editorial-kicker">The Village &middot; Est. 1939</span>
          <h2 className="editorial-line">
            A village <em>inside</em> a city &mdash; and a Chamber that keeps it that way.
          </h2>
          <p className="editorial-sub">
            For more than eighty-five years we&rsquo;ve looked after Toluca Lake&rsquo;s
            businesses, its neighbors, and the small-town character that makes one square mile
            of Los Angeles feel like a town all its own.
          </p>
        </div>
      </section>

      <div className="main-content">
        <section className="container mission-grid">
          <div className="section-copy reveal">
            <span className="eyebrow-text">Our Mission</span>
            <h2>A driving force behind<br />our community&rsquo;s <em>vitality.</em></h2>
            <p>Since 1939, the Toluca Lake Chamber of Commerce has brought together local businesses, residents, and community leaders to support the neighborhood we all care about.</p>
            <p>From local events and business networking to community partnerships and advocacy, the Chamber plays an active role in preserving the character of Toluca Lake while helping it continue to grow and thrive.</p>
            <Link className="text-link" href="/about">Learn more about us <span>&rarr;</span></Link>
          </div>
          <div className="feature-grid reveal">
            {mission.map((m) => (
              <article key={m.title}>
                <div><m.icon width={24} height={24} strokeWidth={1.75} /></div>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
                <span>&rarr;</span>
              </article>
            ))}
          </div>
        </section>

        <section className="container events-grid">
          <div className="section-copy events-copy reveal">
            <span className="eyebrow-text">Upcoming Events</span>
            <h2>Bringing people<br />together.<br /><em>Creating impact.</em></h2>
            <Link className="text-link" href="/events">View all events <span>&rarr;</span></Link>
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
                  <p>{time}{end ? ` to ${end}` : ""}<br />{e.location}</p>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="container cta-band reveal">
          <div className="seal"><Leaf width={30} height={30} strokeWidth={1.5} /><span>1939</span></div>
          <h2>Stronger together.<br />Better for <em>Toluca Lake.</em></h2>
          <Magnetic><Link href="/membership/apply" className="primary">Join the Chamber <span>&rarr;</span></Link></Magnetic>
        </section>
      </div>
    </div>
  );
}
