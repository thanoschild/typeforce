'use client';

import { useFont } from '@/context/FontContext';
import { TypingTestProvider } from '@/context/TypingTestContext';
import { Words } from '@/components/typing/Words';
import { languages } from '@/static/languages/languages';

export default function Home() {
  const { currentFont } = useFont();

  return (
    <TypingTestProvider>
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl p-4">
          <Words />
        </div>
      </div>
    </TypingTestProvider>
  );
}