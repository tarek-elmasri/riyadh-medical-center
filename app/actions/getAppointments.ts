"use server";

import prismadb from "@/lib/prismadb";
import { standardDate } from "@/lib/utils";

interface GetAppointments {
  date: Date;
}

export interface GetAppointmentsByDoctorId extends GetAppointments {
  doctorId: string;
}
export const getAppointmentsByDoctorId = async ({
  doctorId,
  date,
}: GetAppointmentsByDoctorId) => {
  return prismadb.appointment.findMany({
    where: {
      date: standardDate(date),
      doctorId,
    },
    include: {
      doctor: true,
      patient: true,
    },
  });
};
