import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import {
  serverError,
  unAuthenticatedError,
  unAuthorizedError,
} from "../../errors";

export const DELETE = async (
  _req: Request,
  { params }: { params: { scheduleId: string } }
) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return unAuthenticatedError();
    }

    if (!currentUser.isAdmin) {
      return unAuthorizedError();
    }

    const schedule = await prismadb.schedule.update({
      where: {
        id: params.scheduleId,
      },
      data: {
        archived: true,
      },
    });

    return NextResponse.json(schedule);
  } catch (error) {
    console.log(error, "ERROR_SCHEDULE_DELETE");
    return serverError();
  }
};
