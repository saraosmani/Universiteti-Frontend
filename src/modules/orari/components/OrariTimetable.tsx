import React from "react";
import { Card } from "antd";
import { Seksion } from "../../../hooks/seksion/useSeksionetAktive";
import { DAYS, TIME_SLOTS, SLOT_H, toMinutes } from "./orariConstants";
import SectionBlock from "./SectionBlock";
import { NAVY, WHITE } from "../../../styles/common";

interface Props {
  byDay: Record<string, Seksion[]>;
}

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
          {day}
        </div>
      ))}

      {/* Time rows */}
      {TIME_SLOTS.map((slot, idx) => {
        const slotMin = toMinutes(slot);
        const isLast = idx === TIME_SLOTS.length - 1;

        return (
          <React.Fragment key={slot}>
            {/* Time label */}
            <div
              style={{
                padding: "8px 6px 0",
                height: SLOT_H,
                display: "flex",
                alignItems: "flex-start",
                fontSize: 11,
                color: "#94A3B8",
                fontWeight: 600,
                background: "#F8FAFC",
                borderRight: "1px solid #E2E8F0",
                borderBottom: isLast ? "none" : "1px solid #F1F5F9",
              }}
            >
              {slot}
            </div>

            {/* Day cells */}
            {DAYS.map((day) => {
              const sections = byDay[day].filter((s) => {
                const start = toMinutes(s.ore_fillimi);
                return start >= slotMin && start < slotMin + 60;
              });

              return (
                <div
                  key={day}
                  style={{
                    height: SLOT_H,
                    borderRight: "1px solid #E2E8F0",
                    borderBottom: isLast ? "none" : "1px solid #F1F5F9",
                    background: WHITE,
                    padding: sections.length > 0 ? 4 : 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  {sections.map((s) => (
                    <SectionBlock key={s.sek_id} s={s} />
                  ))}
                </div>
              );
            })}
          </React.Fragment>
        );
      })}
    </div>
  </Card>
);

export default OrariTimetable;