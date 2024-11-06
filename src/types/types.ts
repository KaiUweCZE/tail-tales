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

export interface UserFile {
  id: string;
  index: number;
  name: string;
  content: string;
  parent?: string;
}

export interface UserFolder {
  id: string;
  index: number;
  name: string;
  parentId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  files: UserFile[];
  subFolders: UserFolder[];
}

type FolderWithoutIds = Omit<UserFolder, "id" | "userId" | "subFolders">;
export interface UserFileWithoudId extends Omit<UserFile, "id" | "userId"> {}
export interface UserFolderWithoutId extends FolderWithoutIds {
  subFolders: UserFolderWithoutId[];
}

export interface HTMLElementConfig {
  className: string;
  variants?: Record<string, string>;
  defaultVariants?: string;
}

export interface DefaultConfiguration {
  id: string;
  userId: string;
  createAt: Date;
  updatedAt: Date;
  div: HTMLElementConfig;
  span: HTMLElementConfig;
  p: HTMLElementConfig;
  h1: HTMLElementConfig;
  h2: HTMLElementConfig;
  h3: HTMLElementConfig;
  ul: HTMLElementConfig;
  ol: HTMLElementConfig;
  li: HTMLElementConfig;
  table: HTMLElementConfig;
  tr: HTMLElementConfig;
  td: HTMLElementConfig;
  th: HTMLElementConfig;
  a: HTMLElementConfig;
  img: HTMLElementConfig;
}
