import { createFile } from "@/app/workspace/action";
import { FileContext } from "@/contexts/files-context";
import { useContext, useState } from "react";

const useCreateFile = () => {
  const context = useContext(FileContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!context) throw Error("context is missing");
  const { setFiles, setIsActive, setInputName } = context;

  const handleCreateFile = async (
    userId: string,
    name: string,
    folderName?: string,
    folderIndex?: number,
    parentId?: string
  ) => {
    try {
      setIsLoading(true);
      setError(null);

      const newIndex = Date.now();

      const newFile = await createFile(
        userId,
        name,
        newIndex,
        folderName,
        folderIndex,
        parentId
      );

      if (!newFile) throw new Error("Failed to create file");

      setFiles((prevFiles) => [...prevFiles, newFile]);
      setInputName("");
      setIsActive((prev) => ({
        ...prev,
        active: false,
        inputType: "none",
        parentId: undefined,
      }));

      return newFile;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create file";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  return {
    createFile: handleCreateFile,
    isLoading,
    error,
  };
};

export default useCreateFile;
