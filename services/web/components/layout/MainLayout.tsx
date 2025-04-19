'use client';

import { Toast } from '@/components/core/Toast';
// import { useGlobal } from '@/context/globalContext';
// import { useSettings } from '@/context/settingsContext';
import { AnimatePresence } from 'framer-motion';
import type { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { RiCheckboxCircleFill, RiErrorWarningFill, RiLoaderLine } from 'react-icons/ri';
// import { Footer } from './Footer';
import { Header } from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export function MainLayout({ children }: { children: ReactNode }) {
//   const { isUserTyping } = useGlobal();
//   const { pageWidth } = useSettings();

const isUserTyping: boolean = false;
const pageWidth = '1920px'; // Default max width

  return (
      <main
        className='grid min-h-dvh w-dvw grid-rows-[auto_1fr_auto] gap-5 p-8'
        style={{ maxWidth: pageWidth }}
      >
        <Header />
        <div className="flex items-center justify-center">{children}</div>
        {/* <AnimatePresence>{!isUserTyping && <Footer />}</AnimatePresence> */}
        <Footer/>
        <Toaster
          containerClassName='!inset-6'
          position='top-right'
          gutter={12}
          toastOptions={{
            error: { duration: 8000, icon: <RiErrorWarningFill /> },
            success: { duration: 4000, icon: <RiCheckboxCircleFill /> },
            loading: { icon: <RiLoaderLine className='animate-spin' /> },
          }}
        >
          {(t) => <Toast t={t} />}
        </Toaster>
      </main>
  );
}
