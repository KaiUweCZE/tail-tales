export interface ParsedElement {
  id: string;
  type: string;
  content: string;
  isEditing: boolean;
}

export interface EditableElementProps {
  element: ParsedElement;
  onUpdate: (id: string, newContent: string) => void;
  onStartEdit: (id: string) => void;
}

const EditableElement: React.FC<EditableElementProps> = ({
  element,
  onUpdate,
  onStartEdit,
}) => {
  if (element.isEditing) {
    return (
      <textarea
        className="w-full bg-slate-800 text-white p-2 rounded-sm"
        value={element.content}
        onChange={(e) => onUpdate(element.id, e.target.value)}
        autoFocus
        onBlur={() => onStartEdit("")}
      />
    );
  }

  const content = element.content || " ";
  const className = "cursor-text hover:bg-slate-600/20 p-2 rounded-sm";

  switch (element.type) {
    case "div":
      return (
        <div
          className={`${className} border border-slate-600`}
          onClick={() => onStartEdit(element.id)}
        >
          {content}
        </div>
      );
    case "h1":
      return (
        <h1
          className={`${className} text-2xl font-bold`}
          onClick={() => onStartEdit(element.id)}
        >
          {content}
        </h1>
      );
    case "h2":
      return (
        <h2
          className={`${className} text-xl font-bold`}
          onClick={() => onStartEdit(element.id)}
        >
          {content}
        </h2>
      );
    case "p":
      return (
        <p className={className} onClick={() => onStartEdit(element.id)}>
          {content}
        </p>
      );
    default:
      return null;
  }
};

export default EditableElement;
