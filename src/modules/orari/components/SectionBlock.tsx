import React from "react";
import { Space, Tag, Tooltip, Typography } from "antd";
import {
  BookOutlined,
  ClockCircleOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Seksion } from "../../../hooks/seksion/useSeksionetAktive";
import { getColor, SLOT_H, toMinutes } from "./orariConstants";
import { WHITE } from "../../../styles/common";

const { Text } = Typography;

interface Props {
  s: Seksion;
  heightPx?: number;
}

const SectionBlock: React.FC<Props> = ({ s, heightPx }) => {
  const c = getColor(s.lloji);
  const durationH = (toMinutes(s.ore_mbarimi) - toMinutes(s.ore_fillimi)) / 60;
  const height = heightPx ?? Math.max(durationH * SLOT_H - 8, 44);

  const tooltipContent = (
    <Space direction="vertical" size={2} style={{ fontSize: 12 }}>
      <Text strong style={{ color: WHITE }}>
        {s.lenda.emer}
      </Text>
      <Space size={4}>
        <ClockCircleOutlined />
        <span>
          {s.ore_fillimi}–{s.ore_mbarimi}
        </span>
      </Space>
      <Space size={4}>
        <EnvironmentOutlined />
        <span>
          Salla {s.salla.nr}, {s.salla.godin}
        </span>
      </Space>
      <Space size={4}>
        <TeamOutlined />
        <span>
          Grupi {s.grupi} · {s.nr_studenteve} studentë
        </span>
      </Space>
      <Space size={4}>
        <BookOutlined />
        <span>{s.lenda.kod}</span>
      </Space>
      <Tag color={c.antColor} style={{ marginTop: 2 }}>
        {s.lloji}
      </Tag>
    </Space>
  );

  return (
    <Tooltip title={tooltipContent} color="#1e293b" placement="top">
      <div
        style={{
          background: c.bg,
          border: `1.5px solid ${c.border}`,
          borderRadius: 8,
          padding: "4px 7px",
          height,
          overflow: "hidden",
          cursor: "default",
          boxSizing: "border-box",
        }}
      >
        <Text
          strong
          style={{
            fontSize: 11,
            color: c.text,
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {s.lenda.emer}
        </Text>
        <Text style={{ fontSize: 10, color: c.text, opacity: 0.85, display: "block" }}>
          {s.ore_fillimi}–{s.ore_mbarimi}
        </Text>
        <Text
          style={{
            fontSize: 10,
            color: c.text,
            opacity: 0.75,
            display: "block",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {s.lloji} · Salla {s.salla.nr}
        </Text>
        <Text style={{ fontSize: 10, color: c.text, opacity: 0.65, display: "block" }}>
          Gr. {s.grupi} · {s.nr_studenteve} std
        </Text>
      </div>
    </Tooltip>
  );
};

export default SectionBlock;
