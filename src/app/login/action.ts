"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";
import { hashPassword } from "@/utils/password";

export const signUp = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const password = formData.get("password") as string;
  let success = false;

  if (!name || !password) {
    return { error: "Missing username or password" };
  }

  try {
    await connectToDatabase();
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { name },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        hashedPassword,
      },
      select: {
        id: true,
        name: true,
      },
    });

    success = true;
    // Return some useful information about the new user, excluding the password
    //redirect("/login");
    return {
      user,
      success,
    };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Something went wrong" };
  }
};

export const getUser = async (username: string) => {
  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { name: username },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    console.error("An error occured while get user", error);
  } finally {
    await prisma.$disconnect();
  }
};
