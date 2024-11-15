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
    if (!user) throw new Error("User not found");

    // Vytvoříme transakci pro atomickou operaci
    const result = await prisma.$transaction(async (tx) => {
      let targetFolder;

      if (folderName && folderIndex) {
        targetFolder = await tx.folder.findUnique({
          where: {
            userId_name_index: {
              userId,
              name: folderName,
              index: folderIndex,
            },
          },
        });

        if (!targetFolder) throw new Error("Folder not found");
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

      const newFile = await tx.file.create({
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

      // Aktualizujeme folder a přidáme ID nového souboru
      if (targetFolder) {
        await tx.folder.update({
          where: { id: targetFolder.id },
          data: {
            fileIds: {
              push: newFile.id,
            },
          },
        });
      }

      return newFile;
    });

    return {
      id: result.id,
      name: result.name,
      elements: result.elements as unknown as FileElement[],
      folderId: result.folderId || undefined,
      folderIndex: result.folderIndex || undefined,
      folderName: result.folderName || undefined,
      userId: result.userId,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  } catch (error) {
    console.error("The file could not be created.", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

const validateFileElements = (elements: FileElement[]): boolean => {
  return elements.every(
    (element) =>
      element.id &&
      element.type &&
      typeof element.cssClass === "string" &&
      typeof element.content === "string" &&
      (element.children === null || Array.isArray(element.children)) &&
      element.createdAt instanceof Date &&
      element.updatedAt instanceof Date &&
      typeof element.order === "number" &&
      typeof element.additionalCss === "string"
  );
};

export const editFile = async (
  fileId: string,
  userId: string,
  updateData: {
    elements: FileElement[];
    name?: string;
  }
) => {
  try {
    const session = await auth();

    if (!session || !session.user || session.user.id !== userId) {
      throw new Error("Unauthorized");
    }

    // Validace elementů
    if (!validateFileElements(updateData.elements)) {
      throw new Error("Invalid elements structure");
    }

    // Převedeme datumy na ISO string pro uložení
    const elementsForDb = updateData.elements.map((element) => ({
      ...element,
      createdAt: element.createdAt.toISOString(),
      updatedAt: element.updatedAt.toISOString(),
    }));

    const updatedFile = await prisma.file.update({
      where: {
        id: fileId,
        userId, // Přidáno pro dodatečnou bezpečnost
      },
      data: {
        elements: elementsForDb,
        name: updateData.name,
        updatedAt: new Date(),
      },
    });

    // Převedeme zpět na FileElement[] s Date objekty
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const transformedElements = updatedFile.elements as any[];
    const elementsWithDates = transformedElements.map((element) => ({
      ...element,
      createdAt: new Date(element.createdAt),
      updatedAt: new Date(element.updatedAt),
    }));

    return {
      id: updatedFile.id,
      name: updatedFile.name,
      elements: elementsWithDates,
      folderId: updatedFile.folderId || undefined,
      folderIndex: updatedFile.folderIndex || undefined,
      folderName: updatedFile.folderName || undefined,
      userId: updatedFile.userId,
      createdAt: updatedFile.createdAt,
      updatedAt: updatedFile.updatedAt,
    };
  } catch (error) {
    console.error("Failed to update file:", error);
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export async function changeFileName(fileId: string, newName: string) {
  try {
    await connectToDatabase();
    const updatedFile = await prisma.file.update({
      where: {
        id: fileId,
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

export const deleteFile = async (fileId: string): Promise<DeleteResult> => {
  try {
    await connectToDatabase();

    const deletedFile = await prisma.file.delete({
      where: {
        id: fileId,
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
    console.log("Starting delete folder operation:", { index, userId, name });

    const result = await prisma.$transaction(async (tx) => {
      // Find the main folder
      const folder = await tx.folder.findFirst({
        where: { userId, name, index },
        select: {
          id: true,
          name: true,
          fileIds: true,
          subFolders: {
            select: {
              id: true,
              fileIds: true,
            },
          },
        },
      });

      if (!folder) throw new Error("Folder not found");
      console.log("Found main folder:", {
        id: folder.id,
        name: folder.name,
        fileIds: folder.fileIds,
        subFoldersCount: folder.subFolders.length,
      });

      // Recursive function to delete a folder and all its files and subfolders
      const deleteFolderRecursive = async (
        folderId: string,
        level: number = 0
      ) => {
        console.log(`${"-".repeat(level * 2)}Processing folder:`, folderId);

        // Find the current folder with its fields and subfolders
        const currentFolder = await tx.folder.findUnique({
          where: { id: folderId },
          select: {
            id: true,
            fileIds: true,
            subFolders: {
              select: {
                id: true,
                fileIds: true,
              },
            },
          },
        });

        if (!currentFolder) {
          console.log(`${"-".repeat(level * 2)}Folder not found:`, folderId);
          return;
        }

        // First we recursively process all subflolders
        for (const subFolder of currentFolder.subFolders) {
          await deleteFolderRecursive(subFolder.id, level + 1);
        }

        // Then delete all files in the main folder by fieldIds
        if (currentFolder.fileIds && currentFolder.fileIds.length > 0) {
          console.log(
            `${"-".repeat(level * 2)}Deleting files in folder ${folderId}:`,
            currentFolder.fileIds
          );

          const deletedFiles = await tx.file.deleteMany({
            where: {
              id: { in: currentFolder.fileIds },
            },
          });
          console.log(
            `${"-".repeat(level * 2)}Deleted ${
              deletedFiles.count
            } files from folder ${folderId}`
          );
        } else {
          console.log(
            `${"-".repeat(level * 2)}No fileIds in folder ${folderId}`
          );
        }

        // Delete main folder
        console.log(`${"-".repeat(level * 2)}Deleting folder ${folderId}`);
        await tx.folder.delete({
          where: { id: folderId },
        });
        console.log(`${"-".repeat(level * 2)}Folder ${folderId} deleted`);
      };

      // recursive deletion from the main folder
      await deleteFolderRecursive(folder.id);

      return folder.id;
    });

    console.log("Delete operation completed successfully");
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
