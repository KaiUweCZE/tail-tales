"use client";
import { DefaultConfiguration } from "@/app/setting/types";
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

interface SuccessMessageType {
  success: boolean;
  text: string;
  headline: string;
}

interface FileContextType {
  isInit: boolean;
  isSuccess: SuccessMessageType;
  setIsSuccess: Dispatch<SetStateAction<SuccessMessageType>>;
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
  userSetting: DefaultConfiguration | null;
  setUserSetting: Dispatch<SetStateAction<DefaultConfiguration | null>>;
}

export const FileContext = createContext<FileContextType | undefined>(
  undefined
);

export const FileProvider = ({ children }: { children: ReactNode }) => {
  const [isInit, setIsInit] = useState(false);
  const [isSuccess, setIsSuccess] = useState<SuccessMessageType>({
    success: false,
    text: "",
    headline: "",
  });
  const [files, setFiles] = useState<string[]>([]);
  const [folders, setFolders] = useState<UserFolderWithoutId[]>([]);
  const [inputName, setInputName] = useState("");
  const [isActive, setIsActive] = useState<InputStateWithParentId>({
    active: false,
    inputType: "none",
    parentName: "",
  });
  const [userSetting, setUserSetting] = useState<DefaultConfiguration | null>(
    null
  );
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
    isSuccess,
    setIsSuccess,
    files,
    setFiles,
    folders,
    setFolders,
    newInput,
    isActive,
    setIsActive,
    inputName,
    setInputName,
    userSetting,
    setUserSetting,
  };

  return (
    <FileContext.Provider value={contextValues}>
      {children}
    </FileContext.Provider>
  );
};
