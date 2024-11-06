"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";

export const createFile = async (
  userId: string,
  name: string,
  index: number,
  parentId?: string
) => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error("The file could not be created.", error);
  } finally {
    await prisma.$disconnect();
  }
};

export const createFolder = async (
  userId: string,
  name: string,
  index: number,
  parentId?: string
) => {
  try {
    await connectToDatabase();
  } catch (error) {
    console.error("The folder could not be created.", error);
  } finally {
    await prisma.$disconnect();
  }
};
