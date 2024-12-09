import { DefaultConfiguration } from "@/app/setting/types";
import { ElementType } from "../types";
import { createId } from "./create-id";
import { selectedElement } from "../../ui-config/utils/selectElement";
import { TextColor } from "@/types/types";

interface AddElementOptions {
  element: ElementType;
  userConfig: DefaultConfiguration;
  isSelectionWithinEditor: () => boolean;
  handleElementClick: (e: Event) => void;
  setSelectedElementId: (id: string) => void;
  fontColor?: TextColor | null;
}

export const addElement = ({
  element,
  userConfig,
  isSelectionWithinEditor,
  handleElementClick,
  setSelectedElementId,
  fontColor,
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

  if (fontColor) {
    newElement.classList.add(fontColor);
  }

  newElement.id = itemId;
  newElement.textContent = `New ${element}`;

  // add event listener for click
  newElement.addEventListener("click", handleElementClick);

  range.deleteContents();
  range.insertNode(newElement);
  // set focus on newElement
  setSelectedElementId(itemId);
  selectedElement(newElement.id);

  const newRange = document.createRange();
  newRange.setStartAfter(newElement);
  newRange.collapse(true);

  selection.removeAllRanges();
  selection.addRange(newRange);

  return itemId ?? null;
};
