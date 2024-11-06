"use client";
import useClose from "@/hooks/useClose";
import {
  InputState,
  InputTypes,
  UserFolder,
  UserFolderWithoutId,
} from "@/types/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface InputStateWithParentId extends InputState {
  parentId: string | undefined;
}

interface FileContextType {
  isActive: InputStateWithParentId;
  inputName: string;
  setInputName: Dispatch<SetStateAction<string>>;
  createInput: (type: InputTypes, name: string, parent?: string) => void;
  files: string[];
  setFiles: Dispatch<SetStateAction<string[]>>;
  folders: UserFolderWithoutId[];
  setFolders: Dispatch<SetStateAction<UserFolderWithoutId[]>>;
  newInput: (e: InputTypes, parent?: string) => void;
}

export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [folders, setFolders] = useState<UserFolderWithoutId[]>([]);
  const [inputName, setInputName] = useState("");
  const [isActive, setIsActive] = useState<InputStateWithParentId>({
    active: false,
    inputType: "none",
    parentId: "",
  });
  const { isOpen } = useClose(isActive.active);

  const newInput = (e: InputTypes, parent?: string) => {
    setInputName("");
    if (isActive.active && isActive.inputType === e) {
      setIsActive({ active: false, inputType: "none", parentId: undefined });
    } else if (!isActive.active) {
      setIsActive({ active: true, inputType: e, parentId: parent });
    } else if (isActive.inputType !== e || isActive.parentId !== parent) {
      setIsActive({ active: true, inputType: e, parentId: parent });
    }
  };

  /*const createInput = (type: InputTypes, name: string, parent?: string) => {
    if (type === "folder") {
      setFolders((prev) => [
        ...prev,
        {
          name: name,
          index: folders.length + 1,
          parentId: parent ?? "null",
          createdAt: new Date(),
          updatedAt: new Date(),
          files: [],
          subFolders: [],
        },
      ]);
    } else if (type === "file") {
      setFiles((prev) => [...prev, name]);
    }
  };*/

  const createInput = (type: InputTypes, name: string, parent?: string) => {
    if (type === "folder") {
      if (parent) {
        setFolders((prev) => {
          return prev.map((folder) => {
            if (folder.name === parent) {
              return {
                ...folder,
                subFolders: [
                  ...folder.subFolders,
                  {
                    name: name,
                    index: folder.subFolders.length + 1,
                    parentId: parent,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    files: [],
                    subFolders: [],
                  },
                ],
              };
            }
            return folder;
          });
        });
      } else {
        // create root folder
        setFolders((prev) => [
          ...prev,
          {
            name: name,
            index: folders.length + 1,
            parentId: "null",
            createdAt: new Date(),
            updatedAt: new Date(),
            files: [],
            subFolders: [],
          },
        ]);
      }
    } else if (type === "file") {
      setFiles((prev) => [...prev, name]);
    }
  };

  const contextValues = {
    files,
    setFiles,
    folders,
    setFolders,
    newInput,
    isActive,
    inputName,
    setInputName,
    createInput,
  };

  return (
    <FileContext.Provider value={contextValues}>
      {children}
    </FileContext.Provider>
  );
};
