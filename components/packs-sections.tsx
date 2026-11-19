import type { ReactNode } from 'react';
import { formatGBP, perClassGBP, type Pack } from '../content/packs';
import { PlinthTorsoArt } from './artwork';
import { SiteLink } from './site-link';

export function IntroOfferTag({
  pack,
  eyebrow,
  ctaLabel,
}: {
  pack: Pack;
  eyebrow: ReactNode;
  ctaLabel: ReactNode;
}) {
  const perClass = perClassGBP(pack);
  const unavailable = !pack.available;

  return (
    <section className="wrap py-10 md:py-16">
      <div className="grid items-start gap-8 md:grid-cols-12">
        <div className="md:col-span-7">
          {/* Hanging brass rail + straps */}
          <div aria-hidden="true" className="flex flex-col items-start">
            <div className="h-[1.5px] w-full bg-brass" />
            <div className="flex w-full justify-around px-16">
              <div className="flex flex-col items-center">
                <span className="-mt-[4px] h-[7px] w-[7px] rounded-full bg-brass" />
                <span className="h-7 w-[1.5px] bg-brass" />
              </div>
              <div className="flex flex-col items-center">
                <span className="-mt-[4px] h-[7px] w-[7px] rounded-full bg-brass" />
                <span className="h-7 w-[1.5px] bg-brass" />
              </div>
            </div>
          </div>

          <article
            className={`plaster-cast border border-line bg-raised p-8 sm:p-10 ${
              unavailable ? 'opacity-65' : ''
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="eyebrow">{eyebrow}</p>
              <span className="border border-line bg-surface px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink">
                {unavailable ? 'Not currently offered' : 'New clients only'}
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-baseline justify-between gap-4 border-b border-line pb-6">
              <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-ink">
                {pack.name}
              </h2>
              <div className="text-right">
                <p className="font-mono text-3xl font-medium text-ink tabular-nums">
                  {formatGBP(pack.priceGBP)}
                </p>
                {perClass !== null ? (
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-muted tabular-nums">
                    {formatGBP(perClass)} per class
                  </p>
                ) : null}
              </div>
            </div>

            <p className="mt-5 max-w-lg text-[1.02rem] leading-relaxed text-muted">
              {pack.note}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted">
                {pack.classes} classes · Valid {pack.validDays} days · Reformer or mat
              </p>
              <SiteLink href="/contact/" className="button">
                {ctaLabel}
              </SiteLink>
            </div>
          </article>
        </div>

        <aside className="md:col-span-5 md:pt-10 md:pl-4">
          <p className="eyebrow">How packs work</p>
          <p className="mt-3 text-[0.98rem] leading-relaxed text-muted">
            No payment is taken on this website. Packs and memberships are arranged at the studio desk before your session, or by email reply when we arrange your place.
          </p>
          <p className="mt-3 text-sm text-muted">
            Unsure whether to start with Intro Three or a single Foundations drop-in? Ask in your enquiry and we&apos;ll recommend the best fit.
          </p>
        </aside>
      </div>
    </section>
  );
}

function PackPriceTable({
  caption,
  heading,
  items,
}: {
  caption: string;
  heading: string;
  items: readonly Pack[];
}) {
  return (
    <div>
      <h3 className="font-display text-[2rem] leading-none text-ink">{heading}</h3>
      <table className="mt-5 w-full border-collapse border-t border-ink/35">
        <caption className="visually-hidden">{caption}</caption>
        <thead>
          <tr className="border-b border-line font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted">
            <th scope="col" className="py-3 text-left font-normal">Pack</th>
            <th scope="col" className="py-3 text-right font-normal">Validity</th>
            <th scope="col" className="py-3 text-right font-normal">Price</th>
            <th scope="col" className="py-3 text-right font-normal">Per class</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {items.map(pack => {
            const perClass = perClassGBP(pack);
            const unavailable = !pack.available;
            return (
              <tr key={pack.id} className={unavailable ? 'opacity-60' : ''}>
                <th scope="row" className="py-4 pr-3 text-left font-normal">
                  <span className="block text-[0.98rem] font-medium text-ink">{pack.name}</span>
                  <span className="mt-0.5 block text-xs text-muted">{pack.note}</span>
                  {unavailable ? (
                    <span className="mt-1 inline-block font-mono text-[0.66rem] uppercase tracking-[0.11em] text-muted">
                      Not currently offered
                    </span>
                  ) : null}
                </th>
                <td className="py-4 pl-2 text-right font-mono text-xs text-muted tabular-nums whitespace-nowrap">
                  {pack.validDays}d
                </td>
                <td className="py-4 pl-3 text-right font-mono text-sm font-medium text-ink tabular-nums whitespace-nowrap">
                  {formatGBP(pack.priceGBP)}
                </td>
                <td className="py-4 pl-3 text-right font-mono text-xs text-muted tabular-nums whitespace-nowrap">
                  {perClass !== null ? formatGBP(perClass) : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function ClassPacksTables({
  heading,
  reformerPacks,
  matPacks,
}: {
  heading: ReactNode;
  reformerPacks: readonly Pack[];
  matPacks: readonly Pack[];
}) {
  return (
    <section className="wrap border-t border-line py-14 md:py-18">
      <p className="eyebrow">Class packs</p>
      <h2 className="title-section mt-4 text-ink">
        {heading}
      </h2>

      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-14">
        <PackPriceTable
          caption="Reformer class pack prices in GBP"
          heading="Reformer"
          items={reformerPacks}
        />
        <PackPriceTable
          caption="Mat class pack prices in GBP"
          heading="Mat"
          items={matPacks}
        />
      </div>
    </section>
  );
}

export function MembershipsSection({
  heading,
  intro,
  memberships,
}: {
  heading: ReactNode;
  intro: ReactNode;
  memberships: readonly Pack[];
}) {
  return (
    <section className="wrap border-t border-line py-14 md:py-18">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Memberships</p>
          <h2 className="title-section mt-4 text-ink">
            {heading}
          </h2>
          <p className="mt-4 text-muted">{intro}</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:col-span-8">
          {memberships.map(pack => {
            const perClass = perClassGBP(pack);
            const unavailable = !pack.available;
            return (
              <article
                key={pack.id}
                className={`flex flex-col justify-between border border-line bg-surface p-7 ${
                  unavailable ? 'opacity-60' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="mono-label text-muted">Reformer &amp; Mat</span>
                    <span className="h-2 w-2 rounded-full bg-brass" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-display text-[2.1rem] leading-tight text-ink">
                    {pack.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-3 border-y border-line py-4">
                    <span className="font-mono text-2xl font-medium text-ink tabular-nums">
                      {formatGBP(pack.priceGBP)}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-muted">
                      / {pack.validDays} days
                    </span>
                  </div>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.1em] text-ink tabular-nums">
                    {perClass !== null ? `${formatGBP(perClass)} per class` : 'Unlimited (one class per day)'}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{pack.note}</p>
                  {unavailable ? (
                    <p className="mt-3 font-mono text-xs uppercase tracking-[0.11em] text-muted">
                      Not currently offered
                    </p>
                  ) : null}
                </div>

                <p className="mt-6 border-t border-line pt-4 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                  Rolling 30 days · Pause for injury or pregnancy
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function PrivateSessionsSection({
  heading,
  intro,
  privates,
}: {
  heading: ReactNode;
  intro: ReactNode;
  privates: readonly Pack[];
}) {
  return (
    <section className="wrap border-t border-line py-14 md:py-18">
      <div className="grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="eyebrow">One-to-one &amp; duet</p>
          <h2 className="title-section mt-4 text-ink">
            {heading}
          </h2>
          <p className="mt-4 max-w-(--measure) text-muted">{intro}</p>

          <ul className="m-0 mt-8 list-none divide-y divide-line border-y border-line p-0">
            {privates.map(pack => {
              const unavailable = !pack.available;
              return (
                <li
                  key={pack.id}
                  className={`flex flex-wrap items-baseline justify-between gap-4 py-5 ${
                    unavailable ? 'opacity-60' : ''
                  }`}
                >
                  <div className="max-w-md">
                    <h3 className="font-display text-2xl text-ink">{pack.name}</h3>
                    <p className="mt-1 text-sm text-muted">{pack.note}</p>
                    {unavailable ? (
                      <p className="mt-1 font-mono text-xs uppercase tracking-[0.11em] text-muted">
                        Not currently offered
                      </p>
                    ) : null}
                  </div>
                  <div className="text-right font-mono">
                    <p className="text-xl font-medium text-ink tabular-nums">
                      {formatGBP(pack.priceGBP)}
                    </p>
                    <p className="text-[0.68rem] uppercase tracking-[0.12em] text-muted">
                      Valid {pack.validDays} days
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex justify-center md:col-span-5 md:justify-end">
          <PlinthTorsoArt className="w-56 text-ink md:w-64" />
        </div>
      </div>
    </section>
  );
}

export function StudioPolicies({
  heading,
  items,
}: {
  heading: ReactNode;
  items: readonly { title: string; body: ReactNode }[];
}) {
  return (
    <section className="wrap border-t border-line py-14 md:py-18" aria-labelledby="policies-heading">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Studio policies</p>
          <h2
            id="policies-heading"
            className="title-section mt-4 text-ink"
          >
            {heading}
          </h2>
        </div>

        <div className="md:col-span-8">
          {items.map(item => (
            <details key={item.title} className="studio-disclosure">
              <summary>{item.title}</summary>
              <div className="studio-disclosure-body">{item.body}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
