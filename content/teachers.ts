import { classTypes, type ClassType } from './classes.ts';

/**
 * Teachers at Long Line Pilates.
 *
 * Owner guide:
 * - `id` must be unique and URL-safe.
 * - Every ID in `teaches` must exist in `content/classes.ts`.
 */

export interface Teacher {
  /** Stable identifier referenced by timetable sessions and portrait artwork. */
  id: string;
  /** Display name. */
  name: string;
  /** Short first name used in compact timetable rows. */
  shortName: string;
  /** Role or specialism shown in mono under the name. */
  role: string;
  /** Two-sentence biography. */
  bio: string;
  /** Class-type IDs this teacher leads. */
  teaches: readonly string[];
}

export const teachers: readonly Teacher[] = [
  {
    id: 'ines-carvalho',
    name: 'Inès Carvalho',
    shortName: 'Inès',
    role: 'Founder · Classical & Advanced',
    bio: 'Inès founded Long Line after fourteen years of teaching classically across Lisbon and London. She leads Advanced Reformer, Sculpt and Classical Mat with a quiet eye for alignment and unhurried spring transitions.',
    teaches: ['reformer-advanced', 'reformer-sculpt', 'mat-classical'],
  },
  {
    id: 'tom-adeyemi',
    name: 'Tom Adeyemi',
    shortName: 'Tom',
    role: 'Foundations & Post-injury',
    bio: 'A former NHS physiotherapy assistant, Tom brings steady anatomical clarity to every Foundations class. He works closely with beginners and clients returning after injury or time away from movement.',
    teaches: ['reformer-foundations', 'mat-foundations'],
  },
  {
    id: 'maya-lindqvist',
    name: 'Maya Lindqvist',
    shortName: 'Maya',
    role: 'Flow, Stretch & Pre/Post-natal',
    bio: 'Maya specialises in pre- and post-natal Pilates alongside breath-led mobility for desk workers and runners. Her Flow and Long Stretch sessions balance calm pacing with sustained, intelligent effort.',
    teaches: ['reformer-flow', 'mat-stretch'],
  },
];

export const teacherById = new Map<string, Teacher>(teachers.map(teacher => [teacher.id, teacher]));

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateTeachers(
  items: readonly Teacher[] = teachers,
  knownClasses: readonly ClassType[] = classTypes,
): void {
  const seen = new Set<string>();
  const classIds = new Set(knownClasses.map(item => item.id));
  for (const teacher of items) {
    if (!teacher.id || !ID_PATTERN.test(teacher.id)) {
      throw new Error(`teacher "${teacher.id || teacher.name}": id must be lowercase URL-safe`);
    }
    if (seen.has(teacher.id)) {
      throw new Error(`teacher "${teacher.id}": duplicate teacher id`);
    }
    seen.add(teacher.id);
    if (!teacher.name.trim()) throw new Error(`teacher "${teacher.id}": name is required`);
    if (!teacher.role.trim()) throw new Error(`teacher "${teacher.id}": role is required`);
    if (!teacher.bio.trim()) throw new Error(`teacher "${teacher.id}": bio is required`);
    if (!teacher.teaches.length) throw new Error(`teacher "${teacher.id}": teaches must list at least one class id`);
    for (const classId of teacher.teaches) {
      if (!classIds.has(classId)) {
        throw new Error(`teacher "${teacher.id}": teaches references missing class "${classId}"`);
      }
    }
  }
}
