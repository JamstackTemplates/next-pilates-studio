/**
 * Class types offered at Long Line Pilates.
 *
 * Owner guide:
 * - `id` must be lowercase URL-safe (`a-z`, `0-9`, `-`) and unique.
 * - `springs` is an integer from 1 (gentlest) to 4 (strongest).
 * - `capacity` may not exceed 8 for reformer classes or 12 for mat classes.
 */

export type ClassFormat = 'reformer' | 'mat';
export type ClassLevel = 'foundations' | 'open' | 'advanced';

export interface ClassType {
  /** Stable URL-safe identifier referenced by teachers and timetable sessions. */
  id: string;
  /** Public class name shown across the site. */
  name: string;
  /** Apparatus format: reformer (max 8) or mat (max 12). */
  format: ClassFormat;
  /** Experience level used for guidance and timetable filtering. */
  level: ClassLevel;
  /** Intensity rating from 1 to 4, displayed as coiled springs. */
  springs: 1 | 2 | 3 | 4;
  /** Length of the session in minutes. */
  durationMinutes: number;
  /** Maximum number of people in the room (<= 8 reformer, <= 12 mat). */
  capacity: number;
  /** One-sentence description of what happens in the class. */
  summary: string;
  /** Two or three short notes describing who the class suits. */
  goodFor: readonly string[];
}

export const MAX_CAPACITY: Record<ClassFormat, number> = {
  reformer: 8,
  mat: 12,
};

export const LEVEL_LABELS: Record<ClassLevel, string> = {
  foundations: 'Foundations',
  open: 'Open',
  advanced: 'Advanced',
};

export const FORMAT_LABELS: Record<ClassFormat, string> = {
  reformer: 'Reformer',
  mat: 'Mat',
};

export const classTypes: readonly ClassType[] = [
  {
    id: 'reformer-foundations',
    name: 'Reformer Foundations',
    format: 'reformer',
    level: 'foundations',
    springs: 1,
    durationMinutes: 50,
    capacity: 6,
    summary:
      'An unhurried introduction to the carriage, springs and straps, capped at six reformers so every set-up is checked individually.',
    goodFor: ['First-time reformer clients', 'Returning after a break or injury', 'Building confidence with spring settings'],
  },
  {
    id: 'reformer-flow',
    name: 'Reformer Flow',
    format: 'reformer',
    level: 'open',
    springs: 2,
    durationMinutes: 50,
    capacity: 8,
    summary:
      'Steady, continuous sequences linking footwork, long spine work and controlled unilateral strength from head to heel.',
    goodFor: ['Regular movers after two or three Foundations sessions', 'Stiff desk-bound backs and shoulders', 'Balanced full-body conditioning'],
  },
  {
    id: 'reformer-sculpt',
    name: 'Reformer Sculpt',
    format: 'reformer',
    level: 'open',
    springs: 3,
    durationMinutes: 50,
    capacity: 8,
    summary:
      'Slower tempos under heavier and lighter spring loads to challenge deep stability, glute strength and shoulder endurance.',
    goodFor: ['Runners and climbers cross-training', 'Clients wanting stronger resistance work', 'Precision under slow load'],
  },
  {
    id: 'reformer-advanced',
    name: 'Advanced Reformer',
    format: 'reformer',
    level: 'advanced',
    springs: 4,
    durationMinutes: 55,
    capacity: 8,
    summary:
      'Classical repertoire with long-lever balances, standing carriage work and seamless spring transitions for experienced practitioners.',
    goodFor: ['Confident reformer practitioners', 'Refining classical control and rhythm', 'Full-body balance and power'],
  },
  {
    id: 'mat-foundations',
    name: 'Mat Foundations',
    format: 'mat',
    level: 'foundations',
    springs: 1,
    durationMinutes: 45,
    capacity: 12,
    summary:
      'Breath, pelvic alignment and spinal articulation using bodyweight, small balls and bands at a calm, methodical pace.',
    goodFor: ['Complete beginners to Pilates', 'Learning breath and centre from scratch', 'Lunchtime reset for stiff backs'],
  },
  {
    id: 'mat-classical',
    name: 'Classical Mat',
    format: 'mat',
    level: 'open',
    springs: 2,
    durationMinutes: 50,
    capacity: 12,
    summary:
      'The traditional mat order taught with clear progressions and hands-off verbal cueing to build self-supported strength.',
    goodFor: ['Building a practice you can repeat at home', 'Deep core endurance without springs', 'Steady weekly rhythm'],
  },
  {
    id: 'mat-stretch',
    name: 'Long Stretch & Release',
    format: 'mat',
    level: 'open',
    springs: 1,
    durationMinutes: 45,
    capacity: 12,
    summary:
      'Slow thoracic mobility, hip opening and supported myofascial release on the mat with rollers, blocks and long exhales.',
    goodFor: ['Tight hips, hamstrings and upper backs', 'Recovery between harder training days', 'Pre- and post-natal friendly pace'],
  },
];

export const classTypeById = new Map<string, ClassType>(classTypes.map(item => [item.id, item]));

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateClasses(items: readonly ClassType[] = classTypes): void {
  const seen = new Set<string>();
  for (const item of items) {
    if (!item.id || !ID_PATTERN.test(item.id)) {
      throw new Error(`class "${item.id || item.name}": id must be lowercase URL-safe (letters, digits, hyphens)`);
    }
    if (seen.has(item.id)) {
      throw new Error(`class "${item.id}": duplicate class id`);
    }
    seen.add(item.id);
    if (!item.name.trim()) throw new Error(`class "${item.id}": name is required`);
    if (!item.summary.trim()) throw new Error(`class "${item.id}": summary is required`);
    if (!Number.isInteger(item.springs) || item.springs < 1 || item.springs > 4) {
      throw new Error(`class "${item.id}": springs (${item.springs}) must be an integer between 1 and 4`);
    }
    if (!Number.isInteger(item.durationMinutes) || item.durationMinutes <= 0) {
      throw new Error(`class "${item.id}": durationMinutes must be a positive integer`);
    }
    const capLimit = MAX_CAPACITY[item.format];
    if (!Number.isInteger(item.capacity) || item.capacity < 1 || item.capacity > capLimit) {
      throw new Error(`class "${item.id}": capacity (${item.capacity}) exceeds ${item.format} limit of ${capLimit}`);
    }
    if (!item.goodFor.length || item.goodFor.some(entry => !entry.trim())) {
      throw new Error(`class "${item.id}": goodFor must contain non-empty entries`);
    }
  }
}
