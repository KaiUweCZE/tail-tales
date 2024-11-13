import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
import { verifyPassword } from "@/utils/password";
import prisma from "../prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        name: {
          label: "Name",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      authorize: async (credentials, _request) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        //let user = null;

        if (!credentials?.name || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const user = await prisma.user.findUnique({
            where: { name: credentials.name as string },
          });

          if (!user || !user.hashedPassword) {
            throw new Error("Invalid credentials");
          }

          const isValid = await verifyPassword(
            credentials.password as string,
            user.hashedPassword
          );

          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          return {
            id: user.id,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
