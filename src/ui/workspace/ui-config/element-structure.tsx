import { ChevronDown, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FileElement } from "../file-workspace/types";
import ElementStructureCenter from "./element-structure-center";

interface ElementStructureProps {
  hasChildren: boolean | null;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  element: FileElement;
}

const ElementStructure = ({
  hasChildren,
  setIsOpen,
  isOpen,
  element,
}: ElementStructureProps) => {
  return (
    <div className="flex items-center">
      {hasChildren && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-4 h-4 flex items-center justify-center"
        >
          {isOpen ? (
            <ChevronDown className="w-4 h-4" color="#FDE68A" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>
      )}
      <ElementStructureCenter element={element} />
    </div>
  );
};

export default ElementStructure;
