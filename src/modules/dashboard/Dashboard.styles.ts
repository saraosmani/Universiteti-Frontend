import { CSSProperties } from "react";
import { BORDER, MUTED, NAVY, WHITE, ACCENT } from "../../styles/common";

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

export const cardBase: CSSProperties = {
  background: WHITE,
  borderRadius: "12px",
  padding: "20px",
  border: `1px solid ${BORDER}`,
  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
  transition: "all 0.3s ease",
};

export const actionButtonStyle: CSSProperties = {
  background: ACCENT,
  color: WHITE,
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  transition: "all 0.2s",
};

export const headerStyle: CSSProperties = {
  fontSize: "28px",
  fontWeight: "700",
  color: NAVY,
  marginBottom: "8px",
};
