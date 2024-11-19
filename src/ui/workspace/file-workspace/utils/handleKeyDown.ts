import { RefObject } from "react";
import {
  addBr,
  addBrToParent,
  addBrToRoot,
  addIndentation,
  isCursorAtEnd,
  moveElementInParent,
  removeHighlights,
} from "./utils";

const handleEnterKey = (
  e: KeyboardEvent,
  selection: Selection,
  range: Range,
  ref: HTMLElement,
  currentElement: Element | null | undefined
) => {
  // Handle Ctrl+Enter
  if (e.ctrlKey) {
    addBrToRoot(selection, ref);
    removeHighlights();
    return;
  }

  // handle action in root element
  if (currentElement === ref.parentElement) {
    addBr(selection, range);
    return;
  }

  // Handle Shift+enter or cursor not at end
  if (e.shiftKey || !isCursorAtEnd(selection)) {
    addBr(selection, range);
    return;
  }

  // Handle cursor at end of element
  if (currentElement?.parentElement && isCursorAtEnd(selection)) {
    addBrToParent(selection, currentElement);
  } else {
    addBr(selection, range);
  }
};

const handleAltKey = (
  e: KeyboardEvent,
  selection: Selection,
  currentElement: Element | null | undefined,
  rootElement: HTMLElement
) => {
  if (!currentElement || !["ArrowUp", "ArrowDown"].includes(e.key)) return;

  const originalOffset = selection.anchorOffset;
  const originalNode = selection.anchorNode;

  const moved = moveElementInParent(
    currentElement,
    e.key === "ArrowUp" ? "up" : "down",
    rootElement
  );

  if (moved && originalNode) {
    // set origin cursor
    const range = document.createRange();
    range.setStart(originalNode, originalOffset);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  }
};

export const handleKeyDown = (
  e: KeyboardEvent,
  ref: RefObject<HTMLElement>
) => {
  if (!["Enter", "Tab"].includes(e.key) && !e.altKey) return;
  e.preventDefault();

  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);

  if (!selection || !range || !ref.current) return;

  const currentElement = selection.anchorNode?.parentElement;

  // Handle Tab
  if (e.key === "Tab") {
    addIndentation(selection, range);
    return;
  }

  // Handle Enter
  if (e.key === "Enter") {
    handleEnterKey(e, selection, range, ref.current, currentElement);
  }

  //handle  Alt key
  if (e.altKey) {
    handleAltKey(e, selection, currentElement, ref.current);
  }
};
