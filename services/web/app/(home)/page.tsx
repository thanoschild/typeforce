"use client";

import { useFont } from "@/context/FontContext";
import { TypingTestProvider } from "@/context/TypingTestContext";
import Interface from "@/components/typing/Interface";

export default function Home() {
  const { currentFont } = useFont();

  return (
    <TypingTestProvider>
      <main className="">
        <Interface />
      </main>
    </TypingTestProvider>
  );
}
