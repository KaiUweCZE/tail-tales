// hooks/useSave.ts
import { editFile } from "@/app/workspace/action";
import { FileElement } from "@/ui/workspace/file-workspace/types";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface UseSaveProps {
  currentFile: {
    id: string;
    elements: FileElement[];
  } | null;
  onSaveSuccess?: () => void;
  onSaveError?: (error: Error) => void;
}

const useSave = ({ currentFile, onSaveSuccess, onSaveError }: UseSaveProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const saveFile = async () => {
    if (!currentFile || !session?.user?.id) {
      setError("No file to save or user not authenticated");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const updatedFile = await editFile(currentFile.id, session.user.id, {
        elements: currentFile.elements,
      });

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

  return {
    saveFile,
    isSaving,
    error,
  };
};

export default useSave;
