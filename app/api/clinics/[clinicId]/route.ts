import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import {
  badParameters,
  serverError,
  unAuthenticatedError,
  unAuthorizedError,
} from "../../errors";
import { clinicSchema } from "@/lib/validations/clinic-schema";
import { ZodError } from "zod";

export const PATCH = async (
  req: Request,
  { params }: { params: { clinicId: string } }
) => {
  try {
    const json = await req.json();
    const body = clinicSchema.parse(json);
    const { name, imageUrl } = body;

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return unAuthenticatedError();
    }

    if (!currentUser.isAdmin) {
      return unAuthorizedError();
    }

    const clinic = await prismadb.clinic.update({
      where: {
        id: params.clinicId,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(clinic);
  } catch (error) {
    console.log(error, "ERROR_CLINIC_PATCH");
    if (error instanceof ZodError) return badParameters(error);
    return serverError();
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { clinicId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return unAuthenticatedError();
    }

    if (!currentUser.isAdmin) {
      return unAuthorizedError();
    }

    const clinic = await prismadb.clinic.delete({
      where: {
        id: params.clinicId,
      },
    });

    return NextResponse.json(clinic);
  } catch (error) {
    console.log(error, "ERROR_CLINIC_DELETE");
    return serverError();
  }
};
