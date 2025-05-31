import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  onClick?: () => void;
  icon?: ReactNode;
  children: ReactNode;
  isSelected?: boolean;
  variant?: "default" | "primary" | "secondary";
  className?: string;
}

export default function Button({
  onClick,
  icon,
  children,
  isSelected,
  variant = "default",
  className,
}: ButtonProps) {
  const baseStyles = "w-full text-left font-bold py-1.5 px-3 rounded-md flex items-center gap-2 hover:bg-theme-text hover:text-theme-bg transition-colors";
  
  const variants = {
    default: "hover:bg-theme-text hover:text-theme-bg",
    primary: isSelected 
      ? "bg-theme-main text-theme-bg" 
      : "text-theme-text hover:bg-theme-text hover:text-theme-bg",
    secondary: isSelected
      ? "bg-olive-500 text-white"
      : "text-theme-text hover:bg-stone-200",
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        className
      )}
      onClick={onClick}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </button>
  );
}