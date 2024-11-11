import { useState } from "react";

// Highlighte element after click
const useElementHighlight = () => {
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [lastHighlightedElement, setLastHighlightedElement] = useState("");
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
