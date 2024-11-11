import { ElementType, FileElement } from "../types";

// convert DOM element to FileElement
export const domToFileElement = (element: HTMLElement): FileElement => {
  const childElements = Array.from(element.children)
    .map((child) => (child as HTMLElement).id)
    .filter(Boolean);

  return {
    id: element.id,
    type: element.tagName.toLowerCase() as ElementType,
    cssClass: element.className,
    content: element.innerHTML,
    children: childElements.length ? childElements : null,
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 0,
    additionalCss: "",
  };
};
