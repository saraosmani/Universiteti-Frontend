import React from "react";
import { BORDER, NAVY, LIGHT, MUTED } from "../../../styles/common";

export const SectionRow: React.FC<{
  name: string;
  day: string;
  time: string;
  room: string;
  type: string;
  students: number;
}> = ({ name, day, time, room, type, students }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 0",
      borderBottom: `1px solid ${BORDER}`,
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 10,
        flexShrink: 0,
        background: type === "Laborator" ? "#fef3c7" : LIGHT,
        border: `1px solid ${BORDER}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 18,
      }}
    >
      {type === "Laborator" ? "🔬" : "📚"}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p
        style={{
          fontWeight: 600,
          fontSize: 13,
          color: NAVY,
          margin: "0 0 2px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {name}
      </p>
      <p style={{ fontSize: 12, color: MUTED, margin: 0 }}>
        {day} · {time} · Salla {room}
      </p>
    </div>
    <span
      style={{
        background: LIGHT,
        border: `1px solid ${BORDER}`,
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        color: NAVY,
        padding: "3px 10px",
        flexShrink: 0,
      }}
    >
      {students} stud.
    </span>
  </div>
);
