import { cn } from "@/utils/ui/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, InputHTMLAttributes, ReactNode } from "react";

const inputVariants = cva(
  `w-full rounded border bg-amber-50 px-3 text-slate-900 transition duration-200 
  placeholder:text-gray-400 
  focus:outline focus:outline-offset-1
  :user-invalid-border-red-500
  [&:-webkit-autofill]:!appearance-none
[&:-webkit-autofill]:shadow-[0_0_0px_1000px_rgb(254,252,232)_inset]
  `,
  {
    variants: {
      intent: {
        primary:
          "border-gray-300 focus:border-slate-900 focus:outline-amber-200 focus:border-amber-100",
        error: "border-red-500 focus:border-red-500 focus:ring-red-200 ",
      },
      size: {
        default: "py-2 text-base",
        sm: "py-1 text-sm",
        md: "max-w-96",
        lg: "py-3 text-lg",
      },
      icon: {
        true: "pl-10", // extra padding když je ikona
        false: "",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "default",
      icon: false,
    },
  }
);

type InputVariantProps = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    InputVariantProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  label?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      placeholder,
      intent,
      size,
      icon,
      leftIcon,
      rightIcon,
      error,
      label,
      helperText,
      id,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const helpTextId = `${id}-help`;
    const errorId = `${id}-error`;
    const labelId = `${id}-label`;
    return (
      <div className="grid w-full gap-0">
        {/*hidden label*/}
        {!label && ariaLabel && (
          <span id={labelId} className="sr-only">
            {ariaLabel}
          </span>
        )}
        {/* label */}
        {label && (
          <label
            htmlFor={labelId}
            id={labelId}
            className="block text-sm font-medium text-amber-50"
          >
            {label}
          </label>
        )}

        {/* Input wrapper for icons*/}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            >
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            aria-labelledby={labelId}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(
              error ? errorId : null,
              helperText ? helpTextId : null
            )}
            type={type}
            ref={ref}
            placeholder={placeholder}
            className={cn(
              inputVariants({
                intent: error ? "error" : intent,
                size,
                icon: !!leftIcon,
              }),
              className
            )}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            >
              {rightIcon}
            </div>
          )}
        </div>

        {/* Error message or helper text */}
        {helperText && !error && (
          <p id={helpTextId} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}

        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
