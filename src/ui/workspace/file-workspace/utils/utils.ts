/**
 * Sets the cursor position after the specified element
 */
export const setCursorAfter = (selection: Selection, element: Node) => {
  const range = document.createRange();
  range.setStartAfter(element);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
};

/**
 * Sets cursor at specific position in a node
 */
export const setCursorAt = (
  selection: Selection,
  node: Node,
  offset: number
) => {
  const range = document.createRange();
  range.setStart(node, offset);
  range.collapse(true);

  selection.removeAllRanges();
  selection.addRange(range);
};

/**
 * Sets cursor inside the element at the last position
 */
export const setCursorInsideAtEnd = (
  selection: Selection,
  element: Element
) => {
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
};

/**
 * Creates and inserts a BR element at the current selection
 * and moves cursor after it
 */
export const addBr = (selection: Selection, range: Range) => {
  const br = document.createElement("br");
  range.deleteContents();
  range.insertNode(br);
  setCursorAfter(selection, br);
  return br;
};

/**
 * Create and insert a BR element at the parent
 * and moves cursor after it
 */

export const addBrToParent = (selection: Selection, element: Element) => {
  const parent = element.parentElement;
  if (!parent) return;

  const br = document.createElement("br");
  parent.appendChild(br);
  setCursorAfter(selection, br);
  return br;
};

/**
 * Adds a BR element directly to the root element after any nested elements
 * and moves cursor there
 */
export const addBrToRoot = (selection: Selection, rootElement: HTMLElement) => {
  const br = document.createElement("br");

  // Find the last element in the root element
  let lastElement = rootElement.lastChild;
  while (
    lastElement &&
    lastElement.nodeType === Node.TEXT_NODE &&
    lastElement.textContent?.trim() === ""
  ) {
    lastElement = lastElement.previousSibling;
  }

  // Paste <br /> after last element in root element
  if (lastElement) {
    rootElement.insertBefore(br, lastElement.nextSibling);
  } else {
    rootElement.appendChild(br);
  }

  setCursorAfter(selection, br);

  return br;
};

/**
 * Checks if cursor is at the end of current text node
 */
export const isCursorAtEnd = (selection: Selection): boolean => {
  const text = selection.anchorNode?.textContent || "";
  const position = selection.anchorOffset;
  const trimmedLength = text.trimEnd().length;

  return position >= trimmedLength;
};

/**
 * Removes highlight class from all elements
 */
export const removeHighlights = (className: string = "bg-amber-50\\/10") => {
  const highlightedElements = document.querySelectorAll(`.${className}`);
  highlightedElements.forEach((el) => el.classList.remove(className));
};

/**
 * Type guard to check if element exists and is contained within root
 */
export const isValidElement = (
  element: Element | null | undefined,
  root: HTMLElement | null
): element is Element => {
  return !!element && !!root && element !== root && root.contains(element);
};

const TAB_SIZE = 4;

/**
 * Inserts non-breaking spaces as tab indentaition
 */

export const addIndentation = (selection: Selection, range: Range) => {
  const space = document.createTextNode("\u00A0".repeat(TAB_SIZE));
  range.deleteContents();
  range.insertNode(space);
  setCursorAfter(selection, space);
};

/**
 * Types for better code clarity
 */
type Direction = "up" | "down";

/**
 * Checks if element is inside root element and not the root element itself
 */
const isInRootElement = (
  element: Element,
  rootElement: HTMLElement
): boolean => {
  return rootElement.contains(element) && element !== rootElement;
};

/**
 * Moves element up/down within the same parent
 * @param element Element to move
 * @param direction Direction to move (up/down)
 * @param rootElement Root element of the editor
 * @returns boolean indicating if move was successful
 */
export const moveElementInParent = (
  element: Element,
  direction: Direction,
  rootElement: HTMLElement
): boolean => {
  // Check if action is inter root element
  if (!isInRootElement(element, rootElement)) {
    return false;
  }

  const parent = element.parentElement;
  if (!parent) return false;

  const sibling =
    direction === "up"
      ? element.previousElementSibling
      : element.nextElementSibling;

  if (sibling) {
    parent.insertBefore(
      direction === "up" ? element : sibling,
      direction === "up" ? sibling : element
    );
    return true;
  }

  return false;
};
