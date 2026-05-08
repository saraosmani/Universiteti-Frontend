import { NAVY, WHITE } from "../../../styles/common";
import { Seksion } from "../../../hooks/seksion/useSeksionetAktive";
import Badge from "./Badge";
import InfoRow from "./InfoRow";

const lojiBadgeColor: Record<string, { bg: string; color: string }> = {
  Leksion:   { bg: "#EEF2FF", color: "#6366F1" },
  Seminar:   { bg: "#ECFDF5", color: "#10B981" },
  Laborator: { bg: "#FFF7ED", color: "#F97316" },
};
const getBadge = (lloji: string) => lojiBadgeColor[lloji] ?? { bg: "#F1F5F9", color: "#64748B" };

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

export default SectionCard;