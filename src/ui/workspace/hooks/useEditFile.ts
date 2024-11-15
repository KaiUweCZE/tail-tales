"use client";
import { useEffect } from "react";
import { ElementType } from "../file-workspace/types";
import { addElement } from "../file-workspace/utils/add-element";
import useFileObserver from "./useFileObserve";
import useElementHighlight from "./useElementHighlight";
import { DefaultConfiguration } from "@/app/setting/types";

const useEditFile = (userConfig: DefaultConfiguration) => {
  const { currentFile, currentFileState } = useFileObserver({
    rootElementId: "rootElement",
  });
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

    // define handler, handler observe if click was outside of rootElement
    const clickHandler = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target !== rootElement) {
        handleElementClick(e);
      }
    };

    // add handler
    rootElement.addEventListener("click", clickHandler);

    // remove handler
    return () => {
      rootElement.removeEventListener("click", clickHandler);
    };
  }, [handleElementClick]);

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
