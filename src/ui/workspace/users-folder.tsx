import { UserFolder } from "@/types/types";
import { ChevronDown } from "lucide-react";

const UsersFolder = ({ folder }: { folder: UserFolder }) => {
  return (
    <li key={folder.index} className="flex gap-1">
      <ChevronDown className="w-6 h-6 -rotate-90 cursor-pointer" />
      {/*<Image
    src={IMAGES.ICONS.FOLDER_ICON}
    alt="file icon"
    width={24}
    height={20}
  />*/}
      <span>
        {folder.index}. {folder.name}
      </span>
    </li>
  );
};

export default UsersFolder;
