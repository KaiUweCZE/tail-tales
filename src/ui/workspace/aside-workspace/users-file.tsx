import { TextColor, UserFile } from "@/types/types";
import { Dispatch, SetStateAction, useState } from "react";
import { FileElement } from "../file-workspace/types";
import { NotepadTextIcon, Settings2 } from "lucide-react";
import clsx from "clsx";
import FileOptions from "./file-options";

interface UserFileInputs {
  file: UserFile;
  currentFileState: { id: string; name: string };
  setCurrentFile: Dispatch<SetStateAction<FileElement[] | null>>;
  setCurrentFileState: Dispatch<SetStateAction<{ id: string; name: string }>>;
  setColor: Dispatch<SetStateAction<string>>;
  setFont: Dispatch<SetStateAction<string>>;
  setFontColor: Dispatch<SetStateAction<TextColor | null>>;
}

const UsersFile = ({
  file,
  setCurrentFileState,
  setCurrentFile,
  currentFileState,
  setColor,
  setFont,
  setFontColor,
}: UserFileInputs) => {
  const [isCofigurated, setIsConfigurated] = useState(false);
  const handleSelectFile = (file: UserFile) => {
    setCurrentFile(file.elements);
    setCurrentFileState({ name: file.name, id: file.id });
    setColor(() => file.rootBg ?? "");
    setFont(() => file.rootFont ?? "");
    setFontColor(() => (file.rootFontColor as TextColor) ?? null);
    console.log("file:", file);
  };
  return (
    <li className="flex gap-1 pr-2 items-center justify-between relative">
      <div className="flex gap-1 pl-2 items-center">
        <NotepadTextIcon
          strokeWidth={1}
          className="h-4 w-4"
          color={(currentFileState.id === file.id && "#F5E68A") || "white"}
        />
        <span
          onClick={() => handleSelectFile(file)}
          className={clsx("cursor-pointer hover:text-amber-200", {
            "text-amber-200": currentFileState.id === file.id,
          })}
        >
          {file.name}
        </span>
      </div>
      <Settings2
        color={isCofigurated ? "#FDD984" : "white"}
        className="w-4 h-4 cursor-pointer color-"
        onClick={() => setIsConfigurated(!isCofigurated)}
      />
      {isCofigurated && <FileOptions name={file.name} fileId={file.id} />}
    </li>
  );
};

export default UsersFile;
