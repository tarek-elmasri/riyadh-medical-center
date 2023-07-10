import * as z from "zod";
import { NextResponse } from "next/server";

export const unAuthenticatedError = () =>
  new NextResponse("Unauthenticated", { status: 403 });

export const unAuthorizedError = () =>
  new NextResponse("Unauthorized", { status: 401 });

export const badParameters = (error: z.ZodError) =>
  new NextResponse(JSON.stringify(error.issues), { status: 400 });

export const serverError = () =>
  new NextResponse("Server Error", { status: 500 });

export const notFoundError = () =>
  new NextResponse("Not Found", { status: 404 });
