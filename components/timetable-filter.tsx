'use client';

import { useEffect, useState } from 'react';
import {
  classTypeById,
  FORMAT_LABELS,
  LEVEL_LABELS,
  type ClassFormat,
  type ClassLevel,
} from '../content/classes';
import { teacherById } from '../content/teachers';
import {
  DAY_META,
  TIMETABLE_DAYS,
  timetable,
  type TimetableDay,
  type TimetableSession,
} from '../content/timetable';
import { SpringGauge } from './spring-gauge';

type FormatFilter = 'all' | ClassFormat;
type LevelFilter = 'all' | ClassLevel;

const FORMAT_OPTIONS: readonly { value: FormatFilter; label: string }[] = [
  { value: 'all', label: 'All formats' },
  { value: 'reformer', label: FORMAT_LABELS.reformer },
  { value: 'mat', label: FORMAT_LABELS.mat },
];

const LEVEL_OPTIONS: readonly { value: LevelFilter; label: string }[] = [
  { value: 'all', label: 'All levels' },
  { value: 'foundations', label: LEVEL_LABELS.foundations },
  { value: 'open', label: LEVEL_LABELS.open },
  { value: 'advanced', label: LEVEL_LABELS.advanced },
];

function parseFormat(raw: string | null): FormatFilter {
  if (raw === 'reformer' || raw === 'mat') return raw;
  return 'all';
}

function parseLevel(raw: string | null): LevelFilter {
  if (raw === 'foundations' || raw === 'open' || raw === 'advanced') return raw;
  return 'all';
}

/**
 * Weekly timetable arranged along the vertical brass Long Line day rail.
 * Progressive enhancement:
 * - Without JS (initial static HTML): full timetable renders, NO filter chips rendered.
 * - With JS: renders Format and Level button chips with `aria-pressed`, reads
 *   `?level=` / `?format=` on mount, and announces visible counts in a polite live region.
 */
export function TimetableFilter({
  sessions = timetable,
}: {
  sessions?: readonly TimetableSession[];
}) {
  const [hydrated, setHydrated] = useState(false);
  const [format, setFormat] = useState<FormatFilter>('all');
  const [level, setLevel] = useState<LevelFilter>('all');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFormat(parseFormat(params.get('format')));
    setLevel(parseLevel(params.get('level')));
    setHydrated(true);
  }, []);

  function updateFilters(nextFormat: FormatFilter, nextLevel: LevelFilter) {
    setFormat(nextFormat);
    setLevel(nextLevel);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (nextFormat === 'all') url.searchParams.delete('format');
      else url.searchParams.set('format', nextFormat);
      if (nextLevel === 'all') url.searchParams.delete('level');
      else url.searchParams.set('level', nextLevel);
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
  }

  const filteredByDay: { day: TimetableDay; items: TimetableSession[] }[] = TIMETABLE_DAYS.map(
    day => {
      const items = sessions.filter(session => {
        if (session.day !== day) return false;
        const cls = classTypeById.get(session.classId);
        if (!cls) return false;
        if (format !== 'all' && cls.format !== format) return false;
        if (level !== 'all' && cls.level !== level) return false;
        return true;
      });
      return { day, items };
    },
  ).filter(group => group.items.length > 0);

  const visibleCount = filteredByDay.reduce((sum, group) => sum + group.items.length, 0);
  const isFiltered = format !== 'all' || level !== 'all';

  const summaryText = isFiltered
    ? `Showing ${visibleCount} ${visibleCount === 1 ? 'session' : 'sessions'} for ${
        format === 'all' ? 'all formats' : FORMAT_LABELS[format]
      }, ${level === 'all' ? 'all levels' : LEVEL_LABELS[level]}.`
    : `Showing all ${visibleCount} weekly sessions.`;

  return (
    <div>
      {/* Filter chips only render once JavaScript is active */}
      {hydrated ? (
        <div className="mb-10 border-y border-line py-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-6">
              <div role="group" aria-label="Filter by format" className="flex flex-wrap items-center gap-2">
                <span className="mono-label mr-1 text-muted">Format</span>
                {FORMAT_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={format === option.value}
                    onClick={() => updateFilters(option.value, level)}
                    className="filter-chip"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div role="group" aria-label="Filter by level" className="flex flex-wrap items-center gap-2">
                <span className="mono-label mr-1 text-muted">Level</span>
                {LEVEL_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    aria-pressed={level === option.value}
                    onClick={() => updateFilters(format, option.value)}
                    className="filter-chip"
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {isFiltered ? (
              <button
                type="button"
                onClick={() => updateFilters('all', 'all')}
                className="text-link self-start font-mono text-xs uppercase tracking-[0.12em] lg:self-auto"
              >
                Clear filters
              </button>
            ) : null}
          </div>

          <p className="mt-4 font-mono text-xs uppercase tracking-[0.11em] text-muted" role="status" aria-live="polite">
            {summaryText}
          </p>
        </div>
      ) : null}

      {/* Empty state if a filter combination has no sessions (e.g. Mat + Advanced) */}
      {filteredByDay.length === 0 ? (
        <div className="border border-line bg-surface p-8">
          <p className="font-display text-2xl text-ink">No classes match that combination.</p>
          <p className="mt-2 text-sm text-muted">
            Advanced classes currently run on the reformer only. Try Classical Mat for an open-level mat challenge, or reset the filters.
          </p>
          <button
            type="button"
            onClick={() => updateFilters('all', 'all')}
            className="button mt-5"
          >
            Show all weekly classes
          </button>
        </div>
      ) : (
        /* Vertical Long Line day rail */
        <div className="relative pl-5 md:pl-0">
          {/* Mobile left rail line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-2 bottom-2 left-0 w-[1.5px] bg-brass md:left-[7.5rem]"
          />

          <div className="space-y-10">
            {filteredByDay.map(({ day, items }) => (
              <div
                key={day}
                className="relative grid gap-3 md:grid-cols-[7.5rem_1fr] md:gap-10"
              >
                {/* Day stop label on the rail */}
                <div className="relative flex items-center gap-3 md:items-start md:pt-3.5">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.47rem] top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-brass md:left-[7.31rem] md:top-[1.45rem] md:translate-y-0"
                  />
                  <span
                    aria-hidden="true"
                    className="hidden md:block md:absolute md:left-[7.5rem] md:top-[1.65rem] md:h-[1.5px] md:w-5 bg-brass"
                  />
                  <h3 className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-ink">
                    {DAY_META[day].full}
                  </h3>
                </div>

                {/* Ruled session rows */}
                <ul className="m-0 list-none divide-y divide-line border-t border-line p-0 md:pl-4">
                  {items.map(session => {
                    const cls = classTypeById.get(session.classId);
                    const teacher = teacherById.get(session.teacherId);
                    if (!cls || !teacher) return null;

                    const isCancelled = session.status === 'cancelled';
                    const isFull = session.status === 'full';

                    return (
                      <li
                        key={session.id}
                        className="grid grid-cols-1 gap-2 py-4 sm:grid-cols-[4.5rem_minmax(0,1fr)_8.5rem_auto] sm:items-center sm:gap-5"
                      >
                        {/* Line 1 on mobile: time + class name */}
                        <div className="flex items-baseline gap-3 sm:contents">
                          <span className="font-mono text-sm font-medium text-ink tabular-nums">
                            {session.start}
                          </span>
                          <div className="min-w-0">
                            <p
                              className={`text-[1.02rem] font-medium leading-snug ${
                                isCancelled ? 'line-through text-muted' : 'text-ink'
                              }`}
                            >
                              {cls.name}
                            </p>
                            <p className="mt-0.5 font-mono text-[0.68rem] uppercase tracking-[0.11em] text-muted">
                              {FORMAT_LABELS[cls.format]} · {LEVEL_LABELS[cls.level]} · {cls.durationMinutes} min
                            </p>
                          </div>
                        </div>

                        {/* Line 2 on mobile: teacher + spring gauge */}
                        <div className="flex flex-wrap items-center justify-between gap-3 sm:contents">
                          <span className="text-sm text-muted">{teacher.name}</span>
                          <div className="flex flex-wrap items-center gap-3 sm:justify-end">
                            <SpringGauge springs={cls.springs} />
                            {isFull ? (
                              <span className="border border-line bg-surface px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-ink">
                                Full — enquire for waitlist
                              </span>
                            ) : null}
                            {isCancelled ? (
                              <span className="border border-cancelled px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-[0.1em] text-cancelled">
                                Cancelled
                              </span>
                            ) : null}
                          </div>
                        </div>

                        {session.note ? (
                          <p
                            className={`text-xs sm:col-span-4 sm:pl-[5.75rem] ${
                              isCancelled ? 'text-cancelled' : 'text-muted'
                            }`}
                          >
                            {session.note}
                          </p>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
