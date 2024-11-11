import { getFiles } from "@/app/workspace/action";
import { FileContext } from "@/contexts/files-context";
import { UserFile } from "@/types/types";
import { FileElement } from "@/ui/workspace/file-workspace/types";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from "react";

const isFileElement = (obj: any): obj is FileElement => {
  return (
    obj &&
    typeof obj.id === "string" &&
    typeof obj.type === "string" &&
    typeof obj.cssClass === "string" &&
    typeof obj.content === "string" &&
    (obj.children === null || Array.isArray(obj.children)) &&
    obj.createdAt instanceof Date &&
    obj.updatedAt instanceof Date &&
    typeof obj.order === "number" &&
    typeof obj.additionalCss === "string"
  );
};

const useFetchFiles = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const context = useContext(FileContext);
  const { data: session } = useSession();

  if (!context) throw new Error("FileContext or session is missing");

  const { setFiles, isInitFile, setIsInitFile } = context;

  const fetchFiles = useCallback(async () => {
    if (!session || !session.user?.id) {
      console.log("Missing files...");
      setError("User ID is missing");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const fetchedFiles = await getFiles(session.user?.id);

      console.log("fetched files: ", fetchedFiles);
      if (!fetchedFiles) {
        setFiles([]);
        return;
      }

      const transformedFiles: UserFile[] =
        fetchedFiles.map((file) => ({
          id: file.id,
          name: file.name,
          elements:
            file.elements as Prisma.JsonValue as Array<any> as FileElement[],
          folderId: file.folderId || undefined,
          folderIndex: file.folderIndex ?? undefined,
          folderName: file.folderName ?? undefined,
          userId: file.userId,
          createdAt: file.createdAt,
          updatedAt: file.updatedAt,
        })) ?? [];

      console.log("transformed files", transformedFiles);

      setFiles(transformedFiles);
      setIsInitFile(true);
    } catch (err) {
      console.log("eerrrrorr");

      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch files";
      setError(errorMessage);
      console.error("Error fetching files:", err);
    } finally {
      console.log("finaaaaly");

      setIsLoading(false);
    }
  }, [session, setFiles]);

  useEffect(() => {
    if (!isInitFile) {
      console.log("call function");
      fetchFiles();
    }
  }, [isInitFile, isLoading, fetchFiles]);

  return { isInitFile, isLoading, error };
};

export default useFetchFiles;
