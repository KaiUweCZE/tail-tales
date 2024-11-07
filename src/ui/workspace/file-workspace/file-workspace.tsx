import { useEffect, useState } from "react";
import { HTMLElement } from "./types";

import { createId } from "./utils/create-id";

const FileWorkspace: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState("");
  const [elements, setElements] = useState<HTMLElement[]>([]);
  const [editingId, setEditingId] = useState("");

  const parseHTML = (html: string): HTMLElement[] => {
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
        text: "", // neměl bych sem hodit innerContent?
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

  const elementToString = (element: HTMLElement): string => {
    const childrenString = element.children
      .map((child) => elementToString(child))
      .join("");

    const content = element.children.length > 0 ? childrenString : element.text;
    return `<${element.element}>${content}</${element.element}>`;
  };

  const updateElementText = (
    elements: HTMLElement[],
    id: string,
    newText: string
  ): HTMLElement[] => {
    return elements.map((el) => {
      if (el.id === id) {
        return { ...el, text: newText };
      }
      if (el.children.length > 0) {
        return { ...el, children: updateElementText(el.children, id, newText) };
      }
      return el;
    });
  };

  useEffect(() => {
    const parsed = parseHTML(htmlContent);
    setElements(parsed);
  }, [htmlContent]);

  const handleContentUpdate = (id: string, newText: string) => {
    const updatedElements = updateElementText(elements, id, newText);
    setElements(updatedElements);

    // Update HTML string
    const newHtmlContent = updatedElements.map(elementToString).join("\n");
    setHtmlContent(newHtmlContent);
  };

  // Komponenta pro renderování elementů
  const RenderElement: React.FC<{
    element: HTMLElement;
    onUpdate: (id: string, text: string) => void;
    onStartEdit: (id: string) => void;
  }> = ({ element, onUpdate, onStartEdit }) => {
    const isEditing = element.id === editingId;

    const renderContent = () => {
      if (isEditing) {
        return (
          <textarea
            value={element.text}
            onChange={(e) => onUpdate(element.id, e.target.value)}
            onBlur={() => onStartEdit("")}
            autoFocus
            className="w-full bg-slate-800 text-white p-2 rounded-sm"
          />
        );
      }

      if (element.children.length > 0) {
        return element.children.map((child) => (
          <RenderElement
            key={child.id}
            element={child}
            onUpdate={onUpdate}
            onStartEdit={onStartEdit}
          />
        ));
      }

      return (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onStartEdit(element.id);
          }}
          className="cursor-text"
        >
          {element.text || " "}
        </span>
      );
    };

    const className = "p-2 hover:bg-slate-600/20 rounded-sm";

    switch (element.element) {
      case "div":
        return (
          <div className={`${className} border border-slate-600`}>
            {renderContent()}
          </div>
        );
      case "h1":
        return (
          <h1 className={`${className} text-2xl font-bold`}>
            {renderContent()}
          </h1>
        );
      case "h2":
        return (
          <h2 className={`${className} text-xl font-bold`}>
            {renderContent()}
          </h2>
        );
      case "h3":
        return <h3 className="">{renderContent()}</h3>;
      case "p":
        return <p className={className}>{renderContent()}</p>;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-rows-2 h-[50rem] bg-slate-700/50 border-2 border-slate-800 rounded-sm shadow-lg">
      <div className="p-4 border-r border-slate-600">
        <textarea
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          className="w-full h-full bg-slate-800 text-white p-4 rounded-sm font-mono"
          placeholder="Začněte psát HTML... např. <div><p>Text v bloku!!!</p></div>"
        />
      </div>

      <div className="p-4 text-white overflow-auto">
        <h3 className="text-lg font-bold mb-4">Náhled</h3>
        <div className="preview-content space-y-2">
          {elements.map((element) => (
            <RenderElement
              key={element.id}
              element={element}
              onUpdate={handleContentUpdate}
              onStartEdit={setEditingId}
            />
          ))}
        </div>

        {/* Debug výpis pro kontrolu struktury */}
        <div className="mt-8 p-4 bg-slate-800 rounded-sm">
          <h4 className="font-bold mb-2">Struktura dat:</h4>
          <pre className="text-xs">{JSON.stringify(elements, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default FileWorkspace;

/*const FileWorkspace = () => {
  return (
    <div className=" grid col-span-2 h-[50rem] bg-slate-700/50 border-2 border-slate-800 rounded-sm shadow-lg">
      <textarea
        name=""
        id=""
        className="bg-transparent font-mono resize-none"
      ></textarea>
    </div>
  );
};

export default FileWorkspace;*/
