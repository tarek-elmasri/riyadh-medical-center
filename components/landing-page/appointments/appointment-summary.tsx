"use client";

import axios from "axios";
import { format } from "date-fns";
import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import SuccessMark from "@/components/ui/success-mark";
import Loader from "@/components/ui/Loader";

const AppointmentSummary: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { prev, form: data, setForm, setCurrentStep } = useMultiStepForm();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      console.log(data);
      await axios.post("/api/appointments", data);
      toast.success("تم حجز الموعد بنجاح");
      setIsSuccess(true);
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ. الرجاء التأكد من عدم وجود اي حجز اخر مع الطبيب");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNew = () => {
    setForm({
      clinicId: "",
      date: new Date(),
      clinicName: "",
      doctorId: "",
      doctorName: "",
      doctorTitle: "",
      patientName: "",
      phoneNo: "",
      scheduleId: "",
      scheduleLabel: "",
    });

    setCurrentStep(1);
  };

  if (isLoading) {
    return (
      <div className="grid h-full place-items-center">
        <div className="flex flex-col items-center">
          <Loader color="white" />
          <p>جاري حجز الموعد. الرجاء الانتظار ...</p>
        </div>
      </div>
    );
  }

  if (!isLoading && isSuccess) {
    return (
      <div className="grid h-full place-items-center">
        <div className="flex flex-col items-center">
          <SuccessMark />
          <p className="mt-6">تم حجز الموعد بنجاح</p>
          <div className="mt-12 flex justify-center gap-6">
            <Button onClick={() => window.location.assign("/appointments")}>
              جديد
            </Button>
            <Button variant={"ghost"} onClick={() => router.push("/")}>
              عودة
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      animate={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="flex flex-col h-full p-6 gap-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center">
          بيانات الحجز
        </h2>
        <p>العيادة : {data.clinicName}</p>
        <p>الطبيب : {data.doctorName}</p>
        <p>التاريخ : {format(data.date, "dd/MM/yyyy")}</p>
        <p>الموعد : {data.scheduleLabel}</p>
        <p>الاسم : {data.patientName}</p>
        <p>رقم الهاتف : {data.phoneNo}</p>

        {/* form navigation */}
        <div className="mt-auto">
          <Separator className="mb-6" />
          <div className="flex items-center gap-6">
            <Button type="button" className="text-md" onClick={handleSubmit}>
              حجز
            </Button>
            <Button
              type="button"
              variant={"ghost"}
              className="text-md"
              onClick={() => prev({})}
            >
              عودة
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AppointmentSummary;
