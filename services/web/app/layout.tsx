import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainLayout } from "@/components/layout/MainLayout";
import { ThemeProvider } from "@/context/ThemeContext";
import { FontProvider } from "../context/FontContext";
import { TypingProvider } from "@/context/TypingContext";
import AuthProvider from "@/components/providers/AuthProvider";

import { FontLayout } from "@/components/layout/FontLayout";
import "@/public/fonts/fonts.css";
import { WebSocketProvider } from "@/context/WebSocketContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "typeforce",
  description: "Test your typing speed and accuracy",
};

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preload selected theme variables synchronously */}
        <script
           dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('preferred-theme') || 'carbon';
                  const xhr = new XMLHttpRequest();
                  xhr.open('GET', 'themes/' + theme + '.json', false); // Sync request
                  xhr.send(null);
                  if (xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    const root = document.documentElement;
                    for (const key in data) {
                      if (data.hasOwnProperty(key)) {
                        root.style.setProperty(key, data[key]);
                      }
                    }
                  }
                } catch (e) {
                  console.error('Theme preload error:', e);
                }
              })();
            `,
          }}
        />
        {/* Fallback theme for no-JS browsers */}
        <noscript>
          <style>{`
            :root {
              --bg-color: #313131;
              --main-color: #f66e0d;
              --caret-color: #f66e0d;
              --sub-color: #616161;
              --sub-alt-color: #2b2b2b;
              --text-color: #f5e6c8;
              --error-color: #e72d2d;
              --error-extra-color: #7e2a33;
              --colorful-error-color: #e72d2d;
              --colorful-error-extra-color: #7e2a33;
            }
          `}</style>
        </noscript>
      </head>
      <body
        className={`bg-theme-bg font-default transition-colors ${inter.className}`}
      >
        <AuthProvider>
          <TypingProvider>
            <WebSocketProvider>
              <ThemeProvider>
                <FontProvider>
                  <FontLayout>
                    <MainLayout>{props.children}</MainLayout>
                  </FontLayout>
                </FontProvider>
              </ThemeProvider>
            </WebSocketProvider>
          </TypingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
