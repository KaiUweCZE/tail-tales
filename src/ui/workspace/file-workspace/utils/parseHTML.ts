export const parseHTML = (html: string): HTMLElement[] => {
  const createId = () =>
    `el-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const parseElement = (
    htmlString: string
  ): { element: HTMLElement | null; remainingHtml: string } => {
    // Najít začátek tagu
    const tagMatch = htmlString.match(/<(\w+)>/);
    if (!tagMatch) return { element: null, remainingHtml: htmlString };

    const tagName = tagMatch[1];
    const startIndex = tagMatch.index || 0;
    const afterTagIndex = startIndex + tagMatch[0].length;

    // Najít uzavírací tag
    const closingTag = `</${tagName}>`;
    const endIndex = htmlString.indexOf(closingTag);
    if (endIndex === -1) return { element: null, remainingHtml: htmlString };

    // Získat vnitřní obsah
    const innerContent = htmlString.slice(afterTagIndex, endIndex);
    const remainingHtml = htmlString.slice(endIndex + closingTag.length);

    // Vytvořit nový element
    const newElement: HTMLElement = {
      id: createId(),
      element: tagName,
      text: "",
      children: [],
    };

    // Parsovat vnitřní obsah
    let currentHtml = innerContent;
    while (currentHtml.includes("<")) {
      const { element: childElement, remainingHtml: remaining } =
        parseElement(currentHtml);
      if (childElement) {
        newElement.children.push(childElement);
        currentHtml = remaining;
      } else {
        // Pokud není další element, zbytek je text
        if (currentHtml.trim()) {
          newElement.text = currentHtml.trim();
        }
        break;
      }
    }

    // Pokud není žádný child element, celý vnitřní obsah je text
    if (newElement.children.length === 0 && innerContent.trim()) {
      newElement.text = innerContent.trim();
    }

    return { element: newElement, remainingHtml };
  };

  const elements: HTMLElement[] = [];
  let remainingHtml = html.trim();

  while (remainingHtml) {
    const { element, remainingHtml: remaining } = parseElement(remainingHtml);
    if (element) {
      elements.push(element);
      remainingHtml = remaining;
    } else {
      break;
    }
  }

  return elements;
};
