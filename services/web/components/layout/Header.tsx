'use client';

import React, { useEffect, useState } from 'react'
import { TbKeyboard } from "react-icons/tb";
import { LuCrown } from "react-icons/lu";
import { RiInformation2Line, RiLoaderLine } from "react-icons/ri";
import { IoSettingsOutline, IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineFontDownload } from "react-icons/md";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { Grid } from '@/components/core/Grid';
import { twJoin } from 'tailwind-merge';
import { LogoIcon } from '@/components/core/LogoIcon';
import { Text } from '@/components/core/Text';
import { Tooltip } from '../core/Tooltip';
import Link from 'next/link';
import { Button } from '../core/Button';
import { Avatar } from '../profile/Avatar';

interface UserType {
    name: string;
    avatarURL: string;
}

// Dummy data for development
const userData: UserType | null = null;
// const userData: UserType = {
//   name: 'John Doe',
//   avatarURL: 'https://gravatar.com/avatar/c663c26824159f2c33d812557ada7e3a?s=400&d=robohash&r=x'
// };
const isLoading = false;

const BUTTONS = [
    { label: 'Home', href: '/', icon: <TbKeyboard /> },
    { label: 'Leaderboards', href: '/leaderboards', icon: <LuCrown /> },
    { label: 'About', href: '/about', icon: <RiInformation2Line /> },
    { label: 'Settings', href: '/settings', icon: <IoSettingsOutline /> },
    { label: 'Theme', href: '/theme', icon: <IoColorPaletteOutline /> },
    { label: 'Font', href: '/font', icon: <MdOutlineFontDownload /> },
];

const testId: string = 'testId';

export function Header() {
    const [user, setUser] = useState<UserType | null>(userData);
    const [isUserTyping, setIsUserTyping] = useState(false);

    return (
        <main className='relative z-10 w-full select-none'>
            <div className='flex items-center justify-between gap-3'>
                <div className="flex items-center gap-3">
                    <div className={twJoin(
                        'flex cursor-pointer items-center gap-2 transition-transform active:translate-y-0.5',
                    )}>
                        <LogoIcon
                            variant='main'
                            className={twJoin(
                                'animate-fade-in pt-2',
                                isUserTyping ? 'text-sub' : 'text-main'
                            )}
                        />
                        <div className="flex flex-col">
                            <Text className='relative text-[32px] leading-none'>
                                <Text
                                    className='absolute -top-1 left-1 text-[10px] leading-none font-lexend-deca'
                                    dimmed={true}
                                >
                                    monkey see
                                </Text>
                                <span className={`font-semibold font-lexend-deca ${isUserTyping ? 'text-theme-sub' : 'text-theme-text'}`}>
                                    monkeytype
                                </span>
                            </Text>
                        </div>
                    </div>

                    {/* Navigation and User Section */}
                    <div className="flex items-center gap-3 pt-1">
                        {BUTTONS.map(({ label, href, icon }) => (
                            <Tooltip key={label} label={label}>
                                <Button
                                    asChild
                                    className='px-2 text-xl'
                                    variant='text'
                                >
                                    <Link href={href}>{icon}</Link>
                                </Button>
                            </Tooltip>
                        ))}
                    </div>
                </div>

                <div className="flex items-center">
                    {user && (
                        <Button
                            asChild
                            className='px-2 text-sm'
                            variant='text'
                        >
                            <Link href='/account'>
                                <Avatar
                                    className='border-0 bg-sub-alt'
                                    expandable={false}
                                    imageProps={{
                                        src: user.avatarURL,
                                        height: 20,
                                        width: 20,
                                        alt: user.name
                                    }}
                                />
                                <span>{user.name}</span>
                            </Link>
                        </Button>
                    )}
                    <Tooltip label={`Sign ${user ? 'out' : 'in'}`}>
                        {user ? (
                            isLoading ? (
                                <div className='p-2 text-xl'>
                                    <RiLoaderLine className='animate-spin text-main' />
                                </div>
                            ) : (
                                <Button
                                    className='text-xl'
                                    variant='text'
                                >
                                    <BiLogOutCircle />
                                </Button>
                            )
                        ) : (
                            <Button
                                asChild
                                className='text-xl'
                                variant='text'
                            >
                                <Link href='/login'>
                                    <BiLogInCircle />
                                </Link>
                            </Button>
                        )}
                    </Tooltip>
                </div>
            </div>
        </main>
    );
};