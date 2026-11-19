import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const sampleHours: OpeningHours[] = DAYS.map(day =>
  day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' },
);
const atSample = (date: string, zone = 'America/New_York') =>
  openingLabel(sampleHours, zone, new Date(date));

const atLondon = (date: string) =>
  openingLabel(business.openingHours, 'Europe/London', new Date(date));

test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(atSample('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(atSample('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});

test('Long Line Pilates London schedule boundaries (Fri 18:59/19:00 and Sun 08:59/09:00)', () => {
  // Friday 2026-11-20 (GMT, UTC+0): closes at 19:00
  assert.equal(atLondon('2026-11-20T18:59:00Z'), 'Open now · until 19:00');
  assert.equal(atLondon('2026-11-20T19:00:00Z'), 'Closed · opens Saturday at 08:00');

  // Sunday 2026-11-22 (GMT, UTC+0): opens at 09:00, closes at 13:00
  assert.equal(atLondon('2026-11-22T08:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atLondon('2026-11-22T09:00:00Z'), 'Open now · until 13:00');
  assert.equal(atLondon('2026-11-22T13:00:00Z'), 'Closed · opens Monday at 06:30');
});

test('Europe/London DST transitions (last Sunday of March and October) preserve local opening times', () => {
  // Spring forward: Sunday 29 March 2026 (BST, UTC+1 after 01:00 UTC)
  // 07:59 UTC = 08:59 BST (closed); 08:00 UTC = 09:00 BST (open until 13:00)
  assert.equal(atLondon('2026-03-29T07:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atLondon('2026-03-29T08:00:00Z'), 'Open now · until 13:00');
  assert.equal(atLondon('2026-03-29T12:00:00Z'), 'Closed · opens Monday at 06:30');

  // Fall back: Sunday 25 October 2026 (GMT, UTC+0 after 01:00 UTC)
  // 08:59 UTC = 08:59 GMT (closed); 09:00 UTC = 09:00 GMT (open until 13:00)
  assert.equal(atLondon('2026-10-25T08:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(atLondon('2026-10-25T09:00:00Z'), 'Open now · until 13:00');
  assert.equal(atLondon('2026-10-25T13:00:00Z'), 'Closed · opens Monday at 06:30');
});

test('closed weekdays and week wrap find the next service', () => {
  assert.equal(atSample('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(atSample('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});

test('missing/invalid zones stay neutral', () => {
  assert.equal(atSample('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(atSample('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
});

test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(sampleHours));
  assert.doesNotThrow(() => validateHours(business.openingHours));
  for (const opens of ['24:00', '9:00', '18:00']) {
    assert.throws(
      () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(sampleHours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(sampleHours.map(x => (x.day === 'Tuesday' ? { ...x, closes: undefined } : x))),
    /Tuesday/,
  );
});
