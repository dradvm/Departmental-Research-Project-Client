import * as React from "react";
import { cn } from "lib/utils";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "hover" | "primary";
  size?: "default" | "sm" | "lg";
  expand?: boolean;
}

const buttonVariants = {
  default: "text-white hover:bg-indigo-950 hover:opacity-90",
  hover: "text-white hover:text-slate-300",
  outline: "border border-input bg-none hover:bg-gray-800",
  primary:
    "bg-white text-indigo-600 border border-indigo-500 hover:text-indigo-700 hover:border-indigo-700 hover:bg-indigo-50",
};

const buttonSizes = {
  default: "h-10 px-2 py-2",
  sm: "h-9 px-3 rounded-md",
  lg: "h-11 px-8 rounded-md",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      expand = false,
      children,
      ...props
    },
    ref
  ) => (
    <button
      className={cn(
        "inline-flex items-center disabled justify-center rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
        buttonVariants[variant],
        buttonSizes[size],
        expand && "w-full",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
);

Button.displayName = "Button";
