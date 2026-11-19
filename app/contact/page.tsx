import type { Metadata } from 'next';
import { ContactArchArt, StudioIcon } from '../../components/artwork';
import { CopyEmail } from '../../components/copy-email';
import { GoogleMap } from '../../components/google-map';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { mapDirectionsUrl, mapSearchUrl } from '../../lib/maps';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  const telHref = `tel:${business.phone.replace(/[^\d+]/g, '')}`;

  return (
    <>
      <PageHead
        eyebrow="Contact & enquiries"
        title={business.enquiries.title}
        art={<ContactArchArt className="mx-auto w-full max-w-[11rem] text-ink" />}
      >
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap grid gap-12 py-10 pb-16 lg:grid-cols-12 lg:gap-16">
        {/* Left column: Hosted enquiry form (or email fallback) + Useful to include */}
        <section aria-label="Enquiry form" className="lg:col-span-7">
          {hosted ? (
            <div className="border border-line bg-raised p-6 sm:p-8">
              <JamstacksSupportForm
                siteId={site.jamstacksSite}
                embedUrl={site.jamstacksEmbedUrl}
                email={business.email}
              />
            </div>
          ) : (
            <div className="border border-line bg-raised p-7 sm:p-9">
              <p className="eyebrow">Direct email enquiry</p>
              <h2 className="mt-3 font-display text-[2.1rem] leading-tight text-ink">
                Write to us directly
              </h2>
              <p className="mt-3 text-muted">
                The online enquiry form is not connected on this preview. Send your note straight to our studio inbox and we&apos;ll reply to arrange a place.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a className="button" href={`mailto:${business.email}`}>
                  Email {business.email}
                </a>
                <CopyEmail email={business.email} />
              </div>
            </div>
          )}

          {/* Message guidance underneath the form */}
          <div className="mt-10 border-t border-line pt-8">
            <p className="eyebrow">Useful to include in your message</p>
            <ul className="mt-4 space-y-2.5 pl-5 text-muted marker:text-brass list-disc">
              {business.enquiries.usefulToInclude.map(tip => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <p className="mt-5 text-sm text-muted">
              Spaces, intro packs and private sessions are arranged personally by reply — no payment is taken through this website.
            </p>
          </div>
        </section>

        {/* Right column: Direct contact, address, hours with open-now, directions, map */}
        <aside aria-label="Studio details and directions" className="space-y-9 lg:col-span-5">
          {/* Email & phone (always visible) */}
          <div className="border-t border-ink/35 pt-6">
            <p className="eyebrow">Direct contact</p>
            <div className="mt-4 space-y-4">
              <div className="flex items-start gap-3">
                <StudioIcon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                <div>
                  <a className="text-link wrap-anywhere font-medium" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                  <div className="mt-2.5 flex flex-wrap items-center gap-3">
                    <CopyEmail email={business.email} />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-1">
                <StudioIcon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
                <div>
                  <a className="text-link font-mono text-sm tracking-[0.06em]" href={telHref}>
                    {business.phone}
                  </a>
                  <p className="mt-1 text-xs text-muted">
                    Phone calls are welcome during studio hours. If we are teaching, leave a short message and we&apos;ll call back between classes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address & hours */}
          <div className="border-t border-line pt-6">
            <p className="eyebrow">Studio address &amp; hours</p>
            <address className="mt-3 not-italic font-display text-2xl leading-snug text-ink">
              {business.address.streetAddress}
              <br />
              {business.address.addressLocality} {business.address.postalCode}
            </address>
            <p className="mt-2 text-sm text-muted">{business.address.landmark}</p>

            <dl className="mt-5 divide-y divide-line border-y border-line font-mono text-xs uppercase tracking-[0.12em]">
              {business.hoursSummary.map(row => (
                <div key={row.label} className="flex items-center justify-between py-2.5">
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

          {/* Directions & Google Map */}
          <div className="border-t border-line pt-6">
            <p className="eyebrow">Getting here</p>
            <p className="mt-3 flex items-start gap-2.5 text-sm text-muted">
              <StudioIcon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-ink" />
              <span>{business.address.directions}</span>
            </p>
            <div className="mt-4 flex flex-wrap gap-5 font-mono text-xs uppercase tracking-[0.12em]">
              <a
                className="text-link"
                href={mapSearchUrl(business.address.formatted)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
              </a>
              <a
                className="text-link"
                href={mapDirectionsUrl(business.address.formatted)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions
              </a>
            </div>
            <GoogleMap
              address={business.address.formatted}
              title="Map showing Long Line Pilates at 14 Regent's Park Road, London NW1 7TX"
              className="mt-5"
            />
          </div>
        </aside>
      </div>
    </>
  );
}
