import { UserFolderWithoutId } from "@/types/types";
import { ChevronDown, Settings2 } from "lucide-react";
import { useContext, useState } from "react";
import FolderOptions from "./folder-options";
import clsx from "clsx";
import { FileContext } from "@/contexts/files-context";
import UsersFile from "./users-file";

const UsersFolder = ({ folder }: { folder: UserFolderWithoutId }) => {
  //const [isEditable, setIsEditable] = useState(false);
  const [isCofigurated, setIsConfigurated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const context = useContext(FileContext);

  if (!context) return <span>Context is missing</span>;

  const { files, setCurrentFile, setCurrentFileState, currentFileState } =
    context;

  const logInfo = () => {
    console.log(folderFiles, folder.index, folder.name);
  };

  const folderFiles = files.filter(
    (file) =>
      file.folderIndex === folder.index && file.folderName === folder.name
  );

  return (
    <ul>
      <li
        key={folder.index}
        className="flex px-2 justify-between items-center relative"
        onClick={logInfo}
      >
        <div className="flex gap-1 items-center">
          <ChevronDown
            strokeWidth={4}
            color={isExpanded ? "#FDD984" : "white"}
            className={clsx("w-4 h-4 -rotate-90 cursor-pointer", {
              //"-rotate-90": !isExpanded,
              "rotate-0": isExpanded,
            })}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <span
            onClick={() =>
              context?.setActiveFolder({
                name: folder.name,
                index: folder.index,
              })
            }
            className={clsx(
              "focus:outline-cyan-300 focus:outline-offset-1 cursor-pointer",
              {
                /*
                "text-amber-200":
                  activeFolder.name == folder.name &&
                  activeFolder.index === folder.index,*/
              }
            )}
          >
            {folder.name}
          </span>
        </div>
        <Settings2
          color={isCofigurated ? "#FDD984" : "white"}
          className="w-4 h-4 cursor-pointer color-"
          onClick={() => setIsConfigurated(!isCofigurated)}
        />
        {isCofigurated && (
          <FolderOptions name={folder.name} index={folder.index} />
        )}
      </li>
      {isExpanded && (
        <>
          <ul className="pl-4">
            {folderFiles.map((file) => (
              <UsersFile
                key={file.id}
                currentFileState={currentFileState}
                file={file}
                setCurrentFile={setCurrentFile}
                setCurrentFileState={setCurrentFileState}
              />
            ))}
          </ul>
          <ul className="pl-4">
            {folder?.subFolders.map((folder) => (
              <UsersFolder key={folder.index} folder={folder} />
            ))}
          </ul>
        </>
      )}
    </ul>
  );
};

export default UsersFolder;
