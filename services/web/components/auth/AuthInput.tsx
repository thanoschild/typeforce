'use client';

import { cn } from '@/lib/utils'

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  highlight?: boolean;
}

export default function AuthInput({ className, highlight = false, ...props }: AuthInputProps) {
  return (
    <input
      className={cn(
        "w-full bg-theme-sub-alt text-theme-text px-2 py-2 rounded-lg outline-none transition-all duration-200",
        "border-2 border-transparent",
        "focus:border-theme-text",
        "placeholder:text-theme-sub",
        className
      )}
      {...props}
    />
  );
}