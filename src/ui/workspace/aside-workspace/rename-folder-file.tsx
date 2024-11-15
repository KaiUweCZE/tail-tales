import { changeFileName, changeFolderName } from "@/app/workspace/action";
import useLocalState from "@/ui/workspace/hooks/useLocalState";
import { validateName } from "@/utils/validate-name";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

interface RenameFolderFileProps {
  type: "folder" | "file";
  index: number;
  currentName: string;
  fileId?: string;
  onComplete: () => void;
}

const RenameFolderFile = ({
  type,
  index,
  currentName,
  fileId,
  onComplete,
}: RenameFolderFileProps) => {
  const { data: session } = useSession();
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateFolderName, updateFileName } = useLocalState();

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const handleSubmit = async () => {
    if (newName === currentName) {
      onComplete();
      return;
    }

    const [isValid, error] = validateName(newName);
    if (!isValid) {
      setError(error);
      return;
    }

    if (!session?.user?.id) {
      setError("Not authenticated");
      return;
    }

    const userId = session.user.id;

    try {
      // optimistic update
      if (type === "folder") {
        updateFolderName(index, newName);
      } else {
        if (fileId) {
          updateFileName(fileId, newName);
        }
      }

      const result =
        type === "folder"
          ? await changeFolderName(index, newName, currentName, userId)
          : await changeFileName(fileId ?? "", newName);

      if (!result.success) {
        if (type === "folder") {
          updateFolderName(index, currentName);
        } else {
          if (fileId) {
            updateFileName(fileId, currentName);
          }
        }
        setError(result.error || "Failed to update name");
        return;
      }

      onComplete();
    } catch (err) {
      console.error(err);
      if (type === "folder") {
        updateFolderName(index, currentName);
      } else {
        if (fileId) {
          updateFileName(fileId, currentName);
        }
      }
      setError("An error occurred while updating name");
    }
  };

  return (
    <div className="grid relative place-content-center ">
      <input
        ref={inputRef}
        className=" rounded-md shadow-sm w-32 p-1 border text-sm text-slate-900 focus:outline-cyan-300 focus:ring-0 "
        aria-label={`Change ${type} name`}
        placeholder="type new name"
        type="text"
        value={newName}
        onChange={(e) => {
          setError(null);
          setNewName(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          } else if (e.key === "Escape") {
            onComplete();
          }
        }}
      />
      {error && (
        <div className="absolute top-full left-0 mt-1 text-xs text-red-500">
          {error}
        </div>
      )}
    </div>
  );
};

export default RenameFolderFile;
