"use client";
import { useContext } from "react";
import AsideMenu from "./aside-menu";
import { FileContext } from "@/contexts/files-context";
import UsersFolder from "./users-folder";
import SuccessfulMessage from "@/components/successfull-message";
import { useSession } from "next-auth/react";
import FolderInput from "./folder-input";

const AsideWorkspace = () => {
  const { data: session } = useSession();
  const context = useContext(FileContext);
  if (!context || !session || !session.user)
    return <span>Context is missing</span>;
  const { isActive, setIsActive, files, folders, isSuccess } = context;
  const rootFolders = folders.filter(
    (folder) => folder.parentId === "null" || folder.parentId === null
  );

  const rootFiles = files.filter((file) => !file.folderName);

  return (
    <>
      <aside className="grid w-full h-fit bg-slate-850">
        <AsideMenu />
        {isActive.inputType === "folder" &&
          isActive.active &&
          isActive.parentName === undefined && (
            <div className="grid  justify-center">
              <FolderInput
                size="md"
                variant="folder"
                parent={parent.name}
                onComplete={() =>
                  setIsActive({
                    active: false,
                    inputType: "none",
                    parentName: "",
                  })
                }
              />
            </div>
          )}

        <ul>
          {rootFolders.map((folder) => (
            <UsersFolder key={folder.index} folder={folder} />
          ))}
          {rootFiles.map((file) => (
            <li key={file.id} className="flex gap-1">
              <span>{file.name}</span>
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
