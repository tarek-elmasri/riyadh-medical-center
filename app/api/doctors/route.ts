import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import {
  badParameters,
  serverError,
  unAuthenticatedError,
  unAuthorizedError,
} from "../errors";
import { doctorSchema } from "@/lib/validations/doctor-schema";
import { ZodError } from "zod";

export const POST = async (req: Request) => {
  try {
    const json = await req.json();
    const body = doctorSchema.parse(json);
    const { name, imageUrl, title, clinicId } = body;

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return unAuthenticatedError();
    }

    if (!currentUser.isAdmin) {
      return unAuthorizedError();
    }

    const doctor = await prismadb.doctor.create({
      data: {
        name,
        title,
        clinicId,
        imageUrl,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.log(error, "ERROR_DOCTORS_POST");
    if (error instanceof ZodError) return badParameters(error);
    return serverError();
  }
};
