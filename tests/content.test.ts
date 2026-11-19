import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';
import { business } from '../content/business.ts';
import { classTypes, validateClasses } from '../content/classes.ts';
import {
  formatGBP,
  lowestPerClassGBP,
  packs,
  perClassGBP,
  validatePacks,
} from '../content/packs.ts';
import { teachers, validateTeachers } from '../content/teachers.ts';
import {
  mondaySessions,
  timetable,
  upcomingSessions,
  validateTimetable,
} from '../content/timetable.ts';
import { validateHours } from '../lib/hours.ts';
import { route } from '../lib/paths.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

test('business content has actionable required fields and valid studio hours', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'phone'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.address.formatted.includes('NW1 7TX'), 'business.address: postcode required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 4, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
  assert.doesNotThrow(() => validateHours(business.openingHours));
});

test('all real studio collections pass validation', () => {
  assert.doesNotThrow(() => validateClasses(classTypes));
  assert.doesNotThrow(() => validateTeachers(teachers, classTypes));
  assert.doesNotThrow(() => validateTimetable(timetable, classTypes, teachers, business.openingHours));
  assert.doesNotThrow(() => validatePacks(packs));
});

test('class validation fails with item-specific errors for duplicate IDs, bad springs and excess capacity', () => {
  // Duplicate ID
  assert.throws(
    () => validateClasses([...classTypes, classTypes[0]]),
    /reformer-foundations.*duplicate/i,
  );
  // Springs outside 1–4
  for (const badSprings of [0, 5, 2.5]) {
    assert.throws(
      () =>
        validateClasses(
          classTypes.map(item =>
            item.id === 'reformer-flow' ? { ...item, springs: badSprings as never } : item,
          ),
        ),
      /reformer-flow.*springs/i,
    );
  }
  // Capacity above 8 (reformer) or 12 (mat)
  assert.throws(
    () =>
      validateClasses(
        classTypes.map(item => (item.id === 'reformer-sculpt' ? { ...item, capacity: 9 } : item)),
      ),
    /reformer-sculpt.*capacity.*8/i,
  );
  assert.throws(
    () =>
      validateClasses(
        classTypes.map(item => (item.id === 'mat-classical' ? { ...item, capacity: 13 } : item)),
      ),
    /mat-classical.*capacity.*12/i,
  );
});

test('teacher validation fails with item-specific errors for duplicate IDs and missing classes', () => {
  assert.throws(
    () => validateTeachers([...teachers, teachers[0]], classTypes),
    /ines-carvalho.*duplicate/i,
  );
  assert.throws(
    () =>
      validateTeachers(
        teachers.map(teacher =>
          teacher.id === 'tom-adeyemi'
            ? { ...teacher, teaches: [...teacher.teaches, 'reformer-aerial'] }
            : teacher,
        ),
        classTypes,
      ),
    /tom-adeyemi.*reformer-aerial/i,
  );
});

test('timetable validation fails with item-specific errors for duplicate IDs, missing refs and hours violations', () => {
  // Duplicate session ID
  assert.throws(
    () => validateTimetable([...timetable, timetable[0]], classTypes, teachers, business.openingHours),
    /mon-0700-reformer-flow.*duplicate/i,
  );
  // Missing classId
  assert.throws(
    () =>
      validateTimetable(
        timetable.map(session =>
          session.id === 'tue-0930-mat-stretch' ? { ...session, classId: 'nonexistent-class' } : session,
        ),
        classTypes,
        teachers,
        business.openingHours,
      ),
    /tue-0930-mat-stretch.*nonexistent-class/i,
  );
  // Missing teacherId
  assert.throws(
    () =>
      validateTimetable(
        timetable.map(session =>
          session.id === 'wed-0700-reformer-foundations'
            ? { ...session, teacherId: 'unknown-teacher' }
            : session,
        ),
        classTypes,
        teachers,
        business.openingHours,
      ),
    /wed-0700-reformer-foundations.*unknown-teacher/i,
  );
  // Start before studio opens (Sun opens at 09:00)
  assert.throws(
    () =>
      validateTimetable(
        timetable.map(session =>
          session.id === 'sun-0930-mat-stretch' ? { ...session, start: '08:30' } : session,
        ),
        classTypes,
        teachers,
        business.openingHours,
      ),
    /sun-0930-mat-stretch.*outside Sunday/i,
  );
  // Starts inside studio hours but finishes after closing (Fri closes 19:00, reformer-flow is 50 min)
  assert.throws(
    () =>
      validateTimetable(
        timetable.map(session =>
          session.id === 'fri-1730-reformer-flow' ? { ...session, start: '18:30' } : session,
        ),
        classTypes,
        teachers,
        business.openingHours,
      ),
    /fri-1730-reformer-flow.*19:20.*after Friday closing/i,
  );
});

test('pack validation catches duplicate IDs and non-positive prices; per-class prices are derived', () => {
  assert.throws(() => validatePacks([...packs, packs[0]]), /intro-three.*duplicate/i);
  for (const badPrice of [0, -15]) {
    assert.throws(
      () =>
        validatePacks(
          packs.map(pack => (pack.id === 'reformer-five' ? { ...pack, priceGBP: badPrice } : pack)),
        ),
      /reformer-five.*priceGBP/i,
    );
  }

  // Per-class derivation
  const intro = packs.find(p => p.id === 'intro-three')!;
  const eight = packs.find(p => p.id === 'membership-eight')!;
  const unlimited = packs.find(p => p.id === 'membership-unlimited')!;
  assert.equal(perClassGBP(intro), 20);
  assert.equal(formatGBP(perClassGBP(eight)!), '£24.88');
  assert.equal(perClassGBP(unlimited), null);

  // Lowest per-class headline:
  // All available multi-class packs & memberships -> Mat 10 (£170 / 10 = £17)
  assert.equal(lowestPerClassGBP(packs), 17);
  // Reformer / all-access multi-class packs & memberships -> Eight a Month (£199 / 8 = £24.875 -> £25)
  assert.equal(lowestPerClassGBP(packs, { includesReformer: true }), 25);
  // Marking Mat 10 unavailable raises overall lowest to £25 automatically
  assert.equal(
    lowestPerClassGBP(packs.map(pack => (pack.id === 'mat-ten' ? { ...pack, available: false } : pack))),
    25,
  );
});

test('owner edit simulation: retime Wed 18:15 -> 18:30, Fri 17:30 cancelled, Reformer 10 -> £295', () => {
  const editedTimetable = timetable.map(session => {
    if (session.id === 'wed-1815-reformer-advanced') return { ...session, start: '18:30' };
    if (session.id === 'fri-1730-reformer-flow') {
      return { ...session, status: 'cancelled' as const, note: 'Teacher training — back next week' };
    }
    return session;
  });
  const editedPacks = packs.map(pack =>
    pack.id === 'reformer-ten' ? { ...pack, priceGBP: 295 } : pack,
  );

  assert.doesNotThrow(() => validateTimetable(editedTimetable, classTypes, teachers, business.openingHours));
  assert.doesNotThrow(() => validatePacks(editedPacks));
  const reformerTen = editedPacks.find(pack => pack.id === 'reformer-ten')!;
  assert.equal(formatGBP(perClassGBP(reformerTen)!), '£29.50');
});

test('upcomingSessions computes the next six London sessions and wraps across Sunday into Monday', () => {
  const monday = mondaySessions(timetable);
  assert.equal(monday.length, 4);
  assert.equal(monday[0].id, 'mon-0700-reformer-flow');

  // Sunday 10:00 GMT in London (2026-11-22T10:00:00Z): Sun 10:45 is first, then Monday's 4, then Tue 06:45
  const nextSix = upcomingSessions(timetable, 'Europe/London', new Date('2026-11-22T10:00:00Z'), 6);
  assert.equal(nextSix.length, 6);
  assert.deepEqual(
    nextSix.map(session => session.id),
    [
      'sun-1045-reformer-foundations',
      'mon-0700-reformer-flow',
      'mon-1230-mat-foundations',
      'mon-1815-reformer-sculpt',
      'mon-1930-reformer-foundations',
      'tue-0645-reformer-sculpt',
    ],
  );
});

test('route() preserves query parameters and hashes while normalizing trailing slashes', () => {
  assert.equal(route('/classes'), '/classes/');
  assert.equal(route('/classes/?level=foundations'), '/classes/?level=foundations');
  assert.equal(route('/classes?level=foundations#timetable'), '/classes/?level=foundations#timetable');
  assert.equal(route('/'), '/');
});

test('ExerciseGym structured data derives from content and escapes closing script tags', () => {
  const data = businessStructuredData();
  assert.equal(data['@type'], 'ExerciseGym');
  assert.equal(data.name, 'Long Line Pilates');
  assert.equal(data.priceRange, '££');
  assert.equal(data.address.postalCode, 'NW1 7TX');
  assert.equal(data.openingHoursSpecification.length, 7);

  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

test('site copy avoids booking/payment claim words ("booked", "reserved", "confirmed", "buy now")', () => {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const forbidden = /\b(booked|reserved|confirmed|buy now)\b/i;
  const targets = ['app', 'components', 'content'];

  function walk(dir: string): string[] {
    const out: string[] = [];
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      const info = statSync(full);
      if (info.isDirectory()) out.push(...walk(full));
      else if (/\.(ts|tsx)$/.test(entry)) out.push(full);
    }
    return out;
  }

  for (const dir of targets) {
    for (const filePath of walk(join(root, dir))) {
      const source = readFileSync(filePath, 'utf8')
        // Strip JS/TS comments so developer guidance comments don't trigger false positives
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*$/gm, '');
      const match = source.match(forbidden);
      assert.equal(match, null, `${filePath} contains forbidden wording "${match?.[0]}"`);
    }
  }
});
