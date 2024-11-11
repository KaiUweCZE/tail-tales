// hooks/useFileObserver.ts
import { useContext, useEffect, useRef, useCallback } from "react";
import { FileElement } from "../file-workspace/types";
import { domToFileElement } from "../file-workspace/utils/dom-to-file-element";
import { FileContext } from "@/contexts/files-context";

interface UseFileObserverOptions {
  rootElementId: string;
  config?: MutationObserverInit;
}

const defaultConfig: MutationObserverInit = {
  childList: true, // check add/remove childs
  subtree: true, // check change in subtree
  characterData: true, // check change in text
  attributes: true, // check change in attributes
};

const useFileObserver = ({
  rootElementId,
  config = defaultConfig,
}: UseFileObserverOptions) => {
  const context = useContext(FileContext);
  if (!context) throw new Error("FileContext is missing");

  const { currentFile, setCurrentFile, currentFileName } = context;
  const observerRef = useRef<MutationObserver | null>(null);

  const processChildren = useCallback(
    (element: HTMLElement, fileState: FileElement[]) => {
      Array.from(element.children).forEach((child) => {
        const childElement = child as HTMLElement;
        if (childElement.id) {
          const fileElement = domToFileElement(childElement);
          fileState.push(fileElement);
          processChildren(childElement, fileState);
        }
      });
    },
    []
  );

  const updateFileState = useCallback(
    (rootElement: HTMLElement) => {
      const newFileState: FileElement[] = [];

      // Zpracování root elementu
      const rootFileElement = domToFileElement(rootElement);
      newFileState.push(rootFileElement);

      // Rekurzivní zpracování všech child elementů
      processChildren(rootElement, newFileState);

      setCurrentFile(newFileState);
    },
    [processChildren, setCurrentFile]
  );

  useEffect(() => {
    const rootElement = document.getElementById(rootElementId);
    if (!rootElement) {
      console.warn(`Root element with id "${rootElementId}" not found`);
      return;
    }

    // Vytvoříme observer pro sledování změn
    observerRef.current = new MutationObserver(() => {
      updateFileState(rootElement);
    });

    // Začneme sledovat změny
    observerRef.current.observe(rootElement, config);

    // Počáteční stav
    updateFileState(rootElement);

    // Cleanup při unmount
    return () => {
      observerRef.current?.disconnect();
    };
  }, [rootElementId, config, updateFileState]);

  return {
    currentFileName,
    currentFile,
    updateFileState,
  };
};

export default useFileObserver;
