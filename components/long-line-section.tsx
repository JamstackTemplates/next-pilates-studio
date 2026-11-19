import type { ReactNode } from 'react';

/**
 * A Home section hung from the Long Line.
 *
 * On md+ the brass line runs down the left gutter; at the section start it turns
 * into a horizontal rail that runs to the right edge of the viewport, with a
 * small carriage marker, the mono stop label and a large plaster-relief numeral
 * standing on it. The heading then hangs in a narrow left column (`hang`) or
 * spans the top of the section (`stack`). On mobile the rail collapses to a
 * short stub under the label.
 */
export function LongLineSection({
  stop,
  label,
  title,
  intro,
  id,
  layout = 'hang',
  tone = 'plaster',
  last = false,
  children,
}: {
  /** Two-digit stop number, e.g. "01". */
  stop: string;
  /** Short mono stop label, e.g. "Two ways". */
  label: string;
  /** Section heading (rendered as h2). */
  title: ReactNode;
  /** Optional short paragraph under the heading. */
  intro?: ReactNode;
  id?: string;
  /** `hang`: heading in a narrow sticky left column. `stack`: heading above full-width content. */
  layout?: 'hang' | 'stack';
  /** `cast` sets the section in a full-bleed cast-surface room. */
  tone?: 'plaster' | 'cast';
  /** True on the final rail section so the vertical line ends at its content. */
  last?: boolean;
  children: ReactNode;
}) {
  const headingId = id ? `${id}-title` : `stop-${stop}-title`;

  return (
    <section id={id} aria-labelledby={headingId} className="relative isolate overflow-x-clip">
      {tone === 'cast' ? <div aria-hidden="true" className="bleed-backdrop bg-surface" /> : null}

      <div className="wrap relative pt-[clamp(4.5rem,11vw,10rem)] pb-[clamp(3.5rem,7vw,6.5rem)]">
        {/* The vertical Long Line in the gutter (md+) */}
        <div
          aria-hidden="true"
          className={`long-line-rail pointer-events-none absolute left-0 top-0 hidden w-[1.5px] bg-brass md:block ${
            last ? 'bottom-[45%]' : 'bottom-0'
          }`}
        />
        {last ? (
          <span
            aria-hidden="true"
            className="absolute bottom-[45%] -left-[3.5px] hidden h-2 w-2 rounded-full bg-brass md:block"
          />
        ) : null}

        {/* Rail header: relief numeral standing on a horizontal rail */}
        <div className="relative">
          <span
            aria-hidden="true"
            className="relief-numeral pointer-events-none absolute right-0 bottom-0 text-[clamp(6.5rem,17vw,16rem)] md:-right-2"
          >
            {stop}
          </span>

          <div className="relative flex items-end gap-4 pb-3 md:pl-8">
            {/* Carriage marker riding the rail */}
            <span
              aria-hidden="true"
              className="hidden h-[9px] w-7 border-[1.5px] border-brass bg-bg md:absolute md:bottom-[-4px] md:left-8 md:block"
            />
            <p className="mono-label relative text-ink md:pl-12">
              <span className="mr-3 text-muted">{stop}</span>
              {label}
            </p>
          </div>

          {/* Horizontal turn of the line: gutter → right edge of the viewport */}
          <div
            aria-hidden="true"
            className="long-line-rail-x hidden h-[1.5px] bg-brass md:block"
            style={{ width: 'calc(100% + (100vw - 100%) / 2)' }}
          />
          <span
            aria-hidden="true"
            className="absolute bottom-[-3px] -left-[3px] hidden h-[7.5px] w-[7.5px] rounded-full bg-brass md:block"
          />
          {/* Mobile: a short stub under the label */}
          <span aria-hidden="true" className="block h-[1.5px] w-12 bg-brass md:hidden" />
        </div>

        {layout === 'hang' ? (
          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-4 md:pl-8">
              <div className="md:sticky md:top-28">
                <h2 id={headingId} className="title-section text-ink">
                  {title}
                </h2>
                {intro ? (
                  <div className="mt-6 max-w-[34ch] text-[1.02rem] leading-relaxed text-muted">{intro}</div>
                ) : null}
              </div>
            </div>
            <div className="min-w-0 md:col-span-8">{children}</div>
          </div>
        ) : (
          <div className="mt-10 md:mt-14">
            <div className="grid gap-6 md:grid-cols-12 md:items-end md:gap-x-10 md:pl-8">
              <h2 id={headingId} className="title-section text-ink md:col-span-7">
                {title}
              </h2>
              {intro ? (
                <div className="max-w-[40ch] text-[1.02rem] leading-relaxed text-muted md:col-span-5 md:pb-2">
                  {intro}
                </div>
              ) : null}
            </div>
            <div className="mt-12 min-w-0 md:mt-16 md:pl-8">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}
