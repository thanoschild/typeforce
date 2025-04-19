'use client';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

interface AvatarProps {
  imageProps: {
    src: string;
    height: number;
    width: number;
    alt?: string;
  };
  className?: string;
  expandable?: boolean;
}

export function Avatar({ imageProps, className, expandable = true }: AvatarProps) {
  return (
    <div
      className={twMerge(
        'flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-sub transition-all',
        expandable && 'hover:scale-110',
        className
      )}
    >
      <Image
        {...imageProps}
        alt={imageProps.alt || 'User avatar'}
        className="h-full w-full object-cover"
      />
    </div>
  );
} 