"use client";
import { useContext } from "react";
import AsideMenu from "./aside-menu";
import { FileContext } from "@/contexts/files-context";
import InputFilename from "./input-filename";
import UsersFolder from "./users-folder";

const AsideWorkspace = () => {
  const context = useContext(FileContext);
  if (!context) return <span>Context is missing</span>;
  const { isActive, files, folders } = context;
  const rootFolders = folders.filter((folder) => folder.parentId === null);
  return (
    <aside className="grid w-full h-fit bg-slate-850">
      <AsideMenu />
      {isActive.active && isActive.parentName === undefined && (
        <InputFilename inputType={isActive.inputType} />
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
  );
};

export default AsideWorkspace;
