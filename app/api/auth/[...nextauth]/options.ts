import * as z from "zod";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const authenticate = async (
  credentials: Record<"email" | "password", string> | undefined
) => {
  // validate user inputs
  const userCredentials = loginSchema.safeParse(credentials);
  if (!userCredentials.success) throw new Error("Invalid Credentials");

  // finding user
  const user = await prismadb.user.findUnique({
    where: {
      email: userCredentials.data.email,
    },
  });

  if (!user) throw new Error("Invalid Credentials");

  // validate password
  const SALT = process.env.PASSWORD_SALT;
  const validPassword = await bcrypt.compare(
    userCredentials.data.password + SALT,
    user.password
  );

  if (!validPassword) throw new Error("Invalid Credentials");

  // finally return user
  return user;
};

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: authenticate,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const dbUser = await prismadb.user.findFirst({
        where: {
          id: token.id,
        },
      });

      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
        return token;
      }

      return {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        picture: undefined,
        isAdmin: dbUser.isAdmin,
      };
    },
    session: ({ token, session }) => {
      if (token) {
        (session.user.id = token.id), (session.user.email = token.email);
        session.user.image = token.picture;
        session.user.name = token.name;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
