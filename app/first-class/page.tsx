import type { Metadata } from 'next';
import {
  BringIconRow,
  FormatComparison,
  GuideFaq,
  GuideFinalCta,
  GuideStep,
  ReformerAnatomyFigure,
} from '../../components/first-class-sections';
import { StudioIcon } from '../../components/artwork';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Your first class',
  description:
    'A calm, step-by-step guide to starting reformer or mat Pilates at Long Line Pilates in Primrose Hill: what to wear, arriving early, the reformer anatomy and FAQs.',
  alternates: { canonical: absoluteUrl('/first-class/') },
};

export default function FirstClassPage() {
  return (
    <>
      <PageHead
        stop="01"
        eyebrow="First class guide"
        title="Your first class, step by step"
      >
        <p>
          Most of our regular clients arrived worrying they were too stiff or might do something wrong. Here is everything that happens before, during and after your first session at Long Line.
        </p>
      </PageHead>

      <GuideStep stop="02" label="Choose your format" title="Reformer or mat — which suits you?">
        <FormatComparison
          reformerCopy={
            <p>
              You like tactile feedback, want adjustable spring support for stiff joints or a tired back, or are curious about the apparatus. Reformer Foundations is capped at six people so every adjustment is unhurried.
            </p>
          }
          matCopy={
            <p>
              You prefer working quietly on the floor with bodyweight and small props, want a lunchtime 45-minute reset, or want to learn sequences you can repeat at home between classes.
            </p>
          }
        />
      </GuideStep>

      <GuideStep stop="03" label="Pick Foundations" title="Start with a Foundations class">
        <div className="max-w-2xl space-y-4 text-muted">
          <p>
            Both <strong className="font-medium text-ink">Reformer Foundations</strong> (50 min, max 6) and{' '}
            <strong className="font-medium text-ink">Mat Foundations</strong> (45 min, max 12) are taught by Tom, our former physiotherapy assistant, at an unhurried intensity of 1 of 4 springs.
          </p>
          <p>
            Nothing is assumed. You&apos;ll learn how to set your headrest, change springs quietly, and link breath with steady movement before stepping into open-level classes.
          </p>
          <div className="pt-2">
            <SiteLink
              href="/classes/?level=foundations"
              className="button"
            >
              See Foundations classes on the timetable
            </SiteLink>
          </div>
        </div>
      </GuideStep>

      <GuideStep stop="04" label="Your body" title="Tell us about your body beforehand">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="space-y-4 text-muted md:col-span-7">
            <p>
              Before your first session, mention any current or past injuries, joint replacements, chronic back or neck pain, recent surgery or pregnancy in your enquiry message. Knowing ahead of time lets your teacher prepare spring options and props quietly before the room fills.
            </p>
            <p className="border-l-[2px] border-brass bg-surface p-4 text-sm text-ink">
              Long Line Pilates is a movement studio, not a medical provider. If you are managing an acute injury, recovering from surgery, or pregnant or recently post-natal, please check with your GP, midwife or physiotherapist before starting classes.
            </p>
          </div>
          <div className="border border-line bg-raised p-6 md:col-span-5">
            <p className="eyebrow">Helpful to include in your note</p>
            <ul className="mt-4 space-y-2.5 pl-4 text-sm text-muted marker:text-brass list-disc">
              <li>Any areas that feel tender, stiff or recently injured</li>
              <li>Whether you are pregnant or within 12 months of giving birth</li>
              <li>Any movements your physio has asked you to avoid or prioritise</li>
            </ul>
          </div>
        </div>
      </GuideStep>

      <GuideStep stop="05" label="Bring & wear" title="What to bring and wear">
        <BringIconRow
          items={[
            {
              icon: 'sock',
              title: 'Grip socks',
              detail: `Required on the reformer for safety and hygiene. Bring your own or pick up a pair at the desk for £${business.gripSocksPriceGBP}.`,
            },
            {
              icon: 'attire',
              title: 'Fitted clothing',
              detail: 'Comfortable leggings, shorts or a t-shirt without zips or buckles that can catch on the carriage upholstery.',
            },
            {
              icon: 'bottle',
              title: 'Water bottle',
              detail: 'Filtered water is available to refill by reception. No glass bottles beside the reformers.',
            },
            {
              icon: 'barefoot',
              title: 'No outdoor shoes',
              detail: 'Shoes stay on the timber bench in the lobby; cubbies hold coats, bags and phones on silent.',
            },
          ]}
        />
      </GuideStep>

      <GuideStep stop="06" label="Arriving" title="Arrive 10 minutes early">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex items-start gap-4 border border-line bg-surface p-6">
            <StudioIcon name="door" className="mt-0.5 h-7 w-7 shrink-0 text-ink" />
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink">
                Finding Studio 2
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                We are at {business.address.streetAddress} — {business.address.landmark.toLowerCase()} Ring the brass bell marked Studio 2 and come up one quiet flight of stairs.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 border border-line bg-raised p-6">
            <StudioIcon name="clock" className="mt-0.5 h-7 w-7 shrink-0 text-ink" />
            <div>
              <h3 className="font-mono text-xs uppercase tracking-[0.14em] text-ink">
                Included reformer orientation
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Coming ten minutes early gives your teacher time to walk you through your reformer — headrest height, footbar angle and spring colours — before the rest of the class starts.
              </p>
            </div>
          </div>
        </div>
      </GuideStep>

      <GuideStep stop="07" label="In the class" title="Know your way around the reformer">
        <p className="mb-8 max-w-(--measure) text-muted">
          The reformer looks mechanical at first glance, yet it has only six moving parts you need to recognise. Your teacher will always tell you which spring to hook and where your hands or feet go.
        </p>
        <ReformerAnatomyFigure
          parts={[
            {
              code: '01',
              name: 'Carriage',
              description: 'The padded sliding platform you lie, kneel or stand on; rollers keep the glide smooth and quiet.',
            },
            {
              code: '02',
              name: 'Footbar',
              description: 'The padded steel bar at the front end used for footwork, bridges and plank hands.',
            },
            {
              code: '03',
              name: 'Springs',
              description: 'Colour-coded steel coils underneath that add resistance or support — lighter springs often challenge balance more.',
            },
            {
              code: '04',
              name: 'Straps',
              description: 'Soft fabric loops on pulleys for arm work, leg circles and long spine stretches.',
            },
            {
              code: '05',
              name: 'Headrest',
              description: 'Tilts flat for bridging and lifts slightly for supine work so your neck stays long.',
            },
            {
              code: '06',
              name: 'Shoulder blocks',
              description: 'Cushioned stops that keep you centred on the carriage and give your heels a steady anchor.',
            },
          ]}
        />
      </GuideStep>

      <GuideStep stop="08" label="After" title="What to expect afterwards, and your next three classes">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="space-y-4 text-muted md:col-span-6">
            <h3 className="font-display text-2xl text-ink">Normal soreness vs. pain</h3>
            <p>
              It is completely normal to feel a deep, quiet ache through the lower abdominals, inner thighs or upper back 24 to 48 hours later — Pilates recruits smaller stabilising muscles that bigger gym movements often bypass.
            </p>
            <p>
              Sharp joint pain or pinching is never the goal. Tell your teacher immediately if anything pinches so we can adjust spring load or range on the spot.
            </p>
          </div>
          <div className="border-t border-line pt-5 md:col-span-6 md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <h3 className="font-display text-2xl text-ink">A suggested next three classes</h3>
            <ol className="m-0 mt-4 space-y-3 pl-5 text-sm text-muted marker:font-mono marker:text-ink">
              <li>
                <strong className="font-medium text-ink">Class 1 — Reformer or Mat Foundations:</strong> learn breath, carriage control and spring settings without rush.
              </li>
              <li>
                <strong className="font-medium text-ink">Class 2 — Second Foundations session:</strong> repeat the baseline so movements start feeling familiar rather than technical.
              </li>
              <li>
                <strong className="font-medium text-ink">Class 3 — Reformer Flow or Long Stretch &amp; Release:</strong> step into a continuous sequence once the springs feel natural.
              </li>
            </ol>
          </div>
        </div>
      </GuideStep>

      <GuideStep stop="09" label="Common questions" title="Questions newcomers ask most">
        <GuideFaq
          items={[
            {
              question: "I'm not flexible — can I still come?",
              answer: (
                <p>
                  Yes. You come to Pilates to build mobility and ease, not because you already have it. Springs and props shorten ranges of motion so tight hamstrings or stiff shoulders work comfortably from day one.
                </p>
              ),
            },
            {
              question: 'Is it a workout?',
              answer: (
                <p>
                  Yes — quiet, sustained and surprisingly thorough. Rather than breathless high-impact intervals, slow resistance builds deep trunk, hip and shoulder endurance that supports running, climbing and long desk days.
                </p>
              ),
            },
            {
              question: 'Are men welcome?',
              answer: (
                <p>
                  Always. Every class has a mix of local adults — runners, climbers, cyclists and desk workers of all ages and genders.
                </p>
              ),
            },
            {
              question: 'Can I attend if I am post-natal?',
              answer: (
                <p>
                  Yes, once you have been cleared to return to exercise by your GP, midwife or women&apos;s health physiotherapist (typically after your 6–8 week check, or longer after a caesarean). Let us know in your enquiry — Maya specialises in pre- and post-natal modifications, and we can recommend Foundations, Long Stretch or a private session to begin. Remember that Long Line is not a medical provider.
                </p>
              ),
            },
            {
              question: 'How many classes a week should I do?',
              answer: (
                <p>
                  Twice a week is the sweet spot where posture, strength and carriage confidence build steadily. Once a week still makes a noticeable difference alongside running, strength training or walking on Primrose Hill.
                </p>
              ),
            },
          ]}
        />
      </GuideStep>

      <GuideStep stop="10" label="Enquire" title="Ask about your first class" last>
        <GuideFinalCta
          body="Ready to try a Foundations session or Intro Three? Write to us with the days that suit you and anything your teacher should know. We'll reply to arrange a place — nothing is charged online."
          buttonLabel="Ask about your first class"
          secondaryLabel="See Intro Three & class packs"
        />
      </GuideStep>
    </>
  );
}
