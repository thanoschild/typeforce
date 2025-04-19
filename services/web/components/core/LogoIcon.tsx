'use client';

import { type ComponentPropsWithoutRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface LogoIconProps extends ComponentPropsWithoutRef<'svg'> {
    className?: string;
    variant?: 'main' | 'text' | 'sub';
}

export function LogoIcon({ className, variant = 'main', ...props }: LogoIconProps) {
    const getThemeColor = () => {
        switch (variant) {
            case 'main':
                return 'var(--main-color)';
            case 'text':
                return 'var(--text-color)';
            case 'sub':
                return 'var(--sub-color)';
            default:
                return 'var(--main-color)';
        }
    };

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='35'
            viewBox='0 0 251 175'
            fill='none'
            strokeWidth='18'
            strokeLinecap='round'
            className={twMerge('transition-colors', className)}
            style={{ stroke: getThemeColor() }}
            {...props}
        >
            {/* "M" shape replacing "A" */}
            <path d='M49 125V49' style={{ stroke: 'inherit' }} />
            <path d='M49 49L68 88L87 49' style={{ stroke: 'inherit' }} />
            <path d='M87 49V125' style={{ stroke: 'inherit' }} />

            {/* "T" shape (unchanged) */}
            <path d='M162.102 49.6772L202.968 49.6772' style={{ stroke: 'inherit' }} />
            <path d='M163.465 96.6732L163.465 125.961' style={{ stroke: 'inherit' }} />

            {/* Other shapes */}
            <path d='M123.961 49.6772H126.685' style={{ stroke: 'inherit' }} />
            <path d='M47.6772 125.961H50.4017' style={{ stroke: 'inherit' }} />
            <path d='M200.925 125.961H202.287' style={{ stroke: 'inherit' }} />
            <path d='M57.2126 78.2835H79.0079' style={{ stroke: 'inherit' }} />
            <path d='M85.8188 125.961H126.685' style={{ stroke: 'inherit' }} />
            <path d='M125.323 87.8189L201.606 87.8189' style={{ stroke: 'inherit' }} />
            <rect
                x='10.2166'
                y='10.8543'
                width='230.213'
                height='153.929'
                rx='34.7362'
                style={{ stroke: 'inherit' }}
            />
        </svg>
    );
}
