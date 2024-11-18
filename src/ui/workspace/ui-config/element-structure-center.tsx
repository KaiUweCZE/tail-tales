import { Palette, SquareMousePointer } from "lucide-react";
import { FileElement } from "../file-workspace/types";
import { selectedElement } from "./utils/selectElement";
import Input from "@/ui/primitives/input";
import { useContext, useRef, useState } from "react";
import { FileContext } from "@/contexts/files-context";
import clsx from "clsx";
import ClassHelper from "@/components/class-helper";

const ElementStructureCenter = ({
  element,
  child,
}: {
  element: FileElement;
  child?: boolean;
}) => {
  const context = useContext(FileContext);
  const [isEditable, setIsEditable] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [newClass, setNewClass] = useState("");
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  if (!context) return <span>Context is missing</span>;

  const {
    currentFile,
    setCurrentFile,
    selectedElementId,
    setSelectedElementId,
  } = context;

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

  const addTailwindClass = (tailwindClass: string) => {
    // remove the unfinished word and replace it with selected one from class-helper
    const currentValue = inputRef.current?.value || "";
    const words = currentValue.split(" ");
    words.pop();
    const newValue = [...words, tailwindClass].filter(Boolean).join(" ");
    handleUpdateClasses(newValue, true);
    setNewClass("");
  };

  // when addTailwindClass set cursor at the end, if else we want to set cursor on current positon
  // example, when user remove some part inside input, cursor must stay in his selection
  const handleUpdateClasses = async (
    value: string,
    offCursorPosition?: boolean
  ) => {
    if (!currentFile) return;

    const cursorPosition = inputRef.current?.selectionStart;
    const domElement = document.getElementById(element.id);
    if (!domElement) return;

    const words = value.split(" ");
    const lastWord = words[words.length - 1];
    setNewClass(lastWord);

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

    if (!offCursorPosition && cursorPosition) {
      requestAnimationFrame(() => {
        inputRef.current?.setSelectionRange(cursorPosition, cursorPosition);
      });
    }
  };

  const handleClick = (elementId: string) => {
    selectedElement(elementId);
    setSelectedElementId(elementId);
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
                onClick={() => handleClick(element.id)}
              />
              <Palette
                className="w-4 h-4 h- cursor-pointer hover:scale-110 transition duration-300"
                onClick={() => setIsEditable(!isEditable)}
              />
            </>
          )}
        </span>
      </div>
      {!child && (
        <div className="grid" ref={inputWrapperRef}>
          {!isEditable && element.cssClass && (
            <span className="text-xs px-1.5 py-0.5 w-fit rounded bg-slate-700">
              {element.cssClass}
            </span>
          )}
          {isEditable && (
            <div className="relative" onBlur={() => setIsFocused(false)}>
              <Input
                ref={inputRef}
                size="sm"
                variant="editor"
                aria-label="add tailwind class"
                onFocus={() => setIsFocused(true)}
                value={element.cssClass}
                onKeyDown={(e) =>
                  e.key === "Escape" && setIsFocused((prev) => !prev)
                }
                onChange={(e) => handleUpdateClasses(e.target.value)}
              />
              {isFocused && (
                <ClassHelper
                  input={newClass}
                  parentRef={inputWrapperRef}
                  addTailwindClass={addTailwindClass}
                />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ElementStructureCenter;
