import { useEffect, useRef, useState } from "react";
import Button from "@/ui/primitives/button";
import { DefaultConfiguration } from "@/app/setting/types";
import { handleKeyDown } from "./utils/handleKeyDown";
import useEditFile from "../hooks/useEditFile";
import useSave from "../hooks/useSave";
import SuccessfulMessage from "@/components/successfull-message";
import FileWorkspaceNav from "./file-workspace-nav";

const FileWorkspace = ({
  userConfig,
}: {
  userConfig: DefaultConfiguration;
}) => {
  const editableRef = useRef<HTMLDivElement>(null);
  const [isSuccses, setIsSuccess] = useState<"default" | "saved" | "error">(
    "default"
  );
  const { currentFile, addElement, currentFileState } = useEditFile(userConfig);
  const {
    saveFile,
    isSaving,
    error: saveError, // eslint-disable-line @typescript-eslint/no-unused-vars
  } = useSave({
    onSaveSuccess: () => {
      setIsSuccess("saved");
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
      <div className="bg-slate-800">
        <FileWorkspaceNav addElement={addElement} />

        {currentFile ? (
          <div
            ref={editableRef}
            id="rootElement"
            className="w-full relative inter h-[80dvh] max-h-80dvh overflow-y-auto  bg-slate-800 text-amber-50 p-2 max-w-full font-mono rounded-b focus:outline-none focus:outline-amber-100 focus:outline-1"
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
        ) : (
          <div className="full h-[80dvh]">
            <span className="flex h-full w-full justify-center items-center text-3xl text-center fond-bold text-slate-300">
              CREATE A NEW FILE OR EDIT AN EXISTING ONE
            </span>
          </div>
        )}
      </div>
      <div className="block relative">
        {currentFile && (
          <span className="text-sm text-slate-400 absolute">
            {`actual file: ${currentFileState.name}`}
          </span>
        )}
        <div className="flex justify-end my-1">
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
      {isSuccses === "saved" && (
        <SuccessfulMessage
          headline="Success Save"
          text="Your file was saved to database"
        />
      )}
    </div>
  );
};

export default FileWorkspace;
