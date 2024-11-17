import { RefObject } from "react";
import { ElementType } from "../types";
import { setCursorAfter } from "./utils";

export const handlePaste = (
  e: ClipboardEvent,
  ref: RefObject<HTMLDivElement>,
  addElement: (element: ElementType) => string | null
) => {
  if (!ref.current) return;

  e.preventDefault();

  // Check if it is image
  const items = e.clipboardData?.items;
  const imageItem = Array.from(items || []).find(
    (item) => item.type.indexOf("image") !== -1
  );

  if (imageItem) {
    try {
      const blob = imageItem.getAsFile();
      if (!blob) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        if (!event.target?.result) return;

        // get element id
        const newElementId = addElement("img");
        if (!newElementId) return;

        // edit element by its Id
        const imgElement = document.getElementById(
          newElementId
        ) as HTMLImageElement;
        if (!imgElement) return;

        // Set image
        imgElement.src = event.target.result as string;
        imgElement.alt = "Pasted image";
        imgElement.className = "max-w-full h-auto rounded-lg my-2";
        imgElement.textContent = ""; // delete text "New img"

        // set cursor after img
        const selection = window.getSelection();
        if (!selection) return;

        setCursorAfter(selection, imgElement);
      };

      reader.readAsDataURL(blob);
    } catch (error) {
      console.error("Error pasting image:", error);
    }
  } else {
    // handle plain text.
    const text = e.clipboardData?.getData("text/plain");
    document.execCommand("insertText", false, text);
  }
};
