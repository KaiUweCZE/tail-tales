export const selectedElement = (elementId: string) => {
  const targetElement = document.getElementById(elementId);

  if (targetElement) {
    // Scrollneme na element
    targetElement.scrollIntoView({ behavior: "smooth" });

    let textNode = null;
    // find first text box
    const walker = document.createTreeWalker(
      targetElement,
      NodeFilter.SHOW_TEXT,
      null
    );

    textNode = walker.firstChild();

    if (textNode) {
      const range = document.createRange();
      const selection = window.getSelection();

      // Nastavíme range na konec textového uzlu
      const text = textNode.textContent || "";
      const trimmedLength = text.trimEnd().length;
      range.setStart(textNode, trimmedLength);
      range.collapse(true);

      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    } else {
      // Vytvoříme nový range
      const range = document.createRange();
      const selection = window.getSelection();

      // Nastavíme range na začátek elementu
      range.setStart(targetElement, 0);
      range.collapse(true);

      // Vyčistíme současný výběr a nastavíme nový
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
    // Nastavíme focus na element
    targetElement.focus();
  }
};
