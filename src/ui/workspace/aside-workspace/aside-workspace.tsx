"use client";
import { useContext } from "react";
import AsideMenu from "./aside-menu";
import { FileContext } from "@/contexts/files-context";
import UsersFolder from "./users-folder";
import SuccessfulMessage from "@/components/successfull-message";
import { useSession } from "next-auth/react";
import FolderInput from "./folder-input";
import FileInput from "./file-input";
import UsersFile from "./users-file";

const AsideWorkspace = () => {
  const { data: session } = useSession();
  const context = useContext(FileContext);
  if (!context || !session || !session.user)
    return <span>Context is missing</span>;
  const {
    isActive,
    setIsActive,
    files,
    folders,
    isSuccess,
    setCurrentFile,
    currentFileState,
    setCurrentFileState,
  } = context;
  const rootFolders = folders.filter(
    (folder) => folder.parentId === "null" || folder.parentId === null
  );

  const rootFiles = files.filter((file) => !file.folderName);

  const handleRenderInput = () => {
    console.log("isActive state: ", isActive);

    if (isActive.active && isActive.parentName === undefined) {
      switch (isActive.inputType) {
        case "file":
          return (
            <FileInput
              parentName=""
              size="md"
              variant="file"
              parentIndex={0}
              onComplete={() =>
                setIsActive({
                  active: false,
                  inputType: "none",
                  parentName: "",
                })
              }
            />
          );

        case "folder":
          return (
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
          );

        default:
          return;
      }
    }
  };

  return (
    <>
      <aside className="grid w-full h-fit bg-slate-800 pt-2 pb-4">
        <AsideMenu />
        {handleRenderInput()}
        <ul>
          {rootFolders.map((folder) => (
            <UsersFolder key={folder.index} folder={folder} />
          ))}
          {rootFiles.map((file) => (
            <UsersFile
              key={file.id}
              file={file}
              currentFileState={currentFileState}
              setCurrentFile={setCurrentFile}
              setCurrentFileState={setCurrentFileState}
            />
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
