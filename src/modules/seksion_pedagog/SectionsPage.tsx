import React, { useState } from "react";
import { Seksion, useSeksionetAktive } from "../../hooks/seksion/useSeksionetAktive";
import { SeksionHistorik, useSeksionetHistorik } from "../../hooks/seksion/useSeksionetHistorik";


const SeksionetPage: React.FC = () => {
  const [tab, setTab] = useState<"aktive" | "historik">("aktive");

  const {
    data: seksionet = [],
    isLoading: loadingAktive,
    error: errorAktive,
  } = useSeksionetAktive();

  const {
    data: historiku = [],
    isLoading: loadingHistorik,
    error: errorHistorik,
  } = useSeksionetHistorik();

  const loading = loadingAktive || loadingHistorik;
  const error = errorAktive?.message || errorHistorik?.message || null;

  if (loading) return <div style={styles.center}>Duke ngarkuar...</div>;
  if (error) return <div style={styles.center}>Gabim: {error}</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Seksionet e Mia</h2>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          style={tab === "aktive" ? styles.tabActive : styles.tab}
          onClick={() => setTab("aktive")}
        >
          Semestri Aktiv
        </button>
        <button
          style={tab === "historik" ? styles.tabActive : styles.tab}
          onClick={() => setTab("historik")}
        >
          Historiku
        </button>
      </div>

      {/* Semestri Aktiv */}
      {tab === "aktive" && (
        <div>
          {seksionet.length === 0 ? (
            <p style={styles.empty}>Nuk ka seksione për semestrin aktiv.</p>
          ) : (
            <div style={styles.grid}>
              {seksionet.map((s: Seksion) => (
                <div key={s.sek_id} style={styles.card}>
                  <div style={styles.cardHeader}>
                    <span style={styles.dita}>{s.dita}</span>
                    <span style={styles.lloji}>{s.lloji}</span>
                  </div>
                  <h3 style={styles.lenda}>{s.lenda.emer}</h3>
                  <p style={styles.kod}>{s.lenda.kod}</p>
                  <div style={styles.info}>
                    <span>🕐 {s.orari}</span>
                    <span>👥 Grupi {s.grupi}</span>
                  </div>
                  <div style={styles.info}>
                    <span>🏛️ Salla {s.salla.nr} — {s.salla.godin}</span>
                  </div>
                  <div style={styles.info}>
                    <span>📚 {s.program_studim.emer} ({s.program_studim.nive})</span>
                  </div>
                  <div style={styles.footer}>
                    <span>Studentë: <strong>{s.nr_studenteve}</strong></span>
                    <span>S{s.semestri.nr} — {s.semestri.vit}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Historiku */}
      {tab === "historik" && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Dita</th>
              <th style={styles.th}>Lënda</th>
              <th style={styles.th}>Orari</th>
              <th style={styles.th}>Lloji</th>
              <th style={styles.th}>Grupi</th>
              <th style={styles.th}>Programi</th>
              <th style={styles.th}>Semestri</th>
            </tr>
          </thead>
          <tbody>
            {historiku.map((s: SeksionHistorik) => (
              <tr key={s.sek_id} style={styles.tr}>
                <td style={styles.td}>{s.dita}</td>
                <td style={styles.td}>{s.lenda.emer} <br /><small>{s.lenda.kod}</small></td>
                <td style={styles.td}>{s.orari}</td>
                <td style={styles.td}>{s.lloji}</td>
                <td style={styles.td}>{s.grupi}</td>
                <td style={styles.td}>{s.program}</td>
                <td style={styles.td}>{s.semestri}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { padding: "24px", fontFamily: "sans-serif" },
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  tabs: { display: "flex", gap: "12px", marginBottom: "24px" },
  tab: { padding: "8px 20px", border: "1px solid #ccc", borderRadius: "8px", cursor: "pointer", background: "#fff" },
  tabActive: { padding: "8px 20px", border: "none", borderRadius: "8px", cursor: "pointer", background: "#1e3a5f", color: "#fff" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" },
  card: { background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" },
  cardHeader: { display: "flex", justifyContent: "space-between", marginBottom: "8px" },
  dita: { fontWeight: "bold", color: "#1e3a5f" },
  lloji: { background: "#e8f0fe", color: "#1e3a5f", padding: "2px 8px", borderRadius: "12px", fontSize: "12px" },
  lenda: { margin: "0 0 4px", fontSize: "16px" },
  kod: { margin: "0 0 12px", color: "#888", fontSize: "13px" },
  info: { margin: "4px 0", fontSize: "14px", color: "#555" },
  footer: { display: "flex", justifyContent: "space-between", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #eee", fontSize: "13px", color: "#888" },
  empty: { color: "#888", textAlign: "center", marginTop: "40px" },
  center: { textAlign: "center", marginTop: "40px" },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { background: "#1e3a5f", color: "#fff", padding: "10px 14px", textAlign: "left" },
  td: { padding: "10px 14px", borderBottom: "1px solid #eee" },
  tr: { background: "#fff" },
};

export default SeksionetPage;