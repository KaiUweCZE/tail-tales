"use client";
import { DefaultConfiguration } from "@/app/setting/types";
import useClose from "@/hooks/useClose";
import {
  InputState,
  InputTypes,
  UserFile,
  UserFolderWithoutId,
} from "@/types/types";
import { FileElement } from "@/ui/workspace/file-workspace/types";
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

interface SuccessMessageType {
  success: boolean;
  text: string;
  headline: string;
}

export interface FileContextType {
  isInit: boolean;
  setIsInit: Dispatch<SetStateAction<boolean>>;
  isInitFile: boolean;
  setIsInitFile: Dispatch<SetStateAction<boolean>>;
  isSuccess: SuccessMessageType;
  setIsSuccess: Dispatch<SetStateAction<SuccessMessageType>>;
  isActive: InputStateWithParentId;
  setIsActive: Dispatch<SetStateAction<InputStateWithParentId>>;
  inputName: string;
  setInputName: Dispatch<SetStateAction<string>>;
  files: UserFile[];
  setFiles: Dispatch<SetStateAction<UserFile[]>>;
  folders: UserFolderWithoutId[];
  setFolders: Dispatch<SetStateAction<UserFolderWithoutId[]>>;
  newInput: (e: InputTypes, parent?: string) => void;
  userConfig: DefaultConfiguration | null;
  setUserConfig: Dispatch<SetStateAction<DefaultConfiguration | null>>;
  currentFile: FileElement[] | null;
  setCurrentFile: Dispatch<SetStateAction<FileElement[] | null>>;
  currentFileName: string;
  setCurrentFileName: Dispatch<SetStateAction<string>>;
  activeFolder: { name: string; index: number };
  setActiveFolder: Dispatch<SetStateAction<{ name: string; index: number }>>;
}

export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [isInit, setIsInit] = useState(false);
  const [isInitFile, setIsInitFile] = useState(false);
  const [isSuccess, setIsSuccess] = useState<SuccessMessageType>({
    success: false,
    text: "",
    headline: "",
  });
  const [files, setFiles] = useState<UserFile[]>([]);
  const [folders, setFolders] = useState<UserFolderWithoutId[]>([]);
  const [inputName, setInputName] = useState("");
  const [isActive, setIsActive] = useState<InputStateWithParentId>({
    active: false,
    inputType: "none",
    parentName: "",
  });
  const [userConfig, setUserConfig] = useState<DefaultConfiguration | null>(
    null
  );
  const [currentFile, setCurrentFile] = useState<FileElement[] | null>(null);
  const [currentFileName, setCurrentFileName] = useState("");
  const [activeFolder, setActiveFolder] = useState({ name: "", index: 0 });
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
    isInitFile,
    setIsInitFile,
    isSuccess,
    setIsSuccess,
    currentFile,
    setCurrentFile,
    currentFileName,
    setCurrentFileName,
    files,
    setFiles,
    folders,
    setFolders,
    newInput,
    isActive,
    setIsActive,
    inputName,
    setInputName,
    userConfig,
    setUserConfig,
    activeFolder,
    setActiveFolder,
  };

  return (
    <FileContext.Provider value={contextValues}>
      {children}
    </FileContext.Provider>
  );
};
