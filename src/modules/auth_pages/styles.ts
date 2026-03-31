import { ACCENT, BORDER, LIGHT, MUTED, NAVY, NAVY2, WHITE } from "../../styles/styles";

 export const antdTheme = {
  token: {
    colorPrimary:         ACCENT,
    colorBgContainer:     WHITE,
    colorBorder:          BORDER,
    colorText:            NAVY,
    colorTextPlaceholder: MUTED,
    borderRadius:         6,
    fontFamily:           "'Inter', 'Segoe UI', sans-serif",
    fontSize:             14,
  },
  components: {
    Input: {
      activeBorderColor: ACCENT,
      hoverBorderColor:  NAVY2,
      colorBgContainer:  WHITE,
      colorText:         NAVY,
      colorIcon:         MUTED,
    },
    Button: {
      primaryColor: WHITE,
    },
  },
};

export const globalCss = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,600;1,500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${LIGHT}; }
  .ant-input-affix-wrapper { background: ${WHITE} !important; border-color: ${BORDER} !important; }
  .ant-input { background: ${WHITE} !important; color: ${NAVY} !important; }
  .ant-input::placeholder { color: ${MUTED} !important; }
  .ant-input-password-icon { color: ${MUTED} !important; }
  .ant-form-item-explain-error { color: #dc2626 !important; font-size: 12px; }
  .ant-divider-inner-text { color: ${MUTED} !important; font-size: 11px !important; letter-spacing: 1px; }
  .ant-divider { border-color: ${BORDER} !important; }
`;