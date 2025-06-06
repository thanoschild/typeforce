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
        <path d='M123.961 49.6772H126.685' style={{ stroke: 'inherit' }} />
        <path d='M162.102 49.6772L202.968 49.6772' style={{ stroke: 'inherit' }} />
        <path d='M47.6772 125.961H50.4017' style={{ stroke: 'inherit' }} />
        <path d="M105.6772 90.961 H120.6772" style={{ stroke: 'inherit' }} />
        {/* <path d='M200.925 125.961H202.287' style={{ stroke: 'inherit' }} /> */}
        <path d='M85.8188 125.961H130.685' style={{ stroke: 'inherit' }} />

        {/* Letter T */}
        <path d='M49.0393 48.315L87.181 48.315' style={{ stroke: 'inherit' }} />
        <path d='M68.1102 48.315L68.1102 88.5' style={{ stroke: 'inherit' }} />

        {/* Letter F */}
        <path d="M167.323 85.8189 L167.323 125.961" style={{ stroke: 'inherit' }} />
        <path d="M167.323 85.8189 L199.465 85.8189" style={{ stroke: 'inherit' }} />
        <path d="M167.323 108.5 L191.292 108.5" style={{ stroke: 'inherit' }} />

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
