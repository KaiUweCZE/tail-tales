import { getFiles } from "@/app/workspace/action";
import { FileContext } from "@/contexts/files-context";
import { UserFile } from "@/types/types";
import { FileElement } from "@/ui/workspace/file-workspace/types";
import { useSession } from "next-auth/react";
import { useCallback, useContext, useEffect, useState } from "react";

// look at better type guard
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertElement = (element: any): FileElement => {
  return {
    id: element.id,
    type: element.type,
    cssClass: element.cssClass,
    content: element.content,
    children: element.children || [],
    createdAt: new Date(element.createdAt),
    updatedAt: new Date(element.updatedAt),
    order: element.order,
    additionalCss: element.additionalCss,
    variants: element.variants || undefined,
    parentId: element.parentId || undefined,
    attributes: element.attributes || undefined,
  };
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

      const transformedFiles: UserFile[] = fetchedFiles.map((file) => {
        // Převedení elements na správný formát
        const elements = Array.isArray(file.elements)
          ? file.elements.map(convertElement)
          : [];

        return {
          id: file.id,
          name: file.name,
          elements,
          folderId: file.folderId || undefined,
          folderIndex: file.folderIndex || undefined,
          folderName: file.folderName || undefined,
          userId: file.userId,
          createdAt: new Date(file.createdAt),
          updatedAt: new Date(file.updatedAt),
        };
      });

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
