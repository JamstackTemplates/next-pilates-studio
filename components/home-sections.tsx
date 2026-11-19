import type { ReactNode } from 'react';
import { business } from '../content/business';
import { classTypeById } from '../content/classes';
import { formatGBP, perClassGBP, type Pack } from '../content/packs';
import { teachers } from '../content/teachers';
import { mapSearchUrl } from '../lib/maps';
import { asset } from '../lib/paths';
import {
  CoilDivider,
  MatFormatArt,
  PlinthTorsoArt,
  PrincipleGlyph,
  ReformerFormatArt,
  StudioIcon,
  TeacherPortrait,
} from './artwork';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type ChildrenProps = { children: ReactNode };

/* ---------------------------------------------------------------------------
   1. Hero — a gallery photograph: a plaster figure in long stretch on a
      reformer before an arched niche. At xl the heading is set into the empty
      plaster wall on the left; below xl the text sits above the image, and on
      phones the image is cropped to the reformer and figure.
      The Long Line rides the gallery floor seam out from under the reformer,
      then turns down the gutter into the sections below.
   --------------------------------------------------------------------------- */

/** Where the photographs' floor seam and the reformer's left leg sit (fractions of the image). */
const HERO_FLOOR_Y = '83.4%';
const HERO_REFORMER_X = '36.2%';

function HomeHeroRoot({
  eyebrow,
  heading,
  lead,
  imageAlt,
  caption,
  primaryAction,
  secondaryAction,
}: {
  eyebrow: ReactNode;
  heading: ReactNode;
  lead: ReactNode;
  /** Alt text for the hero photograph. */
  imageAlt: string;
  /** Small museum-style caption on the gallery floor. */
  caption: ReactNode;
  primaryAction: ReactNode;
  secondaryAction: ReactNode;
}) {
  return (
    <section className="hero-stage relative overflow-x-clip">
      {/* Text layer: above the image below xl, set into the plaster wall at xl */}
      <div className="wrap relative z-10 pt-8 sm:pt-12 xl:absolute xl:inset-x-0 xl:top-0 xl:pt-[clamp(3rem,4.5vw,5.5rem)]">
        <div className="xl:max-w-[min(44vw,40rem)]">
          <div className="flex items-center gap-3">
            <span className="inline-block h-[1.5px] w-10 bg-brass" aria-hidden="true" />
            <p className="eyebrow">{eyebrow}</p>
          </div>

          <h1 className="display-hero mt-5 text-ink sm:mt-7">{heading}</h1>

          <p className="mt-6 max-w-[34ch] text-[1.05rem] leading-relaxed text-muted sm:text-[1.12rem] md:mt-9">
            {lead}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4 md:mt-10 xl:flex-col xl:items-start xl:gap-y-6">
            {primaryAction}
            {secondaryAction}
          </div>
        </div>
      </div>

      {/* The photograph, full bleed */}
      <figure className="relative m-0 mt-8 xl:mt-0">
        <div className="hero-photo relative aspect-[6/5] sm:aspect-[3/2] xl:aspect-[2752/1536]">
          <img
            src={asset('/hero-light.webp')}
            alt={imageAlt}
            width={2752}
            height={1536}
            fetchPriority="high"
            decoding="async"
            className="hero-img-light absolute inset-0 h-full w-full object-cover object-[91%_100%] xl:object-center"
          />
          <img
            src={asset('/hero-dark.webp')}
            alt={imageAlt}
            width={2752}
            height={1536}
            decoding="async"
            className="hero-img-dark absolute inset-0 h-full w-full object-cover object-[91%_100%] xl:object-center"
          />
        </div>

        {/* The Long Line along the floor seam: gutter → under the reformer (xl, where the image is uncropped) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden xl:block">
          <div
            className="hero-line-x absolute h-[1.5px] bg-brass"
            style={{
              top: HERO_FLOOR_Y,
              left: 'calc((100% - min(100% - 2.25rem, 80rem)) / 2)',
              right: `calc(100% - ${HERO_REFORMER_X})`,
            }}
          />
          <div
            className="hero-line-y absolute bottom-0 w-[1.5px] bg-brass"
            style={{ top: HERO_FLOOR_Y, left: 'calc((100% - min(100% - 2.25rem, 80rem)) / 2)' }}
          />
          <span
            className="absolute -mt-[3.5px] -ml-[3.5px] h-2 w-2 rounded-full bg-brass"
            style={{ top: HERO_FLOOR_Y, left: 'calc((100% - min(100% - 2.25rem, 80rem)) / 2 + 0.75px)' }}
          />
        </div>

        <figcaption className="wrap mt-4 text-right font-mono text-[0.66rem] uppercase tracking-[0.2em] text-muted xl:absolute xl:inset-x-0 xl:bottom-[5%] xl:mt-0">
          {caption}
        </figcaption>
      </figure>
    </section>
  );
}

function HeroPrimaryAction({ children }: ChildrenProps) {
  return (
    <SiteLink href="/first-class/" className="button button-lg">
      {children}
    </SiteLink>
  );
}

function HeroSecondaryAction({ children }: ChildrenProps) {
  return (
    <SiteLink href="/classes/" className="text-link font-mono text-xs uppercase tracking-[0.14em]">
      {children}
    </SiteLink>
  );
}

export const HomeHero = Object.assign(HomeHeroRoot, {
  PrimaryAction: HeroPrimaryAction,
  SecondaryAction: HeroSecondaryAction,
});

/* ---------------------------------------------------------------------------
   2. Two ways to work — two plaster plinths of different heights standing on
      one gallery floor, each with its object set on top like a sculpture.
   --------------------------------------------------------------------------- */
function TwoWaysRoot({ children }: ChildrenProps) {
  return (
    <div className="relative">
      <div className="grid items-end gap-14 md:grid-cols-12 md:gap-x-8 md:gap-y-0">{children}</div>
      {/* Shared gallery floor */}
      <div aria-hidden="true" className="relative hidden md:block">
        <div className="h-px w-full bg-line" />
        <div className="ml-6 h-3 w-[calc(100%-3rem)] bg-surface/80" />
      </div>
    </div>
  );
}

function TwoWaysPlinth({
  format,
  tall = false,
  title,
  specs,
  children,
}: {
  format: 'reformer' | 'mat';
  /** The taller plinth stands higher on the floor. */
  tall?: boolean;
  title: ReactNode;
  specs: readonly { label: string; value: string }[];
  children: ReactNode;
}) {
  return (
    <article className={tall ? 'md:col-span-5' : 'md:col-span-7'}>
      {/* The object, standing on the plinth */}
      <div className={`px-4 ${tall ? 'md:px-8' : 'md:px-10'}`}>
        {format === 'reformer' ? (
          <ReformerFormatArt className="block w-full text-ink" />
        ) : (
          <MatFormatArt className="mx-auto block w-full max-w-[22rem] text-ink" />
        )}
      </div>

      {/* Plinth: projecting cap, cast body, engraved label */}
      <div className="h-3 border border-line bg-raised" aria-hidden="true" />
      <div
        className={`plaster-cast mx-2 border-x border-b border-line bg-surface px-6 pb-8 sm:px-9 ${
          tall ? 'pt-10 md:min-h-[30rem] md:pt-16' : 'pt-8 md:min-h-[22rem]'
        }`}
      >
        <h3 className="font-display text-[clamp(2.6rem,4vw,3.6rem)] leading-[0.9] text-ink">{title}</h3>
        <div className="mt-5 max-w-[42ch] text-[0.98rem] leading-relaxed text-muted">{children}</div>
        <dl className="mt-8 border-t border-line font-mono text-[0.7rem] uppercase tracking-[0.13em]">
          {specs.map(spec => (
            <div key={spec.label} className="flex items-baseline justify-between gap-4 border-b border-line/70 py-2.5">
              <dt className="text-muted">{spec.label}</dt>
              <dd className="m-0 text-right text-ink">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}

export const TwoWays = Object.assign(TwoWaysRoot, {
  Plinth: TwoWaysPlinth,
});

/* ---------------------------------------------------------------------------
   3. Principles — four huge Italiana numerals standing on one brass rail,
      with the Plinth torso at the end of the row. Snap-scrolls on mobile.
   --------------------------------------------------------------------------- */
function PrinciplesRoot({ children }: ChildrenProps) {
  return (
    <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-x-10">
      <ol className="m-0 -mx-[1.125rem] flex min-w-0 snap-x snap-mandatory list-none overflow-x-auto px-[1.125rem] pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-y-16 md:overflow-visible md:px-0 md:pb-0 lg:col-span-9 xl:grid-cols-4 xl:gap-y-0">
        {children}
      </ol>
      <div className="flex justify-center lg:col-span-3 lg:justify-end">
        <PlinthTorsoArt className="w-56 text-ink lg:w-full lg:max-w-[17rem]" />
      </div>
    </div>
  );
}

function PrincipleItem({
  number,
  glyph,
  title,
  children,
}: {
  number: string;
  glyph: 'breath' | 'centre' | 'control' | 'length';
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="w-[76vw] max-w-[20rem] shrink-0 snap-start pr-6 md:w-auto md:max-w-none md:pr-8">
      <div className="flex items-end justify-between gap-3 border-b-[1.5px] border-brass">
        <span
          className="font-display text-[clamp(7rem,11vw,10.5rem)] leading-[0.74] tracking-[-0.04em] text-ink"
          aria-hidden="true"
        >
          {number}
        </span>
        <PrincipleGlyph kind={glyph} className="mb-3 h-12 w-12 text-ink" />
      </div>
      <h3 className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-ink">
        <span className="visually-hidden">{number}. </span>
        {title}
      </h3>
      <p className="mt-3 text-[0.96rem] leading-relaxed text-muted">{children}</p>
    </li>
  );
}

export const Principles = Object.assign(PrinciplesRoot, {
  Item: PrincipleItem,
});

/* ---------------------------------------------------------------------------
   4. Featured packs — a stretched spring, then three plaster price tags
      hung from a brass rail on straps of different lengths.
   --------------------------------------------------------------------------- */
export function FeaturedPacksRail({
  featuredPacks,
  ctaLabel,
}: {
  featuredPacks: readonly Pack[];
  ctaLabel: ReactNode;
}) {
  const strapLengths = ['md:h-10', 'md:h-24', 'md:h-14'] as const;
  const tilts = ['md:tag-tilt-1', 'md:tag-tilt-2', 'md:tag-tilt-3'] as const;

  return (
    <div>
      <CoilDivider className="text-ink" />

      <div className="relative mt-16">
        {/* Brass hanging rail, bleeding right */}
        <div
          aria-hidden="true"
          className="hidden h-[1.5px] bg-brass md:block"
          style={{ width: 'calc(100% + (100vw - 100%) / 2)' }}
        />

        <div className="grid items-start gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
          {featuredPacks.map((pack, index) => {
            const perClass = perClassGBP(pack);
            const kindLabel =
              pack.kind === 'intro'
                ? 'New clients only'
                : pack.kind === 'membership'
                  ? 'Monthly membership'
                  : 'Class pack';

            return (
              <div key={pack.id} className="flex flex-col items-center">
                {/* Strap: bolt on the rail, V-string to the eyelet */}
                <div aria-hidden="true" className="hidden flex-col items-center md:flex">
                  <span className="-mt-[4px] h-[7px] w-[7px] rounded-full bg-brass" />
                  <span className={`w-[1.5px] bg-brass ${strapLengths[index % strapLengths.length]}`} />
                </div>

                <div className={`w-full drop-shadow-[0_18px_22px_rgb(34_32_28/0.14)] ${tilts[index % tilts.length]}`}>
                  <article className="price-tag relative flex flex-col bg-raised px-7 pt-10 pb-7">
                    <span
                      aria-hidden="true"
                      className="absolute top-4 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full border-[1.5px] border-brass bg-bg"
                    />
                    <p className="mono-label text-center text-muted">{kindLabel}</p>
                    <h3 className="mt-3 text-center font-display text-[2.6rem] leading-[0.95] text-ink">
                      {pack.name}
                    </h3>
                    <div className="mt-6 border-y border-line py-5 text-center">
                      <p className="font-mono text-[2.4rem] leading-none font-medium text-ink tabular-nums">
                        {formatGBP(pack.priceGBP)}
                      </p>
                      {perClass !== null ? (
                        <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted tabular-nums">
                          {formatGBP(perClass)} a class
                        </p>
                      ) : null}
                    </div>
                    <p className="mt-5 text-sm leading-relaxed text-muted">{pack.note}</p>
                    <p className="mt-5 border-t border-dashed border-line pt-4 font-mono text-[0.66rem] uppercase tracking-[0.13em] text-muted">
                      Valid {pack.validDays} days ·{' '}
                      {pack.appliesTo === 'any' ? 'Reformer & mat' : `${pack.appliesTo} only`}
                    </p>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-14">
        <SiteLink href="/packs/" className="text-link font-mono text-xs uppercase tracking-[0.14em]">
          {ctaLabel}
        </SiteLink>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   5. Teachers — three portraits on plaster ovals at staggered heights
   --------------------------------------------------------------------------- */
export function TeachersSection() {
  const offsets = ['md:mt-0', 'md:mt-28', 'md:mt-12'] as const;

  return (
    <div className="grid items-start gap-16 md:grid-cols-3 md:gap-10 lg:gap-14">
      {teachers.map((teacher, idx) => (
        <article key={teacher.id} className={offsets[idx % offsets.length]}>
          <TeacherPortrait id={teacher.id} name={teacher.name} className="w-full max-w-[19rem] text-ink" />
          <p className="mt-6 mono-label text-muted">{teacher.role}</p>
          <h3 className="mt-3 font-display text-[clamp(2.4rem,3.6vw,3.25rem)] leading-[0.92] text-ink">
            {teacher.name}
          </h3>
          <p className="mt-5 text-[0.96rem] leading-relaxed text-muted">{teacher.bio}</p>
          <p className="mt-5 border-t-[1.5px] border-brass pt-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
            Leads:{' '}
            {teacher.teaches
              .map(id => classTypeById.get(id)?.name)
              .filter(Boolean)
              .join(' · ')}
          </p>
        </article>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   6. Visit — the gallery after dark. The Long Line drops into the band and
      ends at the address; a brass arch frames the hours.
   --------------------------------------------------------------------------- */
export function VisitBand({
  eyebrow,
  title,
  enquireLabel,
  mapLabel,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  enquireLabel: ReactNode;
  mapLabel: ReactNode;
}) {
  return (
    <section aria-labelledby="visit-title" className="relative overflow-hidden bg-band text-band-ink">
      <div className="wrap relative grid gap-14 pt-[clamp(4.5rem,9vw,8rem)] pb-[clamp(4.5rem,9vw,8rem)] lg:grid-cols-12 lg:gap-x-10">
        {/* Long Line: final drop from the section above, ending at the eyebrow */}
        <div aria-hidden="true" className="absolute top-0 left-0 hidden h-[clamp(5rem,9.6vw,8.6rem)] w-[1.5px] bg-brass md:block" />
        <span
          aria-hidden="true"
          className="absolute top-[clamp(5rem,9.6vw,8.6rem)] -left-[4px] hidden h-[9px] w-[9px] rounded-full bg-brass md:block"
        />

        <div className="lg:col-span-7 md:pl-8">
          <div className="flex items-center gap-3">
            <span className="inline-block h-[1.5px] w-10 bg-brass" aria-hidden="true" />
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-band-muted">{eyebrow}</p>
          </div>

          <h2 id="visit-title" className="mt-8 font-display text-[clamp(2.9rem,5.6vw,5.6rem)] leading-[0.9] tracking-[-0.025em] text-band-ink">
            {title}
          </h2>

          <p className="mt-8 max-w-md text-[1.02rem] text-band-muted">{business.address.landmark}</p>

          <p className="mt-4 flex items-start gap-2.5 text-sm text-band-muted">
            <StudioIcon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-band-ink" />
            <span>{business.address.directions}</span>
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
            <SiteLink href="/contact/" className="button button-on-band button-lg">
              {enquireLabel}
            </SiteLink>
            <a
              href={mapSearchUrl(business.address.formatted)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs uppercase tracking-[0.14em] text-band-ink underline decoration-brass decoration-[1.5px] underline-offset-[0.4em] hover:decoration-band-ink"
            >
              {mapLabel}
            </a>
          </div>
        </div>

        {/* Hours, framed in a brass gallery arch */}
        <div className="relative lg:col-span-5">
          <div className="visit-arch relative border-[1.5px] border-b-0 border-brass/70 px-7 pt-[clamp(6rem,12vw,9rem)] pb-8 sm:px-10">
            <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-band-muted">Studio hours</p>

            <dl className="mt-6 border-t border-band-line font-mono text-xs uppercase tracking-[0.13em]">
              {business.hoursSummary.map(row => (
                <div key={row.label} className="flex items-center justify-between border-b border-band-line py-3.5">
                  <dt className="text-band-muted">{row.label}</dt>
                  <dd className="m-0 text-band-ink tabular-nums">{row.hours}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-col items-center text-center">
              <OpenBadge hours={business.openingHours} onDark />
              <TimeZoneNote className="text-band-muted" />
            </div>
          </div>
          <div aria-hidden="true" className="h-[1.5px] w-full bg-brass/70" />
        </div>
      </div>
    </section>
  );
}
