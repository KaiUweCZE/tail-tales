"use client";
import useClose from "@/hooks/useClose";
import { InputState, InputTypes, UserFolderWithoutId } from "@/types/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

interface InputStateWithParentId extends InputState {
  parentName: string | undefined;
}

interface FileContextType {
  isInit: boolean;
  setIsInit: Dispatch<SetStateAction<boolean>>;
  isActive: InputStateWithParentId;
  setIsActive: Dispatch<SetStateAction<InputStateWithParentId>>;
  inputName: string;
  setInputName: Dispatch<SetStateAction<string>>;
  //createInput: (type: InputTypes, name: string, parent?: string) => void;
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
  const [isInit, setIsInit] = useState(false);
  const [files, setFiles] = useState<string[]>([]);
  const [folders, setFolders] = useState<UserFolderWithoutId[]>([]);
  const [inputName, setInputName] = useState("");
  const [isActive, setIsActive] = useState<InputStateWithParentId>({
    active: false,
    inputType: "none",
    parentName: "",
  });
  const { isOpen } = useClose(isActive.active);

  const newInput = (e: InputTypes, parent?: string) => {
    setInputName("");
    if (isActive.active && isActive.inputType === e) {
      setIsActive({ active: false, inputType: "none", parentName: undefined });
    } else if (!isActive.active) {
      setIsActive({ active: true, inputType: e, parentName: parent });
    } else if (isActive.inputType !== e || isActive.parentName !== parent) {
      setIsActive({ active: true, inputType: e, parentName: parent });
    }
  };

  const contextValues = {
    isInit,
    setIsInit,
    files,
    setFiles,
    folders,
    setFolders,
    newInput,
    isActive,
    setIsActive,
    inputName,
    setInputName,
    //createInput,
  };

  return (
    <FileContext.Provider value={contextValues}>
      {children}
    </FileContext.Provider>
  );
};
