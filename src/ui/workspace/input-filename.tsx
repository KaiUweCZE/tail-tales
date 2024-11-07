import { FileContext } from "@/contexts/files-context";
import { useFolder } from "@/hooks/useCreateFolder";
import { InputTypes } from "@/types/types";
import { cva } from "class-variance-authority";
import { LoaderIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useRef } from "react";

const inputVariants = cva(
  `rounded shadow-sm p-1 text-slate-900 transition-colors focus:outline-cyan-300 focus:ring-0`,
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-300 focus:border-cyan-300",
        filled:
          "bg-gray-100 border border-transparent focus:bg-white focus:border-cyan-300",
        outline:
          "bg-transparent border-2 border-gray-300 focus:border-cyan-300",
        error: "bg-white border border-red-300 focus:border-red-500",
      },
      size: {
        sm: "w-32 text-sm",
        md: "",
        lg: "",
      },
      state: {
        normal: "opacity-100",
        disabled: "opacity-50 cursor-not-allowed",
        loading: "cursor-wait",
      },
      fullWidth: {
        true: "w-full",
      },
      rounded: {
        none: "rounded-none",
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      state: "normal",
      rounded: "md",
    },
  }
);

type InputVariantProps = {
  onComplete: () => void;
  inputType: InputTypes;
  parent?: string;
  variant?: "default" | "filled" | "outline" | "error";
  size?: "sm" | "md" | "lg";
  state?: "normal" | "disabled" | "loading";
  fullWidth?: boolean;
  rounded?: "none" | "sm" | "md" | "lg" | "full";
};

const InputFilename = ({
  onComplete,
  inputType,
  parent,
  variant,
  size,
  state,
  fullWidth,
  rounded,
}: InputVariantProps) => {
  const context = useContext(FileContext);
  const { handleCreateFolder, isLoading } = useFolder();
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  if (!context || !session || !session.user)
    return <span>Context is missing</span>;

  const { inputName, setInputName } = context;
  const { user } = session;

  const handleSubmit = async () => {
    if (!inputName.trim() || isLoading) return;
    console.log("parent extist?: ", parent);

    try {
      await handleCreateFolder(user.id || "", inputName.trim(), parent);
    } catch (error) {
      console.error("Failed to create folder:", error);
    } finally {
      console.log("ok");
    }
  };

  return (
    <div className="grid place-items-center relative">
      <input
        ref={inputRef}
        className={inputVariants({ variant, size })}
        aria-labelledby={`input-${inputType}`}
        disabled={isLoading}
        placeholder={`set ${inputType} name`}
        type="text"
        name="input"
        value={inputName}
        id=""
        onChange={(e) => setInputName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          } else if (e.key === "Escape") {
            onComplete();
          }
        }}
      />
      {isLoading && (
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <LoaderIcon className="w-4 h-4" />
        </div>
      )}
    </div>
  );
};

export default InputFilename;
