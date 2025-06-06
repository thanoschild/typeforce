'use client';

import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { LogoIcon } from '@/components/core/LogoIcon';
import { Text } from '@/components/core/Text';
import Link from 'next/link';
import { APP_NAME } from '@/constants';
import { RiArrowLeftLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

export default function NotFound() {
  const { themeColors } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 bg-theme-bg">
      <motion.div 
        className="max-w-4xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 rounded-lg">
          <motion.h1 
            className="text-8xl font-bold text-theme-main mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>
          
          <h2 className="font-bold text-theme-text mb-6">
            Looks like you found a page that doesn't exist.
          </h2>
          
          <div className="flex flex-col items-center gap-2">        
            <Link href="/" className="mt-4">
              <button className="px-4 py-2 rounded-md bg-theme-main text-theme-bg hover:bg-theme-text transition-all duration-200 ease-in-out active:scale-95 flex items-center gap-2">
                <RiArrowLeftLine />
                <span>Go Home</span>
              </button>
            </Link>
          </div>
        </div>
        <div className="text-theme-sub text-sm">
          © {new Date().getFullYear()} {APP_NAME} - All rights reserved
        </div>
      </motion.div>
    </div>
  );
}