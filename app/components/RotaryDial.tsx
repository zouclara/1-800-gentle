"use client";

import { useState } from "react";

// Finger stop at ~3:30 (105°). Each digit sits N*33° counter-clockwise from stop.
// This gives 1 the shortest dial (33°) and 0 the longest (330°) — just like a real phone.
const STOP_ANGLE = 105;
const HOLE_RADIUS = 106;
const STEP = 33;

const DIAL_DATA = [
  { num: "1", letters: "" },
  { num: "2", letters: "ABC" },
  { num: "3", letters: "DEF" },
  { num: "4", letters: "GHI" },
  { num: "5", letters: "JKL" },
  { num: "6", letters: "MNO" },
  { num: "7", letters: "PRS" },
  { num: "8", letters: "TUV" },
  { num: "9", letters: "WXY" },
  { num: "0", letters: "OPER." },
];

const holeAngles = DIAL_DATA.map((_, i) => {
  const a = STOP_ANGLE - (i + 1) * STEP;
  return ((a % 360) + 360) % 360;
});

export function RotaryDial() {
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastDialed, setLastDialed] = useState<string | null>(null);

  const dialNumber = (index: number) => {
    if (isAnimating) return;
    const holeAngle = holeAngles[index];
    const rotationAmount = (STOP_ANGLE - holeAngle + 360) % 360;
    const dialDuration = 280 + rotationAmount * 1.4;

    setIsAnimating(true);
    setLastDialed(DIAL_DATA[index].num);
    setRotation(rotationAmount);

    setTimeout(() => setRotation(0), dialDuration);
    setTimeout(() => {
      setIsAnimating(false);
      setLastDialed(null);
    }, dialDuration + 520);
  };

  return (
    <div className="flex flex-col items-center gap-1 select-none">
      <svg
        viewBox="-158 -158 316 316"
        width="260"
        height="260"
        aria-label="Rotary dial — click a hole to dial"
      >
        {/* Body / outer rim */}
        <circle r="155" fill="#f0f6ff" stroke="#bfdbfe" strokeWidth="2" />

        {/* Static outer label ring — numbers + letters printed on phone body */}
        {DIAL_DATA.map(({ num, letters }, i) => {
          const angle = holeAngles[i];
          const rad = (angle * Math.PI) / 180;

          const numR = HOLE_RADIUS + 24;
          const letR = HOLE_RADIUS + 38;

          const nx = Math.sin(rad) * numR;
          const ny = -Math.cos(rad) * numR;
          const lx = Math.sin(rad) * letR;
          const ly = -Math.cos(rad) * letR;

          return (
            <g key={`label-${num}`}>
              {letters && (
                <text
                  x={lx}
                  y={ly}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#475569"
                  fontSize="6.5"
                  fontFamily="var(--font-geist-sans), system-ui"
                  fontWeight="500"
                  letterSpacing="0.5"
                >
                  {letters}
                </text>
              )}
              <text
                x={nx}
                y={ny}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#1e3a5f"
                fontSize="10"
                fontFamily="var(--font-geist-sans), system-ui"
                fontWeight="600"
              >
                {num}
              </text>
            </g>
          );
        })}

        {/* ── Rotating group ─────────────────────────────────────────── */}
        <g
          style={{
            transformOrigin: "0 0",
            transform: `rotate(${rotation}deg)`,
            transition:
              rotation === 0
                ? "transform 0.52s cubic-bezier(0.22, 1, 0.36, 1)"
                : `transform ${(280 + rotation * 1.4) / 1000}s cubic-bezier(0.4, 0, 0.6, 1)`,
          }}
        >
          {/* Dial face */}
          <circle r="130" fill="#e8f1fb" stroke="#bfdbfe" strokeWidth="1" />

          {/* Fine tick marks on dial edge */}
          {Array.from({ length: 80 }).map((_, i) => {
            const a = (i / 80) * 360;
            const rad = (a * Math.PI) / 180;
            const long = i % 8 === 0;
            return (
              <line
                key={i}
                x1={Math.sin(rad) * (long ? 122 : 125)}
                y1={-Math.cos(rad) * (long ? 122 : 125)}
                x2={Math.sin(rad) * 130}
                y2={-Math.cos(rad) * 130}
                stroke="#bfdbfe"
                strokeWidth={long ? "1.2" : "0.6"}
              />
            );
          })}

          {/* Holes */}
          {DIAL_DATA.map(({ num }, i) => {
            const angle = holeAngles[i];
            const rad = (angle * Math.PI) / 180;
            const cx = Math.sin(rad) * HOLE_RADIUS;
            const cy = -Math.cos(rad) * HOLE_RADIUS;

            return (
              <g
                key={`hole-${num}`}
                onClick={() => dialNumber(i)}
                style={{ cursor: isAnimating ? "default" : "pointer" }}
              >
                {/* Shadow rim */}
                <circle cx={cx} cy={cy} r={16.5} fill="#8dafc8" opacity="0.45" />
                {/* Hole depth */}
                <circle cx={cx} cy={cy} r={14.5} fill="#0f2740" />
                {/* Subtle inner highlight */}
                <circle cx={cx - 3.5} cy={cy - 3.5} r={4} fill="white" opacity="0.08" />
                {/* Center dot (like real phone holes) */}
                <circle cx={cx} cy={cy} r={1.5} fill="#1e3a5f" opacity="0.6" />
              </g>
            );
          })}
        </g>
        {/* ── End rotating group ─────────────────────────────────────── */}

        {/* Finger stop — fixed to body */}
        {(() => {
          const rad = (STOP_ANGLE * Math.PI) / 180;
          const sx = Math.sin(rad) * 128;
          const sy = -Math.cos(rad) * 128;
          return (
            <g transform={`translate(${sx}, ${sy}) rotate(${STOP_ANGLE})`}>
              {/* Tab shape */}
              <path d="M-5,-13 C-5,-13 5,-13 5,-13 L7,13 L-7,13 Z" fill="#93c5fd" opacity="0.9" />
              <rect x="-3" y="-9" width="6" height="3" rx="1.5" fill="white" opacity="0.35" />
            </g>
          );
        })()}

        {/* Center hub — fixed */}
        <circle r="60" fill="#dbeafe" stroke="#bfdbfe" strokeWidth="1" />
        <circle r="54" fill="#f8fafc" />
        <circle r="50" fill="#f0f7ff" />

        <text
          x={0} y={-5}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#93c5fd"
          fontSize="8.5"
          fontFamily="var(--font-geist-sans), system-ui"
          fontWeight="300"
          letterSpacing="3"
        >
          DIAL
        </text>
        <text
          x={0} y={9}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#93c5fd"
          fontSize="8.5"
          fontFamily="var(--font-geist-sans), system-ui"
          fontWeight="300"
          letterSpacing="3.5"
        >
          IN
        </text>
      </svg>

      {/* Dialing feedback */}
      <div className="h-4" aria-live="polite" aria-atomic="true">
        {lastDialed && (
          <p className="text-[9px] tracking-[0.35em] text-blue-300 font-light uppercase">
            dialing {lastDialed}…
          </p>
        )}
      </div>
    </div>
  );
}
