"use client";
import { useEffect, useState } from "react";
import { ElementType } from "../file-workspace/types";
import { addElement } from "../file-workspace/utils/add-element";
import useFileObserver from "./useFileObserve";
import useElementHighlight from "./useElementHighlight";
import { DefaultConfiguration } from "@/app/setting/types";

const useEditFile = (userConfig: DefaultConfiguration) => {
  const { currentFile, currentFileState } = useFileObserver({
    rootElementId: "rootElement",
  });
  const [elementIds, setElementIds] = useState<string[]>(["rootElement"]); // eslint-disable-line @typescript-eslint/no-unused-vars
  const { handleElementClick, selectedElementId, setSelectedElementId } =
    useElementHighlight();

  // check if cursor is in editor
  const isSelectionWithinEditor = () => {
    const selection = window.getSelection();
    const rootElement = document.getElementById("rootElement");
    if (!selection || !rootElement) return false;

    let node = selection.anchorNode;
    while (node) {
      if (node === rootElement) return true;
      node = node.parentNode;
    }
    return false;
  };

  const handleAddElement = (element: ElementType) => {
    return addElement({
      element,
      userConfig,
      isSelectionWithinEditor,
      handleElementClick,
      setSelectedElementId,
    });
  };

  // init event listenres
  useEffect(() => {
    const rootElement = document.getElementById("rootElement");
    if (!rootElement) return;

    //click handler on root element for action delegation
    rootElement.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target !== rootElement) {
        handleElementClick(e);
      }
    });

    // Cleanup
    return () => {
      rootElement.removeEventListener("click", handleElementClick);
    };
  }, []);

  return {
    currentFile,
    currentFileState,
    selectedElementId,
    addElement: handleAddElement,
    isElementSelected: (id: string) => selectedElementId === id,
    getSelectedElement: () =>
      selectedElementId ? document.getElementById(selectedElementId) : null,
  };
};

export default useEditFile;
