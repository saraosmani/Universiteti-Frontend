import React from "react";
import { BORDER, NAVY, WHITE } from "../../../styles/common";

export const Card: React.FC<{
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ style, children }) => (
  <div
    style={{
      background: WHITE,
      borderRadius: 14,
      border: `1px solid ${BORDER}`,
      padding: 20,
      boxShadow: "0 1px 4px rgba(15,37,87,0.06)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<{
  title: string;
  right?: React.ReactNode;
}> = ({ title, right }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    }}
  >
    <h3 style={{ fontWeight: 700, fontSize: 15, color: NAVY, margin: 0 }}>
      {title}
    </h3>
    {right}
  </div>
);
