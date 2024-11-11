// hooks/useFolder.ts
import { createFolder } from "@/app/workspace/action";
import { FileContext } from "@/contexts/files-context";
import { UserFolderWithoutId } from "@/types/types";
import { useContext, useState } from "react";

export const useFolder = () => {
  const context = useContext(FileContext);
  const [isLoading, setIsLoading] = useState(false);

  if (!context) throw Error("context is missing");

  const { setFolders, setInputName, setIsActive } = context;

  const addFolderToParent = (
    folders: UserFolderWithoutId[],
    parentName: string,
    newFolder: UserFolderWithoutId
  ): UserFolderWithoutId[] => {
    return folders.map((folder) => {
      if (folder.name === parentName) {
        // parent found
        return {
          ...folder,
          subFolders: [...folder.subFolders, newFolder],
        };
      } else if (folder.subFolders.length > 0) {
        // recurs check
        return {
          ...folder,
          subFolders: addFolderToParent(
            folder.subFolders,
            parentName,
            newFolder
          ),
        };
      }
      return folder;
    });
  };

  const handleCreateFolder = async (
    userId: string,
    name: string,
    parent?: string
  ) => {
    console.log("handlecreatefolder => parent extist?: ", parent);

    try {
      setIsLoading(true);
      const index = Date.now();

      // create folder on db
      const newFolder = await createFolder(userId, name, index, parent);

      if (newFolder) {
        // client folder
        if (parent && parent !== "null") {
          setFolders((prev) => addFolderToParent(prev, parent, newFolder));
        } else {
          setFolders((prev) => [...prev, newFolder]);
        }

        setInputName("");
        setIsActive((prev) => ({
          ...prev,
          active: false,
          inputType: "none",
          parentId: undefined,
        }));

        return newFolder;
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleCreateFolder, isLoading };
};
