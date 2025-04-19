'use client';

import { useFont } from '@/context/FontContext';
import { fonts } from '@/context/FontContext';

export function FontSelector() {
  const { currentFont, setFont } = useFont();

  return (
    <select
      value={currentFont}
      onChange={(e) => setFont(e.target.value as typeof fonts[number])}
      className="p-2 border rounded"
    >
      {fonts.map((font) => (
        <option key={font} value={font}>
          {font}
        </option>
      ))}
    </select>
  );
} 