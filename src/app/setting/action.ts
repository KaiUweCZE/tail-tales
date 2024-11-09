"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";
import { auth } from "@/auth";
import { DefaultConfiguration, HTMLElementConfig } from "./types";
import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { convertDbConfig } from "./utils/convertDbConfig";

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
