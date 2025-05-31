"use client";

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export function MainLayout({ children }: { children: ReactNode }) {

  const isUserTyping: boolean = false;
  const pageWidth = "1920px"; 

  return (
    <main className="flex flex-col min-h-screen px-4 sm:px-8 md:px-16 lg:px-20">
      <Header />
      <div className="flex flex-1 flex-col lg:px-24 lg:py-8">{children}</div>
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}
