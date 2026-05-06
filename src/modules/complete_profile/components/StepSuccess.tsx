
import { CheckCircleFilled } from "@ant-design/icons";
import { NAVY } from "../../../styles/common";

const StepSuccess = () => (
  <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: `${NAVY}18`,
        border: `2px solid ${NAVY}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "0 auto 20px",
      }}
    >
      <CheckCircleFilled style={{ fontSize: 32, color: NAVY }} />
    </div>
    <h3
      style={{
        fontSize: 18,
        fontWeight: 700,
        color: NAVY,
        margin: "0 0 8px",
      }}
    >
      Profili u plotësua!
    </h3>
    <p style={{ fontSize: 13, color: "#888", margin: 0, lineHeight: 1.7 }}>
      Mirë se vini në sistem. Do të ridrejtoheni në dashboard…
    </p>
  </div>
);

export default StepSuccess;