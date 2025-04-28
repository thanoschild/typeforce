"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RiGithubFill } from "react-icons/ri";
import { useFont } from "@/context/FontContext";
import { useTheme } from "@/context/ThemeContext";
import { MdOutlinePalette, MdOutlineFontDownload } from "react-icons/md";
import Link from "next/link";

export default function Footer() {
  const { currentTheme } = useTheme();
  const { currentFont } = useFont();

  return (
    <footer className="w-full py-4 flex items-center justify-between gap-3">
      <div className="gap-6">
        <Link
          className="inline-flex items-center gap-2 text-sm"
          href="https://github.com/thanoschild"
          target="_blank"
          rel="noopener noreferrer"
        >
          <RiGithubFill />
          <span>thanoschild</span>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Button className="p-0 text-sm" variant="link">
          <MdOutlineFontDownload />
          <p>{currentFont}</p>
        </Button>
        <Button className="p-0 text-sm" variant="link">
          <MdOutlinePalette />
          <p>{currentTheme}</p>
        </Button>
        {/* <Version /> */}
      </div>
    </footer>
  );
}
