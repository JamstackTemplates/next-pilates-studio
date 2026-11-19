/**
 * Class packs, memberships and private sessions for Long Line Pilates.
 *
 * Owner guide:
 * - Prices are stored as whole GBP pounds (`priceGBP`).
 * - Per-class prices are NEVER stored — they are derived with `perClassGBP()`.
 * - Setting `available: false` keeps the pack listed on Packs, muted, with "Not currently offered".
 * - Packs are arranged at the studio desk or by email reply; the website takes no payments.
 */

export type PackKind = 'intro' | 'pack' | 'membership' | 'private';
export type PackAppliesTo = 'reformer' | 'mat' | 'any';

export interface Pack {
  /** Stable URL-safe identifier. */
  id: string;
  /** Public pack or membership name. */
  name: string;
  /** Grouping on the Packs page. */
  kind: PackKind;
  /** Which class formats this option covers. */
  appliesTo: PackAppliesTo;
  /** Number of classes included, or null for unlimited memberships. */
  classes: number | null;
  /** Total price in whole GBP pounds. */
  priceGBP: number;
  /** Validity window in days from first use (or billing cycle for memberships). */
  validDays: number;
  /** Highlighted on the Home page hanging price tags (expect three featured packs). */
  featured: boolean;
  /** False keeps the option listed with "Not currently offered" text. */
  available: boolean;
  /** Short note shown beneath the pack name. */
  note: string;
}

export const packs: readonly Pack[] = [
  {
    id: 'intro-three',
    name: 'Intro Three',
    kind: 'intro',
    appliesTo: 'any',
    classes: 3,
    priceGBP: 60,
    validDays: 30,
    featured: true,
    available: true,
    note: 'New clients only. Three reformer or mat classes within 30 days of your first visit.',
  },
  {
    id: 'reformer-single',
    name: 'Reformer drop-in',
    kind: 'pack',
    appliesTo: 'reformer',
    classes: 1,
    priceGBP: 34,
    validDays: 30,
    featured: false,
    available: true,
    note: 'Single reformer session, valid 30 days.',
  },
  {
    id: 'reformer-five',
    name: 'Reformer 5',
    kind: 'pack',
    appliesTo: 'reformer',
    classes: 5,
    priceGBP: 155,
    validDays: 60,
    featured: false,
    available: true,
    note: 'Five reformer sessions, valid two months.',
  },
  {
    id: 'reformer-ten',
    name: 'Reformer 10',
    kind: 'pack',
    appliesTo: 'reformer',
    classes: 10,
    priceGBP: 290,
    validDays: 120,
    featured: true,
    available: true,
    note: 'Ten reformer sessions, valid four months.',
  },
  {
    id: 'mat-single',
    name: 'Mat drop-in',
    kind: 'pack',
    appliesTo: 'mat',
    classes: 1,
    priceGBP: 20,
    validDays: 30,
    featured: false,
    available: true,
    note: 'Single mat session, valid 30 days.',
  },
  {
    id: 'mat-ten',
    name: 'Mat 10',
    kind: 'pack',
    appliesTo: 'mat',
    classes: 10,
    priceGBP: 170,
    validDays: 120,
    featured: false,
    available: true,
    note: 'Ten mat sessions, valid four months.',
  },
  {
    id: 'membership-eight',
    name: 'Eight a Month',
    kind: 'membership',
    appliesTo: 'any',
    classes: 8,
    priceGBP: 199,
    validDays: 30,
    featured: true,
    available: true,
    note: 'Eight reformer or mat classes per 30-day cycle. Pause for injury or pregnancy.',
  },
  {
    id: 'membership-unlimited',
    name: 'Unlimited',
    kind: 'membership',
    appliesTo: 'any',
    classes: null,
    priceGBP: 285,
    validDays: 30,
    featured: false,
    available: true,
    note: 'Unlimited reformer and mat classes per 30-day cycle, one class per day.',
  },
  {
    id: 'private-single',
    name: 'Private session',
    kind: 'private',
    appliesTo: 'any',
    classes: 1,
    priceGBP: 85,
    validDays: 60,
    featured: false,
    available: true,
    note: '55-minute one-to-one on reformer and mat. Ideal for rehab, pregnancy or focused goals.',
  },
  {
    id: 'private-duet',
    name: 'Duet (two people)',
    kind: 'private',
    appliesTo: 'any',
    classes: 1,
    priceGBP: 110,
    validDays: 60,
    featured: false,
    available: true,
    note: '55-minute shared private session for two friends or partners (£55 each).',
  },
];

/** Derived per-class price in GBP, or null for unlimited memberships. */
export function perClassGBP(pack: Pick<Pack, 'classes' | 'priceGBP'>): number | null {
  if (pack.classes === null || pack.classes <= 0) return null;
  return pack.priceGBP / pack.classes;
}

/** Format GBP: whole pounds without decimals (£29), fractional to two decimals (£24.88). */
export function formatGBP(amount: number): string {
  const rounded = Math.round(amount * 100) / 100;
  return Number.isInteger(rounded) ? `£${rounded}` : `£${rounded.toFixed(2)}`;
}

/**
 * Lowest per-class price (rounded up to whole pounds) among available packs and memberships,
 * excluding single drop-ins (`classes === 1`), intro offers and private sessions.
 *
 * Pass `{ includesReformer: true }` to restrict to options that cover Reformer (`reformer` or `any`).
 */
export function lowestPerClassGBP(
  items: readonly Pack[] = packs,
  options: { includesReformer?: boolean } = {},
): number {
  const candidates = items.filter(pack => {
    if (!pack.available) return false;
    if (pack.kind !== 'pack' && pack.kind !== 'membership') return false;
    if (pack.classes === null || pack.classes <= 1) return false;
    if (options.includesReformer && pack.appliesTo === 'mat') return false;
    return true;
  });
  if (candidates.length === 0) {
    throw new Error('packs: at least one available multi-class pack or membership is required');
  }
  const lowest = Math.min(...candidates.map(pack => perClassGBP(pack)!));
  return Math.ceil(lowest);
}

const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validatePacks(items: readonly Pack[] = packs): void {
  const seen = new Set<string>();
  for (const pack of items) {
    if (!pack.id || !ID_PATTERN.test(pack.id)) {
      throw new Error(`pack "${pack.id || pack.name}": id must be lowercase URL-safe`);
    }
    if (seen.has(pack.id)) {
      throw new Error(`pack "${pack.id}": duplicate pack id`);
    }
    seen.add(pack.id);
    if (!pack.name.trim()) throw new Error(`pack "${pack.id}": name is required`);
    if (!pack.note.trim()) throw new Error(`pack "${pack.id}": note is required`);
    if (typeof pack.priceGBP !== 'number' || !Number.isFinite(pack.priceGBP) || pack.priceGBP <= 0) {
      throw new Error(`pack "${pack.id}": priceGBP (${pack.priceGBP}) must be positive`);
    }
    if (pack.classes !== null && (!Number.isInteger(pack.classes) || pack.classes <= 0)) {
      throw new Error(`pack "${pack.id}": classes must be a positive integer or null`);
    }
    if (!Number.isInteger(pack.validDays) || pack.validDays <= 0) {
      throw new Error(`pack "${pack.id}": validDays must be a positive integer`);
    }
  }
}
