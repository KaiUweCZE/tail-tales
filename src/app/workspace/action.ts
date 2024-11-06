"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";
import { UserFolderWithoutId } from "@/types/types";
import { auth } from "@/auth";

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
  parentName?: string
): Promise<UserFolderWithoutId | null | undefined> => {
  try {
    const session = await auth();
    console.log(session);

    if (!session || !session.user || session.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    await connectToDatabase();

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return null;

    let parentId: string | null = null;
    if (parentName && parentName !== "null") {
      const parentFolder = await prisma.folder.findFirst({
        where: {
          name: parentName,
          userId,
        },
      });

      if (!parentFolder) {
        throw new Error("Parent folder not found");
      }

      parentId = parentFolder.id;
    }

    console.log("parent id is: ", parentId);

    // Check if the name is not duplicate
    const existingFolder = await prisma.folder.findFirst({
      where: {
        name,
        userId,
        parentId: parentId ?? null,
      },
    });

    if (existingFolder) {
      throw new Error("Folder with this name already exists in this location");
    }

    const folder = await prisma.$transaction(async (prisma) => {
      // create new folder
      const newFolder = await prisma.folder.create({
        data: {
          name,
          index,
          userId,
          parentName: parentName ?? null,
          parentId: parentId ?? null,
        },
        include: {
          files: true,
          subFolders: true,
        },
      });

      if (parentId) {
        console.log("adding child folder: ", newFolder.id);

        const updatedParent = await prisma.folder.update({
          where: { id: parentId },
          data: {
            subFolderIds: {
              push: newFolder.id,
            },
          },
          include: {
            subFolders: true,
          },
        });
        console.log("updated parent subFolders: ", updatedParent.subFolders);
      }

      return newFolder;
    });

    // return client type
    return {
      name: folder.name,
      index: folder.index,
      parentId: folder.parentId ?? "null",
      parentName: folder.parentName ?? "null",
      createdAt: folder.createdAt,
      updatedAt: folder.updatedAt,
      files: [],
      subFolders: [],
    };
  } catch (error) {
    console.error("The folder could not be created.", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getFolders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        folders: true,
      },
    });

    if (!userId) return null;

    return user?.folders ?? [];
  } catch (error) {
    console.error("Error fetching folders:", error);
    throw new Error("Failed to fetch folders");
  } finally {
    await prisma.$disconnect();
  }
};

export async function changeFolderName(folderId: string, newName: string) {
  try {
    const updatedFolder = await prisma.folder.update({
      where: { id: folderId },
      data: {
        name: newName,
        updatedAt: new Date(),
      },
    });

    return { success: true, folder: updatedFolder };
  } catch (error) {
    console.error("Error updating folder name:", error);
    return { success: false, error: "Failed to update folder name" };
  }
}

export async function changeFileName(fileId: string, newName: string) {
  try {
    const updatedFile = await prisma.file.update({
      where: { id: fileId },
      data: {
        name: newName,
        updatedAt: new Date(),
      },
    });

    return { success: true, file: updatedFile };
  } catch (error) {
    console.error("Error updating file name:", error);
    return { success: false, error: "Failed to update file name" };
  }
}
