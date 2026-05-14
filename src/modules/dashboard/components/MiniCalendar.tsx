import React from "react";
import { BORDER, NAVY, WHITE, MUTED, ACCENT } from "../../../styles/common";
import { Card } from "./Card";

const MONTHS = [
  "Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor",
  "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor",
];

export const MiniCalendar: React.FC = () => {
  const [current, setCurrent] = React.useState(new Date());
  const today = new Date();

  const year = current.getFullYear();
  const month = current.getMonth();

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: { day: number; type: "prev" | "cur" | "next" }[] = [];
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ day: daysInPrev - i, type: "prev" });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, type: "cur" });
  while (cells.length % 7 !== 0)
    cells.push({ day: cells.length - daysInMonth - firstDay + 1, type: "next" });

  const isToday = (d: number, type: string) =>
    type === "cur" &&
    d === today.getDate() &&
    month === today.getMonth() &&
    year === today.getFullYear();

  const prevMonth = () => setCurrent(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrent(new Date(year, month + 1, 1));

  return (
    <Card style={{ padding: 16 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <button
          onClick={prevMonth}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: MUTED,
            fontSize: 16,
            padding: "4px 8px",
            borderRadius: 6,
            lineHeight: 1,
          }}
        >
          ‹
        </button>
        <span style={{ fontWeight: 700, fontSize: 14, color: NAVY }}>
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: MUTED,
            fontSize: 16,
            padding: "4px 8px",
            borderRadius: 6,
            lineHeight: 1,
          }}
        >
          ›
        </button>
      </div>

      {/* Day-of-week headers */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: 6,
        }}
      >
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div
            key={d}
            style={{
              textAlign: "center",
              fontSize: 11,
              fontWeight: 700,
              color: MUTED,
              paddingBottom: 6,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div style={{ borderTop: `1px solid ${BORDER}`, marginBottom: 8 }} />

      {/* Day cells */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px 0",
        }}
      >
        {cells.map((cell, i) => {
          const active = isToday(cell.day, cell.type);
          return (
            <div
              key={i}
              style={{
                textAlign: "center",
                fontSize: 13,
                fontWeight: active ? 700 : cell.type === "cur" ? 500 : 400,
                color: active ? WHITE : cell.type === "cur" ? NAVY : `${MUTED}80`,
                background: active ? ACCENT : "transparent",
                borderRadius: "50%",
                width: 30,
                height: 30,
                lineHeight: "30px",
                margin: "0 auto",
                cursor: cell.type === "cur" ? "pointer" : "default",
              }}
            >
              {cell.day}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
