'use client'

import { useEffect, useState } from 'react';

import { ThemeColors, getThemeColors, defaultThemeColors } from '@/lib/theme'
export default function ThemePreview({ id }: { id: string }) {
  const [themeColors, setThemeColors] = useState<ThemeColors>(defaultThemeColors);

  useEffect(() => {
    const loadThemeColors = async () => {
      try {
        const colors = await getThemeColors(id);
        setThemeColors(colors);
      } catch (error) {
        console.error('Failed to load theme colors:', error);
      }
    };
    
    loadThemeColors();
  }, [id]);

  return (
    <div className="aspect-video rounded-md overflow-hidden p-2">
      <div 
        className="w-full h-full rounded flex flex-col gap-2 p-2"
        style={{ backgroundColor: themeColors.bg }}
      >
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColors.main }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColors.sub }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColors.text }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColors.error }} />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div 
            className="h-2 w-full rounded-full" 
            style={{ backgroundColor: `${themeColors.text}33` }} 
          />
          <div 
            className="h-2 w-2/3 rounded-full" 
            style={{ backgroundColor: `${themeColors.text}33` }} 
          />
        </div>
      </div>
    </div>
  );
}