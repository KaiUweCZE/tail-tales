"use client";
import { useContext } from "react";
import { FileContext } from "@/contexts/files-context";
import { FolderPlus, FilePlus } from "lucide-react";

const iconClass = `w-5 h-5 cursor-pointer hover:scale-105 transition`;
const tagClass = `absolute w-max invisible group-hover:visible bg-gray-800 px-2 py-1 my-1 rounded text-sm left-1/2 transform -translate-x-1/2 shadow-md transition duration-3000 z-10`;

const AsideMenu = () => {
  const context = useContext(FileContext);

  if (!context) return <span>Context is missing</span>;
  const { newInput } = context;
  const newFile = () => {};

  //const handleAddFile
  return (
    <header className="">
      <nav>
        <ul className="flex justify-center gap-4 p-1">
          <div className="relative group">
            <FolderPlus
              className={iconClass}
              onClick={() => newInput("folder")}
            />
            <span className={tagClass}>Create new folder</span>
          </div>
          <div className="relative group">
            <FilePlus className={iconClass} onClick={() => newInput("file")} />
            <span className={tagClass}>Create new file</span>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default AsideMenu;
