"use server";
import { connectToDatabase } from "@/utils/server-helpers";
import prisma from "../../../prisma";
import { UserFolderWithoutId } from "@/types/types";
import { auth } from "@/auth";
import { FileElement } from "@/ui/workspace/file-workspace/types";

export const createFile = async (
  userId: string,
  name: string,
  index: number,
  folderName?: string,
  folderIndex?: number,
  parentId?: string
) => {
  try {
    const session = await auth();
    console.log(session);

    if (!session || !session.user || session.user.id !== userId) {
      throw new Error("Unauthorized");
    }
    await connectToDatabase();

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new Error("User not found");
    }

    const initialElements = [
      {
        id: "rootElement",
        type: "div",
        cssClass: "w-full h-[80dvh] max-h-80dvh overflow-y-auto",
        content: "",
        children: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        order: 0,
        additionalCss: "",
      },
    ];

    const newFile = await prisma.file.create({
      data: {
        name,
        index,
        elements: initialElements,
        userId,
        folderId: parentId ?? undefined,
        folderName: folderName ?? undefined,
        folderIndex: folderIndex ?? undefined,
      },
    });

    return {
      id: newFile.id,
      name: newFile.name,
      elements: newFile.elements as unknown as FileElement[],
      folderId: newFile.folderId || undefined,
      folderIndex: newFile.folderIndex || undefined,
      folderName: newFile.folderName || undefined,
      userId: newFile.userId,
      createdAt: newFile.createdAt,
      updatedAt: newFile.updatedAt,
    };
  } catch (error) {
    console.error("The file could not be created.", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export const getFiles = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  try {
    await connectToDatabase();

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        files: true,
      },
    });

    if (!userId) return null;

    console.log("files: ", user?.files);
    return user?.files ?? [];
  } catch (error) {
    console.error("Error fetching files:", error);
    throw new Error("Failed to fetch files");
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

export async function changeFolderName(
  index: number,
  newName: string,
  oldName: string,
  userId: string
) {
  try {
    await connectToDatabase();
    const result = await prisma.$transaction(async (tx) => {
      const updatedFolder = await tx.folder.update({
        where: {
          userId_name_index: {
            userId,
            name: oldName,
            index,
          },
        },
        data: {
          name: newName,
          updatedAt: new Date(),
        },
      });

      if (updatedFolder.subFolderIds.length > 0) {
        const subFolders = await tx.folder.updateMany({
          where: {
            id: { in: updatedFolder.subFolderIds },
          },
          data: {
            parentName: newName,
            updatedAt: new Date(),
          },
        });
      }
      return updatedFolder;
    });

    return { success: true, folder: result };
  } catch (error) {
    console.error("Error updating folder name:", error);
    return { success: false, error: "Failed to update folder name" };
  } finally {
    await prisma.$disconnect();
  }
}

export async function changeFileName(
  index: number,
  newName: string,
  oldName: string,
  userId: string
) {
  try {
    await connectToDatabase();
    const updatedFile = await prisma.file.update({
      where: {
        userId_name_index: {
          userId,
          name: oldName,
          index,
        },
      },
      data: {
        name: newName,
        updatedAt: new Date(),
      },
    });

    return { success: true, file: updatedFile };
  } catch (error) {
    console.error("Error updating file name:", error);
    return { success: false, error: "Failed to update file name" };
  } finally {
    await prisma.$disconnect();
  }
}

type DeleteResult = {
  success: boolean;
  error?: string;
  deletedId?: string;
};

export const deleteFile = async (
  index: number,
  userId: string,
  name: string
): Promise<DeleteResult> => {
  try {
    await connectToDatabase();

    const deletedFile = await prisma.file.delete({
      where: {
        userId_name_index: {
          index,
          userId,
          name,
        },
      },
      select: {
        id: true,
      },
    });

    return {
      success: true,
      deletedId: deletedFile.id,
    };
  } catch (error) {
    console.error("Error deleting file:", error);
    return {
      success: false,
      error: "Failed to delete file",
    };
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteFolder = async (
  index: number,
  userId: string,
  name: string
): Promise<DeleteResult> => {
  try {
    await connectToDatabase();

    const result = await prisma.$transaction(async (tx) => {
      // find folder
      const folder = await tx.folder.findFirst({
        where: {
          userId,
          name,
          index,
        },
        include: {
          files: true,
          subFolders: true,
        },
      });

      if (!folder) throw new Error("Folder not found");

      // get all subfolder
      const getAllSubfolderIds = async (
        folderId: string
      ): Promise<string[]> => {
        const subFolders = await tx.folder.findMany({
          where: { parentId: folderId },
          select: { id: true, subFolderIds: true },
        });

        const ids = [folderId];

        for (const subFolder of subFolders) {
          const subIds = await getAllSubfolderIds(subFolder.id);
          ids.push(...subIds);
        }
        return ids;
      };

      const allFolderIds = await getAllSubfolderIds(folder.id);

      // delete files in subfolders
      await tx.file.deleteMany({
        where: {
          folderId: { in: allFolderIds },
        },
      });

      // delete all subfolders
      await tx.folder.deleteMany({
        where: {
          id: { in: allFolderIds },
        },
      });

      return folder.id;
    });

    return {
      success: true,
      deletedId: result,
    };
  } catch (error) {
    console.error("Error deleting folder:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to delete folder";
    return {
      success: false,
      error: errorMessage,
    };
  } finally {
    await prisma.$disconnect();
  }
};
