import { RefObject } from "react";

export const handleKeyDown = (
  e: KeyboardEvent,
  ref: RefObject<HTMLElement>
) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);

    if (!selection || !range || !ref.current) return;

    const currentElement = selection.anchorNode?.parentElement;

    if (currentElement === ref.current.parentElement) {
      console.log("root element: ", ref.current.parentElement);

      const br = document.createElement("br");
      range.deleteContents();
      range.insertNode(br);

      const newRange = document.createRange();
      newRange.setStartAfter(br);
      newRange.collapse(true);

      selection.removeAllRanges();
      selection.addRange(newRange);
      return;
    }

    // cursor is at editable div

    // check if cursor is on the end of element
    const isAtEnd = (() => {
      const text = selection.anchorNode?.textContent || "";
      const position = selection.anchorOffset;
      // Ořežeme whitespace na konci
      const trimmedLength = text.trimEnd().length;

      console.log({
        text,
        position,
        trimmedLength,
        isEnd: position >= trimmedLength,
      });

      return position >= trimmedLength;
    })();

    if (e.shiftKey) {
      // create <br>
      const br = document.createElement("br");
      range.deleteContents();
      range.insertNode(br);

      // Pokud jsme na konci elementu, přidáme druhý <br> pro vizuální mezeru
      /*if (isAtEnd) {
        const extraBr = document.createElement("br");
        range.insertNode(extraBr);
      }*/

      const newRange = document.createRange();
      newRange.setStartAfter(br);
      newRange.collapse(true);

      selection.removeAllRanges();
      selection.addRange(newRange);
      return;
    } else if (!isAtEnd) {
      const br = document.createElement("br");

      // Vložíme <br> na pozici kurzoru
      range.deleteContents();
      range.insertNode(br);

      // set cursor after br
      const newRange = document.createRange();
      newRange.setStartAfter(br);
      newRange.collapse(true);

      selection.removeAllRanges();
      selection.addRange(newRange);
      return;
    } else {
      if (currentElement && currentElement.parentElement) {
        // create new range after current element
        const newRange = document.createRange();
        newRange.setStartAfter(currentElement);
        newRange.collapse(true);

        selection.removeAllRanges();
        selection.addRange(newRange);
      }
      return;
    }
  }
};
