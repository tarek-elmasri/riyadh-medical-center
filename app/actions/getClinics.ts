import prismadb from "@/lib/prismadb";
import { Clinic } from "@prisma/client";

export const getClinics = async () =>
  prismadb.clinic.findMany({ include: { doctors: true } });

export const getClinicById = (id: string) =>
  prismadb.clinic.findFirst({
    where: { id },
  });

export const getClinicsByQuery = (query: Clinic) =>
  prismadb.clinic.findMany({
    where: query,
  });
