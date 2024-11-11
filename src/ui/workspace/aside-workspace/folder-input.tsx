import { FileContext } from "@/contexts/files-context";
import { useFolder } from "@/ui/workspace/hooks/useCreateFolder";
import Input from "@/ui/primitives/input";
import { cva, VariantProps } from "class-variance-authority";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef } from "react";

const folderInputVariants = cva(``, {
  variants: {
    variant: {
      folder: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "folder",
    size: "md",
  },
});

type FolderInput = VariantProps<typeof folderInputVariants>;

interface FolderInputProps extends FolderInput {
  parent: string;
  onComplete?: () => void;
}

const FolderInput = ({
  parent,
  onComplete,
  size,
  variant,
}: FolderInputProps) => {
  const context = useContext(FileContext);
  const { handleCreateFolder, isLoading } = useFolder();
  const { data: session } = useSession();
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  if (!session?.user?.id || !context)
    return <span>Context or session is missing</span>;

  const { inputName, setInputName } = context;
  const { user } = session;

  const handleSubmit = async () => {
    if (!inputName.trim() || isLoading) return;

    try {
      await handleCreateFolder(user.id || "", inputName.trim(), parent);
    } catch (error) {
      console.error("Failed to create folder:", error);
    } finally {
      console.log("Ok");
    }
  };
  return (
    <Input
      size={size}
      variant={variant}
      ref={inputRef}
      onChange={(e) => setInputName(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSubmit();
        } else if (e.key === "Escape") {
          onComplete?.();
        }
      }}
    />
  );
};

export default FolderInput;