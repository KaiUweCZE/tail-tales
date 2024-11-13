import { FileContext } from "@/contexts/files-context";
import { useContext, useState } from "react";

// Highlighte element after click
const useElementHighlight = () => {
  const context = useContext(FileContext);
  /*const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );*/

  if (!context) throw new Error("Context is missing");
  const { selectedElementId, setSelectedElementId } = context;
  const [lastHighlightedElement, setLastHighlightedElement] = useState(""); // eslint-disable-line @typescript-eslint/no-unused-vars
  const handleElementClick = (e: Event) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;

    if (!target.id || target.id === "rootElement") return;

    const highlightedElements = document.querySelectorAll(".bg-amber-50\\/10");
    highlightedElements.forEach((el) => el.classList.remove("bg-amber-50/10"));

    target.classList.add("bg-amber-50/10");
    setSelectedElementId(target.id);
    setLastHighlightedElement(target.id);
  };

  return {
    handleElementClick,
    selectedElementId,
    setSelectedElementId,
  };
};

export default useElementHighlight;
