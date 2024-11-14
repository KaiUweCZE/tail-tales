import { Palette, SquareMousePointer } from "lucide-react";
import { FileElement } from "../file-workspace/types";
import { selectedElement } from "./utils/selectElement";
import Input from "@/ui/primitives/input";
import { useContext, useState } from "react";
import { FileContext } from "@/contexts/files-context";
import clsx from "clsx";

const ElementStructureCenter = ({
  element,
  child,
}: {
  element: FileElement;
  child?: boolean;
}) => {
  const context = useContext(FileContext);
  const [isEditable, setIsEditable] = useState(false);
  if (!context) return <span>Context is missing</span>;

  const { currentFile, setCurrentFile, selectedElementId } = context;

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

  const handleUpdateClasses = async (value: string) => {
    if (!currentFile) return;

    const domElement = document.getElementById(element.id);
    if (!domElement) return;

    const oldClasses = (element.cssClass || "").split(" ").filter(Boolean);
    const newClasses = value.split(" ").filter(Boolean);

    await updateDOMClasses(domElement, oldClasses, newClasses);

    setCurrentFile((prevFiles) => {
      if (!prevFiles) return null;
      return prevFiles.map((file) => {
        if (file.id === element.id) {
          return {
            ...file,
            cssClass: value,
          };
        }
        return file;
      });
    });
  };

  return (
    <div className="grid gap-1 w-full">
      <div className="flex gap-2">
        <span className="text-amber-200">{element.type}</span>
        <span
          className={clsx("flex items-center gap-2", {
            "text-amber-200": selectedElementId === element.id,
          })}
        >
          {`#${element.id}`}{" "}
          {!child && (
            <>
              <SquareMousePointer
                className="w-4 h-4 cursor-pointer hover:scale-110 transition duration-300"
                onClick={() => selectedElement(element.id)}
              />
              <Palette
                className="w-4 h-4 cursor-pointer hover:scale-110 transition duration-300"
                onClick={() => setIsEditable(!isEditable)}
              />
            </>
          )}
        </span>
      </div>
      {!child && (
        <div className="grid">
          {!isEditable && element.cssClass && (
            <span className="text-xs px-1.5 py-0.5 w-fit rounded bg-slate-700">
              {element.cssClass}
            </span>
          )}
          {isEditable && (
            <>
              <Input
                size="sm"
                variant="editor"
                aria-label="add tailwind class"
                //value={newClass}
                value={element.cssClass}
                onChange={(e) => handleUpdateClasses(e.target.value)}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ElementStructureCenter;

/*const handleAddClass = async (value: string) => {
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
  

   element.cssClass && (
            <span className="col-span-2 text-xs px-1.5 py-0.5 rounded bg-slate-700">
              {element.cssClass}
            </span>
          )
  
  
     {<Input
              size="sm"
              variant="editor"
              aria-label="add tailwind class"
              value={newClass}
              onChange={(e) => handleAddClass(e.target.value)}
            />}
  */
