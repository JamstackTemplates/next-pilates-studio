'use client';

import { useEffect, useState } from 'react';
import { classTypeById } from '../content/classes';
import { teacherById } from '../content/teachers';
import {
  DAY_META,
  mondaySessions,
  timetable,
  upcomingSessions,
  type TimetableSession,
} from '../content/timetable';
import { site } from '../lib/site';
import { SpringGauge } from './spring-gauge';

/**
 * Home "This week at a glance" museum wall-label list.
 * Static/no-JS output stays neutral ("Monday's classes" showing Monday's schedule).
 * In the browser it computes the next 6 upcoming sessions in Europe/London time.
 */
export function WeekGlanceList() {
  const [heading, setHeading] = useState("Monday's classes");
  const [sessions, setSessions] = useState<TimetableSession[]>(() => mondaySessions(timetable));

  useEffect(() => {
    const update = () => {
      const zone = site.timeZone || 'Europe/London';
      setSessions(upcomingSessions(timetable, zone, new Date(), 6));
      setHeading('Next six classes');
    };
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p className="eyebrow mb-5">{heading}</p>
      <ol className="m-0 list-none border-t-[1.5px] border-ink p-0">
        {sessions.map(session => {
          const classType = classTypeById.get(session.classId);
          const teacher = teacherById.get(session.teacherId);
          if (!classType || !teacher) return null;
          const isCancelled = session.status === 'cancelled';
          const isFull = session.status === 'full';

          return (
            <li
              key={session.id}
              className="grid grid-cols-[4.75rem_1fr] gap-x-5 gap-y-3 border-b border-line py-6 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:gap-x-8"
            >
              <p className="m-0 leading-none">
                <span className="block font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted">
                  {DAY_META[session.day].short}
                </span>
                <span className="mt-2 block font-mono text-[1.45rem] tracking-[-0.01em] text-ink tabular-nums sm:text-[1.7rem]">
                  {session.start}
                </span>
              </p>

              <div className="min-w-0">
                <p
                  className={`m-0 font-display text-[1.9rem] leading-[1] sm:text-[2.3rem] ${
                    isCancelled ? 'text-muted line-through decoration-cancelled decoration-1' : 'text-ink'
                  }`}
                >
                  {classType.name}
                </p>
                <p className="mt-2 font-mono text-[0.68rem] uppercase tracking-[0.13em] text-muted">
                  with {teacher.shortName} · {classType.durationMinutes} min
                  {isCancelled ? (
                    <span className="mt-1.5 block text-cancelled">
                      Cancelled{session.note ? ` — ${session.note}` : ''}
                    </span>
                  ) : null}
                  {isFull ? (
                    <span className="mt-1.5 block text-ink">Full — enquire for waitlist</span>
                  ) : null}
                </p>
              </div>

              <div className="col-start-2 sm:col-start-auto sm:justify-self-end">
                <SpringGauge springs={classType.springs} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
