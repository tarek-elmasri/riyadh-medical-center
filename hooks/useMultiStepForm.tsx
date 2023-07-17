import { standardDate, todayInKSA } from "@/lib/utils";
import { create } from "zustand";

interface UseMultiFormProps {
  currentStep: number;
  stepsCount: number;
  isLastStep: boolean;
  isFirstStep: boolean;
  form: AppointmentFormData;
  setCurrentStep: (stepNo: number) => void;
  setForm: (newData: Partial<AppointmentFormData>) => void;
  setSteps: (stepsCount: number, currentStep: number) => void;
  prev: (newData: Partial<AppointmentFormData>) => void;
  next: (newData: Partial<AppointmentFormData>) => void;
}

interface AppointmentFormData {
  clinicId: string;
  clinicName?: string;
  doctorId: string;
  doctorName?: string;
  doctorTitle?: string;
  date: Date;
  patientName: string;
  phoneNo: string;
  scheduleId: string;
  scheduleLabel?: string;
}

const initialFormData = {
  clinicId: "",
  doctorId: "",
  date: standardDate(todayInKSA()),
  patientName: "",
  phoneNo: "",
  scheduleId: "",
  scheduleLabel: "",
};

const useMultiStepForm = create<UseMultiFormProps>((set) => ({
  form: initialFormData,
  currentStep: 0,
  isLastStep: true,
  isFirstStep: true,
  stepsCount: 0,
  setCurrentStep: (step) => set((state) => ({ ...state, step })),
  setForm: (newData) =>
    set((state) => ({ ...state, form: { ...state.form, ...newData } })),
  setSteps: (stepsCount, currentStep) =>
    set((state) => ({
      ...state,
      stepsCount,
      currentStep,
      isFirstStep: currentStep === 1,
      isLastStep: currentStep === stepsCount,
    })),
  next: (newData) =>
    set((state) => {
      const nextStep = state.isLastStep
        ? state.currentStep
        : state.currentStep + 1;
      return {
        ...state,
        form: { ...state.form, ...newData },
        currentStep: nextStep,
        isFirstStep: nextStep === 1,
        isLastStep: nextStep === state.stepsCount,
      };
    }),
  prev: (newData) =>
    set((state) => {
      const prevStep = state.isFirstStep
        ? state.currentStep
        : state.currentStep - 1;
      return {
        ...state,
        form: { ...state.form, ...newData },
        currentStep: prevStep,
        isFirstStep: prevStep === 1,
        isLastStep: prevStep === state.stepsCount,
      };
    }),
}));

export default useMultiStepForm;
