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

export const POST = async (req: Request) => {
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

    const clinic = await prismadb.clinic.create({
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(clinic);
  } catch (error) {
    console.log(error, "ERROR_CLINICS_POST");
    if (error instanceof ZodError) return badParameters(error);
    return serverError();
  }
};
