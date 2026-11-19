import type { Metadata } from 'next';
import { MatFormatArt, RailDivider, ReformerFormatArt } from '../../components/artwork';
import { ClassTypesMuseumGrid, LevelsPullQuote } from '../../components/classes-sections';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { TimetableFilter } from '../../components/timetable-filter';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Classes',
  description:
    'Small-group reformer and mat Pilates classes at Long Line Pilates in Primrose Hill, with spring-intensity levels and the weekly timetable.',
  alternates: { canonical: absoluteUrl('/classes/') },
};

export default function ClassesPage() {
  return (
    <>
      <PageHead
        eyebrow="Classes & timetable"
        title="Classes"
        art={
          <div className="flex flex-col items-center gap-2">
            <MatFormatArt className="w-3/4 text-ink" />
            <ReformerFormatArt className="w-full text-ink" />
          </div>
        }
      >
        <p>
          Seven class types across eight reformers and twelve mats. Every class shows a spring gauge from 1 to 4 so you can judge pace and load at a glance.
        </p>
      </PageHead>

      <ClassTypesMuseumGrid
        reformerHeading="Reformer"
        reformerIntro="Apparatus classes capped at eight reformers (six for Foundations) so your teacher can check carriage setup, spring tension and alignment throughout."
        matHeading="Mat"
        matIntro="Floorwork capped at twelve mats using bodyweight, rollers, small balls and bands. Quiet, spacious and grounded."
      />

      <RailDivider />

      <section id="timetable" className="wrap py-14 md:py-20" aria-labelledby="timetable-heading">
        <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">Weekly schedule</p>
            <h2
              id="timetable-heading"
              className="title-section mt-4 text-ink"
            >
              Weekly timetable
            </h2>
            <p className="mt-4 max-w-(--measure) text-muted">
              To join a session or add your name to the waitlist for a full class, send an enquiry with your preferred days and we&apos;ll reply to arrange a place.
            </p>
          </div>
          <div className="md:col-span-5 md:text-right">
            <TimeZoneNote />
          </div>
        </div>

        <TimetableFilter />
      </section>

      <LevelsPullQuote
        quote="Not sure? Start with Foundations."
        note="Two or three Foundations sessions give you calm familiarity with the springs, the footbar and our cueing before stepping into Flow or Sculpt."
        ctaLabel="Plan your first class"
      />
    </>
  );
}
