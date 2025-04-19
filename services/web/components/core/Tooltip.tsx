'use client';

import { type ReactNode, forwardRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TooltipProps {
    children: ReactNode;
    className?: string;
    disabled?: boolean;
    label: ReactNode;
}

export const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
    function Tooltip({ children, className, disabled, label }, ref) {
    const [show, setShow] = useState(false);

    if (disabled) {
        return <>{children}</>;
    }

    return (
        <div 
            className="relative inline-flex"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onFocus={() => setShow(true)}
            onBlur={() => setShow(false)}
            ref={ref}
        >
            {children}
            <div 
                className={twMerge(
                    'absolute left-1/2 -translate-x-1/2 top-full mt-1',
                    'opacity-0 invisible',
                    show && 'opacity-100 visible',
                    'transition-all duration-200',
                    'z-50 rounded-lg bg-theme-sub-alt px-3 py-2',
                    'text-center text-sm text-theme-text whitespace-nowrap',
                    'pointer-events-none shadow-md',
                    className
                )}
                role="tooltip"
            >
                {label}
            </div>
        </div>
    );
});
  