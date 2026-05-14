import React from "react";
import { NAVY, MUTED, ACCENT } from "../../../styles/common";

const GREEN = "#059669";
const AMBER = "#d97706";

export const SUBJECT_COLORS = [ACCENT, GREEN, "#7c3aed", "#dc2626", AMBER];

export const SubjectRow: React.FC<{
  name: string;
  code: string;
  index: number;
}> = ({ name, code, index }) => {
  const color = SUBJECT_COLORS[index % SUBJECT_COLORS.length];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "11px 0",
        borderBottom: `1px solid rgba(15,37,87,0.12)`,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          flexShrink: 0,
          background: `${color}18`,
          border: `1px solid ${color}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          fontWeight: 700,
          color,
        }}
      >
        {code.slice(0, 2)}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontWeight: 600,
            fontSize: 13,
            color: NAVY,
            margin: "0 0 1px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {name}
        </p>
        <p style={{ fontSize: 11, color: MUTED, margin: 0 }}>{code}</p>
      </div>
    </div>
  );
};
