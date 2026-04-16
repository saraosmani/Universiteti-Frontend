import React from "react";
import Layout from "../dashboard/DashboardLayout";

const VleresimStudenti = () => {
  return (
    <Layout>
      <div
        style={{
          background: "transparent",
          border: "1px solid #E2E8F0",
          borderRadius: "16px",
          padding: "40px",
          minHeight: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "#140857", fontSize: "24px", fontWeight: "700" }}>
          Vleresimi i Studentëve
        </h2>
      </div>
    </Layout>
  );
};

export default VleresimStudenti;
