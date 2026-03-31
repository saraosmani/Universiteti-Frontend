import { useState }                from "react";
import { ConfigProvider, message } from "antd";
import { BookOutlined }            from "@ant-design/icons";

import { AuthResponse } from "../../api/authApi";
import LoginForm from "./login/Login";
import RegisterForm from "./Register/Register";
import GoogleButton from "./components/GoogleButton";
import { antdTheme, globalCss } from "./styles";
import { AuthMode} from "./definitions";
import CornerOrnament from "./components/CornerOrnament";
import { ACCENT, LIGHT, MUTED, NAVY, NAVY2, WHITE } from "../../styles/styles";

const tabs: { mode: AuthMode; label: string }[] = [
  { mode: "login",    label: "HYRJE"    },
  { mode: "register", label: "REGJISTRIM" },
];

export default function AuthPage() {
  const [mode, setMode]         = useState<AuthMode>("login");
  const [msgApi, contextHolder] = message.useMessage();

  const handleSuccess = (data: AuthResponse) =>
    msgApi.success(`Welcome, ${data.user.name}!`);

  const handleError = (err: Error) =>
    msgApi.error(err.message ?? "Diçka shkoi gabim");

  return (
    <>
      <style>{globalCss}</style>
      {contextHolder}

      <div style={{
        minHeight:  "100vh",
        background: LIGHT,
        display:    "flex",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}>

        {/* ── Left panel — navy ─────────────────────────────────────────── */}
        <div style={{
          flex:          "0 0 44%",
          background:    `linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)`,
          display:       "flex",
          flexDirection: "column",
          justifyContent:"space-between",
          padding:       "48px 56px",
          position:      "relative",
          overflow:      "hidden",
        }}>
          {/* Decorative circle blobs */}
          <div style={{
            position: "absolute", bottom: -120, right: -120,
            width: 400, height: 400, borderRadius: "50%",
            background: "rgba(255,255,255,0.04)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", top: -60, left: -60,
            width: 220, height: 220, borderRadius: "50%",
            background: "rgba(255,255,255,0.03)", pointerEvents: "none",
          }} />

          {/* Corner ornaments */}
          <CornerOrnament top={28}    left={28}  />
          <CornerOrnament top={28}    right={28} />
          <CornerOrnament bottom={28} left={28}  />
          <CornerOrnament bottom={28} right={28} />

          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, zIndex: 1 }}>
            <div style={{
              width: 46, height: 46,
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              color: WHITE, fontSize: 20,
              background: "rgba(255,255,255,0.08)",
            }}>
              <BookOutlined />
            </div>
            <div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: 3 }}>
              </div>
              <div style={{ color: WHITE, fontSize: 13, fontWeight: 500, letterSpacing: 1 }}>
                UAMD
              </div>
            </div>
          </div>

          {/* Main copy */}
          <div style={{ zIndex: 1 }}>
            <h1 style={{
              color:        WHITE,
              fontSize:     40,
              lineHeight:   1.15,
              fontWeight:   600,
              fontFamily:   "'Playfair Display', Georgia, serif",
              marginBottom: 16,
            }}>
              Universiteti<br />
              <span style={{ color: "rgba(255,255,255,0.55)", fontStyle: "italic", fontWeight: 400 }}>
                Aleksander Moisiu
              </span>
            </h1>
            <p style={{
              color:        "rgba(255,255,255,0.5)",
              fontSize:     15,
              lineHeight:   1.75,
              maxWidth:     300,
              marginBottom: 40,
            }}>
             Aksesoni portalin tuaj akademik, materialet e kurseve dhe burimet e universitetit përmes llogarisë suaj institucionale.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {["Autentifikim i Sigurt SSO", "Akses në Burimet Akademike", "Kërkohet Email Institucional"].map((label) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: WHITE }} />
                  </div>
                  <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 13 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, zIndex: 1 }}>
            © {new Date().getFullYear()} Universiteti Aleksander Moisiu, Durrës
          </div>
        </div>

        {/* ── Right panel — white ───────────────────────────────────────── */}
        <div style={{
          flex:           1,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          padding:        "60px 72px",
          background:     WHITE,
        }}>
          <div style={{ width: "100%", maxWidth: 380 }}>

            {/* Heading */}
            <h2 style={{
              color:        NAVY,
              fontSize:     26,
              fontWeight:   600,
              marginBottom: 6,
              fontFamily:   "'Playfair Display', serif",
            }}>
              {mode === "login" ? "Mirësevini" : "Krijo llogari"}
            </h2>
            <p style={{ color: MUTED, fontSize: 14, marginBottom: 32 }}>
              {mode === "login"
                ? "Hyni në llogarinë tuaj institucionale"
                : "Regjistrohuni me email-in e universitetit"}
            </p>

            {/* Tab switcher */}
            <div style={{
              display:      "flex",
              marginBottom: 28,
              background:   LIGHT,
              borderRadius: 8,
              padding:      4,
              gap:          4,
            }}>
              {tabs.map(({ mode: m, label }) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    flex:          1,
                    background:    mode === m ? WHITE : "transparent",
                    border:        "none",
                    borderRadius:  6,
                    color:         mode === m ? NAVY : MUTED,
                    padding:       "9px 0",
                    cursor:        "pointer",
                    fontSize:      12,
                    fontWeight:    mode === m ? 600 : 400,
                    letterSpacing: 1.5,
                    fontFamily:    "'Inter', sans-serif",
                    transition:    "all 0.18s",
                    boxShadow:     mode === m ? "0 1px 4px rgba(15,37,87,0.10)" : "none",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Forms */}
            <ConfigProvider theme={antdTheme}>
              {mode === "login"
                ? <LoginForm   onSuccess={handleSuccess} onError={handleError} />
                : <RegisterForm onSuccess={handleSuccess} onError={handleError} />
              }
              <GoogleButton onSuccess={handleSuccess} onError={handleError} />
            </ConfigProvider>

            <p style={{
              textAlign:  "center",
              color:      MUTED,
              fontSize:   11,
              marginTop:  28,
              lineHeight: 1.7,
            }}>
              Duke vazhduar, ju pranoni{" "}
              <span style={{ color: ACCENT, cursor: "pointer" }}>Kushtet e Përdorimit</span>{" "}
              and{" "}
             <span style={{ color: ACCENT, cursor: "pointer" }}>Politikën e Privatësisë</span>{" "}
              të Universitetit
            </p>
          </div>
        </div>
      </div>
    </>
  );
}