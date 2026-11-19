import { coilPath } from './artwork';

const ROWS = [1, 2, 3, 4] as const;
const ROW_Y = (slot: number) => 3.6 + (slot - 1) * 5.6;
/* Precomputed: four short springs between an anchor plate and a spring bar,
   exactly like the bank under a reformer carriage. */
const SPRING = ROWS.map(slot => coilPath(5, 47, ROW_Y(slot), { turns: 6, rx: 1.9, ry: 1.7, lead: 4 }));

/**
 * Supporting visual element: spring intensity gauge. Four springs stacked like
 * a reformer's spring bank; the engaged ones are brass, the rest hairlines.
 * Always carries a text equivalent ("Intensity 3 of 4").
 */
export function SpringGauge({
  springs,
  showLabel = false,
  className = '',
}: {
  springs: 1 | 2 | 3 | 4;
  showLabel?: boolean;
  className?: string;
}) {
  const description = `Intensity ${springs} of 4`;
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        viewBox="0 0 52 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-[3.25rem] shrink-0"
        role="img"
        aria-label={description}
      >
        <line x1="1.5" y1="1" x2="1.5" y2="23" stroke="currentColor" strokeWidth="1.2" opacity="0.7" />
        <line x1="50.5" y1="1" x2="50.5" y2="23" stroke="var(--brass)" strokeWidth="1.4" />
        {ROWS.map(slot => {
          const active = slot <= springs;
          return (
            <path
              key={slot}
              d={SPRING[slot - 1]}
              stroke={active ? 'var(--brass)' : 'var(--line)'}
              strokeWidth={active ? 1.25 : 1}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
      </svg>
      {showLabel ? (
        <span className="mono-label text-muted">{springs}/4 springs</span>
      ) : (
        <span className="visually-hidden">{description}</span>
      )}
    </span>
  );
}
