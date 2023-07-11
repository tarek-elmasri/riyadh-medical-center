import prismadb from "@/lib/prismadb";
import { Schedule } from "@prisma/client";

export const getSchedules = async () => prismadb.schedule.findMany();

export const getScheduleById = (id: string) =>
  prismadb.schedule.findFirst({
    where: { id, archived: false },
  });

export const getSchedulesByQuery = (query: Partial<Schedule>) =>
  prismadb.schedule.findMany({
    where: query,
  });
