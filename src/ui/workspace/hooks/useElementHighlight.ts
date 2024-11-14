import { FileContext } from "@/contexts/files-context";
import { useContext, useEffect, useState } from "react";

// Highlighte element after click
const useElementHighlight = () => {
  const context = useContext(FileContext);

  if (!context) throw new Error("Context is missing");
  const { selectedElementId, setSelectedElementId } = context;
  const [lastHighlightedElement, setLastHighlightedElement] = useState(""); // eslint-disable-line @typescript-eslint/no-unused-vars

  const removeHighlight = () => {
    const highlightedElements = document.querySelectorAll(".bg-amber-50\\/10");
    highlightedElements.forEach((el) => el.classList.remove("bg-amber-50/10"));
    setSelectedElementId("");
    setLastHighlightedElement("");
  };

  const handleElementClick = (e: Event) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (!target.id || target.id === "rootElement") {
      console.log("outside of target");
      removeHighlight();
      return;
    }

    removeHighlight();

    target.classList.add("bg-amber-50/10");
    setSelectedElementId(target.id);
    setLastHighlightedElement(target.id);
  };

  const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    const rootElement = document.getElementById("rootElement");

    // check if a click was outside
    if (rootElement && !rootElement.contains(target)) {
      removeHighlight();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup on mount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    handleElementClick,
    selectedElementId,
    setSelectedElementId,
  };
};

export default useElementHighlight;
