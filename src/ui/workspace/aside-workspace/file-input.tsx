import { FileContext } from "@/contexts/files-context";
import Input from "@/ui/primitives/input";
import { cva, VariantProps } from "class-variance-authority";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef } from "react";
import useCreateFile from "../hooks/useCreateFile";
import { Loader2 } from "lucide-react";
/* eslint-disable @typescript-eslint/no-unused-vars */
const fileInputVariants = cva(``, {
  variants: {
    variant: {
      file: "",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "file",
    size: "md",
  },
});

type FileInput = VariantProps<typeof fileInputVariants>;
/* eslint-enable @typescript-eslint/no-unused-vars */

interface FileInputProps extends FileInput {
  parentId?: string;
  parentName: string;
  parentIndex: number;
  onComplete?: () => void;
}

const FileInput = ({
  parentIndex,
  parentName,
  onComplete,
  size,
  variant,
}: FileInputProps) => {
  const context = useContext(FileContext);
  const { isLoading, createFile } = useCreateFile();
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
      await createFile(
        user.id || "",
        inputName.trim(),
        parentName,
        parentIndex
      );
    } catch (error) {
      console.error("Failed to create file:", error);
    } finally {
      console.log("Ok");
    }
  };
  return (
    <Input
      size={size}
      variant={variant}
      ref={inputRef}
      isLoading={isLoading}
      rightIcon={
        isLoading && (
          <Loader2 className="h-5 w-5 animate-spin" color="#0F1729" />
        )
      }
      placeholder="file"
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

export default FileInput;
