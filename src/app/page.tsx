import Link from "next/link";
import { Leaf, TrendingUp, Network, Megaphone, ShieldCheck, Store, CalendarDays, BadgeCheck, Mail, ArrowRight, Quote } from "lucide-react";
import { getEvents } from "@/server/queries";
import { categories, board } from "@/lib/data";
import { homeStats, memberSpotlight, legacyMilestones } from "@/lib/content";
import { Magnetic } from "@/components/ui/magnetic";
import { Counter } from "@/components/ui/counter";
import { Icon } from "@/components/ui/icon";
import { TextReveal } from "@/components/ui/text-reveal";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { eventImages } from "@/lib/images";
import "@/styles/home.css";

export const dynamic = "force-dynamic";

const HERO_IMG =
  "https://static.wixstatic.com/media/824d26_9e779a2e8be74bb390e4202007c2096f~mv2.png";
const mission = [
  { icon: TrendingUp, title: "Grow", body: "Strategic programs and advocacy that support local business and sustainable growth." },
  { icon: Network, title: "Connect", body: "Networking events and community gatherings that build relationships and opportunity." },
  { icon: Megaphone, title: "Promote", body: "Marketing exposure and visibility that showcases our members and the Village." },
  { icon: ShieldCheck, title: "Protect", body: "Advocacy and leadership that protect our local voice and the future of our community." },
];

// A curated taste of the directory — eight industries that define the Village.
const previewCategories = ["restaurant", "realestate", "health", "arts", "retail", "finance", "home", "pet"];

function eventCategory(slug: string) {
  if (/network|mixer/.test(slug)) return "Networking";
  if (/state|board|leader/.test(slug)) return "Leadership";
  return "Community";
}

export default async function HomePage() {
  const events = await getEvents();
  const featured = events.slice(0, 3);
  const cats = previewCategories
    .map((key) => categories.find((c) => c.key === key))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));
  const president = board.find((m) => m.role === "President") ?? board[0];

  return (
    <div className="tlc-home">
      <section className="hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="hero-bg" src={HERO_IMG} alt="" aria-hidden="true" />
        <div className="hero-scrim" />
        <div className="container hero-inner">
          <div className="hero-panel reveal">
            <div className="pill"><span />Serving the Village since 1939</div>
            <h1>The village business community,<br /><em>elevated.</em></h1>
            <p>Connecting Toluca Lake&rsquo;s businesses, residents, and leaders &mdash; through advocacy, events, and the relationships that keep the neighborhood thriving.</p>
            <div className="hero-buttons">
              <Magnetic><Link href="/membership/apply" className="primary">Join the Chamber <span>&rarr;</span></Link></Magnetic>
              <Link href="/directory" className="outline">Explore Members <span>&rarr;</span></Link>
            </div>
          </div>
          <div className="hero-tiles reveal">
            <Link href="/directory" className="hero-tile"><Store /><span>Directory</span></Link>
            <Link href="/events" className="hero-tile"><CalendarDays /><span>Events</span></Link>
            <Link href="/membership" className="hero-tile"><BadgeCheck /><span>Membership</span></Link>
            <Link href="/contact" className="hero-tile"><Mail /><span>Contact</span></Link>
          </div>
        </div>
        <div className="scroll-cue" aria-hidden>
          <span>Scroll</span>
          <span className="scroll-line" />
        </div>
      </section>

      {/* Manifesto — one confident idea, kinetic Apple-style type */}
      <section className="manifesto">
        <div className="container">
          <span className="editorial-kicker">The Village &middot; Est. 1939</span>
          <h2 className="manifesto-line">
            <TextReveal as="span" text="A village inside a city —" />{" "}
            <TextReveal as="span" className="manifesto-accent" text="and a Chamber that keeps it that way." delay={0.18} />
          </h2>
          <p className="manifesto-sub reveal">
            For more than eighty-five years we&rsquo;ve looked after Toluca Lake&rsquo;s
            businesses, its neighbors, and the small-town character that makes one square mile
            of Los Angeles feel like a town all its own.
          </p>
        </div>
      </section>

      {/* Social proof — the trust strip */}
      <section className="container stat-strip reveal">
        {homeStats.map((s) => (
          <div key={s.label} className="stat-cell">
            <strong>
              <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
            </strong>
            <span className="stat-label">{s.label}</span>
            <span className="stat-detail">{s.detail}</span>
          </div>
        ))}
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

        {/* Directory preview — discovery, delightful */}
        <section className="container directory-preview reveal">
          <div className="directory-head">
            <div>
              <span className="eyebrow-text">The Business Directory</span>
              <h2>Discover the Village,<br /><em>one business at a time.</em></h2>
            </div>
            <Link className="text-link" href="/directory">Browse all members <span>&rarr;</span></Link>
          </div>
          <div className="cat-grid">
            {cats.map((c) => (
              <Link key={c.key} href={`/directory?category=${c.key}`} className="cat-tile">
                <span className="cat-icon"><Icon name={c.icon} className="h-6 w-6" /></span>
                <span className="cat-name">{c.name}</span>
                <ArrowRight className="cat-arrow h-4 w-4" />
              </Link>
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
                  <img src={eventImages[i % eventImages.length]} alt={e.title} />
                  <div className="date">{mon}<br /><b>{day}</b></div>
                  <small>{eventCategory(e.slug)}</small>
                  <h3>{e.title}</h3>
                  <p>{time}{end ? ` to ${end}` : ""}<br />{e.location}</p>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Member spotlight — the editorial member story */}
        <section className="container spotlight reveal">
          <div className="spotlight-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={memberSpotlight.image} alt={memberSpotlight.business} />
            <span className="spotlight-since">{memberSpotlight.since}</span>
          </div>
          <div className="spotlight-copy">
            <span className="eyebrow-text">Member Spotlight</span>
            <Quote className="spotlight-quote-mark" />
            <blockquote>{memberSpotlight.quote}</blockquote>
            <div className="spotlight-attr">
              <strong>{memberSpotlight.person}</strong>
              <span>{memberSpotlight.role}</span>
              <span className="spotlight-biz">{memberSpotlight.business} &middot; {memberSpotlight.category}</span>
            </div>
            <Link className="text-link" href={`/directory/${memberSpotlight.slug}`}>Read their story <span>&rarr;</span></Link>
          </div>
        </section>

        {/* 85-year legacy — quiet, cinematic */}
        <section className="legacy reveal">
          <div className="container">
            <div className="legacy-head">
              <span className="legacy-numeral text-gradient-gold">85</span>
              <div>
                <span className="eyebrow-text">Our Legacy</span>
                <h2>Eighty-five years of<br /><em>looking after the Village.</em></h2>
              </div>
            </div>
            <hr className="rule-gold legacy-rule" />
            <ol className="legacy-timeline">
              {legacyMilestones.map((m) => (
                <li key={m.year}>
                  <span className="legacy-year">{m.year}</span>
                  <h3>{m.title}</h3>
                  <p>{m.body}</p>
                </li>
              ))}
            </ol>
            <Link className="text-link" href="/about/legacy">Explore the full history <span>&rarr;</span></Link>
          </div>
        </section>

        {/* Personal touch — a signed note from the President */}
        <section className="container president reveal">
          <div className="president-portrait" style={{ backgroundImage: `linear-gradient(150deg, hsl(${president.hue} 60% 30%), hsl(${(president.hue + 20) % 360} 66% 18%))` }}>
            <span aria-hidden>{president.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>
            <span className="president-badge">Since 1939</span>
          </div>
          <div className="president-copy">
            <span className="eyebrow-text">A note from our President</span>
            <p className="president-note">
              &ldquo;Toluca Lake has always felt like a small town wrapped inside a big city &mdash;
              and that&rsquo;s no accident. It&rsquo;s the neighbors who show up, the shop owners
              who know your name, and the businesses that lean on one another.{" "}
              <strong>That&rsquo;s what we protect. That&rsquo;s what we&rsquo;re inviting you into.</strong>&rdquo;
            </p>
            <div className="president-sign">
              <span className="president-signature">{president.name}</span>
              <span className="president-role">{president.role}{president.company ? ` · ${president.company}` : ""}</span>
            </div>
          </div>
        </section>

        <section className="container cta-band reveal">
          <div className="seal"><Leaf width={30} height={30} strokeWidth={1.5} /><span>1939</span></div>
          <h2>Stronger together.<br />Better for <em>Toluca Lake.</em></h2>
          <p className="cta-sub">Membership that pays for itself &mdash; exposure, referrals, and a seat at the table for the future of the Village.</p>
          <Magnetic><Link href="/membership/apply" className="primary">Join the Chamber <span>&rarr;</span></Link></Magnetic>
        </section>
      </div>

      {/* Newsletter capture — the low-friction next step */}
      <section className="home-newsletter">
        <div className="container home-newsletter-inner">
          <div className="home-newsletter-copy">
            <span className="eyebrow-text">Stay Connected</span>
            <h2>The Village, <em>in your inbox.</em></h2>
            <p>Community news, member spotlights, and the events worth showing up for &mdash; once a month, never more.</p>
          </div>
          <div className="home-newsletter-form">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}
