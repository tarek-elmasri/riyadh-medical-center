import prismadb from "@/lib/prismadb";
import getCurrentUser from "./getCurrentUser";

export const getUsers = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("Unauthenticated");
  if (!currentUser.isAdmin) throw new Error("Unauthorized");
  console.log(currentUser);
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

  return users;
};

export const getUserById = async (id: string) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("Unauthenticated");

  // check whether same user or admin user
  if (currentUser.id !== id) {
    if (!currentUser.isAdmin) throw new Error("Unauthorized");
  }

  const user = await prismadb.user.findUnique({
    where: {
      id,
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

  return user;
};
