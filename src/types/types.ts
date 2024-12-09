import { FileElement } from "@/ui/workspace/file-workspace/types";

export type InputState = {
  active: boolean;
  inputType: "folder" | "file" | "none";
};

export type InputTypes = InputState["inputType"];

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
  rootBg?: string;
  rootFont?: string;
  rootFontColor?: string;
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

type FolderWithoutIds = Omit<UserFolder, "id" | "userId" | "subFolders">;

export interface UserFolderWithoutId extends FolderWithoutIds {
  subFolders: UserFolderWithoutId[];
}

//export interface UserFileWithoudId extends Omit<UserFile, "id" | "userId"> {}

export const convertFolder = (folder: UserFolder): UserFolderWithoutId => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id, userId, ...rest } = folder;
  return {
    ...rest,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

export type Colors =
  | "slate"
  | "gray"
  | "zinc"
  | "neutral"
  | "stone"
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose";

export type Shade =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900";
export type TextColor = `text-${Colors}-${Shade}`;
