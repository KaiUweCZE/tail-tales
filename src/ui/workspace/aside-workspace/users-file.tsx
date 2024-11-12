import { UserFile } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import { FileElement } from "../file-workspace/types";
import { NotepadTextIcon } from "lucide-react";
import clsx from "clsx";

interface UserFileInputs {
  file: UserFile;
  currentFileState: { id: string; name: string };
  setCurrentFile: Dispatch<SetStateAction<FileElement[] | null>>;
  setCurrentFileState: Dispatch<SetStateAction<{ id: string; name: string }>>;
}

const UsersFile = ({
  file,
  setCurrentFileState,
  setCurrentFile,
  currentFileState,
}: UserFileInputs) => {
  const handleSelectFile = (file: UserFile) => {
    console.log("file:", file);

    setCurrentFile(file.elements);
    setCurrentFileState({ name: file.name, id: file.id });
  };
  return (
    <li className="flex gap-1 pl-2 items-center">
      <NotepadTextIcon
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
    </li>
  );
};

export default UsersFile;
