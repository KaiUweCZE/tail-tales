import { editFile } from "@/app/workspace/action";
import { FileContext } from "@/contexts/files-context";
import { UserFile } from "@/types/types";
import { FileElement } from "@/ui/workspace/file-workspace/types";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";

interface UseSaveProps {
  onSaveSuccess?: () => void;
  onSaveError?: (error: Error) => void;
}

/**
 * Custom hook for managing file saving functionality.
 * Handles both backend persistence and frontend state updates.
 */

const useSave = ({ onSaveSuccess, onSaveError }: UseSaveProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const context = useContext(FileContext);

  if (!context) throw new Error("Context is missing");

  const { files, setFiles, currentFile, currentFileState } = context;

  // updates file on backend and frontend
  const saveFile = async () => {
    if (!currentFile || !session?.user?.id) {
      setError("No file to save or user not authenticated");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const updatedFile = await editFile(currentFileState.id, session.user.id, {
        elements: currentFile,
      });

      if (updatedFile) {
        const newFiles = files.map(
          (file): UserFile =>
            file.id === currentFileState.id
              ? {
                  ...file,
                  elements: currentFile,
                  updatedAt: new Date(),
                }
              : file
        );
        setFiles(newFiles);
      }

      onSaveSuccess?.();
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to save file";
      setError(errorMessage);
      onSaveError?.(err as Error);
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Checks if current file has unsaved changes
   */
  const hasUnsavedChanges = (): boolean => {
    if (!currentFile || !currentFileState) return false;

    const originalFile = files.find((file) => file.id === currentFileState.id);
    if (!originalFile) return false;

    // Porovnání aktuálního stavu s uloženým stavem
    return (
      JSON.stringify(originalFile.elements) !== JSON.stringify(currentFile)
    );
  };

  return {
    saveFile,
    isSaving,
    error,
    hasUnsavedChanges,
  };
};

export default useSave;
