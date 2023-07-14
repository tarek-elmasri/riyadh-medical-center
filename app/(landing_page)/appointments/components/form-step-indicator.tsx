"use client";

import useMultiStepForm from "@/hooks/useMultiStepForm";
import { cn } from "@/lib/utils";

const FormStepIndicator = () => {
  const { currentStep, stepsCount } = useMultiStepForm();
  const dots = new Array(stepsCount).fill(null);

  return (
    <div className="relative h-6">
      <div className="absolute px-16 inset-0 flex w-full justify-between z-20">
        {dots.map((_, i) => (
          <div
            key={`dot-${i}`}
            className={cn(
              "w-6 h-6 border-4 rounded-full border-sky-600 transition",
              i < currentStep ? " bg-neutral-100" : "bg-slate-800"
            )}
          />
        ))}
      </div>
      <div className="absolute mx-16 inset-0 z-10  h-[2px] bg-sky-600  top-[50%] translate-y-[-50%]" />
    </div>
  );
};

export default FormStepIndicator;
