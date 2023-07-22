"use client";

import { useEffect, useMemo } from "react";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import AppointmentStepOne from "@/components/landing-page/appointments/appointment-step-one";
import AppointmentStepTwo from "@/components/landing-page/appointments/appointment-step-two";
import AppointmentStepThree from "@/components/landing-page/appointments/appointment-step-three";
import AppointmentSummary from "@/components/landing-page/appointments/appointment-summary";
import { ClinicsWithDoctors } from "@/app/types";

interface AppointmentFormProps {
  clinics: ClinicsWithDoctors;
}

const AppointmentForm = ({ clinics }: AppointmentFormProps) => {
  const { setSteps, currentStep } = useMultiStepForm();

  const steps = useMemo(
    () => [
      <AppointmentStepOne clinics={clinics} key={"step-1"} />,
      <AppointmentStepTwo key={"step-2"} />,
      <AppointmentStepThree key={"step-3"} />,
      <AppointmentSummary key={"step-4"} />,
    ],
    [clinics]
  );

  useEffect(() => {
    setSteps(steps.length, 1);
  }, [steps.length, setSteps]);

  return (
    <div
      className="overflow-x-hidden h-[25rem] rounded-lg border-2  shadow-xl
       "
    >
      {currentStep > 0 && steps[currentStep - 1]}
    </div>
  );
};

export default AppointmentForm;
