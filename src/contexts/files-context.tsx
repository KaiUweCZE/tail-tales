"use client";
import useClose from "@/hooks/useClose";
import { InputState, InputTypes, UserFolder } from "@/types/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface FileContextType {
  isActive: InputState;
  inputName: string;
  setInputName: Dispatch<SetStateAction<string>>;
  createInput: (type: InputTypes, name: string) => void;
  files: string[];
  setFiles: Dispatch<SetStateAction<string[]>>;
  folders: UserFolder[];
  setFolders: Dispatch<SetStateAction<UserFolder[]>>;
  newInput: (e: InputTypes) => void;
}

export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [files, setFiles] = useState<string[]>([]);
  const [folders, setFolders] = useState<UserFolder[]>([]);
  const [inputName, setInputName] = useState("");
  const [isActive, setIsActive] = useState<InputState>({
    active: false,
    inputType: "none",
  });
  const { isOpen } = useClose(isActive.active);

  const newInput = (e: InputTypes) => {
    setInputName("");
    if (isActive.active && isActive.inputType === e) {
      setIsActive({ active: false, inputType: "none" });
    } else if (!isActive.active) {
      setIsActive({ active: true, inputType: e });
    } else if (isActive.inputType !== e) {
      setIsActive({ active: true, inputType: e });
    }
  };

  const createInput = (type: InputTypes, name: string) => {
    if (type === "folder") {
      setFolders((prev) => [
        ...prev,
        { name: name, index: folders.length + 1, content: [] },
      ]);
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
