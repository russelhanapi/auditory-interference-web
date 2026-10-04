import type { CSSProperties } from "react";

const HOLE_RADIUS = 200;
const GROOVE_STEP = 33;
const GROOVE_COUNT = 10;

type Groove = {
  index: number;
  radius: number;
  band: number;
};

function bandFor(index: number): number {
  if (index === 0) return 0;
  if (index >= 8) return 1;
  if (index >= 6) return 2;
  if (index >= 4) return 3;
  return 4;
}

const GROOVES: Groove[] = Array.from({ length: GROOVE_COUNT }, (_, index) => ({
  index,
  radius: HOLE_RADIUS + index * GROOVE_STEP,
  band: bandFor(index),
}));

export function DiscField() {
  return (
    <svg
      className="disc-svg"
      viewBox="-500 -500 1000 1000"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="disc-sheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#a6a6a0" stopOpacity="1" />
          <stop offset="0.55" stopColor="#a6a6a0" stopOpacity="0.6" />
          <stop offset="1" stopColor="#a6a6a0" stopOpacity="0.14" />
        </linearGradient>
      </defs>
      {GROOVES.map((groove) => (
        <circle
          key={groove.index}
          className={groove.band === 0 ? "groove groove-hole" : "groove"}
          data-band={groove.band}
          style={{ "--i": groove.index } as CSSProperties}
          cx="0"
          cy="0"
          r={groove.radius}
          stroke="url(#disc-sheen)"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
