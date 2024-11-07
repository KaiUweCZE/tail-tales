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
    case "p":
      return <p className={className}>{renderContent()}</p>;
    default:
      return null;
  }
};