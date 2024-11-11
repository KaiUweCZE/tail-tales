import { useEffect, useRef } from "react";
import Button from "@/ui/primitives/button";
import { DefaultConfiguration } from "@/app/setting/types";
import { handleKeyDown } from "./utils/handleKeyDown";
import useEditFile from "../hooks/useEditFile";

const FileWorkspace = ({
  userConfig,
}: {
  userConfig: DefaultConfiguration;
}) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const { currentFile, addElement } = useEditFile(userConfig);

  useEffect(() => {
    if (editableRef.current) {
      editableRef.current.focus();
    }
  }, []);

  return (
    <div className="file-wrapper rounded">
      <nav className="file-navigation bg-slate-850 h-8 p-1 rounded-t border-b border-b-gray-400/50">
        <Button
          intent="secondary"
          variant="light"
          size="sm"
          onClick={() => addElement("div")}
        >
          div
        </Button>
        <Button
          intent="secondary"
          variant="light"
          size="sm"
          onClick={() => addElement("span")}
        >
          span
        </Button>
        <Button
          intent="secondary"
          variant="light"
          size="sm"
          onClick={() => addElement("h1")}
        >
          h1
        </Button>
        <Button
          intent="secondary"
          variant="light"
          size="sm"
          onClick={() => addElement("p")}
        >
          p
        </Button>
        <Button
          variant="light"
          size="sm"
          onClick={() => console.log(currentFile)}
        ></Button>
      </nav>
      <div className="block relative">
        <div
          ref={editableRef}
          id="rootElement"
          className="w-full h-[80dvh] max-h-80dvh overflow-y-auto  bg-slate-800 text-amber-50 p-2 max-w-full font-mono rounded-b focus:outline-none focus:outline-amber-100 focus:outline-1"
          contentEditable
          autoFocus
          suppressContentEditableWarning
          onPaste={(e) => {
            e.preventDefault();
            const text = e.clipboardData.getData("text/plain");
            document.execCommand("insertText", false, text);
          }}
          onKeyDown={(e) =>
            handleKeyDown(e as unknown as KeyboardEvent, editableRef)
          }
        ></div>
        <div className="flex justify-end">
          <Button onClick={() => console.log(currentFile)}>Save</Button>
        </div>
      </div>
    </div>
  );
};

export default FileWorkspace;
