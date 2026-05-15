import React from "react";
import { Card } from "antd";
import { Seksion } from "../../../hooks/seksion/useSeksionetAktive";
import { DAYS, TIME_SLOTS, SLOT_H, toMinutes, DAY_LABELS } from "./orariConstants";
import SectionBlock from "./SectionBlock";
import { NAVY, WHITE } from "../../../styles/common";

interface Props {
  byDay: Record<string, Seksion[]>;
}

const GRID_START = toMinutes(TIME_SLOTS[0]); // e.g. 08:00 = 480 min
const TOTAL_H = TIME_SLOTS.length * SLOT_H;

const OrariTimetable: React.FC<Props> = ({ byDay }) => (
  <Card
    bodyStyle={{ padding: 0, overflow: "auto" }}
    style={{ borderRadius: 14, border: "1px solid #E2E8F0" }}
  >
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `56px repeat(${DAYS.length}, 1fr)`,
        minWidth: 700,
      }}
    >
      {/* Header row */}
      <div style={{ background: NAVY, padding: "12px 8px", borderRight: "1px solid #1e3a8a" }} />
      {DAYS.map((day) => (
        <div
          key={day}
          style={{
            background: NAVY,
            color: WHITE,
            padding: "12px 10px",
            textAlign: "center",
            fontWeight: 700,
            fontSize: 13,
            borderRight: "1px solid #1e3a8a",
          }}
        >
          {DAY_LABELS[day]}
        </div>
      ))}

      {/* Time-label column */}
      <div style={{ background: "#F8FAFC", borderRight: "1px solid #E2E8F0" }}>
        {TIME_SLOTS.map((slot, idx) => (
          <div
            key={slot}
            style={{
              height: SLOT_H,
              padding: "8px 6px 0",
              display: "flex",
              alignItems: "flex-start",
              fontSize: 11,
              color: "#94A3B8",
              fontWeight: 600,
              borderBottom: idx === TIME_SLOTS.length - 1 ? "none" : "1px solid #F1F5F9",
              boxSizing: "border-box",
            }}
          >
            {slot}
          </div>
        ))}
      </div>

      {/* Day columns — absolutely positioned blocks */}
      {DAYS.map((day) => (
        <div
          key={day}
          style={{
            position: "relative",
            height: TOTAL_H,
            borderRight: "1px solid #E2E8F0",
            background: WHITE,
          }}
        >
          {/* Horizontal hour guide lines */}
          {TIME_SLOTS.map((slot, idx) => (
            <div
              key={slot}
              style={{
                position: "absolute",
                top: idx * SLOT_H,
                left: 0,
                right: 0,
                borderBottom: idx === TIME_SLOTS.length - 1 ? "none" : "1px solid #F1F5F9",
                height: SLOT_H,
                pointerEvents: "none",
              }}
            />
          ))}

          {/* Section blocks */}
          {byDay[day].map((s) => {
            const startMin = toMinutes(s.ore_fillimi);
            const endMin   = toMinutes(s.ore_mbarimi);
            const top      = ((startMin - GRID_START) / 60) * SLOT_H + 2;
            const height   = Math.max(((endMin - startMin) / 60) * SLOT_H - 4, 28);
            return (
              <div
                key={s.sek_id}
                style={{
                  position: "absolute",
                  top,
                  left: 3,
                  right: 3,
                  height,
                }}
              >
                <SectionBlock s={s} heightPx={height} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  </Card>
);

export default OrariTimetable;