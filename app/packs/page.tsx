import type { Metadata } from 'next';
import { HangingTagArt, RailDivider } from '../../components/artwork';
import { PageHead } from '../../components/page-head';
import {
  ClassPacksTables,
  IntroOfferTag,
  MembershipsSection,
  PrivateSessionsSection,
  StudioPolicies,
} from '../../components/packs-sections';
import { SiteLink } from '../../components/site-link';
import { packs } from '../../content/packs';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Packs',
  description:
    'Intro offers, reformer and mat class packs, monthly memberships and private sessions at Long Line Pilates in Primrose Hill.',
  alternates: { canonical: absoluteUrl('/packs/') },
};

export default function PacksPage() {
  const introPack = packs.find(pack => pack.kind === 'intro')!;
  const reformerPacks = packs.filter(pack => pack.kind === 'pack' && pack.appliesTo === 'reformer');
  const matPacks = packs.filter(pack => pack.kind === 'pack' && pack.appliesTo === 'mat');
  const memberships = packs.filter(pack => pack.kind === 'membership');
  const privates = packs.filter(pack => pack.kind === 'private');

  return (
    <>
      <PageHead
        eyebrow="Pricing & packs"
        title="Packs"
        art={<HangingTagArt className="mx-auto w-full max-w-[12rem] text-ink" />}
      >
        <p>
          Simple packs, rolling monthly memberships and private sessions. Packs are bought at the studio desk or arranged by email reply — this website takes no payments.
        </p>
      </PageHead>

      <IntroOfferTag
        pack={introPack}
        eyebrow="Start here"
        ctaLabel="Enquire about Intro Three"
      />

      <ClassPacksTables
        heading="Reformer & mat packs"
        reformerPacks={reformerPacks}
        matPacks={matPacks}
      />

      <MembershipsSection
        heading="Monthly memberships"
        intro="For a steady weekly rhythm across both reformer and mat classes. No long tie-in; give 14 days' notice by email to pause or stop."
        memberships={memberships}
      />

      <PrivateSessionsSection
        heading="Private sessions"
        intro="Dedicated 55-minute teaching using the reformer, mat and small apparatus. Particularly helpful when returning from injury, during pregnancy or when building confidence before joining a group."
        privates={privates}
      />

      <StudioPolicies
        heading="Expiry, cancellation & freezing"
        items={[
          {
            title: 'Pack expiry and validity',
            body: (
              <p>
                Class packs activate on the day of your first attended session, not the day you arrange them. Single drop-ins and Intro Three are valid for 30 days, Reformer 5 for 60 days, and 10-class packs for 120 days.
              </p>
            ),
          },
          {
            title: '12-hour cancellation notice',
            body: (
              <p>
                Because each room holds at most eight reformers or twelve mats, please let us know at least 12 hours before class if your plans change so we can offer your spot to someone on the waitlist. Cancellations inside 12 hours count as a used session.
              </p>
            ),
          },
          {
            title: 'Freezing for injury, illness or pregnancy',
            body: (
              <p>
                Write to us any time if you are injured, unwell or taking a break during or after pregnancy. We will freeze your remaining pack validity or monthly membership without a fee until you are ready to return.
              </p>
            ),
          },
          {
            title: 'How payment is taken',
            body: (
              <p>
                No payment is taken online. When you enquire, we&apos;ll reply to arrange your first session or pack; payment is taken by card at the studio desk on arrival or arranged by reply before your block begins.
              </p>
            ),
          },
        ]}
      />

      <RailDivider />

      <section className="wrap py-14 md:py-18">
        <div className="grid items-center gap-8 border border-line bg-surface p-8 sm:p-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow">Arrange a pack or session</p>
            <h2 className="title-section mt-4 text-ink">
              Tell us which pack or class suits your week.
            </h2>
            <p className="mt-3 max-w-(--measure) text-muted">
              Send a short note with the pack or classes you have in mind. We&apos;ll reply to arrange a place — nothing is charged through the site.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <SiteLink href="/contact/" className="button">
              Enquire about packs
            </SiteLink>
          </div>
        </div>
      </section>
    </>
  );
}
