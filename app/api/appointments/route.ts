import prismadb from "@/lib/prismadb";
import { appointmentSchema } from "@/lib/validations/appointment-schema";
import { ZodError } from "zod";
import { badParameters, serverError } from "../errors";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const json = await req.json();

    // reformatting dates
    let formattedDate: Date | undefined;
    if (json.date) {
      formattedDate = new Date(new Date(json.date).setHours(0, 0, 0, 0));
    }

    const body = appointmentSchema.parse({ ...json, date: formattedDate });
    const { date, doctorId, patientName, phoneNo, scheduleId } = body;

    const appointment = await prismadb.$transaction(async (tx) => {
      const patient = await tx.patient.upsert({
        where: {
          phoneNo,
        },
        update: {},
        create: {
          patientName,
          phoneNo,
        },
      });

      // abort if patient already have a reservation with same doctor
      const today = new Date().setHours(0, 0, 0, 0);
      const hasAppointment = await tx.appointment.findFirst({
        where: {
          doctorId,
          patientId: patient.id,
          date: {
            gte: new Date(today),
          },
        },
      });

      if (hasAppointment)
        throw new Error("patient already have upcoming appointment");

      // check if schedule has free space for appointment
      const notAvailable = await prismadb.appointment.findFirst({
        where: {
          date,
          doctorId,
          scheduleId,
        },
      });

      if (notAvailable) throw new Error("Schedule Not Available");

      // create appointment
      const appointment = await tx.appointment.create({
        data: {
          date,
          doctorId,
          scheduleId,
          patientId: patient.id,
        },
      });

      return appointment;
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) return badParameters(error);
    return serverError();
  }
};
