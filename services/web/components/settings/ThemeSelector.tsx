"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTheme } from "@/context/ThemeContext";
import { availableThemes, defaultTheme } from "@/lib/theme";
import { IoClose } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import ThemePreview from "./ThemePreview";
import { MdOutlinePalette } from "react-icons/md";

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, setTheme } = useTheme();

  const handleThemeChange = async (themeId: string) => {
    await setTheme(themeId);
  };

  const handleClose = () => setIsOpen(false);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex flex-col gap-2 rounded-lg border-theme-sub-alt">
        <div className="flex items-center space-x-2 text-theme-sub">
          <MdOutlinePalette className="text-lg" />
          <h3 className="text-lg font-medium text-theme-sub">Theme Settings</h3>
        </div>
        <p className="text-theme-text">
          Customize your typing experience with different color themes
        </p>
        <div className="flex items-center justify-between">
          <div className="text-lg text-theme-main font-extrabold capitalize">
            {availableThemes[currentTheme]?.name || defaultTheme}
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-theme-main text-sm text-theme-bg font-medium capitalize hover:bg-theme-text transition-colors"
          >
            <span>Change Theme</span>
          </button>
        </div>
      </div>

      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-theme-bg/80 backdrop-blur-sm"
            onClick={handleOutsideClick}
          >
            <div className="w-[90%] h-[90vh] md:w-[600px] md:h-[500px] lg:w-[800px] lg:h-[600px] rounded-xl bg-theme-sub-alt shadow-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b-2 border-theme-sub/20">
                <h2 className="text-2xl font-medium text-theme-text">Select Theme</h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-theme-sub/20 transition-colors"
                  aria-label="Close modal"
                >
                  <IoClose className="text-xl text-theme-text" />
                </button>
              </div>

              <div className="p-6 h-[calc(100%-4rem)] overflow-y-auto">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {Object.entries(availableThemes).map(([id, theme]) => (
                    <button
                      key={id}
                      onClick={() => handleThemeChange(id)}
                      className={twMerge(
                        "p-3 rounded-lg transition-all hover:scale-105",
                        "border border-transparent hover:border-theme-main",
                        currentTheme === id && "border-theme-main"
                      )}
                    >
                      <div className="w-full max-w-[180px] mx-auto">
                        {" "}
                        {/* Added size constraint */}
                        <ThemePreview id={id} />
                        <p className="mt-1.5 text-sm text-theme-text font-medium capitalize">
                          {theme.name}
                        </p>
                        <p className="text-xs text-theme-sub capitalize">
                          {theme.type}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
