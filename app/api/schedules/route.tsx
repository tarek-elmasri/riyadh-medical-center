import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import {
  badParameters,
  serverError,
  unAuthenticatedError,
  unAuthorizedError,
} from "../errors";
import { clinicSchema } from "@/lib/validations/clinic-schema";
import { ZodError } from "zod";
import { scheduleSchema } from "@/lib/validations/schedule-schema";

export const POST = async (req: Request) => {
  try {
    const json = await req.json();
    const body = scheduleSchema.parse(json);
    const { label } = body;

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return unAuthenticatedError();
    }

    if (!currentUser.isAdmin) {
      return unAuthorizedError();
    }

    const schedule = await prismadb.schedule.create({
      data: {
        label,
      },
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.log(error, "ERROR_SCHEDULES_POST");
    if (error instanceof ZodError) return badParameters(error);
    return serverError();
  }
};
