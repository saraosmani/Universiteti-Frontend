import React from "react";
import { Badge, Typography } from "antd";
import { NAVY } from "../../../styles/common";

const { Title } = Typography;

interface Props {
  semLabel: string;
}

const OrariHeader: React.FC<Props> = ({ semLabel }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    }}
  >
    <Title level={4} style={{ color: NAVY, margin: 0 }}>
      Orari i Pedagogut
    </Title>
    {semLabel && (
      <Badge
        count={semLabel}
        style={{
          backgroundColor: "#EEF2FF",
          color: "#6366F1",
          fontWeight: 600,
          fontSize: 12,
          boxShadow: "none",
          padding: "0 12px",
          height: 26,
          lineHeight: "26px",
          borderRadius: 13,
        }}
      />
    )}
  </div>
);

export default OrariHeader;