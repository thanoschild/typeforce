'use client';

import { useTheme } from '@/context/ThemeContext';
import { Button } from '@/components/ui/button';
import { Tooltip } from './Tooltip';
import { IoColorPaletteOutline } from 'react-icons/io5';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export function ThemeSelector() {
    const { currentTheme, setTheme, availableThemes } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <Tooltip label="Change Theme">
                <Button
                    variant="link"
                    className="px-2 text-xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <IoColorPaletteOutline />
                </Button>
            </Tooltip>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 z-50 mt-2 w-48 rounded-lg bg-background-light dark:bg-background-dark shadow-lg">
                        <div className="py-1">
                            {availableThemes.map((theme) => (
                                <button
                                    key={theme.name}
                                    onClick={() => {
                                        setTheme(theme.name);
                                        setIsOpen(false);
                                    }}
                                    className={twMerge(
                                        'w-full px-4 py-2 text-left text-sm hover:bg-background-dark/10 dark:hover:bg-background-light/10',
                                        currentTheme === theme.name && 'text-main'
                                    )}
                                >
                                    {theme.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
} 