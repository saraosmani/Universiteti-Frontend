import React from "react";
import Layout from "./DashboardLayout";
import { useAppSelector } from "../../store/hooks";
import { useProfileStatus } from "../../hooks/complete_profile/useGetProfileStatus";
import CompleteProfileStepper from "../complete_profile/CompleteProfileStepper";
import { useQueryClient } from "@tanstack/react-query";
import { BORDER, NAVY, WHITE } from "../../styles/common";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.auth);
  const isPedag = user?.role === "pedagog";

  const { data: statusData, refetch } = useProfileStatus(isPedag);
  const needsCompletion = isPedag && statusData?.is_complete === false;

  const handleProfileComplete = () => {
    queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    queryClient.invalidateQueries({ queryKey: ["profileStatus"] });
    refetch();
  };
  return (
    <Layout>
      <h2 style={{ fontSize: "22px", fontWeight: "700", color: NAVY }}>
        Mirëserdhe! 👋
      </h2>
       {needsCompletion && (
         <CompleteProfileStepper onComplete={handleProfileComplete} />
       )}
      <div
        style={{
          marginTop: "24px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              background: WHITE,
              height: "150px",
              borderRadius: "16px",
              border: `1px solid ${BORDER}`,
            }}
          ></div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
