import { BankOutlined, CheckCircleFilled, UserOutlined } from "@ant-design/icons";
import { BORDER, NAVY, WHITE } from "../../../styles/common";

const steps = [
  { icon: <BankOutlined />, label: "Departamenti" },
  { icon: <UserOutlined />, label: "Të dhënat" },
];


const StepIndicator = ({ current }: { current: number }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 0,
      marginBottom: 36,
    }}
  >
    {steps.map((step, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          {/* Circle */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: done ? 18 : 16,
                fontWeight: 600,
                background: done || active ? NAVY : "transparent",
                border: `2px solid ${done || active ? NAVY : BORDER}`,
                color: done || active ? WHITE : "#aaa",
                transition: "all 0.3s ease",
              }}
            >
              {done ? <CheckCircleFilled style={{ fontSize: 20 }} /> : step.icon}
            </div>
            <span
              style={{
                fontSize: 11,
                fontWeight: active ? 600 : 400,
                color: active ? NAVY : "#aaa",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
              }}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line between steps */}
          {i < steps.length - 1 && (
            <div
              style={{
                width: 80,
                height: 2,
                marginBottom: 22,
                background: i < current ? NAVY : BORDER,
                transition: "background 0.3s ease",
              }}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default StepIndicator;