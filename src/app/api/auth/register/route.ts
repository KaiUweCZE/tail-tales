import { NextResponse } from "next/server";
import { hashPassword } from "@/utils/password";
import prisma from "../../../../../prisma";

export async function POST(req: Request) {
  try {
    const { password, name } = await req.json();

    if (!name || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if the user exists
    const existingUser = await prisma.user.findUnique({
      where: { name },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash password
    const hashedPassword = await hashPassword(password);

    // create a new user
    const user = await prisma.user.create({
      data: {
        name,
        hashedPassword: hashedPassword,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return NextResponse.json({
      user,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
