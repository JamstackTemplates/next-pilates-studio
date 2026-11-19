import type { ReactNode } from 'react';
import {
  MatFormatArt,
  ReformerDiagramArt,
  ReformerFormatArt,
  StudioIcon,
  type StudioIconName,
} from './artwork';
import { SiteLink } from './site-link';

/**
 * Numbered step on the First class Long Line spine (stops 02–10).
 * On desktop the continuous brass line runs down the left gutter; on mobile
 * the brass line hugs the left edge with stop numbers inline.
 */
export function GuideStep({
  stop,
  label,
  title,
  last = false,
  children,
}: {
  stop: string;
  label: string;
  title: ReactNode;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <section className="wrap relative py-14 md:py-24" aria-labelledby={`step-${stop}`}>
      {/* Continuous vertical Long Line spine */}
      <div
        aria-hidden="true"
        className={`long-line-rail pointer-events-none absolute left-0 top-0 ${
          last ? 'bottom-[60%]' : 'bottom-0'
        } w-[1.5px] bg-brass`}
      />

      <div className="grid gap-6 pl-7 md:grid-cols-12 md:gap-10 md:pl-0">
        {/* Stop: bolt on the line, carved numeral, mono label */}
        <div className="relative md:col-span-3 md:pl-10">
          <span
            aria-hidden="true"
            className="absolute -left-[2.02rem] top-[0.3rem] h-[9px] w-[9px] rounded-full bg-brass md:top-[2.6rem] md:-left-[4px]"
          />
          <span
            aria-hidden="true"
            className="absolute left-0 top-[2.85rem] hidden h-[1.5px] w-8 bg-brass md:block"
          />
          <span
            aria-hidden="true"
            className="relief-numeral hidden text-[clamp(5rem,8vw,7.5rem)] md:block"
          >
            {stop}
          </span>
          <p className="mono-label text-ink md:mt-4">
            <span className="mr-2.5 text-muted md:hidden">{stop}</span>
            <span>{label}</span>
          </p>
        </div>

        {/* Step content */}
        <div className="md:col-span-9">
          <h2 id={`step-${stop}`} className="font-display text-[clamp(2.4rem,4.6vw,4.25rem)] leading-[0.95] tracking-[-0.02em] text-ink">
            {title}
          </h2>
          <div className="mt-8">{children}</div>
        </div>
      </div>
    </section>
  );
}

export function FormatComparison({
  reformerCopy,
  matCopy,
}: {
  reformerCopy: ReactNode;
  matCopy: ReactNode;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="border border-line bg-surface p-6">
        <ReformerFormatArt className="w-44 text-ink" />
        <h3 className="mt-4 font-display text-2xl text-ink">Start on the reformer if…</h3>
        <div className="mt-3 text-sm leading-relaxed text-muted">{reformerCopy}</div>
      </div>
      <div className="border border-line bg-raised p-6">
        <MatFormatArt className="w-44 text-ink" />
        <h3 className="mt-4 font-display text-2xl text-ink">Start on the mat if…</h3>
        <div className="mt-3 text-sm leading-relaxed text-muted">{matCopy}</div>
      </div>
    </div>
  );
}

export function BringIconRow({
  items,
}: {
  items: readonly { icon: StudioIconName; title: string; detail: string }[];
}) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="hidden h-[1.5px] w-full bg-brass sm:block" />
      <ul className="m-0 grid list-none gap-6 p-0 pt-2 sm:grid-cols-2 sm:pt-6 lg:grid-cols-4">
        {items.map(item => (
          <li key={item.title} className="border-t border-line pt-4 sm:border-t-0 sm:pt-0">
            <div className="inline-flex h-11 w-11 items-center justify-center border border-line bg-raised text-ink">
              <StudioIcon name={item.icon} className="h-6 w-6" />
            </div>
            <h3 className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-ink">
              {item.title}
            </h3>
            <p className="mt-1.5 text-sm text-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ReformerAnatomyFigure({
  parts,
}: {
  parts: readonly { code: string; name: string; description: string }[];
}) {
  return (
    <figure className="m-0">
      <ReformerDiagramArt className="w-full text-ink" />
      <figcaption className="mt-6 grid gap-4 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-3">
        {parts.map(part => (
          <div key={part.code}>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-ink">
              <span className="mr-2 text-muted">{part.code}</span>
              {part.name}
            </p>
            <p className="mt-1 text-sm text-muted">{part.description}</p>
          </div>
        ))}
      </figcaption>
    </figure>
  );
}

export function GuideFaq({
  items,
}: {
  items: readonly { question: string; answer: ReactNode }[];
}) {
  return (
    <div className="max-w-3xl">
      {items.map(item => (
        <details key={item.question} className="studio-disclosure">
          <summary>{item.question}</summary>
          <div className="studio-disclosure-body">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

export function GuideFinalCta({
  body,
  buttonLabel,
  secondaryLabel,
}: {
  body: ReactNode;
  buttonLabel: ReactNode;
  secondaryLabel: ReactNode;
}) {
  return (
    <div className="border border-line bg-surface p-8 sm:p-10">
      <p className="max-w-(--measure) text-[1.02rem] leading-relaxed text-muted">{body}</p>
      <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
        <SiteLink href="/contact/" className="button">
          {buttonLabel}
        </SiteLink>
        <SiteLink href="/packs/" className="text-link font-mono text-xs uppercase tracking-[0.12em]">
          {secondaryLabel}
        </SiteLink>
      </div>
    </div>
  );
}
