const InfoRow = ({ icon, text }: { icon: string; text: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: "#475569" }}>
    <span>{icon}</span><span>{text}</span>
  </div>
);

export default InfoRow;