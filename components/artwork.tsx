import type { SVGProps } from 'react';

type ArtProps = Omit<SVGProps<SVGSVGElement>, 'children'> & {
  /** Accessible description for informative artwork; omit for decorative pieces (sets aria-hidden). */
  label?: string;
};

function a11yProps(label?: string) {
  return label
    ? ({ role: 'img', 'aria-label': label } as const)
    : ({ 'aria-hidden': true, focusable: 'false' } as const);
}

/* ---------------------------------------------------------------------------
   Shared geometry
   --------------------------------------------------------------------------- */

/**
 * A coiled spring drawn in side elevation as a prolate cycloid, so each turn of
 * steel reads as a small loop rather than a zig-zag. Returns an SVG path string.
 */
export function coilPath(
  x1: number,
  x2: number,
  y: number,
  { turns, rx, ry, lead = 0 }: { turns: number; rx: number; ry: number; lead?: number },
) {
  const start = x1 + lead;
  const end = x2 - lead;
  const total = Math.PI * 2 * turns;
  const a = (end - start) / total;
  const steps = Math.max(24, Math.round(turns * 28));
  const points: string[] = [];
  if (lead) points.push(`${x1} ${y}`);
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * total;
    const px = start + a * t - rx * Math.sin(t);
    const py = y - ry * Math.cos(t);
    points.push(`${px.toFixed(2)} ${py.toFixed(2)}`);
  }
  if (lead) points.push(`${x2} ${y}`);
  return `M${points[0]} L${points.slice(1).join(' L')}`;
}

/**
 * Section motif — "Plinth"
 * A low plaster plinth with a single-line sculptural torso cast resting on it.
 * Used beside Principles on Home and beside Private sessions on Packs.
 */
export function PlinthTorsoArt({
  label = 'Single-line sculptural torso resting on a low plaster plinth',
  className = '',
  ...rest
}: ArtProps) {
  return (
    <svg
      viewBox="0 0 280 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps(label)}
      {...rest}
    >
      {/* Background plaster relief block */}
      <rect x="44" y="28" width="192" height="226" fill="var(--surface)" />

      {/* Plinth base */}
      <rect x="26" y="254" width="228" height="22" fill="var(--raised)" stroke="currentColor" strokeWidth="1.35" />
      <rect x="42" y="276" width="196" height="44" fill="var(--surface)" stroke="currentColor" strokeWidth="1.35" />
      <line x1="12" y1="320" x2="268" y2="320" stroke="var(--line)" strokeWidth="1.2" />

      {/* Vertical brass centre axis */}
      <line x1="140" y1="42" x2="140" y2="254" stroke="var(--brass)" strokeWidth="1.2" strokeDasharray="3 5" />
      <circle cx="140" cy="42" r="2.5" fill="var(--brass)" />

      {/* Continuous-line sculptural torso cast */}
      <path
        d="M124 72
           C124 88 122 98 104 106
           C88 113 84 128 88 148
           C92 168 102 182 104 202
           C105 222 98 238 96 254
           M156 72
           C156 88 158 98 176 106
           C192 113 196 128 192 148
           C188 168 178 182 176 202
           C175 222 182 238 184 254
           M106 112
           C124 122 156 122 174 112
           M112 166
           C128 172 152 172 168 166"
        stroke="currentColor"
        strokeWidth="1.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Brass plumb ring at centre / powerhouse */}
      <circle cx="140" cy="184" r="6" stroke="var(--brass)" strokeWidth="1.35" />
    </svg>
  );
}

/**
 * Divider — "Rail"
 * Full-width horizontal hairline with two bolt dots and a brass carriage-wheel tick.
 */
export function RailDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1200 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-full"
        preserveAspectRatio="none"
      >
        <line x1="0" y1="12" x2="1200" y2="12" stroke="var(--line)" strokeWidth="1" />
        {/* Left & right bolt dots */}
        <circle cx="32" cy="12" r="2.8" fill="var(--brass)" />
        <circle cx="1168" cy="12" r="2.8" fill="var(--brass)" />
        {/* Brass carriage rail accent segment */}
        <line x1="210" y1="12" x2="360" y2="12" stroke="var(--brass)" strokeWidth="1.5" />
        {/* Carriage wheel tick */}
        <circle cx="285" cy="12" r="5" fill="var(--bg)" stroke="var(--brass)" strokeWidth="1.4" />
        <line x1="285" y1="3" x2="285" y2="21" stroke="var(--brass)" strokeWidth="1" />
      </svg>
    </div>
  );
}

/**
 * Divider — "Coil"
 * A single stretched helical spring in brass spanning the column, anchored by square hooks.
 */
export function CoilDivider({
  className = '',
  label,
  turns = 26,
}: {
  className?: string;
  label?: string;
  /** Number of coils; fewer reads as more stretched. */
  turns?: number;
}) {
  return (
    <svg
      viewBox="0 0 1200 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`h-auto w-full ${className}`}
      {...a11yProps(label)}
    >
      {/* Wall mounts */}
      <rect x="1" y="14" width="14" height="20" fill="var(--raised)" stroke="currentColor" strokeWidth="1.3" />
      <rect x="1185" y="14" width="14" height="20" fill="var(--raised)" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8" cy="24" r="2" fill="var(--brass)" />
      <circle cx="1192" cy="24" r="2" fill="var(--brass)" />
      {/* One stretched spring between them */}
      <path
        d={coilPath(15, 1185, 24, { turns, rx: 13, ry: 9, lead: 110 })}
        stroke="var(--brass)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Packs PageHead motif — a price tag hanging from a stretched spring,
 * drawn to stand in the plaster niche.
 */
export function HangingTagArt({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 340" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true" focusable="false">
      {/* Spring hanging from the niche's plumb hook (coil drawn along x, turned upright) */}
      <g transform="translate(200 0) rotate(90)">
        <path
          d={coilPath(0, 208, 100, { turns: 13, rx: 4.5, ry: 13, lead: 22 })}
          stroke="var(--brass)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      {/* Tag: clipped corners, eyelet, engraved lines */}
      <path d="M78 220 H122 L140 238 V332 H60 V238 Z" fill="var(--raised)" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="miter" />
      <circle cx="100" cy="214" r="6" fill="var(--bg)" stroke="var(--brass)" strokeWidth="1.5" />
      <line x1="100" y1="208" x2="100" y2="226" stroke="var(--brass)" strokeWidth="1.5" />
      <line x1="76" y1="262" x2="124" y2="262" stroke="currentColor" strokeWidth="1.2" />
      <line x1="84" y1="280" x2="116" y2="280" stroke="var(--line)" strokeWidth="1.2" />
      <line x1="84" y1="292" x2="116" y2="292" stroke="var(--line)" strokeWidth="1.2" />
      <line x1="70" y1="312" x2="130" y2="312" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  );
}

/**
 * Format pair — Reformer (one-line side elevation)
 */
export function ReformerFormatArt({
  label = 'One-line drawing of a Pilates reformer',
  className = '',
  ...rest
}: ArtProps) {
  return (
    <svg
      viewBox="0 0 260 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps(label)}
      {...rest}
    >
      {/* Plaster ground shape */}
      <rect x="20" y="20" width="220" height="72" fill="var(--raised)" opacity="0.6" />
      {/* Frame */}
      <rect x="28" y="64" width="194" height="18" stroke="currentColor" strokeWidth="1.4" />
      <path d="M40 82 V104 M210 82 V104" stroke="currentColor" strokeWidth="1.4" />
      {/* Carriage */}
      <rect x="64" y="52" width="102" height="12" fill="var(--bg)" stroke="currentColor" strokeWidth="1.4" />
      {/* Headrest & shoulder block */}
      <path d="M68 52 L82 44 H94 V52" stroke="currentColor" strokeWidth="1.3" />
      <rect x="96" y="38" width="9" height="14" stroke="currentColor" strokeWidth="1.3" />
      {/* Riser & brass strap */}
      <line x1="36" y1="64" x2="36" y2="34" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="36" cy="34" r="3" stroke="var(--brass)" strokeWidth="1.4" />
      <path d="M39 36 C56 44 70 50 96 45" stroke="var(--brass)" strokeWidth="1.35" />
      {/* Brass springs */}
      <path
        d="M166 70 H174 L178 66 L183 74 L188 66 L193 74 L198 66 L203 70 H212"
        stroke="var(--brass)"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M166 76 H174 L178 72 L183 80 L188 72 L193 80 L198 72 L203 76 H212"
        stroke="var(--brass)"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Footbar */}
      <path d="M214 64 L228 28 H212" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="212" cy="28" r="2.8" fill="var(--bg)" stroke="currentColor" strokeWidth="1.3" />
      {/* Floor hairline */}
      <line x1="12" y1="104" x2="248" y2="104" stroke="var(--line)" strokeWidth="1" />
    </svg>
  );
}

/**
 * Format pair — Rolled Pilates mat with brass carry strap
 */
export function MatFormatArt({
  label = 'One-line drawing of a rolled Pilates mat with a strap',
  className = '',
  ...rest
}: ArtProps) {
  return (
    <svg
      viewBox="0 0 260 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps(label)}
      {...rest}
    >
      {/* Plaster ground shape */}
      <rect x="20" y="20" width="220" height="72" fill="var(--raised)" opacity="0.6" />
      {/* Unrolled tail edge */}
      <path d="M62 84 H206 C214 84 220 78 220 70 V52" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      {/* Rolled cylinder */}
      <ellipse cx="64" cy="60" rx="18" ry="24" fill="var(--bg)" stroke="currentColor" strokeWidth="1.4" />
      {/* Inner spiral of the rolled mat */}
      <path
        d="M64 44 C72 44 76 51 76 60 C76 69 70 75 62 75 C55 75 51 69 51 61 C51 54 56 49 62 49 C67 49 70 54 70 60 C70 64 67 67 63 67"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      {/* Top edge of cylinder */}
      <path d="M64 36 H198 C208 36 216 47 216 60 C216 73 208 84 198 84" stroke="currentColor" strokeWidth="1.4" />
      {/* Brass carry strap & buckle loop */}
      <path d="M114 35 C120 46 120 74 114 85" stroke="var(--brass)" strokeWidth="1.6" />
      <path d="M164 35 C170 46 170 74 164 85" stroke="var(--brass)" strokeWidth="1.6" />
      <path d="M116 35 C128 16 152 16 164 35" stroke="var(--brass)" strokeWidth="1.4" />
      {/* Floor hairline */}
      <line x1="12" y1="104" x2="248" y2="104" stroke="var(--line)" strokeWidth="1" />
    </svg>
  );
}

/**
 * Principle glyphs (4): breath, centre, control, length
 */
export function PrincipleGlyph({
  kind,
  className = 'h-11 w-11',
}: {
  kind: 'breath' | 'centre' | 'control' | 'length';
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      {kind === 'breath' && (
        <>
          <path d="M8 34 C12 18, 36 18, 40 34" stroke="currentColor" strokeWidth="1.4" />
          <path d="M15 34 C18 24, 30 24, 33 34" stroke="var(--brass)" strokeWidth="1.4" />
          <line x1="6" y1="34" x2="42" y2="34" stroke="var(--line)" strokeWidth="1" />
        </>
      )}
      {kind === 'centre' && (
        <>
          <rect x="9" y="9" width="30" height="30" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="24" cy="24" r="9" stroke="var(--brass)" strokeWidth="1.4" />
          <circle cx="24" cy="24" r="2" fill="var(--brass)" />
        </>
      )}
      {kind === 'control' && (
        <>
          <line x1="8" y1="14" x2="8" y2="34" stroke="currentColor" strokeWidth="1.5" />
          <line x1="40" y1="14" x2="40" y2="34" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M8 24 H13 L16 16 L20 32 L24 16 L28 32 L32 16 L35 24 H40"
            stroke="var(--brass)"
            strokeWidth="1.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {kind === 'length' && (
        <>
          <line x1="6" y1="24" x2="40" y2="24" stroke="var(--brass)" strokeWidth="1.5" />
          <path d="M33 17 L40 24 L33 31" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
          <circle cx="8" cy="24" r="2.5" fill="currentColor" />
        </>
      )}
    </svg>
  );
}

/**
 * Labelled side-elevation Reformer diagram for First class step 7.
 * Parts: 01 Carriage, 02 Footbar, 03 Springs, 04 Straps, 05 Headrest, 06 Shoulder blocks.
 */
export function ReformerDiagramArt({
  label = 'Labelled side-elevation diagram of a Pilates reformer showing carriage, footbar, springs, straps, headrest and shoulder blocks',
  className = '',
  ...rest
}: ArtProps) {
  return (
    <svg
      viewBox="0 0 920 390"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps(label)}
      {...rest}
    >
      {/* Plaster frame backdrop */}
      <rect x="24" y="24" width="872" height="342" fill="var(--surface)" />
      <rect x="44" y="44" width="832" height="302" stroke="var(--line)" strokeWidth="1" />

      {/* Floor datum */}
      <line x1="84" y1="296" x2="836" y2="296" stroke="var(--line)" strokeWidth="1.2" />

      {/* Reformer main frame */}
      <rect x="148" y="218" width="584" height="32" fill="var(--raised)" stroke="currentColor" strokeWidth="1.5" />
      <path d="M172 250 V296 M190 250 V296 M688 250 V296 M706 250 V296" stroke="currentColor" strokeWidth="1.4" />

      {/* 01 Carriage */}
      <rect x="252" y="194" width="292" height="24" fill="var(--bg)" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="286" cy="218" r="5" fill="var(--raised)" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="510" cy="218" r="5" fill="var(--raised)" stroke="currentColor" strokeWidth="1.2" />

      {/* 05 Headrest */}
      <path d="M262 194 L296 176 H326 V194" fill="var(--raised)" stroke="currentColor" strokeWidth="1.4" />

      {/* 06 Shoulder blocks */}
      <rect x="334" y="156" width="22" height="38" fill="var(--raised)" stroke="currentColor" strokeWidth="1.4" />

      {/* 04 Straps & riser pulley */}
      <line x1="170" y1="218" x2="170" y2="140" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="170" cy="140" r="6" fill="var(--bg)" stroke="var(--brass)" strokeWidth="1.6" />
      <path d="M176 142 C218 164 260 184 334 172" stroke="var(--brass)" strokeWidth="1.5" />
      <path d="M168 146 C152 178 150 198 166 202 C180 205 178 178 171 146" stroke="var(--brass)" strokeWidth="1.4" />

      {/* 03 Springs (four tension coils) */}
      {[0, 1, 2, 3].map(idx => {
        const y = 224 + idx * 6.5;
        return (
          <path
            key={idx}
            d={`M544 ${y} H558 L563 ${y - 2.6} L570 ${y + 2.6} L577 ${y - 2.6} L584 ${y + 2.6} L591 ${y - 2.6} L598 ${y + 2.6} L605 ${y - 2.6} L612 ${y + 2.6} L619 ${y - 2.6} L626 ${y + 2.6} L633 ${y} H658`}
            stroke="var(--brass)"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        );
      })}
      <line x1="658" y1="219" x2="658" y2="249" stroke="var(--brass)" strokeWidth="1.6" />

      {/* 02 Footbar */}
      <path d="M698 218 L732 134 C735 126 728 118 718 118 H686" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="686" cy="118" r="5" fill="var(--bg)" stroke="currentColor" strokeWidth="1.5" />

      {/* Callout leaders & numbered mono labels */}
      {/* 04 STRAPS */}
      <line x1="170" y1="134" x2="170" y2="90" stroke="var(--brass)" strokeWidth="1.2" />
      <circle cx="170" cy="134" r="2.8" fill="var(--brass)" />
      <text x="108" y="80" fill="currentColor" fontFamily="var(--font-mono)" fontSize="11.5" letterSpacing="1.8">
        04 STRAPS
      </text>

      {/* 05 HEADREST */}
      <line x1="292" y1="176" x2="292" y2="112" stroke="var(--brass)" strokeWidth="1.2" />
      <circle cx="292" cy="176" r="2.8" fill="var(--brass)" />
      <text x="242" y="102" fill="currentColor" fontFamily="var(--font-mono)" fontSize="11.5" letterSpacing="1.8">
        05 HEADREST
      </text>

      {/* 06 SHOULDER BLOCKS */}
      <line x1="345" y1="156" x2="345" y2="76" stroke="var(--brass)" strokeWidth="1.2" />
      <circle cx="345" cy="156" r="2.8" fill="var(--brass)" />
      <text x="355" y="80" fill="currentColor" fontFamily="var(--font-mono)" fontSize="11.5" letterSpacing="1.8">
        06 SHOULDER BLOCKS
      </text>

      {/* 01 CARRIAGE */}
      <line x1="452" y1="194" x2="452" y2="128" stroke="var(--brass)" strokeWidth="1.2" />
      <circle cx="452" cy="194" r="2.8" fill="var(--brass)" />
      <text x="462" y="132" fill="currentColor" fontFamily="var(--font-mono)" fontSize="11.5" letterSpacing="1.8">
        01 CARRIAGE
      </text>

      {/* 02 FOOTBAR */}
      <line x1="712" y1="118" x2="712" y2="80" stroke="var(--brass)" strokeWidth="1.2" />
      <circle cx="712" cy="118" r="2.8" fill="var(--brass)" />
      <text x="722" y="84" fill="currentColor" fontFamily="var(--font-mono)" fontSize="11.5" letterSpacing="1.8">
        02 FOOTBAR
      </text>

      {/* 03 SPRINGS */}
      <line x1="600" y1="248" x2="600" y2="322" stroke="var(--brass)" strokeWidth="1.2" />
      <circle cx="600" cy="248" r="2.8" fill="var(--brass)" />
      <text x="610" y="326" fill="currentColor" fontFamily="var(--font-mono)" fontSize="11.5" letterSpacing="1.8">
        03 SPRINGS (TENSION)
      </text>
    </svg>
  );
}

/**
 * Three abstract one-line profile portraits on plaster ovals, distinct in silhouette.
 */
export function TeacherPortrait({
  id,
  name,
  className = '',
}: {
  id: string;
  name: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 270"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps(`Abstract continuous-line portrait silhouette of ${name}`)}
    >
      {/* Plaster oval relief */}
      <ellipse cx="110" cy="136" rx="84" ry="110" fill="var(--surface)" />
      {/* Subtle brass alignment plumb line */}
      <line x1="110" y1="14" x2="110" y2="38" stroke="var(--brass)" strokeWidth="1.3" />
      <circle cx="110" cy="14" r="2.2" fill="var(--brass)" />

      {id === 'ines-carvalho' && (
        /* Inès — high classical chignon, poised elongated neck, profile right */
        <path
          d="M72 228
             C74 202 82 186 84 168
             C72 152 68 128 74 106
             C78 90 88 76 102 68
             C94 58 84 62 80 72
             C76 82 88 88 98 80
             C114 68 134 74 142 94
             C146 104 146 114 152 124
             C156 130 152 135 147 137
             C149 144 146 150 140 154
             C140 162 132 170 120 172
             C120 190 124 208 144 228"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {id === 'tom-adeyemi' && (
        /* Tom — upright architectural brow & jaw, short cropped crown, profile left */
        <path
          d="M150 228
             C148 202 140 186 138 166
             C148 148 150 124 146 100
             C142 78 124 66 102 68
             C86 70 76 82 76 98
             C76 108 74 116 68 126
             C66 130 70 135 76 137
             C74 144 76 151 82 156
             C82 166 90 173 102 175
             C104 192 98 208 76 228"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {id !== 'ines-carvalho' && id !== 'tom-adeyemi' && (
        /* Maya — soft swept hairline, calm forward tilt, profile right */
        <path
          d="M74 228
             C78 204 86 190 88 172
             C76 164 66 146 68 120
             C70 90 88 68 114 68
             C132 68 146 82 148 100
             C150 112 152 120 157 128
             C159 132 154 137 148 139
             C149 145 145 151 139 155
             C136 164 128 170 118 173
             C118 190 126 208 148 228
             M78 106 C92 98 112 96 136 102"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Subtle brass baseline across bottom of oval */}
      <line x1="62" y1="228" x2="158" y2="228" stroke="var(--brass)" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * Contact PageHead motif — single-line studio door set inside a plaster arch
 */
export function ContactArchArt({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 112 132"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 120 V56 C12 28 32 10 56 10 C80 10 100 28 100 56 V120 Z" fill="var(--surface)" />
      <path d="M36 120 V54 C36 42 45 34 56 34 C67 34 76 42 76 54 V120" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="67" cy="80" r="2.2" fill="var(--brass)" />
      <line x1="4" y1="120" x2="108" y2="120" stroke="var(--brass)" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * 404 — "Lost the line"
 * Figure in a standing roll-down whose contour unravels into a loose scribble
 * and drifts off the right edge of the frame.
 */
export function NotFoundArt({
  label = 'Continuous-line figure in a standing roll-down whose line unravels and drifts off the edge',
  className = '',
  ...rest
}: ArtProps) {
  return (
    <svg
      viewBox="0 0 640 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...a11yProps(label)}
      {...rest}
    >
      {/* Plaster arch fragment */}
      <path d="M62 246 V108 C62 56 104 22 154 22 C204 22 246 56 246 108 V246 Z" fill="var(--surface)" />
      <line x1="28" y1="246" x2="620" y2="246" stroke="var(--line)" strokeWidth="1.2" />

      {/* Standing roll-down figure on left: grounded heels, vertical legs, C-curved spine,
          relaxed hanging head, arms reaching softly toward the floor */}
      <path
        d="M118 246
           H138
           L135 162
           C136 130 148 100 172 100
           C194 100 206 118 204 142
           C202 162 192 178 186 196
           M128 246
           L126 164
           C126 144 134 126 148 118
           M186 134
           C178 134 171 141 172 150
           C173 158 181 163 189 161
           C196 159 200 151 198 144
           M182 162
           C179 178 178 190 180 200"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* The unraveling brass Long Line drifting off the right edge from the fingertips */}
      <path
        d="M186 196
           C186 220 212 228 234 210
           C256 192 242 156 266 156
           C290 156 278 210 308 210
           C338 210 334 144 366 154
           C394 162 376 220 418 204
           C452 192 458 166 504 178
           C550 190 584 170 636 166"
        stroke="var(--brass)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="186" cy="196" r="2.8" fill="var(--brass)" />
    </svg>
  );
}

/**
 * Single-line studio icons (1.35px stroke).
 */
export type StudioIconName = 'sock' | 'bottle' | 'clock' | 'pin' | 'phone' | 'mail' | 'door' | 'barefoot' | 'attire';

export function StudioIcon({
  name,
  className = 'h-6 w-6',
}: {
  name: StudioIconName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {name === 'sock' && (
        <>
          <path
            d="M11 4 H18 V14 L22 18 C24 20 23 23.5 20 24 L13 24 C10 24 8 22 8 19 V14 L11 11 V4 Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <circle cx="12.5" cy="21" r="1" fill="var(--brass)" />
          <circle cx="16" cy="21" r="1" fill="var(--brass)" />
          <circle cx="19.5" cy="21" r="1" fill="var(--brass)" />
        </>
      )}
      {name === 'bottle' && (
        <>
          <rect x="11" y="3.5" width="6" height="3" stroke="var(--brass)" strokeWidth="1.35" />
          <path
            d="M11 6.5 L9.5 10 V23.5 H18.5 V10 L17 6.5"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="miter"
          />
          <line x1="9.5" y1="14.5" x2="18.5" y2="14.5" stroke="var(--brass)" strokeWidth="1.2" />
        </>
      )}
      {name === 'attire' && (
        <>
          <path
            d="M9 5 L5 9 L8 12 L10 10 V23 H18 V10 L20 12 L23 9 L19 5 C17.5 6.8 10.5 6.8 9 5 Z"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinejoin="round"
          />
          <line x1="10" y1="14" x2="18" y2="14" stroke="var(--brass)" strokeWidth="1.2" />
        </>
      )}
      {name === 'barefoot' && (
        <>
          <rect x="5" y="18" width="18" height="4.5" stroke="currentColor" strokeWidth="1.35" />
          <path d="M8 18 V12 C8 10 12 10 14 13 L20 15 V18" stroke="currentColor" strokeWidth="1.35" />
          <line x1="5" y1="6" x2="23" y2="24" stroke="var(--brass)" strokeWidth="1.4" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="14" cy="14" r="9.5" stroke="currentColor" strokeWidth="1.35" />
          <path d="M14 8.5 V14 L18 16.5" stroke="var(--brass)" strokeWidth="1.45" strokeLinecap="square" />
        </>
      )}
      {name === 'pin' && (
        <>
          <path
            d="M14 24 C14 24 21 17 21 11.5 C21 7.6 17.9 4.5 14 4.5 C10.1 4.5 7 7.6 7 11.5 C7 17 14 24 14 24 Z"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <circle cx="14" cy="11.5" r="2.6" stroke="var(--brass)" strokeWidth="1.35" />
        </>
      )}
      {name === 'phone' && (
        <path
          d="M7.5 5.5 H11 L12.5 10 L10 11.8 C11.3 14.5 13.5 16.7 16.2 18 L18 15.5 L22.5 17 V20.5 C22.5 21.8 21.4 22.8 20.1 22.7 C12.4 22 6 15.6 5.3 7.9 C5.2 6.6 6.2 5.5 7.5 5.5 Z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
      )}
      {name === 'mail' && (
        <>
          <rect x="4.5" y="7" width="19" height="14" stroke="currentColor" strokeWidth="1.35" />
          <path d="M4.5 7.5 L14 15 L23.5 7.5" stroke="var(--brass)" strokeWidth="1.35" />
        </>
      )}
      {name === 'door' && (
        <>
          <path d="M8 23.5 V6.5 C8 5 9 4.5 10.5 4.5 H17.5 C19 4.5 20 5 20 6.5 V23.5" stroke="currentColor" strokeWidth="1.35" />
          <line x1="4.5" y1="23.5" x2="23.5" y2="23.5" stroke="var(--brass)" strokeWidth="1.4" />
          <circle cx="17" cy="14.5" r="1.3" fill="var(--brass)" />
        </>
      )}
    </svg>
  );
}
