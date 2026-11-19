import type { ReactNode } from 'react';
import {
  classTypes,
  LEVEL_LABELS,
  type ClassFormat,
  type ClassType,
} from '../content/classes';
import { MatFormatArt, ReformerFormatArt } from './artwork';
import { SiteLink } from './site-link';
import { SpringGauge } from './spring-gauge';

function ClassLabelCard({ item, index }: { item: ClassType; index: number }) {
  return (
    <article className="border-t border-ink/35 pt-6 pb-8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="mono-label text-muted">
            {String(index + 1).padStart(2, '0')} · {LEVEL_LABELS[item.level]}
          </p>
          <h3 className="mt-2 font-display text-[2rem] leading-tight text-ink">
            {item.name}
          </h3>
        </div>
        <SpringGauge springs={item.springs} showLabel className="mt-1" />
      </div>

      <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{item.summary}</p>

      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-y border-line py-3 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
        <div>
          <dt className="inline text-muted">Duration: </dt>
          <dd className="m-0 inline text-ink">{item.durationMinutes} min</dd>
        </div>
        <div>
          <dt className="inline text-muted">Capacity: </dt>
          <dd className="m-0 inline text-ink">Max {item.capacity}</dd>
        </div>
        <div>
          <dt className="inline text-muted">Level: </dt>
          <dd className="m-0 inline text-ink">{LEVEL_LABELS[item.level]}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <p className="mono-label text-muted">Good for</p>
        <ul className="mt-2 space-y-1.5 pl-4 text-sm text-ink marker:text-brass list-disc">
          {item.goodFor.map(entry => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function ClassTypesMuseumGrid({
  reformerHeading,
  reformerIntro,
  matHeading,
  matIntro,
}: {
  reformerHeading: ReactNode;
  reformerIntro: ReactNode;
  matHeading: ReactNode;
  matIntro: ReactNode;
}) {
  const byFormat = (format: ClassFormat) => classTypes.filter(item => item.format === format);

  return (
    <section className="wrap py-12 md:py-16">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-6 flex items-end justify-between gap-4 border-b-[1.5px] border-brass pb-4">
            <div>
              <p className="eyebrow">Apparatus · max 8</p>
              <h2 className="mt-1 font-display text-[clamp(3rem,5vw,4.5rem)] leading-[0.9] text-ink">
                {reformerHeading}
              </h2>
            </div>
            <ReformerFormatArt className="hidden w-32 text-ink sm:block" />
          </div>
          <p className="mb-8 text-muted">{reformerIntro}</p>
          <div>
            {byFormat('reformer').map((item, idx) => (
              <ClassLabelCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-end justify-between gap-4 border-b-[1.5px] border-brass pb-4">
            <div>
              <p className="eyebrow">Floorwork · max 12</p>
              <h2 className="mt-1 font-display text-[clamp(3rem,5vw,4.5rem)] leading-[0.9] text-ink">
                {matHeading}
              </h2>
            </div>
            <MatFormatArt className="hidden w-32 text-ink sm:block" />
          </div>
          <p className="mb-8 text-muted">{matIntro}</p>
          <div>
            {byFormat('mat').map((item, idx) => (
              <ClassLabelCard key={item.id} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function LevelsPullQuote({
  quote,
  note,
  ctaLabel,
}: {
  quote: ReactNode;
  note: ReactNode;
  ctaLabel: ReactNode;
}) {
  return (
    <section className="wrap py-14 md:py-20">
      <div className="border-l-[2px] border-brass bg-surface p-8 sm:p-12 md:grid md:grid-cols-12 md:items-center md:gap-10">
        <div className="md:col-span-8">
          <p className="eyebrow">A note on levels</p>
          <blockquote className="m-0 mt-4 font-display text-[clamp(2rem,4vw,3.1rem)] leading-[1.08] text-ink">
            {quote}
          </blockquote>
          <p className="mt-4 max-w-(--measure) text-muted">{note}</p>
        </div>
        <div className="mt-6 md:col-span-4 md:mt-0 md:justify-self-end">
          <SiteLink href="/first-class/" className="button">
            {ctaLabel}
          </SiteLink>
        </div>
      </div>
    </section>
  );
}
