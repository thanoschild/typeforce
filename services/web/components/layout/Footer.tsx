"use client";

import React from "react";
import { RiGithubFill } from "react-icons/ri";
import { useFont } from "@/context/FontContext";
import { useTheme } from "@/context/ThemeContext";
import { MdOutlinePalette, MdOutlineFontDownload } from "react-icons/md";
import Link from "next/link";
import { getThemeNameById } from "@/lib/theme";

export default function Footer() {
  const { currentTheme } = useTheme();
  const { currentFont } = useFont();

  return (
    <footer className="w-full py-4 flex flex-col items-center justify-between gap-1 text-xs">
        <div className="flex space-x-2">
          <p className="bg-theme-sub text-theme-bg px-2 rounded-sm">tab</p>
          <p className="text-theme-sub"> - restart test</p>
        </div>
      <div className="w-full flex items-center justify-between">
        <div className="gap-6 text-theme-sub hover:text-theme-text">
          <Link
            className="inline-flex items-center gap-2"
            href="https://github.com/thanoschild"
            target="_blank"
            rel="noopener noreferrer"
          >
            <RiGithubFill />
            <span>thanoschild</span>
          </Link>
        </div>
        <div className="flex items-center gap-6 text-theme-sub">
          <Link
            href="/settings"
            className="flex items-center gap-1 p-0 hover:text-theme-text"
          >
            <MdOutlineFontDownload />
            <p>{currentFont}</p>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-1 p-0 hover:text-theme-text"
          >
            <MdOutlinePalette />
            <p>{getThemeNameById(currentTheme)}</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
