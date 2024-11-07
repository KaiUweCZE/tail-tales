import { FileContext } from "@/contexts/files-context";
import { useContext, useState } from "react";
import InputFilename from "./input-filename";
import RenameFolderFile from "./rename-folder-file";

const options = ["rename", "new file", "new folder"];
const liClass = "px-4 cursor-pointer hover:bg-slate-800";

const FolderOptions = ({ name, index }: { name: string; index: number }) => {
  const context = useContext(FileContext);
  const [isRenaming, setIsRenaming] = useState(false);

  if (!context) return <span>Context is missing...</span>;

  const { isActive, newInput } = context;

  const handleRenameClick = () => {
    setIsRenaming(!isRenaming);
  };

  return (
    <div className="grid absolute top-full w-36 right-0 z-10 py-2 bg-slate-850 border border-slate-800 rounded-sm expander-wrap">
      <ul className="flex flex-col gap expander-content">
        <li className={liClass} onClick={handleRenameClick}>
          rename
        </li>
        <li className={liClass}>new file</li>
        <li onClick={() => newInput("folder", name)} className={liClass}>
          new folder
        </li>
      </ul>
      {isActive.active && isActive.parentName === name && (
        <InputFilename size="sm" inputType="folder" parent={name} />
      )}
      {isRenaming && (
        <RenameFolderFile
          type="folder"
          index={index}
          currentName={name}
          onComplete={() => setIsRenaming(false)}
        />
      )}
    </div>
  );
};

export default FolderOptions;
