import prismadb from "@/lib/prismadb";
import { Doctor } from "@prisma/client";
import { PusherDoctor } from "@prisma/client";

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

export const getDoctorsCounterList = async () => {
  // const currentDoctorIds = currentList.map((pusherItem) => pusherItem.doctorId);
  return prismadb.doctor.findMany({
    where: {
      id: {
        notIn: (await prismadb.pusherDoctor.findMany()).map(
          (pusherItem) => pusherItem.doctorId
        ),
      },
    },
  });
};
