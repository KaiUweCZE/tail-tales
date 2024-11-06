import { changeFileName, changeFolderName } from "@/app/workspace/action";
import { FileContext } from "@/contexts/files-context";
import { InputTypes } from "@/types/types";
import { useContext, useRef, useState } from "react";

interface RenameFolderFileProps {
  type: "folder" | "file";
  id: string;
  currentName: string;
  onComplete: () => void;
}

const RenameFolderFile = ({
  type,
  id,
  currentName,
  onComplete,
}: RenameFolderFileProps) => {
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const context = useContext(FileContext);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const validateName = (name: string): boolean => {
    if (name.trim().length === 0) {
      setError("Name cannot be empty");
      return false;
    }
    if (name.length > 50) {
      setError("Name is too long (max 50 characters)");
      return false;
    }
    if (/[<>:"/\\|?*]/.test(name)) {
      setError("Name contains invalid characters");
      return false;
    }
    return true;
  };

  const updateLocalState = (id: string, newName: string) => {
    if (!context) return;

    const { folders, setFolders } = context;

    if (type === "folder") {
      const updateFolderName = (items: UserFolder[]): UserFolder[] => {
        return items.map((folder) => {
          if (folder.id === id) {
            return { ...folder, name: newName };
          }
          if (folder.subFolders.length > 0) {
            return {
              ...folder,
              subFolders: updateFolderName(folder.subFolders),
            };
          }
          return folder;
        });
      };

      setFolders(updateFolderName(folders));
    } else {
      // Update file name logic here if needed
    }
  };

  const handleSubmit = async () => {
    if (!validateName(newName)) return;

    try {
      const result =
        type === "folder"
          ? await changeFolderName(id, newName)
          : await changeFileName(id, newName);

      if (result.success) {
        updateLocalState(id, newName);
        onComplete();
      } else {
        setError(result.error || "Failed to update name");
      }
    } catch (err) {
      setError("An error occurred while updating name");
    }
  };

  const handleBlur = () => {
    onComplete();
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        className="absolute w-32 h-8 px-2 border rounded shadow-sm"
        aria-label={`Change ${type} name`}
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
        onBlur={handleBlur}
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
