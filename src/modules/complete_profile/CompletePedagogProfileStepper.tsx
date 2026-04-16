import { useState } from "react";
import { StepOneValues, StepTwoValues } from "./definitions";
import StepDepartament from "./components/StepOneDepartament";
import StepPersonalDetails from "./components/StepTwoPersonalDetails";
import StepSuccess from "./components/StepSuccess";
import StepIndicator from "./components/StepIndicator";
import { NAVY, WHITE } from "../../styles/common";
import { useCompletePedagogProfile } from "../../hooks/complete_profile/useCompletePedagogProfile";

interface CompleteProfileStepperProps {
  onComplete: () => void;
}

const CompletePedagogProfileStepper = ({
  onComplete,
}: CompleteProfileStepperProps) => {
  const [step, setStep] = useState(0);
  const [stepOneData, setStepOneData] = useState<StepOneValues | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const { mutate: completeProfile, isPending } = useCompletePedagogProfile({
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => onComplete(), 2000);
    },
  });

  const handleStepOne = (values: StepOneValues) => {
    setStepOneData(values);
    setStep(1);
  };

  const handleStepTwo = (values: StepTwoValues) => {
    if (!stepOneData) return;
    completeProfile({
      dep_id: stepOneData.dep_id,
      ped_tit: values.ped_tit,
      ped_gjin: values.ped_gjin,
      ped_dl: values.ped_dl.toString(),
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
            {showSuccess
              ? "Gati!"
              : step === 0
                ? "Cili është departamenti juaj?"
                : "Të dhënat tuaja"}
          </h2>
        </div>

        {/* Steps */}
        {!showSuccess && <StepIndicator current={step} />}

        {/* Step content */}
        {showSuccess ? (
          <StepSuccess />
        ) : step === 0 ? (
          <StepDepartament onNext={handleStepOne} />
        ) : (
          <StepPersonalDetails
            onBack={() => setStep(0)}
            onFinish={handleStepTwo}
            isLoading={isPending}
          />
        )}
      </div>
    </div>
  );
};

export default CompletePedagogProfileStepper;
