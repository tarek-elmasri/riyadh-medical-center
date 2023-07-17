"use server";

import prismadb from "@/lib/prismadb";
import { Schedule } from "@prisma/client";

export const getSchedules = async () =>
  prismadb.schedule.findMany({ where: { archived: false } });

export const getScheduleById = (id: string) =>
  prismadb.schedule.findFirst({
    where: { id, archived: false },
  });

export const getSchedulesByQuery = (query: Partial<Schedule>) =>
  prismadb.schedule.findMany({
    where: query,
  });

interface SchedulesOptions {
  doctorId: string;
  date: Date;
}

export const getSchedulesForAppointments = async ({
  doctorId,
  date,
}: SchedulesOptions) => {
  const requiredDate = new Date(new Date(date).setHours(0, 0, 0, 0));
  const results = await prismadb.schedule.findMany({
    where: {
      doctors: {
        some: {
          id: doctorId,
        },
      },
    },
    include: {
      appointments: {
        where: {
          date: requiredDate,
          doctorId,
        },
      },
    },
  });

  return results.filter((schedule) => schedule.appointments.length === 0);
};
