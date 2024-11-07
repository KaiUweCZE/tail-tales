"use client";
import { useContext } from "react";
import AsideMenu from "./aside-menu";
import { FileContext } from "@/contexts/files-context";
import InputFilename from "./input-filename";
import UsersFolder from "./users-folder";
import SuccessfulMessage from "@/components/successfull-message";

const AsideWorkspace = () => {
  const context = useContext(FileContext);
  if (!context) return <span>Context is missing</span>;
  const { isActive, setIsActive, files, folders, isSuccess } = context;
  const rootFolders = folders.filter(
    (folder) => folder.parentId === "null" || folder.parentId === null
  );
  return (
    <>
      <aside className="grid w-full h-fit bg-slate-850">
        <AsideMenu />
        {isActive.active && isActive.parentName === undefined && (
          <InputFilename
            onComplete={() =>
              setIsActive({ active: false, inputType: "none", parentName: "" })
            }
            inputType={isActive.inputType}
          />
        )}
        <ul>
          {rootFolders.map((folder) => (
            <UsersFolder key={folder.index} folder={folder} />
          ))}
          {files.map((file) => (
            <li key={file} className="flex gap-1">
              <span>{file}</span>
            </li>
          ))}
        </ul>
      </aside>
      {isSuccess.success && isSuccess.headline === "Deleted!" && (
        <SuccessfulMessage
          text="Delete is completed"
          headline={isSuccess.headline}
        />
      )}
    </>
  );
};

export default AsideWorkspace;
