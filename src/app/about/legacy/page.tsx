import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "The Toluca Lake Legacy",
  description:
    "A history of Toluca Lake — from its Indigenous roots and early ranching history to its connection with Hollywood and the neighborhood it is today.",
};

const timeline = [
  { year: "Pre-1769", title: "The Land Before Toluca Lake", body: "Long before Toluca Lake became a neighborhood, the area was part of the ancestral homeland of the Tongva people, whose communities lived throughout the Los Angeles basin and San Fernando Valley. The nearby Los Angeles River and natural wetlands helped shape the land that would later become part of Toluca Lake's story." },
  { year: "1780s–1840s", title: "Rancho Lands and Campo de Cahuenga", body: "During the Spanish and Mexican eras, the land surrounding present-day Toluca Lake was part of a broader rancho landscape tied to the early development of the San Fernando Valley. Nearby Campo de Cahuenga later became one of California's most important historic sites, where the Treaty of Cahuenga was signed on January 13, 1847, helping end hostilities in California during the Mexican-American War." },
  { year: "1887", title: "Charles Forman Arrives", body: "In the late 1880s, businessman Charles Forman acquired much of the land that would become Toluca Lake. Forman built a ranch home northwest of the lake and became one of the key figures connected to the area's early identity and development." },
  { year: "1892", title: "The Name “Toluca” Appears", body: "One of the earliest official uses of the name “Toluca” came with the creation of the Toluca Post Office. Wilson C. Weddington became an important early civic figure in the area, helping establish services that supported the growth of what would later become North Hollywood and the surrounding communities." },
  { year: "1923", title: "From Orchards to a Neighborhood", body: "By the early 1920s, the area around Toluca Lake was still shaped by orchards, ranch land, and open space. After Forman's death, investors began developing the area into a residential community known as Toluca Lake Park, which soon became simply Toluca Lake." },
  { year: "1928", title: "Hollywood Moves Nearby", body: "When Warner Bros. opened nearby in Burbank in 1928, Toluca Lake's location became even more significant. Its quiet residential feel, proximity to the studios, and private lake helped attract members of the entertainment industry and shaped the neighborhood's lasting connection to Hollywood." },
  { year: "1934", title: "The Lake Becomes Privately Maintained", body: "The lake itself became a defining feature of the neighborhood. It is maintained by the Toluca Lake Property Owners Association, a nonprofit established in 1934, and its bottom was later sealed with asphalt to help prevent water loss." },
  { year: "1939", title: "The Chamber Is Founded", body: "The Toluca Lake Chamber of Commerce was formed to support local businesses and strengthen the growing community. More than 85 years later, the Chamber continues to serve as a connector for businesses, residents, events, and neighborhood initiatives." },
  { year: "Mid-20th Century", title: "A Village Identity Takes Shape", body: "As Los Angeles continued to grow around it, Toluca Lake maintained a distinct village-like identity. Local restaurants, shops, studios, residents, and community organizations helped create the connected neighborhood feel that still defines the area today." },
  { year: "2023", title: "Celebrating 100 Years of Toluca Lake", body: "In 2023, the Toluca Lake community celebrated the neighborhood's centennial with special events, local partnerships, historical programming, and community-wide celebrations honoring 100 years of Toluca Lake history — reflecting the neighborhood's longstanding sense of identity and community involvement." },
  { year: "Today", title: "A Neighborhood With a Living Legacy", body: "Today, Toluca Lake remains one of Los Angeles' most recognizable neighborhood communities, known for its history, walkability, entertainment roots, local businesses, and strong sense of connection. The Chamber continues to help carry that legacy forward through events, partnerships, and support for the people and businesses that make Toluca Lake feel like Toluca Lake." },
];

export default function LegacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Our heritage"
        title="The Toluca Lake Legacy"
        description="Toluca Lake is one of Los Angeles' most established and connected neighborhoods — known for its walkable village feel, longstanding community ties, and deep roots in the entertainment industry."
        hue={168}
        breadcrumb={[{ label: "Home", href: "/" }, { label: "About", href: "/about" }, { label: "Legacy" }]}
      />

      <section className="py-20">
        <Container className="max-w-3xl">
          <SectionHeader eyebrow="About Toluca Lake" title="A historic, connected neighborhood" />
          <Reveal delay={0.1} className="mt-6 space-y-4 text-[15px] leading-relaxed text-ink-soft">
            <p>
              Located near the Hollywood Hills and the studios of Burbank and Universal
              City, the neighborhood blends historic character with an active local
              business community and a strong sense of identity.
            </p>
            <p>
              The Toluca Lake Chamber of Commerce works to support the businesses, events,
              and community relationships that help make the neighborhood feel welcoming,
              connected, and distinctly local.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="max-w-3xl">
          <h2 className="font-display text-2xl font-semibold text-brand-900">A history of Toluca Lake</h2>
          <Reveal delay={0.05} className="mt-4 space-y-4 text-[15px] leading-relaxed text-ink-soft">
            <p>
              Long before Toluca Lake became one of Los Angeles' most recognizable
              neighborhoods, the area was shaped by natural springs, ranch land,
              agriculture, and the people who helped define the San Fernando Valley over
              generations. From its Indigenous roots and early ranching history to its
              connection with Hollywood, Toluca Lake has evolved into a neighborhood known
              for its strong sense of identity, community, and local character.
            </p>
            <p>
              Explore the timeline below to learn more about the people, places, and events
              that helped shape Toluca Lake into the community it is today.
            </p>
          </Reveal>

          <div className="relative mt-12 ml-3 border-l-2 border-brand-100 pl-8">
            {timeline.map((t, i) => (
              <Reveal key={i} delay={i * 0.04} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[42px] flex h-7 w-7 items-center justify-center rounded-full border-2 border-brand-200 bg-surface">
                  <span className="h-2.5 w-2.5 rounded-full bg-brand-500" />
                </span>
                <span className="font-display text-sm font-bold uppercase tracking-wide text-brand-500">{t.year}</span>
                <h3 className="mt-1 font-display text-xl font-semibold text-brand-900">{t.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{t.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
