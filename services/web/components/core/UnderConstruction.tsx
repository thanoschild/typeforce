"use client";

import React from "react";
import Link from "next/link";
import { APP_NAME } from "@/constants";
import { RiToolsFill, RiArrowLeftLine } from "react-icons/ri";
import { motion } from "framer-motion";

export default function UnderConstructionPage() {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 bg-theme-bg">
      <motion.div
        className="max-w-6xl w-full text-center space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 rounded-lg">
          <div className="flex items-center justify-center gap-3 mb-6">
            <RiToolsFill className="text-4xl text-theme-main" />
            <h1 className="text-3xl font-bold text-theme-text">
              Under Construction
            </h1>
          </div>

          <p className="text-theme-text mb-6">
            We&apos;re working hard to bring you an amazing typing experience. This
            page is currently under development and will be available soon.
          </p>

          <div className="flex flex-col items-center gap-2">
            <p className="text-theme-sub">
              In the meantime, you can return to the homepage and explore other
              features.
            </p>

            <Link href="/" className="mt-4">
              <button className="px-4 py-2 rounded-md bg-theme-main text-theme-bg hover:bg-theme-text transition-all duration-200 ease-in-out active:scale-95 flex items-center gap-2">
                <RiArrowLeftLine />
                <span>Go Home</span>
              </button>
            </Link>
          </div>
        </div>

        <div className="text-theme-sub text-sm">
          © {new Date().getFullYear()} {APP_NAME} - All rights reserved
        </div>
      </motion.div>
    </div>
  );
}
