import { FileContext } from "@/contexts/files-context";
import { useContext, useState } from "react";
import InputFilename from "./input-filename";
import RenameFolderFile from "./rename-folder-file";
import DeleteAlert from "./delete-alert";
import SuccessfulMessage from "@/components/successfull-message";
import { UserFolderWithoutId } from "@/types/types";

const options = ["rename", "new file", "new folder"];
const liClass = "px-4 cursor-pointer hover:bg-slate-800";

const FolderOptions = ({ name, index }: { name: string; index: number }) => {
  const context = useContext(FileContext);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!context) return <span>Context is missing...</span>;

  const { isActive, setIsActive, newInput, folders, setFolders, setIsSuccess } =
    context;

  const handleRenameClick = () => {
    setIsRenaming(!isRenaming);
  };

  const handleDeleteClick = () => {
    setIsDeleting(!isDeleting);
  };

  const handleOnDeleteSuccess = () => {
    const updateFolders = (
      items: UserFolderWithoutId[]
    ): UserFolderWithoutId[] => {
      return items
        .filter((folder) => folder.index !== index)
        .map((folder) => ({
          ...folder,
          subFolders: updateFolders(folder.subFolders),
        }));
    };

    setFolders(updateFolders(folders));
    setIsSuccess({
      success: true,
      headline: "Deleted!",
      text: "Delete is completed",
    });

    setTimeout(
      () => setIsSuccess({ success: false, headline: "", text: "" }),
      3000
    );
  };

  return (
    <>
      <div className="grid absolute top-full w-36 right-0 z-10 py-2 bg-slate-850 border border-slate-800 rounded-sm expander-wrap">
        <ul className="flex flex-col gap expander-content">
          <li className={liClass} onClick={handleRenameClick}>
            rename
          </li>
          <li className={liClass}>new file</li>
          <li onClick={() => newInput("folder", name)} className={liClass}>
            new folder
          </li>
          <li className={liClass} onClick={handleDeleteClick}>
            delete
          </li>
        </ul>
        {isActive.active && isActive.parentName === name && (
          <InputFilename
            size="sm"
            inputType="folder"
            parent={name}
            onComplete={() =>
              setIsActive({ active: false, inputType: "none", parentName: "" })
            }
          />
        )}
        {isRenaming && (
          <RenameFolderFile
            type="folder"
            index={index}
            currentName={name}
            onComplete={() => setIsRenaming(false)}
          />
        )}
        {isDeleting && (
          <DeleteAlert
            name={name}
            index={index}
            type="folder"
            onDeleteSuccess={handleOnDeleteSuccess}
            handleCancel={() => setIsDeleting(false)}
          />
        )}
      </div>
    </>
  );
};

export default FolderOptions;
