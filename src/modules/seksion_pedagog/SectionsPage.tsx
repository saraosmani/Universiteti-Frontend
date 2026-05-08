import React, { useMemo } from "react";
import { useState } from "react";
import Layout from "../dashboard/DashboardLayout";
import { NAVY, WHITE } from "../../styles/common";
import { useSeksionetAktive, Seksion } from "../../hooks/seksion/useSeksionetAktive";
import { useSeksionetHistorik, SeksionHistorik } from "../../hooks/seksion/useSeksionetHistorik";

const lojiBadgeColor: Record<string, { bg: string; color: string }> = {
  Leksion:   { bg: "#EEF2FF", color: "#6366F1" },
  Seminar:   { bg: "#ECFDF5", color: "#10B981" },
  Laborator: { bg: "#FFF7ED", color: "#F97316" },
};
const getBadge = (lloji: string) => lojiBadgeColor[lloji] ?? { bg: "#F1F5F9", color: "#64748B" };

const StatCard = ({ label, value }: { label: string; value: number | string }) => (
  <div style={{ background: WHITE, borderRadius: 12, padding: "20px 24px", border: "1px solid #E8EDF5", display: "flex", flexDirection: "column", gap: 6 }}>
    <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 28, fontWeight: 700, color: NAVY, lineHeight: 1 }}>{value}</span>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <span style={{ fontSize: 11, fontWeight: 600, background: "#F1F5F9", color: "#64748B", padding: "2px 8px", borderRadius: 6 }}>{text}</span>
);

const InfoRow = ({ icon, text }: { icon: string; text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#475569" }}>
    <span>{icon}</span><span>{text}</span>
  </div>
);

const SectionCard = ({ s }: { s: Seksion }) => {
  const badge = getBadge(s.lloji);
  return (
    <div style={{ background: WHITE, borderRadius: 14, padding: "20px 22px", border: "1px solid #E8EDF5", display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 12, color: "#94A3B8", fontWeight: 600 }}>{s.lenda.kod}</span>
        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: badge.bg, color: badge.color }}>{s.lloji}</span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>{s.lenda.emer}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <InfoRow icon="📅" text={`${s.dita}, ${s.orari}`} />
        <InfoRow icon="📍" text={`Salla ${s.salla.nr} · ${s.salla.godin}`} />
        <InfoRow icon="🎓" text={`${s.program_studim.emer} (${s.program_studim.nive})`} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 10, borderTop: "1px solid #F1F5F9" }}>
        <span style={{ fontSize: 13, color: "#64748B" }}>👥 <strong style={{ color: NAVY }}>{s.nr_studenteve}</strong> studentë</span>
        <div style={{ display: "flex", gap: 6 }}>
          <Badge text={`Gr. ${s.grupi}`} />
          <Badge text={s.program_studim.nive} />
        </div>
      </div>
    </div>
  );
};

const SeksionetPage: React.FC = () => {
  const [tab, setTab] = useState<"aktive" | "historik">("aktive");

  const { data: seksionet = [], isLoading: loadingAktive, error: errorAktive } = useSeksionetAktive();
  const { data: historiku = [], isLoading: loadingHistorik } = useSeksionetHistorik();
  const loading = loadingAktive || loadingHistorik;
  const error = errorAktive?.message ?? null;

  const stats = useMemo(() => {
    const lende = new Set(seksionet.map(s => s.lenda.kod)).size;
    const studente = seksionet.reduce((acc, s) => acc + s.nr_studenteve, 0);
    const ore = seksionet.reduce((acc, s) => {
      const [hS, mS] = s.ore_fillimi.split(":").map(Number);
      const [hE, mE] = s.ore_mbarimi.split(":").map(Number);
      return acc + (hE * 60 + mE - (hS * 60 + mS)) / 60;
    }, 0);
    return { seksione: seksionet.length, lende, studente, ore: Math.round(ore) };
  }, [seksionet]);

  const semLabel = seksionet.length > 0
    ? `Semestri ${seksionet[0].semestri.nr} · ${seksionet[0].semestri.vit}`
    : "";

  if (loading) return <Layout><div style={{ textAlign: "center", marginTop: 40 }}>Duke ngarkuar...</div></Layout>;
  if (error)   return <Layout><div style={{ textAlign: "center", marginTop: 40, color: "red" }}>Gabim: {error}</div></Layout>;

  return (
    <Layout>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: NAVY, margin: 0 }}>Seksionet e Mia</h2>
        {semLabel && (
          <span style={{ fontSize: 13, fontWeight: 600, color: "#6366F1", background: "#EEF2FF", padding: "5px 14px", borderRadius: 20 }}>
            {semLabel}
          </span>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        <StatCard label="Seksione aktive" value={stats.seksione} />
        <StatCard label="Lëndë të ndryshme" value={stats.lende} />
        <StatCard label="Studentë total" value={stats.studente} />
        <StatCard label="Orë në javë" value={stats.ore} />
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button onClick={() => setTab("aktive")} style={{ padding: "8px 20px", borderRadius: 8, cursor: "pointer", background: tab === "aktive" ? NAVY : WHITE, color: tab === "aktive" ? WHITE : "#64748B", fontWeight: 600, fontSize: 13, border: tab === "aktive" ? "none" : "1px solid #E2E8F0" }}>
          Kartat
        </button>
        <button onClick={() => setTab("historik")} style={{ padding: "8px 20px", borderRadius: 8, cursor: "pointer", background: tab === "historik" ? NAVY : WHITE, color: tab === "historik" ? WHITE : "#64748B", fontWeight: 600, fontSize: 13, border: tab === "historik" ? "none" : "1px solid #E2E8F0" }}>
          Historiku
        </button>
      </div>

      {tab === "aktive" && (
        seksionet.length === 0
          ? <p style={{ color: "#94A3B8", textAlign: "center", marginTop: 40 }}>Nuk ka seksione për semestrin aktiv.</p>
          : <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {seksionet.map(s => <SectionCard key={s.sek_id} s={s} />)}
            </div>
      )}

      {tab === "historik" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Dita", "Lënda", "Orari", "Lloji", "Grupi", "Programi", "Semestri"].map(h => (
                <th key={h} style={{ background: NAVY, color: WHITE, padding: "10px 14px", textAlign: "left", fontSize: 13 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historiku.map(s => (
              <tr key={s.sek_id} style={{ background: WHITE, borderBottom: "1px solid #F1F5F9" }}>
                <td style={{ padding: "10px 14px", fontSize: 13 }}>{s.dita}</td>
                <td style={{ padding: "10px 14px", fontSize: 13 }}>{s.lenda.emer}<br /><small style={{ color: "#94A3B8" }}>{s.lenda.kod}</small></td>
                <td style={{ padding: "10px 14px", fontSize: 13 }}>{s.orari}</td>
                <td style={{ padding: "10px 14px", fontSize: 13 }}>{s.lloji}</td>
                <td style={{ padding: "10px 14px", fontSize: 13 }}>{s.grupi}</td>
                <td style={{ padding: "10px 14px", fontSize: 13 }}>{s.program}</td>
                <td style={{ padding: "10px 14px", fontSize: 13 }}>{s.semestri}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default SeksionetPage;