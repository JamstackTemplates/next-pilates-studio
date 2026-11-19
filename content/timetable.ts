import { business } from './business.ts';
import { classTypes, type ClassType } from './classes.ts';
import { teachers, type Teacher } from './teachers.ts';
import { DAYS, type Day, type OpeningHours } from '../lib/hours.ts';

/**
 * Weekly timetable for Long Line Pilates.
 *
 * Owner guide — most frequent edits:
 * - Change `start` (`HH:MM` local London time) — must stay inside that day's studio opening hours,
 *   including the session's duration.
 * - Change `teacherId` to swap an instructor.
 * - Set `status` to `'cancelled'` (with an optional `note`) or `'full'` (shown as "Full — enquire for waitlist").
 */

export const TIMETABLE_DAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'] as const;
export type TimetableDay = (typeof TIMETABLE_DAYS)[number];
export type SessionStatus = 'running' | 'cancelled' | 'full';

export interface TimetableSession {
  /** Unique URL-safe ID, e.g. `mon-0700-reformer-flow`. */
  id: string;
  /** Weekday key: mon..sun. */
  day: TimetableDay;
  /** Local start time in 24-hour HH:MM (Europe/London). */
  start: string;
  /** Class type ID from content/classes.ts. */
  classId: string;
  /** Teacher ID from content/teachers.ts. */
  teacherId: string;
  /** Current session state; full and cancelled always render with text. */
  status: SessionStatus;
  /** Optional short note shown alongside the row (e.g. cancellation reason). */
  note?: string;
}

export const DAY_META: Record<TimetableDay, { short: string; full: Day; index: number }> = {
  mon: { short: 'Mon', full: 'Monday', index: 0 },
  tue: { short: 'Tue', full: 'Tuesday', index: 1 },
  wed: { short: 'Wed', full: 'Wednesday', index: 2 },
  thu: { short: 'Thu', full: 'Thursday', index: 3 },
  fri: { short: 'Fri', full: 'Friday', index: 4 },
  sat: { short: 'Sat', full: 'Saturday', index: 5 },
  sun: { short: 'Sun', full: 'Sunday', index: 6 },
};

export const timetable: readonly TimetableSession[] = [
  // Monday (06:30–21:00)
  { id: 'mon-0700-reformer-flow', day: 'mon', start: '07:00', classId: 'reformer-flow', teacherId: 'maya-lindqvist', status: 'running' },
  { id: 'mon-1230-mat-foundations', day: 'mon', start: '12:30', classId: 'mat-foundations', teacherId: 'tom-adeyemi', status: 'running' },
  { id: 'mon-1815-reformer-sculpt', day: 'mon', start: '18:15', classId: 'reformer-sculpt', teacherId: 'ines-carvalho', status: 'running' },
  { id: 'mon-1930-reformer-foundations', day: 'mon', start: '19:30', classId: 'reformer-foundations', teacherId: 'tom-adeyemi', status: 'running' },

  // Tuesday (06:30–21:00)
  { id: 'tue-0645-reformer-sculpt', day: 'tue', start: '06:45', classId: 'reformer-sculpt', teacherId: 'ines-carvalho', status: 'running' },
  { id: 'tue-0930-mat-stretch', day: 'tue', start: '09:30', classId: 'mat-stretch', teacherId: 'maya-lindqvist', status: 'running' },
  { id: 'tue-1830-mat-classical', day: 'tue', start: '18:30', classId: 'mat-classical', teacherId: 'ines-carvalho', status: 'running' },
  { id: 'tue-1945-reformer-flow', day: 'tue', start: '19:45', classId: 'reformer-flow', teacherId: 'maya-lindqvist', status: 'running' },

  // Wednesday (06:30–21:00)
  { id: 'wed-0700-reformer-foundations', day: 'wed', start: '07:00', classId: 'reformer-foundations', teacherId: 'tom-adeyemi', status: 'running' },
  { id: 'wed-1230-reformer-flow', day: 'wed', start: '12:30', classId: 'reformer-flow', teacherId: 'maya-lindqvist', status: 'running' },
  { id: 'wed-1815-reformer-advanced', day: 'wed', start: '18:15', classId: 'reformer-advanced', teacherId: 'ines-carvalho', status: 'running' },
  { id: 'wed-1930-mat-foundations', day: 'wed', start: '19:30', classId: 'mat-foundations', teacherId: 'tom-adeyemi', status: 'running' },

  // Thursday (06:30–21:00)
  { id: 'thu-0645-reformer-flow', day: 'thu', start: '06:45', classId: 'reformer-flow', teacherId: 'maya-lindqvist', status: 'running' },
  { id: 'thu-0930-mat-classical', day: 'thu', start: '09:30', classId: 'mat-classical', teacherId: 'ines-carvalho', status: 'running' },
  { id: 'thu-1830-reformer-sculpt', day: 'thu', start: '18:30', classId: 'reformer-sculpt', teacherId: 'ines-carvalho', status: 'running' },
  { id: 'thu-1945-mat-stretch', day: 'thu', start: '19:45', classId: 'mat-stretch', teacherId: 'maya-lindqvist', status: 'full' },

  // Friday (06:30–19:00)
  { id: 'fri-0700-reformer-sculpt', day: 'fri', start: '07:00', classId: 'reformer-sculpt', teacherId: 'ines-carvalho', status: 'running' },
  { id: 'fri-1230-mat-foundations', day: 'fri', start: '12:30', classId: 'mat-foundations', teacherId: 'tom-adeyemi', status: 'running' },
  {
    id: 'fri-1730-reformer-flow',
    day: 'fri',
    start: '17:30',
    classId: 'reformer-flow',
    teacherId: 'maya-lindqvist',
    status: 'cancelled',
    note: 'Teacher training — back next week',
  },

  // Saturday (08:00–14:00)
  { id: 'sat-0830-reformer-foundations', day: 'sat', start: '08:30', classId: 'reformer-foundations', teacherId: 'tom-adeyemi', status: 'running' },
  { id: 'sat-0945-reformer-flow', day: 'sat', start: '09:45', classId: 'reformer-flow', teacherId: 'maya-lindqvist', status: 'running' },
  { id: 'sat-1100-mat-classical', day: 'sat', start: '11:00', classId: 'mat-classical', teacherId: 'ines-carvalho', status: 'running' },
  { id: 'sat-1215-reformer-advanced', day: 'sat', start: '12:15', classId: 'reformer-advanced', teacherId: 'ines-carvalho', status: 'running' },

  // Sunday (09:00–13:00)
  { id: 'sun-0930-mat-stretch', day: 'sun', start: '09:30', classId: 'mat-stretch', teacherId: 'maya-lindqvist', status: 'running' },
  { id: 'sun-1045-reformer-foundations', day: 'sun', start: '10:45', classId: 'reformer-foundations', teacherId: 'tom-adeyemi', status: 'running' },
];

const CLOCK_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function toMinutes(clock: string): number {
  return Number(clock.slice(0, 2)) * 60 + Number(clock.slice(3, 5));
}

function formatMinutes(total: number): string {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function validateTimetable(
  sessions: readonly TimetableSession[] = timetable,
  knownClasses: readonly ClassType[] = classTypes,
  knownTeachers: readonly Teacher[] = teachers,
  hours: readonly OpeningHours[] = business.openingHours,
): void {
  const seen = new Set<string>();
  const classesById = new Map(knownClasses.map(item => [item.id, item]));
  const teachersById = new Map(knownTeachers.map(item => [item.id, item]));
  const hoursByDay = new Map(hours.map(item => [item.day, item]));

  for (const session of sessions) {
    if (!session.id || !ID_PATTERN.test(session.id)) {
      throw new Error(`session "${session.id}": id must be lowercase URL-safe`);
    }
    if (seen.has(session.id)) {
      throw new Error(`session "${session.id}": duplicate session id`);
    }
    seen.add(session.id);

    const dayInfo = DAY_META[session.day];
    if (!dayInfo) {
      throw new Error(`session "${session.id}": invalid day "${session.day}"`);
    }
    if (!CLOCK_PATTERN.test(session.start)) {
      throw new Error(`session "${session.id}": start "${session.start}" must be 24-hour HH:MM`);
    }

    const classType = classesById.get(session.classId);
    if (!classType) {
      throw new Error(`session "${session.id}": classId "${session.classId}" does not exist`);
    }

    const teacher = teachersById.get(session.teacherId);
    if (!teacher) {
      throw new Error(`session "${session.id}": teacherId "${session.teacherId}" does not exist`);
    }

    const dayHours = hoursByDay.get(dayInfo.full);
    if (!dayHours?.opens || !dayHours?.closes) {
      throw new Error(`session "${session.id}": studio is closed on ${dayInfo.full}`);
    }

    const startMin = toMinutes(session.start);
    const endMin = startMin + classType.durationMinutes;
    const opensMin = toMinutes(dayHours.opens);
    const closesMin = toMinutes(dayHours.closes);

    if (startMin < opensMin || startMin >= closesMin) {
      throw new Error(
        `session "${session.id}": start ${session.start} is outside ${dayInfo.full} studio hours (${dayHours.opens}–${dayHours.closes})`,
      );
    }
    if (endMin > closesMin) {
      throw new Error(
        `session "${session.id}": session ending at ${formatMinutes(endMin)} finishes after ${dayInfo.full} closing (${dayHours.closes})`,
      );
    }
  }
}

/** Neutral static fallback for Home "This week at a glance" (Monday's sessions in order). */
export function mondaySessions(sessions: readonly TimetableSession[] = timetable): TimetableSession[] {
  return sessions
    .filter(session => session.day === 'mon')
    .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
}

/**
 * Compute the next `count` upcoming sessions from a given timestamp in `timeZone` (Europe/London).
 * Wraps cleanly from Sunday evening back into Monday morning.
 */
export function upcomingSessions(
  sessions: readonly TimetableSession[],
  timeZone: string,
  now = new Date(),
  count = 6,
): TimetableSession[] {
  if (!timeZone || sessions.length === 0) return mondaySessions(sessions).slice(0, count);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return mondaySessions(sessions).slice(0, count);
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const dayIndex = DAYS.indexOf(part('weekday') as Day);
  if (dayIndex < 0) return mondaySessions(sessions).slice(0, count);

  const nowMinutesInWeek = dayIndex * 1440 + Number(part('hour')) * 60 + Number(part('minute'));
  const weekLength = 7 * 1440;

  return [...sessions]
    .map(session => {
      const sessionMinutesInWeek = DAY_META[session.day].index * 1440 + toMinutes(session.start);
      let delta = sessionMinutesInWeek - nowMinutesInWeek;
      if (delta < 0) delta += weekLength;
      return { session, delta };
    })
    .sort((a, b) => a.delta - b.delta)
    .slice(0, count)
    .map(entry => entry.session);
}
