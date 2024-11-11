import { FileElement } from "@/ui/workspace/file-workspace/types";

export type InputState = {
  active: boolean;
  inputType: "folder" | "file" | "none";
};

export type InputTypes = InputState["inputType"];

interface FolderContent {
  index: number;
  name: string;
  type: InputTypes;
}

type FetchedFolder = {
  id: string;
  userId: string;
  index: number;
  name: string;
  parentId: string | null;
  parentName: string | null;
  createdAt: Date;
  updatedAt: Date;
  subFolderIds: string[];
};

export interface ApiFile {
  id: string;
  name: string;
  size: number;
  type: string;
  folderId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFile {
  id: string;
  name: string;
  elements: FileElement[];
  folderId?: string;
  folderIndex?: number;
  folderName?: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFolder {
  id: string;
  index: number;
  name: string;
  parentId: string | null;
  parentName: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  files: UserFile[];
  subFolders: UserFolder[];
}

/*
const fetchedFolders: {
    parentName: string | null;
    id: string;
    userId: string;
    index: number;
    name: string;
    parentId: string | null;
    createdAt: Date;
    updatedAt: Date;
    subFolderIds: string[];
}[] | null
*/

type FolderWithoutIds = Omit<UserFolder, "id" | "userId" | "subFolders">;

export interface UserFolderWithoutId extends FolderWithoutIds {
  subFolders: UserFolderWithoutId[];
}

export interface UserFileWithoudId extends Omit<UserFile, "id" | "userId"> {}

// convertors
/*
export const convertFile = (file: ApiFile): UserFile => {
  return {
    id: file.id,
    name: file.name,
    type: file.type,
    folderId: file.folderId,
    userId: file.userId,
    createdAt: file.createdAt,
    updatedAt: file.updatedAt,
  };
};
*/
export const convertFolder = (folder: UserFolder): UserFolderWithoutId => {
  const { id, userId, ...rest } = folder;
  return {
    ...rest,
    //files: folder.files?.map(convertFile) ?? [],
    subFolders: folder.subFolders?.map(convertFolder) ?? [],
  };
};

export const createUserFolderFromFetched = (
  fetchedFolders: FetchedFolder[],
  currentFolder: FetchedFolder
): UserFolder => {
  const subFolders = currentFolder.subFolderIds
    .map((subFolderId) =>
      fetchedFolders.find((folder) => folder.id === subFolderId)
    )
    .filter((folder): folder is FetchedFolder => folder !== undefined)
    .map((folder) => createUserFolderFromFetched(fetchedFolders, folder));

  return {
    id: currentFolder.id,
    index: currentFolder.index,
    name: currentFolder.name,
    parentId: currentFolder.parentId,
    parentName: currentFolder.parentName,
    userId: currentFolder.userId,
    createdAt: currentFolder.createdAt,
    updatedAt: currentFolder.updatedAt,
    files: [],
    subFolders,
  };
};

export const convertToUserFolderWithoutId = (
  folder: UserFolder
): UserFolderWithoutId => {
  const { id, userId, ...rest } = folder;
  return {
    ...rest,
    files: folder.files ?? [],
    subFolders: folder.subFolders.map(convertToUserFolderWithoutId),
  };
};

export const convertFetchedFolders = (
  fetchedFolders: FetchedFolder[] | null
): UserFolder[] => {
  if (!fetchedFolders) return [];

  const rootFolders = fetchedFolders.filter(
    (folder) => folder.parentId === null
  );

  return rootFolders.map((folder) =>
    createUserFolderFromFetched(fetchedFolders, folder)
  );
};
