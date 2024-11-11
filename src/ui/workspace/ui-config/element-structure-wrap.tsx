import { useState } from "react";
import { FileElement } from "../file-workspace/types";
import ElementStructure from "./element-structure";
import ChildStructure from "./child-structure";
import Button from "@/ui/primitives/button";

const ElementStructureWrap = ({
  element,
  currentFile,
}: {
  element: FileElement;
  depth?: number;
  currentFile: FileElement[] | null;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = element.children && element.children.length > 0;

  // root element is not editable
  if (element.id === "rootElement") return;

  return (
    <div>
      <ElementStructure
        hasChildren={hasChildren}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        element={element}
      />
      {isOpen &&
        element.children?.map((childId) => {
          const childElement = currentFile?.find((e) => e.id === childId);
          if (childElement) {
            return <ChildStructure key={childId} element={childElement} />;
          }
        })}
    </div>
  );
};

export default ElementStructureWrap;
