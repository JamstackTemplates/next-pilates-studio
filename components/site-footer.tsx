import { business } from '../content/business';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

export function SiteFooter() {
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <footer className="relative overflow-x-clip bg-bg pt-[clamp(4rem,8vw,7rem)]">
      <div className="wrap grid gap-12 md:grid-cols-12 md:gap-x-10">
        {/* Column 1: Wordmark & landmark */}
        <div className="md:col-span-4">
          <SiteLink href="/" className="inline-flex flex-col leading-none no-underline">
            <span className="font-display text-[2.4rem] text-ink">Long Line</span>
            <span className="mt-2 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.26em] text-muted">
              <span className="inline-block h-[1.5px] w-5 bg-brass" aria-hidden="true" />
              Pilates · Primrose Hill
            </span>
          </SiteLink>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
            {business.address.landmark} Eight reformers, twelve mats, unhurried teaching.
          </p>
        </div>

        {/* Column 2: Address & hours */}
        <div className="md:col-span-4">
          <p className="eyebrow">Studio &amp; hours</p>
          <address className="mt-4 not-italic text-sm leading-relaxed text-ink">
            {business.address.streetAddress}
            <br />
            {business.address.addressLocality} {business.address.postalCode}
          </address>
          <p className="mt-2 text-xs text-muted">{business.address.directions}</p>

          <dl className="mt-5 grid grid-cols-[5.5rem_1fr] gap-y-1.5 font-mono text-xs uppercase tracking-[0.1em]">
            {business.hoursSummary.map(row => (
              <div key={row.label} className="contents">
                <dt className="text-muted">{row.label}</dt>
                <dd className="m-0 text-ink tabular-nums">{row.hours}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-4">
            <OpenBadge hours={business.openingHours} />
            <TimeZoneNote />
          </div>
        </div>

        {/* Column 3: Direct contact & routes */}
        <div className="md:col-span-4">
          <p className="eyebrow">Direct</p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <a className="text-link wrap-anywhere w-fit" href={`mailto:${business.email}`}>
              {business.email}
            </a>
            <a className="text-link w-fit font-mono text-xs tracking-[0.08em]" href={telHref}>
              {business.phone}
            </a>
            <p className="mt-1 text-xs text-muted">
              Phone calls are welcome during studio hours. All spaces and packs are arranged by reply or at the desk.
            </p>
          </div>

          <nav aria-label="Footer" className="mt-6">
            <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 font-mono text-[0.72rem] uppercase tracking-[0.12em]">
              <li><SiteLink href="/classes/" className="text-ink no-underline hover:underline">Classes</SiteLink></li>
              <li><SiteLink href="/packs/" className="text-ink no-underline hover:underline">Packs</SiteLink></li>
              <li><SiteLink href="/first-class/" className="text-ink no-underline hover:underline">First class</SiteLink></li>
              <li><SiteLink href="/contact/" className="text-ink no-underline hover:underline">Contact</SiteLink></li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Closing gesture: the name, cut from plaster, standing on the Long Line */}
      <div aria-hidden="true" className="wrap relative mt-[clamp(4rem,8vw,7rem)]">
        <p className="relief-numeral m-0 -mb-[0.06em] text-[clamp(5rem,20.5vw,19rem)] leading-[0.78] whitespace-nowrap">
          Long Line
        </p>
      </div>
      <div aria-hidden="true" className="h-[1.5px] w-full bg-brass" />

      <div className="wrap flex flex-wrap items-center justify-between gap-4 py-6 text-xs text-muted">
        <p className="font-mono uppercase tracking-[0.12em]">{business.name} · NW1</p>
        <span>
          Built with{' '}
          <a className="text-link" href="https://jamstacks.net">
            jamstacks.net
          </a>
        </span>
      </div>
    </footer>
  );
}
