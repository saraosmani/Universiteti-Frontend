import type { CSSProperties } from "react";

/**
 * Reusable common styles for form inputs and buttons
 */

export const inputStyle: CSSProperties = {
  background: "rgba(90, 157, 77, 0.04)",
  border: "1px solid rgba(196,164,100,0.2)",
  color: "#f0e8d0",
  height: 50,
};

export const primaryBtnStyle: CSSProperties = {
  background: "linear-gradient(135deg, #0f2557, #1a3a7a)",
  border: "none",
  height: 50,
  fontSize: 12,
  letterSpacing: 3,
  fontFamily: "'Inter', sans-serif",
  color: "#ffffff",
  fontWeight: 600,
};
