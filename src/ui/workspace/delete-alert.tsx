import { deleteFile, deleteFolder } from "@/app/workspace/action";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Button from "../primitives/button";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteAlertProps {
  type: "folder" | "file";
  fileId?: string;
  name?: string;
  index?: number;
  onDeleteSuccess?: () => void;
  handleCancel: () => void;
}

export const DeleteAlert = ({
  type,
  name,
  index,
  fileId,
  onDeleteSuccess,
  handleCancel,
}: DeleteAlertProps) => {
  const { data: session } = useSession();
  const modalRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleDeleteFolder = async (
    userId: string,
    index: number,
    name: string
  ) => {
    setIsDeleting(true);
    setError(null);
    try {
      const result = await deleteFolder(index, userId, name);

      if (!result.success) {
        setError(result.error || "Failed to delete folder");
        return;
      }

      onDeleteSuccess?.();
      handleCancel();
    } catch (error) {
      console.error("Delete folder error:", error);
      setError("An unexpected error occurred while deleting the folder");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    setIsDeleting(true);
    setError(null);
    try {
      const result = await deleteFile(fileId);

      if (!result.success) {
        setError(result.error || "Failed to delete file");
        return;
      }

      onDeleteSuccess?.();
      handleCancel();
    } catch (error) {
      console.error("Delete folder error:", error);
      setError("An unexpected error occurred while deleting the file");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDelete = () => {
    if (!session?.user?.id) {
      setError("Authentication required");
      return;
    }

    if (type === "folder") {
      if (!index || !name) return;
      handleDeleteFolder(session.user.id, index, name);
    } else {
      if (!fileId) return;
      handleDeleteFile(fileId);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-slate-900 bg-opacity-50 z-10" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 primary-animation">
        <div
          className="grid gap-2 fixed border border-slate-950 bg-slate-900 p-4 rounded secondary-shadow focus:outline-none"
          ref={modalRef}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              handleCancel();
            }
          }}
        >
          <h3 className="text-xl">{`Delete ${type}`}</h3>
          <div>
            <p>{`Are you sure you want to delete "${name}"`}</p>
            {type === "folder" ? (
              <p className="text-wrap max-w-96 font-medium">
                If you continue, all files and folders inside this folder will
                be deleted
              </p>
            ) : (
              <p>it will be deleted irretrievably.</p>
            )}
          </div>
          <div className="flex gap-2 mt-2 justify-end">
            <Button
              size="md"
              variant="error"
              onClick={handleDelete}
              disabled={isDeleting}
              leftIcon={
                isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4 " />
                )
              }
            >
              Delete
            </Button>
            <Button variant="light" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAlert;
