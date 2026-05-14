import React from "react";
import { BORDER, NAVY, LIGHT, MUTED, ACCENT } from "../../../styles/common";
import { Card, CardTitle } from "./Card";

const GREEN = "#059669";

export interface BarDatum {
  day: string;
  hours: number;
}

const DAY_LABEL_MAP: Record<string, string> = {
  "E Hënë":    "H",
  "E Martë":   "Ma",
  "E Mërkurë": "Me",
  "E Enjte":   "E",
  "E Premte":  "P",
  "E Shtunë":  "Sh",
  "E Diel":    "D",
};

const DAY_ORDER = ["H", "Ma", "Me", "E", "P", "Sh", "D"];

function toDecimalHours(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h + (m || 0) / 60;
}

export function computeHourData(
  seksionet: { dita: string; ore_fillimi: string; ore_mbarimi: string }[],
): BarDatum[] {
  const totals: Record<string, number> = {};
  for (const s of seksionet) {
    const label = DAY_LABEL_MAP[s.dita];
    if (!label) continue;
    const duration = toDecimalHours(s.ore_mbarimi) - toDecimalHours(s.ore_fillimi);
    totals[label] = (totals[label] ?? 0) + Math.max(0, duration);
  }
  return DAY_ORDER.map((day) => ({
    day,
    hours: Math.round((totals[day] ?? 0) * 10) / 10,
  }));
}

const SVGBarChart: React.FC<{ data: BarDatum[]; maxValue: number }> = ({
  data,
  maxValue,
}) => {
  const W = 340;
  const H = 140;
  const BOTTOM = 20;
  const LEFT = 28;
  const CHART_W = W - LEFT;
  const CHART_H = H - BOTTOM;
  const BAR_W = 26;
  const GAP = (CHART_W - data.length * BAR_W) / (data.length + 1);
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;

  const rawStep = maxValue / 3;
  const step =
    rawStep <= 1 ? 1 : rawStep <= 2 ? 2 : rawStep <= 3 ? 3 : Math.ceil(rawStep);
  const ticks = Array.from(
    { length: Math.ceil(maxValue / step) + 1 },
    (_, i) => i * step,
  ).filter((t) => t <= maxValue + step * 0.1);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", overflow: "visible" }}
      role="img"
      aria-label="Bar chart of weekly teaching hours"
    >
      {ticks.map((tick) => {
        const y = CHART_H - (tick / maxValue) * CHART_H;
        return (
          <g key={tick}>
            <line x1={LEFT} y1={y} x2={W} y2={y} stroke={BORDER} strokeWidth={0.8} />
            <text x={LEFT - 4} y={y + 3} fontSize={9} fill={MUTED} textAnchor="end">
              {tick}h
            </text>
          </g>
        );
      })}

      {data.map((d, i) => {
        const x = LEFT + GAP + i * (BAR_W + GAP);
        const barH = d.hours > 0 ? (d.hours / maxValue) * CHART_H : 0;
        const y = CHART_H - barH;
        const isToday = i === todayIdx;
        const fill = isToday ? ACCENT : `${ACCENT}55`;
        const radius = Math.min(5, barH / 2);

        return (
          <g key={d.day}>
            <title>
              {d.day}: {d.hours}h
            </title>

            {barH > 0 && (
              <path
                d={`
                  M ${x} ${y + radius}
                  Q ${x} ${y} ${x + radius} ${y}
                  L ${x + BAR_W - radius} ${y}
                  Q ${x + BAR_W} ${y} ${x + BAR_W} ${y + radius}
                  L ${x + BAR_W} ${CHART_H}
                  L ${x} ${CHART_H} Z
                `}
                fill={fill}
              />
            )}

            <text
              x={x + BAR_W / 2}
              y={H - 4}
              fontSize={10}
              fill={isToday ? NAVY : MUTED}
              fontWeight={isToday ? "700" : "400"}
              textAnchor="middle"
            >
              {d.day}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const WorkingHoursChart: React.FC<{
  seksionet: { dita: string; ore_fillimi: string; ore_mbarimi: string }[];
}> = ({ seksionet }) => {
  const data = computeHourData(seksionet);
  const totalHours = data.reduce((s, d) => s + d.hours, 0);
  const maxValue = Math.max(...data.map((d) => d.hours), 4);

  const fmt = (h: number) => {
    const hrs = Math.floor(h);
    const min = Math.round((h - hrs) * 60);
    return min > 0 ? `${hrs}h ${min}m` : `${hrs}h`;
  };

  const activeDays = data.filter((d) => d.hours > 0).length;

  return (
    <Card>
      <CardTitle
        title="Orët e Mësimdhënies"
        right={
          <span
            style={{
              fontSize: 12,
              color: MUTED,
              background: LIGHT,
              padding: "3px 10px",
              borderRadius: 8,
              border: `1px solid ${BORDER}`,
            }}
          >
            Gjatë javës
          </span>
        }
      />

      <SVGBarChart data={data} maxValue={maxValue} />

      <div
        style={{
          display: "flex",
          gap: 20,
          marginTop: 12,
          paddingTop: 12,
          borderTop: `1px solid ${BORDER}`,
        }}
      >
        <div>
          <p style={{ fontSize: 11, color: MUTED, margin: "0 0 1px" }}>Total</p>
          <p style={{ fontWeight: 700, fontSize: 13, color: NAVY, margin: 0 }}>
            {fmt(totalHours)}
          </p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: MUTED, margin: "0 0 1px" }}>Ditë aktive</p>
          <p style={{ fontWeight: 700, fontSize: 13, color: ACCENT, margin: 0 }}>
            {activeDays} / 7
          </p>
        </div>
        <div>
          <p style={{ fontSize: 11, color: MUTED, margin: "0 0 1px" }}>Mesatare/ditë</p>
          <p style={{ fontWeight: 700, fontSize: 13, color: GREEN, margin: 0 }}>
            {activeDays > 0 ? fmt(totalHours / activeDays) : "—"}
          </p>
        </div>
      </div>
    </Card>
  );
};
