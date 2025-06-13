'use client';

import React from 'react';
import { useFont } from '@/context/FontContext';

export function FontLayout({ children }: { children: React.ReactNode }) {
  const { currentFont, availableFonts } = useFont();
  
  return (
    <div 
      className='font-wrapper' 
      style={{ 
        fontFamily: `"${availableFonts[currentFont]}", monospace`
      }}
    >
      {children}
    </div>
  );
}