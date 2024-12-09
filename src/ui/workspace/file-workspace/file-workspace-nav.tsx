import Button from "@/ui/primitives/button";
import { ElementType } from "./types";
import { Expand, Minimize } from "lucide-react";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { navElements } from "./data";
import ColorPicker from "@/components/color-picker";
import { WorkspaceContext } from "../context/workspace-context";
import FontPicker from "@/components/font-picker";
import TextColorPicker from "@/components/text-color-picker";
import { TextColor } from "@/types/types";

interface FileNavProsp {
  setIsExpanded: Dispatch<SetStateAction<boolean>>;
  isExpanded: boolean;
  addElement: (element: ElementType) => void;
  largeWindow: boolean;
  navContextProps: {
    color: string;
    setColor: Dispatch<SetStateAction<string>>;
    font: string;
    setFont: Dispatch<SetStateAction<string>>;
    fontColor: TextColor | null;
    setFontColor: Dispatch<SetStateAction<TextColor | null>>;
  };
}

const FileWorkspaceNav = ({
  addElement,
  largeWindow,
  setIsExpanded,
  isExpanded,
  navContextProps,
}: FileNavProsp) => {
  const context = useContext(WorkspaceContext);

  return (
    <nav className="file-navigation bg-slate-800 border-b mb-1 border-slate-400 h-fit p-1 rounded-t-lg">
      <div className="grid grid-cols-5 items-center">
        {context?.navState.map((element) => (
          <React.Fragment key={element.name}>
            {element.active && (
              <Button
                key={element.name}
                variant="nav"
                size="sm"
                onClick={() => addElement(element.name as ElementType)}
              >
                {element.name}
              </Button>
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="flex gap-2 justify-between items-center">
        <TextColorPicker
          fontColor={navContextProps.fontColor}
          setFontColor={navContextProps.setFontColor}
        />
        <ColorPicker
          color={navContextProps.color}
          setColor={navContextProps.setColor}
        />
        <FontPicker />
        {largeWindow &&
          (isExpanded ? (
            <Minimize
              className="cursor-pointer h-4 w-4 z-10"
              color="currentColor"
              onClick={() => setIsExpanded((prev) => !prev)}
            />
          ) : (
            <Expand
              className="cursor-pointer h-4 w-4 z-10"
              color="currentColor"
              onClick={() => setIsExpanded((prev) => !prev)}
            />
          ))}
      </div>
    </nav>
  );
};

export default FileWorkspaceNav;
