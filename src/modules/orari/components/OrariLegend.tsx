import React from "react";
import { Space, Tag } from "antd";
import { LLOJI_COLORS } from "./orariConstants";

const OrariLegend: React.FC = () => (
  <Space wrap style={{ marginBottom: 20 }}>
    {Object.entries(LLOJI_COLORS)
      .filter(([k]) => k !== "default")
      .map(([label, c]) => (
        <Tag key={label} color={c.antColor} style={{ fontWeight: 500, fontSize: 12 }}>
          {label}
        </Tag>
      ))}
  </Space>
);

export default OrariLegend;
