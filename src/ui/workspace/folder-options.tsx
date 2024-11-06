import { FileContext } from "@/contexts/files-context";
import { useContext } from "react";
import InputFilename from "./input-filename";

const options = ["rename", "new file", "new folder"];

const FolderOptions = ({ name }: { name: string }) => {
  const context = useContext(FileContext);

  if (!context) return <span>Context is missing...</span>;

  const { isActive, newInput, createInput } = context;
  return (
    <div className="grid absolute bg-slate-800 top-full right-0 z-10">
      <ul className="flex flex-col gap-2">
        <li>rename</li>
        <li>new file</li>
        <li onClick={() => newInput("folder", name)} className="cursor-pointer">
          new folder
        </li>
      </ul>
      {isActive.active && isActive.parentId === name && (
        <InputFilename inputType="folder" parent={name} />
      )}
    </div>
  );
};

export default FolderOptions;
