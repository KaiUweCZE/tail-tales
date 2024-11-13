// hooks/useFileObserver.ts
import { useContext, useEffect, useRef, useCallback } from "react";
import { FileElement } from "../file-workspace/types";
import { domToFileElement } from "../file-workspace/utils/dom-to-file-element";
import { FileContext } from "@/contexts/files-context";

/**
 * Custom hook for observing and managing file content changes in a rich text editor.
 * Handles both new file creation and existing file loading with DOM mutation tracking.
 *
 * @param {Object} options - Configuration options for the observer
 * @param {string} options.rootElementId - ID of the root editor element
 * @param {MutationObserverInit} [options.config] - Custom configuration for MutationObserver
 *
 * @returns {Object} Hook state and utilities
 * @returns {Object} .currentFileState - Current file metadata (id, name)
 * @returns {FileElement[]} .currentFile - Current file content as structured elements
 * @returns {Function} .updateFileState - Function to manually trigger file state update
 */

const useFileObserver = ({
  rootElementId,
  config = defaultConfig,
}: UseFileObserverOptions) => {
  const context = useContext(FileContext);
  if (!context) throw new Error("FileContext is missing");

  const { currentFile, setCurrentFile, currentFileState, files } = context;
  const observerRef = useRef<MutationObserver | null>(null);
  const isInitialLoadRef = useRef(true);

  /**
   * Recursively processes child elements and converts them to FileElement structure
   * @param element - Parent HTML element to process
   * @param fileState - Accumulator array for file elements
   */
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

  /**
   * Updates the file state by converting the current DOM structure to FileElements
   * @param rootElement - The root editor element
   */
  const updateFileState = useCallback(
    (rootElement: HTMLElement) => {
      const newFileState: FileElement[] = [];
      const rootFileElement = domToFileElement(rootElement);
      newFileState.push(rootFileElement);
      processChildren(rootElement, newFileState);
      setCurrentFile(newFileState);
    },
    [processChildren, setCurrentFile]
  );

  // Effect for loading existing file content
  useEffect(() => {
    if (currentFileState && files.length > 0) {
      const selectedFile = files.find(
        (file) => file.id === currentFileState.id
      );

      const rootElement = document.getElementById(rootElementId);
      if (selectedFile && rootElement) {
        // temporary disconnect observer
        observerRef.current?.disconnect();

        // clean existing content
        rootElement.innerHTML = "";

        // find and fetch rootElement from file data
        const fileRootElement = selectedFile.elements.find(
          (el) => el.id === rootElementId
        );
        if (fileRootElement) {
          rootElement.innerHTML = fileRootElement.content;
        }

        // again connect observer
        if (observerRef.current) {
          observerRef.current.observe(rootElement, config);
        }

        // sync state
        setCurrentFile(selectedFile.elements);
        isInitialLoadRef.current = false;
      }
    }
  }, [currentFileState, files, rootElementId, config, setCurrentFile]);

  // Main observer
  useEffect(() => {
    const rootElement = document.getElementById(rootElementId);
    if (!rootElement) {
      console.warn(`Root element with id "${rootElementId}" not found`);
      return;
    }

    observerRef.current = new MutationObserver(() => {
      if (!isInitialLoadRef.current) {
        updateFileState(rootElement);
      }
    });

    observerRef.current.observe(rootElement, config);

    // Initialize state only for new files
    if (!currentFileState) {
      updateFileState(rootElement);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [rootElementId, config, updateFileState, currentFileState]);

  return {
    currentFileState,
    currentFile,
    updateFileState,
  };
};

export default useFileObserver;

// Types and constants
interface UseFileObserverOptions {
  rootElementId: string;
  config?: MutationObserverInit;
}

/**
 * Default configuration for MutationObserver
 * Tracks all relevant changes in the editor
 */
const defaultConfig: MutationObserverInit = {
  childList: true, // Tracks element additions/removals
  subtree: true, // Monitors all descendants
  characterData: true, // Tracks text content changes
  attributes: true, // Monitors attribute modifications
};
