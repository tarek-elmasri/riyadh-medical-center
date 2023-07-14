"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import Loader from "@/components/ui/Loader";

const AppointmentSummary: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { prev, form: data } = useMultiStepForm();

  const handleSubmit = async () => {
    // reformat form date into isostring
    const formattedDate = data.date.toISOString();
    const formData = { ...data, date: formattedDate };

    try {
      setIsLoading(true);
      await axios.post("/api/appointments", formData);
      toast.success("تم حجز الموعد بنجاح");
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("حدث خطأ");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader message="جاري حجز الموعد" />;
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
