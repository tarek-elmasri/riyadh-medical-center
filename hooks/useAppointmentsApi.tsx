"use client";

import { getAppointmentsByDoctorId } from "@/app/actions/getAppointments";
import { AppointmentsWithDoctorAndPatient } from "@/app/types";
import { useState } from "react";

const useAppointmentsApi = () => {
  const [appointments, setAppointments] =
    useState<AppointmentsWithDoctorAndPatient>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async ({
    doctorId,
    date,
  }: {
    doctorId: string;
    date: Date;
  }) => {
    if (!doctorId || !date) return;

    try {
      setIsLoading(true);
      const res = await getAppointmentsByDoctorId({ doctorId, date });
      setAppointments(res);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    appointments,
    isLoading,
    fetchData,
  };
};

export default useAppointmentsApi;
