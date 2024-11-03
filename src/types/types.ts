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
  index: number;
  name: string;
  text: string;
  parent?: string;
}

export interface UserFolder {
  index: number;
  name: string;
  content: FolderContent[] | [];
  parent?: string;
}
