import { cn } from "@/components/lib/axios/cn";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "default";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  label: ReactNode;
  variant?: ButtonVariant;
  layout?: "horizontal" | "vertical";
  onClick?: () => void;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-title hover:bg-author text-white font-semibold uppercase",
  primary: "bg-title hover:bg-author text-white font-semibold uppercase",
  secondary: "bg-[#BD8448] hover:bg-title text-white font-semibold uppercase",
  danger: "bg-red-600 hover:bg-red-800 text-white font-semibold uppercase",
  outline:
    "border border-border-color text-title font-semibold uppercase bg-transparent hover:bg-author hover:text-white ",
};

const Button: React.FC<ButtonProps> = ({
  icon,
  label,
  onClick,
  variant = "primary",
  layout = "horizontal",
  className,
  type = "button",
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "px-6 w-full py-3 duration-300 cursor-pointer text-[12px] ",
        layout === "vertical"
          ? "flex flex-col items-center justify-center"
          : "flex items-center justify-center",
        variantStyles[variant],
        className
      )}
      {...rest}
    >
      {icon && (
        <span className={layout === "vertical" ? "mb-1" : "mr-2"}>{icon}</span>
      )}
      {label}
    </button>
  );
};

export default Button;
