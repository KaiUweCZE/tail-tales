import { useContext, useState } from "react";
import RenameFolderFile from "./rename-folder-file";
import DeleteAlert from "../delete-alert";
import { FileContext } from "@/contexts/files-context";

interface FileOptionsProps {
  name: string;
  fileId: string;
}

const liClass = "px-4 cursor-pointer hover:text-amber-200";
const FileOptions = ({ name, fileId }: FileOptionsProps) => {
  const context = useContext(FileContext);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!context) return <span>Context is missing...</span>;

  const { files, setFiles, setIsSuccess } = context;

  const handleRenameClick = () => {
    setIsRenaming(!isRenaming);
  };

  const handleDeleteClick = () => {
    setIsDeleting(!isDeleting);
  };

  const handleOnDeleteSuccess = () => {
    const updatedFiles = files.filter((file) => file.id !== fileId);
    setFiles(updatedFiles);
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
    <div className="grid absolute top-full w-36 right-0 z-10 py-2 bg-slate-850 border border-slate-800 rounded-sm expander-wrap primary-shadow">
      <ul className="flex flex-col gap expander-content">
        <li className={liClass} onClick={handleRenameClick}>
          rename
        </li>
        <li className={liClass} onClick={handleDeleteClick}>
          delete
        </li>
      </ul>
      {isRenaming && (
        <RenameFolderFile
          type="file"
          index={0}
          fileId={fileId}
          currentName={name}
          onComplete={() => setIsRenaming(false)}
        />
      )}
      {isDeleting && (
        <DeleteAlert
          name={name}
          fileId={fileId}
          type="file"
          onDeleteSuccess={handleOnDeleteSuccess}
          handleCancel={() => setIsDeleting(false)}
        />
      )}
    </div>
  );
};

export default FileOptions;
