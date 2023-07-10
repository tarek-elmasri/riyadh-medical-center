import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import {
  badParameters,
  serverError,
  unAuthenticatedError,
  unAuthorizedError,
} from "../../errors";
import { doctorSchema } from "@/lib/validations/doctor-schema";
import { ZodError } from "zod";

export const PATCH = async (
  req: Request,
  { params }: { params: { doctorId: string } }
) => {
  try {
    const json = await req.json();
    const body = doctorSchema.parse(json);
    const { name, title, clinicId, imageUrl } = body;

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return unAuthenticatedError();
    }

    if (!currentUser.isAdmin) {
      return unAuthorizedError();
    }

    const doctor = await prismadb.doctor.update({
      where: {
        id: params.doctorId,
      },
      data: {
        name,
        imageUrl,
        title,
        clinicId,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.log(error, "ERROR_DOCTOR_PATCH");
    if (error instanceof ZodError) return badParameters(error);
    return serverError();
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { doctorId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return unAuthenticatedError();
    }

    if (!currentUser.isAdmin) {
      return unAuthorizedError();
    }

    const doctor = await prismadb.doctor.delete({
      where: {
        id: params.doctorId,
      },
    });

    return NextResponse.json(doctor);
  } catch (error) {
    console.log(error, "ERROR_DOCTOR_DELETE");
    return serverError();
  }
};
