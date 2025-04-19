'use client';

import React from 'react';
import { useFont } from '@/context/FontContext';

export function FontLayout({ children }: { children: React.ReactNode }) {
  const { currentFont } = useFont();
  return <div className='font-wrapper' style={{ fontFamily: currentFont }}>{children}</div>;
} 
