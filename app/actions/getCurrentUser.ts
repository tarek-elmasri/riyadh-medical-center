import getSession from "./getSession";
import prismadb from "@/lib/prismadb";

const getCurrentUser = async () => {
  const session = await getSession();

  if (!session?.user?.email) return null;

  const user = await prismadb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  return user;
};

export default getCurrentUser;
