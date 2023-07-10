import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { newUserSchema } from "@/lib/validations/auth-schema";
import { ZodError } from "zod";
import {
  badParameters,
  serverError,
  unAuthenticatedError,
  unAuthorizedError,
} from "../errors";

export const GET = async (_req: Request) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return unAuthenticatedError();
    if (!currentUser.isAdmin) return unAuthorizedError();

    const users = await prismadb.user.findMany({
      where: {
        id: {
          not: currentUser.id,
        },
      },
      select: {
        id: true,
        isAdmin: true,
        createdAt: true,
        updatedAt: true,
        name: true,
        email: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error, "GET_USERS_ERROR");
    return serverError();
  }
};

const POST = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.isAdmin) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await req.json();
    const body = newUserSchema.parse(json);
    const { name, email, password, isAdmin } = body;

    const SALT = process.env.PASSWORD_SALT;

    const user = await prismadb.user.create({
      data: {
        name,
        email,
        password: password + SALT,
        isAdmin,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "POST_USERS");

    if (error instanceof ZodError) {
      return badParameters(error);
    }
    return serverError();
  }
};

export { POST };
