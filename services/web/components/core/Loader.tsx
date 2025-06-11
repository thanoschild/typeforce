import React from 'react'
import { cn } from '@/lib/utils';
import { RiLoader4Line } from "react-icons/ri";

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  fullScreen?: boolean;
  className?: string;
  text?: string;
}

const sizeMap = {
  sm: 'text-xl',
  md: 'text-2xl',
  lg: 'text-3xl',
  xl: 'text-4xl',
  '2xl': 'text-5xl',   
  '3xl': 'text-6xl' 
};

export default function Loader({ 
  size = 'md', 
  fullScreen = false,
  className,
  text
}: LoaderProps) {
  const containerClass = cn(
    'flex flex-col items-center justify-center gap-2',
    fullScreen ? 'fixed inset-0 bg-theme-bg/100 z-50' : 'w-full h-full', // Removed backdrop-blur and adjusted bg opacity
    className
  );

  const spinnerClass = cn(
    'text-theme-text animate-spin',
    sizeMap[size]
  );

  return (
    <div className={containerClass}>
      <RiLoader4Line className={spinnerClass} />
      {text && (
        <p className="text-theme-text text-sm font-medium">
          {text}
        </p>
      )}
    </div>
  );
}