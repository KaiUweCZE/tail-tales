"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";
import { auth } from "@/auth";
import { DefaultConfiguration, HTMLElementConfig } from "./types";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { convertDbConfig } from "./utils/convertDbConfig";
import { hashPassword, verifyPassword } from "@/utils/password";

export const getConfig = async () => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Not authenticated" };
    }

    await connectToDatabase();

    const config = await prisma.defaultConfiguration.findUnique({
      where: { userId: session.user.id },
    });

    if (!config) {
      return { error: "Configuration not found" };
    }

    const clientConfig = convertDbConfig(config);

    return clientConfig;
  } catch (error) {
    console.error("Error fetching configuration:", error);
    return { error: "Failed to fetch configuration" };
  } finally {
    await prisma.$disconnect();
  }
};

type ConfigWithoutMetadata = Omit<
  DefaultConfiguration,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

export const saveConfig = async (config: ConfigWithoutMetadata) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { error: "Not authenticated" };
    }

    await connectToDatabase();

    const configToSave: Record<string, HTMLElementConfig> = {};

    Object.entries(config).forEach(([key, value]) => {
      // set condition for requiered atribut className
      if (value && typeof value === "object" && "className" in value) {
        configToSave[key] = value;
      }
    });

    await prisma.defaultConfiguration.upsert({
      where: { userId: session.user.id },
      update: {
        elementStyles: configToSave as unknown as Prisma.JsonValue,
        updatedAt: new Date(),
      },
      create: {
        userId: session.user.id,
        elementStyles: configToSave as unknown as Prisma.JsonValue,
      },
    });

    revalidatePath("/settings");
    return { success: true };
  } catch (error) {
    console.error("Error saving configuration:", error);
    return { error: "Failed to save configuration" };
  } finally {
    await prisma.$disconnect();
  }
};

export const changePassword = async (
  userId: string,
  newPassword: string,
  oldPassword: string
) => {
  try {
    const session = await auth();

    if (userId === "6735c84978bdcdd795b71e6e") {
      return {
        success: false,
        error: "You can not change password for this user.",
      };
    }

    if (!session?.user?.id || userId !== session?.user.id) {
      console.log("not authenticated");

      return { success: false, error: "Not authenticated" };
    }
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { hashedPassword: true },
    });

    if (!user) {
      console.log("User not found");

      return { success: false, error: "User not found" };
    }

    const isPasswordValid = await verifyPassword(
      oldPassword,
      user?.hashedPassword ?? ""
    );
    if (!isPasswordValid) {
      console.log("Current password is incorrect");
      return { success: false, error: "Current password is incorrect" };
    }

    const isSamePassword = await verifyPassword(
      newPassword,
      user?.hashedPassword ?? ""
    );
    if (isSamePassword) {
      console.log("New password must be different from current password");

      return {
        success: false,
        error: "New password must be different from current password",
      };
    }

    const hashedPassword = await hashPassword(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: { hashedPassword },
      select: { id: true },
    });

    return {
      success: true,
      message: "Password successfully updated",
    };
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      error: "Failed to change password. Please try again.",
    };
  } finally {
    await prisma.$disconnect();
  }
};
