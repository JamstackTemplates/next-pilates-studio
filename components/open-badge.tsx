'use client';

import { useEffect, useState } from 'react';
import { openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Studio open/closed indicator computed in the browser using the configured IANA zone
 * (Europe/London) and refreshed every minute. Static/no-JS HTML stays neutral ("Studio hours").
 */
export function OpenBadge({
  hours,
  onDark = false,
  className = '',
}: {
  hours: readonly OpeningHours[];
  onDark?: boolean;
  className?: string;
}) {
  const [label, setLabel] = useState('Studio hours');

  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  const isOpen = label.startsWith('Open now');

  return (
    <span
      className={`inline-flex items-center gap-2 border px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] ${
        onDark
          ? 'border-band-line bg-band-surface text-band-ink'
          : 'border-line bg-raised text-ink'
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 rounded-full ${
          isOpen ? 'bg-accent' : 'bg-brass'
        }`}
      />
      <span>{label}</span>
    </span>
  );
}
