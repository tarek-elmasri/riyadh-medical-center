import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { newUserSchema } from "@/lib/validations/auth-schema";
import { ZodError } from "zod";
import { badParameters, serverError } from "../errors";

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
        password: await bcrypt.hash(password + SALT, 12),
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
