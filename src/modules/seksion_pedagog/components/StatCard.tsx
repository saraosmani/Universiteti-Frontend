import { NAVY, WHITE } from "../../../styles/common";

const StatCard = ({ label, value }: { label: string; value: number | string }) => (
  <div style={{ background: WHITE, borderRadius: 12, padding: "20px 24px", border: "1px solid #E8EDF5", display: "flex", flexDirection: "column", gap: 6 }}>
    <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>{label}</span>
    <span style={{ fontSize: 28, fontWeight: 700, color: NAVY, lineHeight: 1 }}>{value}</span>
  </div>
);

export default StatCard;