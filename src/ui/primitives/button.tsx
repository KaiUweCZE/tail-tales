import { cn } from "@/utils/ui/utils";
import { cva, VariantProps } from "class-variance-authority";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";

const buttonVariants = cva(
  `rounded-sm w-fit px-2 transition duration-300
  disabled:hover:bg-slate-950
  focus:outline
  focus:outline-amber-200
  `,
  {
    variants: {
      intent: {
        primary: "bg-slate-950 hover:bg-slate-800 text-amber-100",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-900",
        ternary: "transparent justify-center items-center",
      },
      grow: {
        false: "w-fit",
        true: "w-full",
      },
      size: {
        default: "text-base",
        sm: "text-xs max-h-fit rounded-sm",
        md: "text-lg",
        lg: "py-3 px-8 rounded-lg text-xl font-semibold",
      },
      variant: {
        hero: "bg-cyan-400 hover:bg-cyan-600",
        nav: "bg-transparent hover:bg-transparent ",
        error: "bg-error hover:bg-red-700 text-amber",
        light: "bg-slate-700 hover:bg-slate-950 disabled:hover:bg-slate-700",
        toggle:
          "bg-transparent rounded-none border-b-amber-50/50 border-b-2 pb-1",
        column: "",
      },
      icon: {
        false: "",
        true: "flex items-center py-1",
      },
      active: {
        false: "",
        true: "",
      },
    },
    compoundVariants: [
      {
        variant: "toggle",
        active: true,
        className: "border-b-2 border-amber-200 transparent",
      },
      {
        /*
        variant: "nav",
        size: "sm",
        className: "bg-transparent",
      */
      },
    ],
    defaultVariants: {
      intent: "primary",
      grow: false,
      size: "default",
      icon: false,
    },
  }
);

type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  loadingText?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      intent,
      grow,
      size,
      variant,
      icon, // eslint-disable-line @typescript-eslint/no-unused-vars
      leftIcon,
      rightIcon,
      isLoading,
      loadingText = "Loading...",
      children,
      disabled,
      active,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          buttonVariants({
            intent,
            grow,
            size,
            variant,
            icon: leftIcon || rightIcon ? true : false,
            className,
            active,
          }),
          "relative"
        )}
        disabled={isLoading || disabled}
        {...props}
      >
        <span
          className={cn(
            "flex items-center gap-2 px-2",
            isLoading && "invisible",
            active &&
              (variant === "toggle" || variant === "column") &&
              "text-amber-200",
            variant === "nav" &&
              "hover:text-amber-200 border-b border-transparent  hover:border-b hover:border-amber-200",
            variant === "column" && "flex-col gap-1"
          )}
        >
          {leftIcon}
          {children}
          {rightIcon}
        </span>
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2">
            {leftIcon}
            {loadingText}
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
