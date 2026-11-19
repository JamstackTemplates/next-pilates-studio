import type { Metadata } from 'next';
import { business } from '../content/business';
import { lowestPerClassGBP, packs } from '../content/packs';
import {
  FeaturedPacksRail,
  HomeHero,
  Principles,
  TeachersSection,
  TwoWays,
  VisitBand,
} from '../components/home-sections';
import { LongLineSection } from '../components/long-line-section';
import { SiteLink } from '../components/site-link';
import { WeekGlanceList } from '../components/week-glance-list';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  const lowestAny = lowestPerClassGBP(packs);
  const lowestReformer = lowestPerClassGBP(packs, { includesReformer: true });
  const featuredPacks = packs.filter(pack => pack.featured && pack.available);

  return (
    <>
      <HomeHero
        eyebrow="Primrose Hill · London"
        heading={
          <>
            Length,
            <br />
            slowly built.
          </>
        }
        lead="Small-group reformer and mat Pilates at the foot of Primrose Hill. Eight reformers, twelve mats, unhurried teaching."
        imageAlt="A plaster figure holding a long stretch on a pale ash reformer, hands on the brass footbar, in front of an arched plaster niche."
        caption="Fig. 1 — Long stretch, reformer"
        primaryAction={<HomeHero.PrimaryAction>Plan your first class</HomeHero.PrimaryAction>}
        secondaryAction={<HomeHero.SecondaryAction>See this week&apos;s classes</HomeHero.SecondaryAction>}
      />

      <LongLineSection
        stop="01"
        label="Two ways"
        layout="stack"
        title="Two ways to work"
        intro="Every class in the studio happens on one of two things: a sprung reformer or a mat on the floor. Both teach the same method."
      >
        <TwoWays>
          <TwoWays.Plinth
            format="reformer"
            title="Reformer"
            specs={[
              { label: 'Resistance', value: 'Spring tension (1–4)' },
              { label: 'Room size', value: 'Max 8 reformers' },
              { label: 'Session length', value: '50–55 minutes' },
            ]}
          >
            <p>
              A moving carriage on brushed-steel springs that both supports your joints and challenges control through long, smooth ranges of motion.
            </p>
          </TwoWays.Plinth>

          <TwoWays.Plinth
            format="mat"
            tall
            title="Mat"
            specs={[
              { label: 'Resistance', value: 'Bodyweight & small props' },
              { label: 'Room size', value: 'Max 12 mats' },
              { label: 'Session length', value: '45–50 minutes' },
            ]}
          >
            <p>
              Quiet, grounded floorwork using gravity, breath and simple props. Ideal for learning alignment from first principles and building a practice you carry home.
            </p>
          </TwoWays.Plinth>
        </TwoWays>
      </LongLineSection>

      <LongLineSection
        stop="02"
        label="Principles"
        layout="stack"
        tone="cast"
        title="The method in four principles"
        intro="Four ideas sit under every exercise, from your first Foundations class to Advanced Reformer."
      >
        <Principles>
          <Principles.Item number="1" glyph="breath" title="Breath">
            Wide, unhurried rib-cage breathing sets the tempo of every sequence and releases unnecessary neck and jaw tension.
          </Principles.Item>
          <Principles.Item number="2" glyph="centre" title="Centre">
            Movement starts from steady pelvic and trunk support rather than momentum, protecting stiff lower backs under load.
          </Principles.Item>
          <Principles.Item number="3" glyph="control" title="Control">
            Slow springs ask more of deep stabilisers than heavy rushing ever does; every return of the carriage matters as much as the press.
          </Principles.Item>
          <Principles.Item number="4" glyph="length" title="Length">
            Strength is built at full, supported extension so you leave taller, looser across the shoulders and calmer in your stride.
          </Principles.Item>
        </Principles>
      </LongLineSection>

      <LongLineSection
        stop="03"
        label="This week"
        title="This week at a glance"
        intro={
          <>
            <p>
              Every class is small enough for individual spring adjustments and clear verbal cues. Start with Foundations if you are new to the reformer.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4">
              <SiteLink href="/classes/" className="text-link font-mono text-xs uppercase tracking-[0.14em]">
                See the full weekly timetable
              </SiteLink>
              <SiteLink
                href="/classes/?level=foundations"
                className="text-link font-mono text-xs uppercase tracking-[0.14em]"
              >
                Filter to Foundations classes
              </SiteLink>
            </div>
          </>
        }
      >
        <WeekGlanceList />
      </LongLineSection>

      <LongLineSection
        stop="04"
        label="Packs"
        layout="stack"
        title={`Packs from £${lowestAny} a class`}
        intro={`Mat packs from £${lowestAny} a class; reformer and all-access memberships from £${lowestReformer} a class. New clients begin with Intro Three — arranged at the studio or by email reply, with no payment taken online.`}
      >
        <FeaturedPacksRail
          featuredPacks={featuredPacks}
          ctaLabel="View all packs, memberships & private sessions"
        />
      </LongLineSection>

      <LongLineSection
        stop="05"
        label="Teachers"
        layout="stack"
        title="Three teachers, one calm room"
        intro="You'll work with the same small teaching team week to week, so we remember your spring settings, your goals and any injuries you are managing."
      >
        <TeachersSection />
      </LongLineSection>

      <VisitBand
        eyebrow="06 · Visit the studio"
        title={
          <>
            {business.address.streetAddress}
            <br />
            {business.address.addressLocality} {business.address.postalCode}
          </>
        }
        enquireLabel="Enquire about a class"
        mapLabel="Open in Google Maps"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
