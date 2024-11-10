export const selectedElement = (elementId: string) => {
  const targetElement = document.getElementById(elementId);

  if (targetElement) {
    // Scrollneme na element
    targetElement.scrollIntoView({ behavior: "smooth" });

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

    // Nastavíme focus na element
    targetElement.focus();
  }
};
