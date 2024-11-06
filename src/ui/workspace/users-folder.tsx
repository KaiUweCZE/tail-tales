import { UserFolder, UserFolderWithoutId } from "@/types/types";
import { ChevronDown, Settings, Settings2 } from "lucide-react";
import { useState } from "react";
import FolderOptions from "./folder-options";

const UsersFolder = ({ folder }: { folder: UserFolderWithoutId }) => {
  const [isEditable, setIsEditable] = useState(false);
  const [isCofigurated, setIsConfigurated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const changeName = () => {};

  const handleEditable = () => {};

  const logInfo = () => {
    console.log(folder);
  };

  //const subFolders = allFolders.filter((f) => f.parentId === folder.name);
  // const hasSubFolders = subFolders.length > 0;
  return (
    <>
      <li
        key={folder.index}
        className="flex px-2 justify-between items-center relative"
        onClick={logInfo}
      >
        <div className="flex">
          <ChevronDown
            className="w-6 h-6 -rotate-90 cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          {/*<Image
    src={IMAGES.ICONS.FOLDER_ICON}
    alt="file icon"
    width={24}
    height={20}
  />*/}
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
        {isCofigurated && <FolderOptions name={folder.name} />}
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
    </>
  );
};

export default UsersFolder;
