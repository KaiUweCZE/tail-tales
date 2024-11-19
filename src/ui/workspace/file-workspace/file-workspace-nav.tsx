import Button from "@/ui/primitives/button";
import { ElementType } from "./types";

const FileWorkspaceNav = ({
  addElement,
}: {
  addElement: (element: ElementType) => void;
}) => {
  const elements = [
    "div",
    "span",
    "h1",
    "h2",
    "h3",
    "p",
    "ul",
    "li",
    "article",
  ];
  return (
    <nav className="file-navigation bg-slate-800 border-b mb-1 border-slate-400 h-fit p-1 rounded-t-lg">
      {elements.map((element) => (
        <Button
          key={element}
          variant="nav"
          size="sm"
          onClick={() => addElement(element as ElementType)}
        >
          {element}
        </Button>
      ))}
    </nav>
  );
};

export default FileWorkspaceNav;
