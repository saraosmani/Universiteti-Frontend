import type { CSSProperties } from "react";
import type { ThemeConfig }   from "antd";

export const inputStyle: CSSProperties = {
  background: "rgba(90, 157, 77, 0.04)",
  border:     "1px solid rgba(196,164,100,0.2)",
  color:      "#f0e8d0",
  height:     50,
};

export const primaryBtnStyle: CSSProperties = {
  background:    "linear-gradient(135deg, #0f2557, #1a3a7a)",
  border:        "none",
  height:        50,
  fontSize:      12,
  letterSpacing: 3,
  fontFamily:    "'Inter', sans-serif",
  color:         "#ffffff",
  fontWeight:    600,
};

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary:         "#c4a464",
    colorBgContainer:     "rgba(255,255,255,0.04)",
    colorBorder:          "rgba(196,164,100,0.2)",
    colorText:            "#f0e8d0",
    colorTextPlaceholder: "rgba(240,232,208,0.3)",
    borderRadius:         2,
    fontFamily:           "'Crimson Text', Georgia, serif",
    fontSize:             15,
  },
  components: {
    Input: {
      activeBorderColor: "#c4a464",
      hoverBorderColor:  "rgba(196,164,100,0.5)",
      colorBgContainer:  "rgba(255,255,255,0.04)",
      colorText:         "#f0e8d0",
      colorIcon:         "rgba(196,164,100,0.5)",
    },
    Button: {
      primaryColor: "#0a0e1a",
    },
  },
};

export const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=Cormorant+Garamond:wght@300;400;600;700&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0a0e1a; }
  .ant-input-affix-wrapper { background: rgba(255,255,255,0.04) !important; }
  .ant-input { background: transparent !important; color: #f0e8d0 !important; }
  .ant-input::placeholder { color: rgba(240,232,208,0.3) !important; }
  .ant-input-password-icon { color: rgba(196,164,100,0.5) !important; }
  .ant-form-item-explain-error { color: #e8755a !important; font-size: 13px; }
  .ant-divider-inner-text { color: rgba(240,232,208,0.3) !important; font-size: 11px !important; letter-spacing: 2px; }
  .ant-divider { border-color: rgba(196,164,100,0.15) !important; }
  .ant-spin-dot-item { background-color: #c4a464 !important; }
`;

export const NAVY   = "#0f2557";
export const NAVY2  = "#1a3a7a";
export const ACCENT = "#2563eb";
export const WHITE  = "#ffffff";
export const LIGHT  = "#f0f4ff";
export const MUTED  = "#6b7fa8";
export const BORDER = "rgba(15,37,87,0.12)";