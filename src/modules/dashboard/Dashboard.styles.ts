import { CSSProperties } from "react";
import { BORDER, MUTED } from "../../styles/common";

/**
 * Dashboard page specific styles
 */
export const signOutBtnBase: CSSProperties = {
  background: "transparent",
  border: `1px solid ${BORDER}`,
  color: MUTED,
  padding: "10px 32px",
  cursor: "pointer",
  fontSize: 12,
  letterSpacing: 2,
  fontFamily: "'Inter', 'Segoe UI', sans-serif",
  transition: "all 0.2s",
  borderRadius: 6,
};
