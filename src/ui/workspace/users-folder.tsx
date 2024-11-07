import { UserFolder, UserFolderWithoutId } from "@/types/types";
import { ChevronDown, Settings, Settings2 } from "lucide-react";
import { useState } from "react";
import FolderOptions from "./folder-options";
import clsx from "clsx";

const UsersFolder = ({ folder }: { folder: UserFolderWithoutId }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isCofigurated, setIsConfigurated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const changeName = () => {};

  const handleEditable = () => {};

  const logInfo = () => {
    console.log(folder);
  };

  return (
    <ul>
      <li
        key={folder.index}
        className="flex px-2 justify-between items-center relative"
        onClick={logInfo}
      >
        <div className="flex">
          <ChevronDown
            color={isExpanded ? "#FDD984" : "white"}
            className={clsx("w-6 h-6 -rotate-90 cursor-pointer", {
              //"-rotate-90": !isExpanded,
              "rotate-0": isExpanded,
            })}
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <span
            onDoubleClick={() => setIsEditable(!isEditable)}
            contentEditable={isEditable}
            className="focus:outline-cyan-300 focus:outline-offset-1"
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
        <ul className="">
          {folder?.subFolders.map((folder) => (
            <li key={folder.index} className="pl-4">
              <UsersFolder folder={folder} />
            </li>
          ))}
        </ul>
      )}
    </ul>
  );
};

export default UsersFolder;
