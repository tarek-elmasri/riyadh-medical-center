import prismadb from "@/lib/prismadb";
import { Doctor } from "@prisma/client";

export const getDoctors = async () =>
  prismadb.doctor.findMany({ include: { clinic: true } });

export const getDoctorById = (id: string) =>
  prismadb.doctor.findFirst({
    where: { id },
    include: {
      clinic: true,
      appointments: {
        include: { patient: true },
      },
    },
  });

export const getDoctorsByQuery = (query: Doctor) =>
  prismadb.doctor.findMany({
    where: query,
  });