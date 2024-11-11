import { SquareMousePointer } from "lucide-react";
import { FileElement } from "../file-workspace/types";
import { selectedElement } from "./utils/selectElement";
import Input from "@/ui/primitives/input";
import { useContext, useState } from "react";
import { FileContext } from "@/contexts/files-context";

const ElementStructureCenter = ({ element }: { element: FileElement }) => {
  const context = useContext(FileContext);
  const [newClass, setNewClass] = useState(element.additionalCss);

  if (!context) return <span>Context is missing</span>;

  const { currentFile, setCurrentFile } = context;

  // Helper for DOM manipulation - DOM rewrites context states
  const updateDOMClasses = (
    domElement: HTMLElement,
    oldClasses: string[],
    newClasses: string[]
  ): Promise<void> => {
    return new Promise((resolve) => {
      // remove old classes
      if (oldClasses.length) {
        domElement.classList.remove(...oldClasses);
      }

      // add new classes
      if (newClasses.length) {
        domElement.classList.add(...newClasses);
      }

      // requestAnimationFrame check if DOM is sync
      requestAnimationFrame(() => {
        resolve();
      });
    });
  };

  const handleAddClass = async (value: string) => {
    if (!currentFile) return;

    const domElement = document.getElementById(element.id);
    if (domElement) {
      const oldClasses = (newClass || "").split(" ").filter(Boolean);
      const newClasses = value.split(" ").filter(Boolean);

      // await for change in DOM
      await updateDOMClasses(domElement, oldClasses, newClasses);

      // Sync react context state
      setCurrentFile((prevFiles) => {
        if (!prevFiles) return null;
        return prevFiles.map((file) => {
          if (file.id === element.id) {
            return {
              ...file,
              additionalCss: value,
            };
          }
          return file;
        });
      });
    }

    setNewClass(value);
  };

  return (
    <div className="grid gap-1">
      <div className="flex gap-2">
        <span className="text-amber-200">{element.type}</span>
        <span className="flex items-center gap-2">
          {`#${element.id}`}{" "}
          <SquareMousePointer
            className="w-4 h-4 cursor-pointer hover:scale-110 transition duration-300"
            onClick={() => selectedElement(element.id)}
          />
        </span>
      </div>
      {element.cssClass && (
        <div>
          <span className="col-span-2 text-xs px-1.5 py-0.5 rounded bg-slate-700">
            {element.cssClass}
          </span>
          <Input
            size="sm"
            variant="editor"
            aria-label="add tailwind class"
            value={newClass}
            onChange={(e) => handleAddClass(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default ElementStructureCenter;