import { deleteFolder } from "@/app/workspace/action";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

interface DeleteAlertProps {
  type: "folder" | "file";
  name: string;
  index: number;
  onDeleteSuccess?: () => void;
  handleCancel: () => void;
}

export const DeleteAlert = ({
  type,
  name,
  index,
  onDeleteSuccess,
  handleCancel,
}: DeleteAlertProps) => {
  const { data: session } = useSession();
  const modalRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleDeleteFolder = async (userId: string) => {
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

  const handleDelete = () => {
    if (!session?.user?.id) {
      setError("Authentication required");
      return;
    }

    if (type === "folder") {
      handleDeleteFolder(session.user.id);
    } else {
      console.log("there will be delete file logic");
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
            <button
              className="bg-error-active px-2 rounded-sm"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              Delete
            </button>
            <button
              className="bg-slate-700  px-2 rounded-sm hover:bg-slate-800 transition"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteAlert;
