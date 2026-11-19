import type { OpeningHours } from '../lib/hours.ts';

/**
 * Shared business details for Long Line Pilates.
 *
 * Frequently edited owner details live here and feed pages, metadata and
 * Schema.org structured data from one source. Rename in both `business.name`
 * and `site.config.json`'s `name`.
 */
export interface BusinessAddress {
  /** Suite or studio unit and street address. */
  streetAddress: string;
  /** City or town. */
  addressLocality: string;
  /** UK postcode. */
  postalCode: string;
  /** Two-letter ISO country code for Schema.org. */
  addressCountry: string;
  /** Single-line formatted address for display and Google Maps queries. */
  formatted: string;
  /** Plain-English landmark description for local visitors. */
  landmark: string;
  /** Public transport directions. */
  directions: string;
}

export interface HoursRow {
  /** Display day or range label, e.g. "Mon–Thu". */
  label: string;
  /** Local opening and closing range, e.g. "06:30–21:00". */
  hours: string;
}

export interface Business {
  /** Public studio name; also update site.config.json when renaming. */
  name: string;
  /** Short editorial lead line for metadata and fallback copy. */
  tagline: string;
  /** Plain-text description used in metadata and structured data. */
  introduction: string;
  /** Public studio email address, always shown beside the enquiry form. */
  email: string;
  /** Public studio telephone number. */
  phone: string;
  /** Studio premises and transport directions. */
  address: BusinessAddress;
  /** Schema.org priceRange indicator. */
  priceRange: string;
  /** Price in GBP of studio grip socks sold at reception. */
  gripSocksPriceGBP: number;
  /** Seven same-day weekday intervals in local studio time (Europe/London). */
  openingHours: readonly OpeningHours[];
  /** Grouped opening hours for compact display tables. */
  hoursSummary: readonly HoursRow[];
  /** Contact guidance; the hosted Jamstacks form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** Honest enquiry intro; never promises instant booking or payment. */
    introduction: string;
    /** Prompt list shown under the form so visitors write helpful messages. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Long Line Pilates',
  tagline: 'Length, slowly built.',
  introduction:
    'Small-group reformer and mat Pilates at the foot of Primrose Hill, with class packs and a clear guide to your first session.',
  email: 'hello@longlinepilates.example',
  phone: '020 7946 0418',
  address: {
    streetAddress: "Studio 2, 14 Regent's Park Road",
    addressLocality: 'London',
    postalCode: 'NW1 7TX',
    addressCountry: 'GB',
    formatted: "Studio 2, 14 Regent's Park Road, London NW1 7TX",
    landmark: 'At the foot of Primrose Hill, two minutes from the park gate.',
    directions: 'Chalk Farm Underground, 6 min walk; buses 31, 168, 274.',
  },
  priceRange: '££',
  gripSocksPriceGBP: 8,
  openingHours: [
    { day: 'Monday', opens: '06:30', closes: '21:00' },
    { day: 'Tuesday', opens: '06:30', closes: '21:00' },
    { day: 'Wednesday', opens: '06:30', closes: '21:00' },
    { day: 'Thursday', opens: '06:30', closes: '21:00' },
    { day: 'Friday', opens: '06:30', closes: '19:00' },
    { day: 'Saturday', opens: '08:00', closes: '14:00' },
    { day: 'Sunday', opens: '09:00', closes: '13:00' },
  ],
  hoursSummary: [
    { label: 'Mon–Thu', hours: '06:30–21:00' },
    { label: 'Fri', hours: '06:30–19:00' },
    { label: 'Sat', hours: '08:00–14:00' },
    { label: 'Sun', hours: '09:00–13:00' },
  ],
  enquiries: {
    title: 'Ask about a class or pack',
    introduction:
      "Write to enquire about your first class, an intro pack, a private session, or anything your teacher should know before you arrive. We'll reply to arrange a place.",
    usefulToInclude: [
      "Which class or pack you're interested in",
      'Preferred days and times',
      'Any injuries, conditions or pregnancy the teacher should know about',
      "Whether you've done Pilates before",
    ],
  },
};
