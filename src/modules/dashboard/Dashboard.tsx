import React from "react";
import { BORDER, NAVY, WHITE } from "../../styles/colors";
import Layout from "./DashboardLayout";

const Dashboard = () => {
  return (
    <Layout>
      <h2 style={{ fontSize: "22px", fontWeight: "700", color: NAVY }}>Mirëserdhe! 👋</h2>
      <div style={{ marginTop: "24px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
        {[1,2,3].map(i => (
          <div key={i} style={{ background: WHITE, height: "150px", borderRadius: "16px", border: `1px solid ${BORDER}` }}></div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;