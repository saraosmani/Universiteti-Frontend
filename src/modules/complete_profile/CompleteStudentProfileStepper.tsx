import { useState } from "react";
import { StepTwoStudentValues } from "./definitions";
import StepSuccess from "./components/StepSuccess";
import { NAVY, WHITE } from "../../styles/common";
import { useCompleteStudentProfile } from "../../hooks/complete_profile/useCompleteStudentProfile";
import StepOneStudentDetails from "./components/StepOneStudentDetails";

interface CompleteProfileStepperProps {
  onComplete: () => void;
}

const CompleteStudentProfileStepper = ({
  onComplete,
}: CompleteProfileStepperProps) => {
  const [step, setStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: completeProfile, isPending } = useCompleteStudentProfile({
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => onComplete(), 2000);
    },
  });

  const handleFinish = (values: StepTwoStudentValues) => {
    completeProfile({
      stu_atesi: values.stu_atesi,
      stu_gjini: values.stu_gjini,
      stu_dl: values?.stu_dl?.toString(),
    });
  };

  return (
    /* Fullscreen overlay */
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(10, 18, 40, 0.55)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      {/* Card */}
      <div
        style={{
          background: WHITE,
          borderRadius: 20,
          padding: "36px 40px 32px",
          width: "100%",
          maxWidth: 460,
          boxShadow: "0 24px 64px rgba(10,18,40,0.18)",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: showSuccess ? 24 : 8 }}>
          <div
            style={{
              display: "inline-block",
              background: `${NAVY}18`,
              borderRadius: 8,
              padding: "4px 12px",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: NAVY,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              Plotëso Profilin
            </span>
          </div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              color: NAVY,
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {showSuccess ? "Gati!" : "Të dhënat tuaja"}
          </h2>
        </div>

        {/* Step content */}
        {showSuccess ? (
          <StepSuccess />
        ) : (
          <StepOneStudentDetails
            onBack={() => setStep(0)}
            onFinish={handleFinish}
            isLoading={isPending}
          />
        )}
      </div>
    </div>
  );
};

export default CompleteStudentProfileStepper;
