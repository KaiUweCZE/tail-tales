import type { NextAuthConfig } from "next-auth";

export const AuthConfig = {
  pages: {
    signIn: "/login",
  },
} as NextAuthConfig;
