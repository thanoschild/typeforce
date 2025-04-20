'use client'

import React from 'react'
import { Button } from '@/components/core/Button';
import { RiGithubFill } from 'react-icons/ri';
import { useFont } from '@/context/FontContext';
import { useTheme } from '@/context/ThemeContext';
import { MdOutlinePalette, MdOutlineFontDownload } from "react-icons/md";


export default function Footer() {
    const { currentTheme } = useTheme();
    const { currentFont } = useFont();

    return (
        <footer className='w-full'>
            <div className='flex items-center justify-between gap-3'>
                <div className='gap-6'>
                    <Button asChild className='p-0 text-sm' variant='text'>
                        <a href='https://github.com/thanoschild' target='_blank' rel='noopener noreferrer'>
                            <RiGithubFill />
                            thanoschild
                        </a>
                    </Button>
                </div>
                <div className='flex items-center gap-6'>
                    <Button
                        className='p-0 text-sm'
                        variant='text'
                    >
                        <MdOutlineFontDownload />
                        <p>{currentFont}</p>
                    </Button>
                    <Button
                        className='p-0 text-sm'
                        variant='text'
                    >
                        <MdOutlinePalette />
                        <p>{currentTheme}</p>
                    </Button>
                    {/* <Version /> */}
                </div>
            </div>
        </footer>
    )
}