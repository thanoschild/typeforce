import type { Metadata } from "next";
import type { ReactNode } from 'react';
import { Inter } from 'next/font/google';
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from '@/context/ThemeContext';
import { FontProvider } from '../context/FontContext';
import { TypingTestProvider } from '@/context/TypingTestContext';
import { FontLayout } from '@/components/layout/FontLayout';
import { fonts } from '@/utils/fonts';
import '@/static/fonts/fonts.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Type Test",
  description: "Test your typing speed and accuracy",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html
      lang="en"
    >
      <body
        className={`flex justify-center bg-theme-bg font-default transition-colors ${inter.className}`}
      >
        <TypingTestProvider>
          <ThemeProvider>
            <FontProvider>
              <FontLayout>
                <MainLayout>{props.children}</MainLayout>
              </FontLayout>
            </FontProvider>
          </ThemeProvider>
        </TypingTestProvider>
      </body>
    </html>
  );
}
