import { FileContext } from "@/contexts/files-context";
import { UserFolderWithoutId } from "@/types/types";
import { useCallback, useContext } from "react";

const useLocalState = () => {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error("useLocalState must be used within FileContext");
  }

  const { folders, setFolders, files, setFiles } = context;

  const updateFolderName = useCallback(
    (index: number, newName: string) => {
      const recursiveUpdate = (
        items: UserFolderWithoutId[]
      ): UserFolderWithoutId[] => {
        return items.map((folder) => {
          if (folder.index === index) {
            return { ...folder, name: newName };
          }
          if (folder.subFolders.length > 0) {
            return {
              ...folder,
              subFolders: recursiveUpdate(folder.subFolders),
            };
          }
          return folder;
        });
      };

      setFolders(recursiveUpdate(folders));
    },
    [folders, setFolders]
  );
  const updateFileName = useCallback(
    (id: string, newName: string) => {
      const updatedFiles = files.map((file) => {
        if (file.id === id) {
          return { ...file, name: newName };
        }
        return file;
      });

      setFiles(updatedFiles);
    },
    [files, setFiles]
  );

  return {
    updateFolderName,
    updateFileName,
    folders,
  };
};

export default useLocalState;
