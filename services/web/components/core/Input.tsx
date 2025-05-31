'use client';

import { cn } from '@/lib/utils'
import { ReactNode } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  highlight?: boolean;
  icon?: ReactNode;
  iconClassName?: string;
}

export default function Input({ className, highlight = false, ...props }: InputProps) {
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