"use client";
import { DefaultConfiguration } from "@/app/setting/types";
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
  selectedElementId: string;
  setSelectedElementId: Dispatch<SetStateAction<string>>;
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
  currentFileState: { name: string; id: string };
  setCurrentFileState: Dispatch<SetStateAction<{ name: string; id: string }>>;
  activeFolder: { name: string; index: number };
  setActiveFolder: Dispatch<SetStateAction<{ name: string; index: number }>>;
}

export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [isInit, setIsInit] = useState(false);
  const [isInitFile, setIsInitFile] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState("");
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
  const [currentFileState, setCurrentFileState] = useState({
    name: "",
    id: "",
  });
  const [activeFolder, setActiveFolder] = useState({ name: "", index: 0 });

  const newInput = (e: InputTypes, parent?: string) => {
    setInputName("");
    if (
      isActive.active &&
      isActive.inputType === e &&
      isActive.parentName === parent
    ) {
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
    selectedElementId,
    setSelectedElementId,
    isSuccess,
    setIsSuccess,
    currentFile,
    setCurrentFile,
    currentFileState,
    setCurrentFileState,
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
