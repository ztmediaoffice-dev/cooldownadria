// Krivulja temperature "led naspram Cool Down". Ilustracija, nije mjerenje.
// Skala: 30 °C gore, 0 °C dolje. Cool Down drži 7–10 °C, led pada prema 0 °C i kratko traje.
// Iste krivulje crtaju se na dva platna: široko za desktop i uže za mobitel,
// da oznake na telefonu ostanu čitljive. Podaci su isti, mijenja se samo veličina platna.

type Geo = { W: number; H: number; X0: number; X3: number; Y30: number; Y0: number; axisY: number };

const DESK: Geo = { W: 1200, H: 344, X0: 64, X3: 1176, Y30: 24, Y0: 304, axisY: 338 };
const MOB: Geo = { W: 360, H: 252, X0: 44, X3: 346, Y30: 12, Y0: 214, axisY: 240 };

function paths(g: Geo) {
  const x = (h: number) => g.X0 + (h / 3) * (g.X3 - g.X0);
  const y = (c: number) => g.Y0 - (c / 30) * (g.Y0 - g.Y30);
  const cd = [
    `M ${x(0)} ${y(30)}`,
    `C ${x(0.06)} ${y(29)}, ${x(0.07)} ${y(10)}, ${x(0.16)} ${y(8.8)}`,
    `C ${x(0.6)} ${y(8.4)}, ${x(1.6)} ${y(8.3)}, ${x(2.35)} ${y(8.5)}`,
    `C ${x(2.6)} ${y(9)}, ${x(2.8)} ${y(18)}, ${x(2.96)} ${y(28.5)}`,
  ].join(" ");
  const ice = [
    `M ${x(0)} ${y(30)}`,
    `C ${x(0.03)} ${y(28)}, ${x(0.05)} ${y(1)}, ${x(0.08)} ${y(0.6)}`,
    `C ${x(0.12)} ${y(0.3)}, ${x(0.2)} ${y(22)}, ${x(0.42)} ${y(29.5)}`,
    `L ${x(0.62)} ${y(30)}`,
  ].join(" ");
  return { x, y, cd, ice };
}

const TICKS = [30, 20, 10, 0];
const HOURS_DESK = [
  { h: 0, l: "0" },
  { h: 0.5, l: "30 min" },
  { h: 1, l: "1 sat" },
  { h: 2, l: "2 sata" },
  { h: 3, l: "3 sata" },
];
// Na uskom platnu oznaka "30 min" bi se preklopila s "0", pa se ne ispisuje.
const HOURS_MOB = HOURS_DESK.filter((h) => h.h !== 0.5);

function Plot({ g, mobile, compact }: { g: Geo; mobile: boolean; compact: boolean }) {
  const { x, y, cd, ice } = paths(g);
  const hours = mobile ? HOURS_MOB : HOURS_DESK;
  const id = mobile ? "curve-m" : "curve-d";
  return (
    <svg
      className={mobile ? "curve__svg curve__svg--mob" : "curve__svg curve__svg--desk"}
      viewBox={`0 0 ${g.W} ${g.H}`}
      role="img"
      aria-labelledby={`${id}-title ${id}-desc`}
      preserveAspectRatio="xMidYMid meet"
    >
      <title id={`${id}-title`}>Led naspram Cool Down: temperatura obloga kroz vrijeme</title>
      <desc id={`${id}-desc`}>
        Led naglo pada prema 0 °C i brzo se zagrije. Cool Down hladi na 7–10 °C i drži tu temperaturu 2 sata i duže.
      </desc>
      {TICKS.map((t) => (
        <g key={t}>
          <line className="curve__grid" x1={g.X0} x2={g.X3 + 8} y1={y(t)} y2={y(t)} />
          <text className="curve__axis" x={0} y={y(t) + 4}>
            {t} °C
          </text>
        </g>
      ))}
      {hours.map((h) => (
        <text
          key={h.l}
          className="curve__axis"
          x={x(h.h)}
          y={g.axisY}
          textAnchor={h.h === 0 ? "start" : h.h === 3 ? "end" : "middle"}
        >
          {h.l}
        </text>
      ))}
      <rect className="curve__band" x={x(0.16)} y={y(10)} width={x(2.35) - x(0.16)} height={y(7) - y(10)} />
      <path className="curve__ice" d={ice} />
      <path className="curve__cd" d={cd} pathLength={1} />
      {!compact && !mobile && (
        <>
          <text className="curve__label curve__label--ice" x={x(0.5)} y={y(24)}>
            Led: naglo prema 0 °C i kratko
          </text>
          <text className="curve__label curve__label--cd" x={x(1.98)} y={y(8.35) + 44} textAnchor="end">
            Cool Down: hladi na 7–10 °C, 2 sata i duže
          </text>
        </>
      )}
    </svg>
  );
}

export function TempCurve({ animate = true, compact = false }: { animate?: boolean; compact?: boolean }) {
  return (
    <figure className={`curve${animate ? " curve--animate" : ""}`}>
      <Plot g={DESK} mobile={false} compact={compact} />
      <Plot g={MOB} mobile compact={compact} />
      <ul className="curve__legend" aria-hidden="true">
        <li>
          <i className="curve__key curve__key--cd" />
          Cool Down: hladi na 7–10 °C, 2 sata i duže
        </li>
        <li>
          <i className="curve__key curve__key--ice" />
          Led: naglo prema 0 °C i kratko
        </li>
      </ul>
      <figcaption className="note">
        Ilustracija, nije mjerenje. Cool Down hladi na temperaturi od 7–10 °C i ne ide u minus, pa ne stvara ozebline.
      </figcaption>
    </figure>
  );
}
