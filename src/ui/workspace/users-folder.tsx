import { UserFolder } from "@/types/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const UsersFolder = ({ folder }: { folder: UserFolder }) => {
  const [isEditable, setIsEditable] = useState(false);
  const changeName = () => {};

  const handleEditable = () => {};
  return (
    <li key={folder.index} className="flex gap-1">
      <ChevronDown className="w-6 h-6 -rotate-90 cursor-pointer" />
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
    </li>
  );
};

export default UsersFolder;
