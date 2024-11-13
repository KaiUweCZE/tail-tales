import { useEffect, useRef, useState } from "react";
import Button from "@/ui/primitives/button";
import { DefaultConfiguration } from "@/app/setting/types";
import { handleKeyDown } from "./utils/handleKeyDown";
import useEditFile from "../hooks/useEditFile";
import useSave from "../hooks/useSave";
import SuccessfulMessage from "@/components/successfull-message";

const FileWorkspace = ({
  userConfig,
}: {
  userConfig: DefaultConfiguration;
}) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const [isSuccses, setIsSuccess] = useState<"default" | "success" | "error">(
    "default"
  );
  const { currentFile, addElement, currentFileState } = useEditFile(userConfig);
  const {
    saveFile,
    isSaving,
    error: saveError, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useSave({
    onSaveSuccess: () => {
      setIsSuccess("success");
      setTimeout(() => {
        setIsSuccess("default");
      }, 3000);
    },
    onSaveError: (error) => {
      console.error(error);
      setIsSuccess("error");
    },
  });
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
          onClick={() => addElement("ul")}
        >
          ul
        </Button>
        <Button
          intent="secondary"
          variant="light"
          size="sm"
          onClick={() => addElement("li")}
        >
          li
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
        {currentFile && (
          <span className="text-sm text-slate-400 absolute">
            {`actual file: ${currentFileState.name}`}
          </span>
        )}
        <div className="flex justify-end">
          <Button
            onClick={() =>
              console.log(
                "File name: ",
                currentFileState.id,
                "File elements: ",
                currentFile
              )
            }
          >
            Check state
          </Button>
          <Button
            onClick={saveFile}
            disabled={isSaving}
            isLoading={isSaving}
            loadingText="Saving..."
          >
            Save
          </Button>
        </div>
      </div>
      {isSuccses === "success" && (
        <SuccessfulMessage
          headline="Success Save"
          text="Your file was saved to database"
        />
      )}
    </div>
  );
};

export default FileWorkspace;
