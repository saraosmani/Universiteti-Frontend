import React, { useMemo } from "react";
import { Tag, Spin } from "antd";
import { BORDER, NAVY, LIGHT, MUTED, ACCENT } from "../../../styles/common";
import { Card, CardTitle } from "./Card";

const AMBER = "#d97706";

const DAYS = [
  "E Diel",
  "E Hënë",
  "E Martë",
  "E Mërkurë",
  "E Enjte",
  "E Premte",
  "E Shtunë",
];

const DAYS_DB = [
  "Diel",
  "Hene",
  "Marte",
  "Merkure",
  "Enjte",
  "Premte",
  "Shtune",
];

function isSameDay(dita: string, dayIndex: number): boolean {
  return dita === DAYS[dayIndex] || dita === DAYS_DB[dayIndex];
}

export interface Seksion {
  sek_id: string | number;
  lenda: { emer: string; kod: string };
  dita: string;
  ore_fillimi: string;
  ore_mbarimi: string;
  salla: { nr: string | number; godin: string };
  lloji: string;
  grupi: string;
  nr_studenteve: number;
}

export const UpcomingClasses: React.FC<{
  seksionet: Seksion[];
  loading: boolean;
}> = ({ seksionet, loading }) => {
  const todayIdx = new Date().getDay();

  const todayClasses = useMemo(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    return seksionet
      .filter(
        (s) =>
          isSameDay(s.dita, todayIdx) && s.ore_mbarimi.slice(0, 5) > currentTime,
      )
      .sort((a, b) => a.ore_fillimi.localeCompare(b.ore_fillimi));
  }, [seksionet, todayIdx]);

  return (
    <Card>
      <CardTitle title="Oraret e ardhshme" />

      {loading ? (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <Spin size="small" />
        </div>
      ) : todayClasses.length === 0 ? (
        <p style={{ fontSize: 13, color: MUTED, margin: 0 }}>
          Nuk ka klasa të mbetura sot.
        </p>
      ) : (
        todayClasses.map((s) => {
          const isLab = s.lloji === "Laborator";
          return (
            <div
              key={s.sek_id}
              style={{
                display: "flex",
                gap: 10,
                alignItems: "flex-start",
                padding: "10px 0",
                borderBottom: `1px solid ${BORDER}`,
              }}
            >
              <div
                style={{
                  background: LIGHT,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 8,
                  padding: "4px 8px",
                  fontSize: 11,
                  fontWeight: 700,
                  color: NAVY,
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {s.ore_fillimi.slice(0, 5)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: NAVY,
                    margin: "0 0 2px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {s.lenda.emer}
                </p>
                <p style={{ fontSize: 11, color: MUTED, margin: "0 0 4px" }}>
                  {s.ore_fillimi.slice(0, 5)}–{s.ore_mbarimi.slice(0, 5)} · Salla{" "}
                  {s.salla.nr}
                </p>
                <Tag
                  style={{
                    borderRadius: 20,
                    fontSize: 10,
                    fontWeight: 600,
                    background: isLab ? "#fef3c7" : `${ACCENT}14`,
                    color: isLab ? AMBER : ACCENT,
                    border: `1px solid ${isLab ? "#fcd34d" : `${ACCENT}33`}`,
                    padding: "0 8px",
                  }}
                >
                  {s.lloji}
                </Tag>
              </div>
              <span
                style={{
                  fontSize: 11,
                  color: MUTED,
                  flexShrink: 0,
                  paddingTop: 2,
                }}
              >
                {s.nr_studenteve} stud.
              </span>
            </div>
          );
        })
      )}
    </Card>
  );
};
