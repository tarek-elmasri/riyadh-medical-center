import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { updateUserSchema } from "@/lib/validations/auth-schema";
import { ZodError } from "zod";
import {
  badParameters,
  serverError,
  unAuthenticatedError,
  unAuthorizedError,
} from "../../errors";

export const PATCH = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return unAuthenticatedError();

    // check whether same user or admin user
    if (currentUser.id !== params.userId) {
      if (!currentUser.isAdmin) {
        return unAuthorizedError();
      }
    }

    const json = await req.json();
    const body = updateUserSchema.parse(json);
    const { name, email, password, isAdmin } = body;

    // update isAdmin is only from admins
    if (isAdmin && !currentUser.isAdmin) {
      return unAuthorizedError();
    }

    const user = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        ...body,
        password: password
          ? await bcrypt.hash(process.env.PASSWORD_SALT + password, 12)
          : undefined,
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

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "PATCH_USER_ERROR");
    if (error instanceof ZodError) return badParameters(error);
    return serverError();
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { userId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return unAuthenticatedError();

    // check whether same user or admin user
    if (!currentUser.isAdmin) {
      return unAuthorizedError();
    }

    const user = await prismadb.user.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error, "DELETE_USER_ERROR");
    return serverError();
  }
};
