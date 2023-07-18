import prismadb from "@/lib/prismadb";
import { serverAppointmentSchema } from "@/lib/validations/appointment-schema";
import { ZodError } from "zod";
import { badParameters, serverError, unAuthenticatedError } from "../../errors";
import { NextResponse } from "next/server";
import { standardDate } from "@/lib/utils";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const PATCH = async (
  req: Request,
  { params }: { params: { appointmentId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return unAuthenticatedError();
    }

    const json = await req.json();
    // reformatting dates
    let formattedDate: Date | undefined;
    if (json.date) {
      formattedDate = standardDate(json.date);
    }

    const body = serverAppointmentSchema.parse({
      ...json,
      date: formattedDate,
    });
    const { date, doctorId, patientName, phoneNo, scheduleId } = body;

    const appointment = await prismadb.$transaction(async (tx) => {
      const patient = await tx.patient.upsert({
        where: {
          phoneNo,
        },
        update: {
          patientName,
        },
        create: {
          patientName,
          phoneNo,
        },
      });

      const notAvailable = await prismadb.appointment.findFirst({
        where: {
          date: standardDate(date),
          doctorId,
          scheduleId,
        },
      });

      if (notAvailable) throw new Error("Schedule Not Available");

      // create appointment
      const appointment = await tx.appointment.update({
        where: {
          id: params.appointmentId,
        },
        data: {
          date: standardDate(date),
          doctorId,
          scheduleId,
          patientId: patient.id,
        },
      });

      return appointment;
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.log(error, "ERROR_APPOINTMENT_PATCH");
    if (error instanceof ZodError) return badParameters(error);
    return serverError();
  }
};

export const DELETE = async (
  _req: Request,
  { params }: { params: { appointmentId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return unAuthenticatedError();
    }

    const appointment = await prismadb.appointment.delete({
      where: {
        id: params.appointmentId,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.log(error, "ERROR_APPOINTMENT_DELETE");
    return serverError();
  }
};
