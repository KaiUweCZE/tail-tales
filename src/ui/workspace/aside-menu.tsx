"use client";
import { IMAGES } from "@/paths/image-paths";
import Image from "next/image";
import { useContext } from "react";
import { FileContext } from "@/contexts/files-context";

const iconSize = 20;
const imageClass = `cursor-pointer hover:scale-105 transition`;
const tagClass = `absolute w-max invisible group-hover:visible bg-gray-800 px-2 py-1 my-1 rounded text-sm left-1/2 transform -translate-x-1/2 shadow-md transition duration-3000`;

const AsideMenu = () => {
  const context = useContext(FileContext);

  if (!context) return <span>Context is missing</span>;
  const { newInput } = context;
  const newFile = () => {};
  return (
    <header className="">
      <nav>
        <ul className="flex justify-center gap-4 p-1">
          <div className="relative group">
            <Image
              onClick={() => newInput("folder")}
              className={imageClass}
              src={IMAGES.ICONS.NEW_FOLDER}
              alt="new folder icon"
              width={iconSize}
              height={iconSize}
            />
            <span className={tagClass}>Create new folder</span>
          </div>
          <div className="relative group">
            <Image
              onClick={() => newInput("file")}
              className={imageClass}
              src={IMAGES.ICONS.NEW_FILE}
              alt="new file icon"
              width={iconSize}
              height={iconSize}
            />
            <span className={tagClass}>Create new file</span>
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default AsideMenu;
