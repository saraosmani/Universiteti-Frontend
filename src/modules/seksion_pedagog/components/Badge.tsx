const Badge = ({ text }: { text: string }) => (
  <span style={{ fontSize: 11, fontWeight: 600, background: "#F1F5F9", color: "#64748B", padding: "2px 8px", borderRadius: 6 }}>{text}</span>
);

export default Badge;