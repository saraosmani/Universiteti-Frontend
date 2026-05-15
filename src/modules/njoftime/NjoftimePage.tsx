import React, { useState } from "react";
import Layout from "../dashboard/DashboardLayout";
import { NAVY, NAVY2, ACCENT, BORDER, WHITE, LIGHT, MUTED } from "../../styles/common";

const GREEN  = "#059669";
const AMBER  = "#d97706";
const RED    = "#dc2626";

interface Njoftim {
  id: number;
  kategoria: "Akademike" | "Provime" | "Ngjarje" | "Urgjente";
  titulli: string;
  permbajtja: string;
  autori: string;
  data: string;
  lexuar: boolean;
}

const NJOFTIMET: Njoftim[] = [
  {
    id: 1,
    kategoria: "Urgjente",
    titulli: "Ndryshim i orarit të provimit të Matematikës",
    permbajtja:
      "Ju informojmë se provimi i Matematikës Diskrete i planifikuar për datën 20 Maj 2026 është zhvendosur në datën 22 Maj 2026, ora 10:00, në sallën A-204. Studentët janë të lutur të marrin parasysh këtë ndryshim.",
    autori: "Departamenti i Informatikës",
    data: "2026-05-14",
    lexuar: false,
  },
  {
    id: 2,
    kategoria: "Akademike",
    titulli: "Regjistrimi i lëndëve për semestrin e ardhshëm",
    permbajtja:
      "Regjistrimi i lëndëve për semestrin e ri akademik 2026-2027 do të fillojë më datën 1 Qershor 2026. Studentët duhet të hyjnë në portalin akademik dhe të zgjedhin lëndët e tyre brenda afatit 1-15 Qershor. Çdo vonesë do të trajtohet sipas rregullores universitare.",
    autori: "Zyra e Regjistrimit",
    data: "2026-05-12",
    lexuar: false,
  },
  {
    id: 3,
    kategoria: "Provime",
    titulli: "Orari i sesionit të provimeve të verës",
    permbajtja:
      "Orari i plotë i provimeve të sesionit veror 2026 është publikuar në faqen zyrtare të universitetit. Sesioni fillon më 15 Qershor dhe përfundon më 10 Korrik 2026. Studentët janë të lutur të kontrollojnë datat dhe sallat e caktuara për secilën lëndë.",
    autori: "Komisioni i Provimeve",
    data: "2026-05-10",
    lexuar: true,
  },
  {
    id: 4,
    kategoria: "Ngjarje",
    titulli: "Ceremonia e diplomimit — Qershor 2026",
    permbajtja:
      "Ceremonia e diplomimit për studentët e vitit të fundit do të zhvillohet më datën 28 Qershor 2026, ora 11:00, në Auditoriumin Qendror. Familjarët dhe miqtë janë të mirëpritur. Ftesa mund të tërhiqen pranë sekretarisë studentore nga data 10 deri 20 Qershor.",
    autori: "Rektorati",
    data: "2026-05-08",
    lexuar: true,
  },
  {
    id: 5,
    kategoria: "Akademike",
    titulli: "Afati i dorëzimit të projekteve përfundimtare",
    permbajtja:
      "Ju kujtojmë se afati i fundit për dorëzimin e projekteve përfundimtare për semestrin pranveror është data 30 Maj 2026, ora 23:59. Projektet e dorëzuara pas këtij afati nuk do të pranohen. Për çdo pyetje, kontaktoni pedagogun tuaj përkatës.",
    autori: "Departamenti i Informatikës",
    data: "2026-05-06",
    lexuar: true,
  },
  {
    id: 6,
    kategoria: "Ngjarje",
    titulli: "Konferenca Shkencore Studentore — TECH 2026",
    permbajtja:
      "Ju ftojmë të merrni pjesë në Konferencën Shkencore Studentore TECH 2026, që do të mbahet më 5 Qershor 2026 në ambientet e universitetit. Studentët që dëshirojnë të prezantojnë punën e tyre duhet të dërgojnë abstraktin e tyre deri më 25 Maj 2026 në adresën e organizatorëve.",
    autori: "Klubi Shkencor Studentor",
    data: "2026-05-03",
    lexuar: true,
  },
];

const KAT_CONFIG: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  Urgjente:  { color: RED,    bg: "#fef2f2", border: "#fecaca", icon: "🚨" },
  Akademike: { color: ACCENT, bg: LIGHT,     border: `${ACCENT}33`, icon: "📘" },
  Provime:   { color: AMBER,  bg: "#fffbeb", border: "#fde68a", icon: "📝" },
  Ngjarje:   { color: GREEN,  bg: "#f0fdf4", border: "#bbf7d0", icon: "🎉" },
};

function daysAgo(dateStr: string): string {
  const diff = Math.round((Date.now() - new Date(dateStr).getTime()) / 86400000);
  if (diff === 0) return "Sot";
  if (diff === 1) return "Dje";
  return `${diff} ditë më parë`;
}

type FilterKat = "Të gjitha" | "Urgjente" | "Akademike" | "Provime" | "Ngjarje";

const NjoftimePage = () => {
  const [filter, setFilter] = useState<FilterKat>("Të gjitha");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [lexuara, setLexuara] = useState<Set<number>>(
    new Set(NJOFTIMET.filter((n) => n.lexuar).map((n) => n.id))
  );

  const filtered = NJOFTIMET.filter(
    (n) => filter === "Të gjitha" || n.kategoria === filter
  );

  const totalPalexuara = NJOFTIMET.filter((n) => !lexuara.has(n.id)).length;

  const toggle = (id: number) => {
    setExpanded((prev) => (prev === id ? null : id));
    setLexuara((prev) => new Set([...prev, id]));
  };

  const filterOptions: FilterKat[] = ["Të gjitha", "Urgjente", "Akademike", "Provime", "Ngjarje"];

  return (
    <Layout>
      {/* ── Hero banner ── */}
      <div
        style={{
          background: `linear-gradient(130deg, ${NAVY} 0%, ${NAVY2} 45%, #2346a0 100%)`,
          borderRadius: 14,
          padding: "22px 28px",
          color: WHITE,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 14px rgba(15,37,87,0.18)",
          position: "relative",
          overflow: "hidden",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            position: "absolute", width: 180, height: 180, borderRadius: "50%",
            background: "rgba(255,255,255,0.05)", right: -30, top: -60,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: 11, opacity: 0.7, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1.2 }}>
            Qendra e Njoftimeve
          </p>
          <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 4px", color: WHITE }}>
            {totalPalexuara > 0 ? `${totalPalexuara} njoftime të palexuara` : "Të gjitha janë lexuar"}
          </h2>
          <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>
            {NJOFTIMET.length} njoftime gjithsej · Semestri Pranveror 2026
          </p>
        </div>
        <div style={{ display: "flex", gap: 32, position: "relative", zIndex: 1 }}>
          {[
            [NJOFTIMET.length, "Gjithsej"],
            [totalPalexuara, "Të reja"],
            [NJOFTIMET.filter((n) => n.kategoria === "Urgjente").length, "Urgjente"],
          ].map(([v, l]) => (
            <div key={String(l)} style={{ textAlign: "center" }}>
              <p style={{ fontSize: 22, fontWeight: 700, margin: 0, color: WHITE }}>{v}</p>
              <p style={{ fontSize: 11, opacity: 0.7, margin: "2px 0 0", color: WHITE }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
        {filterOptions.map((f) => {
          const count = f === "Të gjitha" ? NJOFTIMET.length : NJOFTIMET.filter((n) => n.kategoria === f).length;
          const active = filter === f;
          const katCfg = f !== "Të gjitha" ? KAT_CONFIG[f] : null;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "7px 16px", borderRadius: 20, cursor: "pointer",
                fontSize: 13, fontWeight: 600,
                border: active ? `1.5px solid ${katCfg?.color ?? ACCENT}` : `1px solid ${BORDER}`,
                background: active ? (katCfg?.bg ?? LIGHT) : WHITE,
                color: active ? (katCfg?.color ?? ACCENT) : NAVY,
                display: "flex", alignItems: "center", gap: 6,
              }}
            >
              {katCfg && <span>{katCfg.icon}</span>}
              {f}
              <span style={{
                background: active ? "rgba(0,0,0,0.06)" : LIGHT,
                color: active ? (katCfg?.color ?? ACCENT) : MUTED,
                fontSize: 11, fontWeight: 700, padding: "0 6px", borderRadius: 10, lineHeight: "18px",
              }}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Notifications list ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filtered.map((n) => {
          const cfg = KAT_CONFIG[n.kategoria];
          const isRead = lexuara.has(n.id);
          const isOpen = expanded === n.id;

          return (
            <div
              key={n.id}
              onClick={() => toggle(n.id)}
              style={{
                background: WHITE,
                border: `1px solid ${isOpen ? cfg.color + "55" : BORDER}`,
                borderRadius: 14,
                padding: "18px 20px",
                cursor: "pointer",
                boxShadow: isOpen ? `0 4px 16px rgba(15,37,87,0.09)` : "0 1px 3px rgba(15,37,87,0.05)",
                transition: "all 0.18s",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* unread indicator */}
              {!isRead && (
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0, width: 4,
                  background: cfg.color, borderRadius: "14px 0 0 14px",
                }} />
              )}

              {/* top row */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingLeft: !isRead ? 8 : 0 }}>
                {/* icon */}
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: cfg.bg, border: `1px solid ${cfg.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                }}>
                  {cfg.icon}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <p style={{
                      fontWeight: isRead ? 600 : 700, fontSize: 14,
                      color: NAVY, margin: "0 0 4px",
                    }}>
                      {n.titulli}
                      {!isRead && (
                        <span style={{
                          display: "inline-block", width: 7, height: 7,
                          borderRadius: "50%", background: cfg.color,
                          marginLeft: 8, verticalAlign: "middle",
                        }} />
                      )}
                    </p>
                    <span style={{ fontSize: 18, color: MUTED, flexShrink: 0, lineHeight: 1, marginTop: 2 }}>
                      {isOpen ? "▲" : "▼"}
                    </span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{
                      fontSize: 11, fontWeight: 700, color: cfg.color,
                      background: cfg.bg, border: `1px solid ${cfg.border}`,
                      padding: "2px 9px", borderRadius: 20,
                    }}>
                      {cfg.icon} {n.kategoria}
                    </span>
                    <span style={{ fontSize: 12, color: MUTED }}>
                      {n.autori}
                    </span>
                    <span style={{ fontSize: 12, color: MUTED }}>·</span>
                    <span style={{ fontSize: 12, color: MUTED }}>
                      {daysAgo(n.data)}
                    </span>
                  </div>
                </div>
              </div>

              {/* expanded body */}
              {isOpen && (
                <div style={{
                  marginTop: 14,
                  paddingTop: 14,
                  borderTop: `1px solid ${BORDER}`,
                  paddingLeft: !isRead ? 8 : 0,
                }}>
                  <p style={{ fontSize: 14, color: "#374151", lineHeight: 1.7, margin: 0 }}>
                    {n.permbajtja}
                  </p>
                  <p style={{ fontSize: 11, color: MUTED, margin: "10px 0 0", textAlign: "right" }}>
                    Publikuar nga <strong style={{ color: NAVY }}>{n.autori}</strong> · {n.data}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default NjoftimePage;