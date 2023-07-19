import prismadb from "@/lib/prismadb";
import { Doctor } from "@prisma/client";
import { PusherDoctor } from "./pusher";

export const getDoctors = async () =>
  prismadb.doctor.findMany({
    include: { clinic: true, schedules: { where: { archived: false } } },
  });

export const getDoctorById = (id: string) =>
  prismadb.doctor.findFirst({
    where: { id },
    include: {
      clinic: true,
      schedules: { where: { archived: false } },
    },
  });

export const getDoctorsByQuery = (query: Doctor) =>
  prismadb.doctor.findMany({
    where: query,
    include: {
      clinic: true,
      schedules: { where: { archived: false } },
    },
  });

export const getDoctorsCounterList = async (
  currentList: PusherDoctor[]
): Promise<PusherDoctor[]> => {
  const currentDoctorIds = currentList.map((doctor) => doctor.id);
  const doctors = await prismadb.doctor.findMany({
    where: {
      id: {
        notIn: currentDoctorIds,
      },
    },
  });

  return doctors.map((doctor) => ({
    name: doctor.name,
    id: doctor.id,
    counter: 0,
  }));
};
