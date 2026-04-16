import React from "react";
import Layout from "./DashboardLayout";
import { useAppSelector } from "../../store/hooks";
import { useProfileStatus } from "../../hooks/complete_profile/useGetProfileStatus";
import { useQueryClient } from "@tanstack/react-query";
import { BORDER, NAVY, WHITE } from "../../styles/common";
import CompletePedagogProfileStepper from "../complete_profile/CompletePedagogProfileStepper";
import CompleteStudentProfileStepper from "../complete_profile/CompleteStudentProfileStepper";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const { user } = useAppSelector((state) => state.auth);
  const isPedag = user?.role === "pedagog";
  const isStudent = user?.role === "student";

  const { data: statusData, refetch, isLoading } = useProfileStatus(isPedag || isStudent);
  const needsCompletion = (isPedag || isStudent) && statusData?.is_complete === false;

  console.log("Dashboard Debug:", {
    role: user?.role,
    isPedag,
    isStudent,
    statusData,
    isLoading,
    needsCompletion
  });

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
      {needsCompletion &&
        (user?.role === "pedagog" ? (
          <CompletePedagogProfileStepper onComplete={handleProfileComplete} />
        ) : user?.role === "student" ? (
          <CompleteStudentProfileStepper onComplete={handleProfileComplete} />
        ) : null)}
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
