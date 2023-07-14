"use client";

import { useEffect, useMemo } from "react";
import AppointmentStepOne from "./appointment-step-one";
import { ClinicsWithDoctors } from "@/app/types";
import AppointmentStepTwo from "./appointment-step-two";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import AppointmentStepThree from "./appointment-step-three";
import AppointmentSummary from "./appointment-summary";

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
    <div className="overflow-x-hidden h-[30rem] bg-white rounded-lg border-2 border-sky-400 shadow-md shadow-sky-100">
      {currentStep > 0 && steps[currentStep - 1]}
    </div>
  );
};

export default AppointmentForm;
