import React, { useState, useMemo } from "react";
import { Spin } from "antd";
import Layout from "../dashboard/DashboardLayout";
import { useGetProvime, Provim } from "../../hooks/provime/useGetProvime";
import {
 NAVY,
 NAVY2,
 ACCENT,
 BORDER,
 WHITE,
 LIGHT,
 MUTED,
} from "../../styles/common";

const GREEN = "#059669";
const AMBER = "#d97706";
const PURPLE = "#7c3aed";
const RED = "#dc2626";

const TYPE_CONFIG: Record<
 string,
 { color: string; bg: string; border: string; label: string }
> = {
 Midterm: { color: AMBER, bg: "#fffbeb", border: "#fde68a", label: "Midterm" },
 Final: { color: RED, bg: "#fef2f2", border: "#fecaca", label: "Final" },
 default: { color: PURPLE, bg: "#f5f3ff", border: "#ddd6fe", label: "Provim" },
};

const typeConfig = (lloji: string) => TYPE_CONFIG[lloji] ?? TYPE_CONFIG.default;

const MONTHS_AL = [
 "Janar",
 "Shkurt",
 "Mars",
 "Prill",
 "Maj",
 "Qershor",
 "Korrik",
 "Gusht",
 "Shtator",
 "Tetor",
 "Nëntor",
 "Dhjetor",
];
const DAYS_AL = [
 "E Diel",
 "E Hënë",
 "E Martë",
 "E Mërkurë",
 "E Enjte",
 "E Premte",
 "E Shtunë",
];

function formatDateAl(dateStr: string) {
 const d = new Date(dateStr + "T00:00:00");
 return `${DAYS_AL[d.getDay()]}, ${d.getDate()} ${MONTHS_AL[d.getMonth()]} ${d.getFullYear()}`;
}

function daysUntil(dateStr: string): number {
 const today = new Date();
 today.setHours(0, 0, 0, 0);
 const target = new Date(dateStr + "T00:00:00");
 return Math.round((target.getTime() - today.getTime()) / 86400000);
}

const CountdownBadge: React.FC<{ days: number }> = ({ days }) => {
 if (days < 0)
 return (
 <span style={{ fontSize: 11, color: MUTED, fontStyle: "italic" }}>
 Përfunduar
 </span>
 );
 if (days === 0)
 return (
 <span
 style={{
 fontSize: 11,
 fontWeight: 700,
 color: RED,
 background: "#fef2f2",
 padding: "2px 8px",
 borderRadius: 20,
 border: '1px solid #fecaca',
 }}
 >
 Sot 🔥
 </span>
 );
 if (days <= 7)
 return (
 <span
 style={{
 fontSize: 11,
 fontWeight: 700,
 color: AMBER,
 background: "#fffbeb",
 padding: "2px 8px",
 borderRadius: 20,
 border: '1px solid #fde68a',
 }}
 >
 {days} ditë
 </span>
 );
 return (
 <span
 style={{
 fontSize: 11,
 fontWeight: 600,
 color: ACCENT,
 background: LIGHT,
 padding: "2px 8px",
 borderRadius: 20,
 border: `1px solid ${BORDER}`,
 }}
 >
 {days} ditë
 </span>
 );
};

const SUBJECT_COLORS = [ACCENT, GREEN, PURPLE, RED, AMBER, "#0891b2"];
const subjectColor = (index: number) =>
 SUBJECT_COLORS[index % SUBJECT_COLORS.length];

const ProvimCard: React.FC<{ provim: Provim; index: number }> = ({
 provim,
 index,
}) => {
 const cfg = typeConfig(provim.lloji);
 const days = daysUntil(provim.data);
 const isPast = days < 0;
 const color = subjectColor(index);

 return (
 <div
 style={{
 background: WHITE,
 border: `1px solid ${isPast ? BORDER : BORDER}`,
 borderRadius: 14,
 padding: "20px 22px",
 display: "flex",
 flexDirection: "column",
 gap: 14,
 opacity: isPast ? 0.65 : 1,
 transition: "box-shadow 0.18s",
 boxShadow: isPast ? "none" : "0 2px 8px rgba(15,37,87,0.07)",
 position: "relative",
 overflow: "hidden",
 }}
 >
 {/* color strip top */}
 <div
 style={{
 position: "absolute",
 top: 0,
 left: 0,
 right: 0,
 height: 3,
 background: isPast ? BORDER : color,
 borderRadius: "14px 14px 0 0",
 }}
 />

 {/* header row */}
 {/* header row — icon + name + badge stacked */}
 <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
 <div
 style={{
 width: 40,
 height: 40,
 borderRadius: 10,
 flexShrink: 0,
 background: `${color}18`,
 border: `1px solid ${color}33`,
 display: "flex",
 alignItems: "center",
 justifyContent: "center",
 fontSize: 13,
 fontWeight: 700,
 color,
 }}
 >
 {provim.lenda.kod.slice(0, 3)}
 </div>
 <div style={{ minWidth: 0, flex: 1 }}>
 <p
 style={{
 fontWeight: 700,
 fontSize: 14,
 color: NAVY,
 margin: "0 0 4px",
 whiteSpace: "nowrap",
 overflow: "hidden",
 textOverflow: "ellipsis",
 }}
 >
 {provim.lenda.emer}
 </p>
 {/* code + badge on the same line, below the name */}
 <div
 style={{
 display: "flex",
 alignItems: "center",
 gap: 6,
 flexWrap: "wrap",
 }}
 >
 <code
 style={{
 fontSize: 11,
 color: MUTED,
 background: LIGHT,
 padding: "1px 6px",
 borderRadius: 6,
 border: `1px solid ${BORDER}`,
 }}
 >
 {provim.lenda.kod}
 </code>
 <span
 style={{
 fontSize: 11,
 fontWeight: 700,
 color: cfg.color,
 background: cfg.bg,
 border: `1px solid ${cfg.border}`,
 padding: "2px 9px",
 borderRadius: 20,
 }}
 >
 {cfg.label}
 </span>
 </div>
 </div>
 </div>
 {/* divider */}
 <div style={{ borderTop: `1px solid ${BORDER}` }} />

 {/* date / time / room row */}
 <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
 <InfoItem icon="📅" label="Data" value={formatDateAl(provim.data)} />
 <InfoItem icon="🕐" label="Ora" value={provim.ora.slice(0, 5)} />
 <InfoItem
 icon="📍"
 label="Salla"
 value={`${provim.salla.nr}${provim.salla.godin ? ` · ${provim.salla.godin}` : ""}`}
 />
 {provim.semestri && (
 <InfoItem
 icon="📚"
 label="Semestri"
 value={`Sem. ${provim.semestri.nr} · ${provim.semestri.vit}`}
 />
 )}
 </div>

 {/* footer */}
 <div style={{ display: "flex", justifyContent: "flex-end" }}>
 <CountdownBadge days={days} />
 </div>
 </div>
 );
};

const InfoItem: React.FC<{ icon: string; label: string; value: string }> = ({
 icon,
 label,
 value,
}) => (
 <div>
 <p
 style={{
 fontSize: 10,
 color: MUTED,
 margin: "0 0 2px",
 textTransform: "uppercase",
 letterSpacing: 0.8,
 fontWeight: 600,
 }}
 >
 {icon} {label}
 </p>
 <p style={{ fontSize: 13, fontWeight: 600, color: NAVY, margin: 0 }}>
 {value}
 </p>
 </div>
);

type Filter = "all" | "upcoming" | "past" | string;

const ProvimePage = () => {
 const { data: provime = [], isLoading } = useGetProvime();
 const [filter, setFilter] = useState<Filter>("upcoming");

 const types = useMemo(
 () => Array.from(new Set(provime.map((p) => p.lloji))),
 [provime],
 );

 const filtered = useMemo(() => {
 const today = new Date();
 today.setHours(0, 0, 0, 0);
 let list = [...provime].sort((a, b) => a.data.localeCompare(b.data));
 if (filter === "upcoming")
 list = list.filter((p) => daysUntil(p.data) >= 0);
 else if (filter === "past")
 list = list.filter((p) => daysUntil(p.data) < 0);
 else if (filter !== "all") list = list.filter((p) => p.lloji === filter);
 return list;
 }, [provime, filter]);

 const upcoming = provime.filter((p) => daysUntil(p.data) >= 0);
 const nextExam = upcoming.sort((a, b) => a.data.localeCompare(b.data))[0];
 const nextDays = nextExam ? daysUntil(nextExam.data) : null;

 const FilterBtn: React.FC<{
 value: Filter;
 label: string;
 count?: number;
 }> = ({ value, label, count }) => (
 <button
 onClick={() => setFilter(value)}
 style={{
 padding: "7px 16px",
 borderRadius: 20,
 cursor: "pointer",
 fontSize: 13,
 fontWeight: 600,
 border: filter === value ? `1.5px solid ${ACCENT}` : `1px solid ${BORDER}`,
 background: filter === value ? ACCENT : WHITE,
 color: filter === value ? WHITE : NAVY,
 display: "flex",
 alignItems: "center",
 gap: 6,
 transition: "all 0.15s",
 }}
 >
 {label}
 {count !== undefined && (
 <span
 style={{
 background: filter === value ? "rgba(255,255,255,0.25)" : LIGHT,
 color: filter === value ? WHITE : MUTED,
 fontSize: 11,
 fontWeight: 700,
 padding: "0 6px",
 borderRadius: 10,
 lineHeight: "18px",
 }}
 >
 {count}
 </span>
 )}
 </button>
 );

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
 position: "absolute",
 width: 180,
 height: 180,
 borderRadius: "50%",
 background: "rgba(255,255,255,0.05)",
 right: -30,
 top: -60,
 }}
 />
 <div style={{ position: "relative", zIndex: 1 }}>
 <p
 style={{
 fontSize: 11,
 opacity: 0.7,
 margin: "0 0 4px",
 textTransform: "uppercase",
 letterSpacing: 1.2,
 }}
 >
 Orari i Provimeve
 </p>
 <h2
 style={{
 fontSize: 22,
 fontWeight: 700,
 margin: "0 0 4px",
 color: WHITE,
 }}
 >
 {upcoming.length > 0
 ? `${upcoming.length} provime të ardhshme`
 : "Nuk ka provime të ardhshme"}
 </h2>
 <p style={{ fontSize: 12, opacity: 0.7, margin: 0 }}>
 {nextExam
 ? `Provimi i ardhshëm: ${nextExam.lenda.emer} — ${formatDateAl(nextExam.data)}`
 : "Të gjitha provimet kanë përfunduar"}
 </p>
 </div>
 <div
 style={{ display: "flex", gap: 32, position: "relative", zIndex: 1 }}
 >
 {[
 [provime.length, "Gjithsej"],
 [upcoming.length, "Të ardhshme"],
 [
 nextDays !== null
 ? nextDays === 0
 ? "Sot"
 : `${nextDays}d`
 : "—",
 "Pas ditësh",
 ],
 ].map(([v, l]) => (
 <div key={String(l)}

