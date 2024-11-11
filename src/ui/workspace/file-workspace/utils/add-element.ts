import { DefaultConfiguration } from "@/app/setting/types";
import { ElementType } from "../types";
import { createId } from "./create-id";

interface AddElementOptions {
  element: ElementType;
  userConfig: DefaultConfiguration;
  isSelectionWithinEditor: () => boolean;
  handleElementClick: (e: Event) => void;
  setSelectedElementId: (id: string) => void;
}

export const addElement = ({
  element,
  userConfig,
  isSelectionWithinEditor,
  handleElementClick,
  setSelectedElementId,
}: AddElementOptions) => {
  const selection = window.getSelection();
  const range = selection?.getRangeAt(0);
  const itemId = createId();

  if (!selection || !range || !isSelectionWithinEditor()) {
    return null;
  }

  const newElement = document.createElement(element);

  if (userConfig[element]) {
    newElement.className = userConfig[element]?.className ?? "";
  }

  newElement.id = itemId;
  newElement.textContent = `New ${element}`;

  // Přidáme event listener pro kliknutí
  newElement.addEventListener("click", handleElementClick);

  range.deleteContents();
  range.insertNode(newElement);
  // Nastavíme focus na nový element
  setSelectedElementId(itemId);

  const newRange = document.createRange();
  newRange.setStartAfter(newElement);
  newRange.collapse(true);

  selection.removeAllRanges();
  selection.addRange(newRange);
};
