import type { ReactNode } from 'react';

/**
 * Inner page heading: a mono eyebrow on a brass stub, a very large Italiana
 * title, optional lede, and optional artwork set in a plaster gallery niche.
 * The Long Line drops down the gutter and turns into a full-width rail under
 * the head, so each page's content hangs from it.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  stop,
  art,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  /** Optional numbered stop label along the Long Line (e.g. "01"). */
  stop?: string;
  /** Optional artwork, displayed in an arched plaster niche beside the title. */
  art?: ReactNode;
}) {
  return (
    <header className="relative overflow-x-clip">
      <div className="wrap relative pt-[clamp(3rem,7vw,6rem)]">
        {/* Gutter line (md+) */}
        <div aria-hidden="true" className="long-line-rail absolute top-0 bottom-0 left-0 hidden w-[1.5px] bg-brass md:block" />

        <div className="grid items-end gap-10 md:grid-cols-12 md:gap-x-10">
          <div className={`md:pl-8 ${art ? 'md:col-span-8' : 'md:col-span-11'}`}>
            <div className="flex items-center gap-3">
              {stop ? <span className="font-mono text-xs tracking-[0.18em] text-ink">{stop}</span> : null}
              <span className="inline-block h-[1.5px] w-10 bg-brass" aria-hidden="true" />
              <p className="eyebrow">{eyebrow}</p>
            </div>
            <h1 id={id} className="title-page mt-6 text-ink md:mt-8">
              {title}
            </h1>
            {children ? (
              <div className="mt-7 max-w-[44ch] text-[1.08rem] leading-relaxed text-muted md:mt-9">{children}</div>
            ) : null}
          </div>

          {art ? (
            <div className="md:col-span-4">
              {/* Plaster niche: arched alcove standing on the floor line */}
              <div className="relative mx-auto flex aspect-[4/5] max-w-[20rem] items-end justify-center rounded-t-full bg-surface px-6 pb-6 md:mr-0">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-3 -top-3 bottom-0 rounded-t-full border border-b-0 border-line"
                />
                <span aria-hidden="true" className="absolute top-6 left-1/2 h-6 w-[1.5px] -translate-x-1/2 bg-brass" />
                <div className="relative w-full">{art}</div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Floor/rail: the line turns horizontal and runs to the right edge */}
        <div className="relative mt-[clamp(2.5rem,5vw,4rem)]">
          <div
            aria-hidden="true"
            className="long-line-rail-x hidden h-[1.5px] bg-brass md:block"
            style={{ width: 'calc(100% + (100vw - 100%) / 2)' }}
          />
          <span aria-hidden="true" className="absolute -top-[3px] -left-[3px] hidden h-[7.5px] w-[7.5px] rounded-full bg-brass md:block" />
          <div aria-hidden="true" className="h-px w-full bg-line md:hidden" />
        </div>
      </div>
    </header>
  );
}
