"use client";

import { Toast } from "@/components/core/Toast";
import { AnimatePresence } from "framer-motion";
import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiLoaderLine,
} from "react-icons/ri";
import { Header } from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export function MainLayout({ children }: { children: ReactNode }) {

  const isUserTyping: boolean = false;
  const pageWidth = "1920px"; 

  return (
    <main
      className="grid min-h-dvh w-dvw grid-rows-[auto_1fr_auto] gap-5 px-40 py-8"
      style={{ maxWidth: pageWidth }}
    >
      <Header />
      <div className="">{children}</div>
      <Footer />
      <Toaster
        containerClassName="!inset-6"
        position="top-right"
        gutter={12}
        toastOptions={{
          error: { duration: 8000, icon: <RiErrorWarningFill /> },
          success: { duration: 4000, icon: <RiCheckboxCircleFill /> },
          loading: { icon: <RiLoaderLine className="animate-spin" /> },
        }}
      >
        {(t) => <Toast t={t} />}
      </Toaster>
    </main>
  );
}
