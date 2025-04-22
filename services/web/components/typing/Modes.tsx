'use client';

import { Dispatch, JSX, ReactNode, SetStateAction } from "react";
import { useTypingTest } from "@/context/TypingContext";
import { cn } from "@/utils/setting";
import { motion } from "framer-motion";
import { modes, timeOptions, wordOptions } from "@/constants";
import { TbClockHour4 } from "react-icons/tb";
import { MdOutlineFontDownload } from "react-icons/md";

export type ModesProps = {
    mode: string;
    setMode: Dispatch<SetStateAction<string>>;
    modeOption: number;
    setModeOption: Dispatch<SetStateAction<number>>;
};
  

export default function Modes() {
  const { mode, setMode, modeOption, setModeOption } = useTypingTest();

  const handleModeChange = (mode: string) => {
    if (mode === "time") {
      setMode(mode);
      setModeOption(timeOptions[0]!);
    } else if (mode === "words") {
      setMode(mode);
      setModeOption(wordOptions[0]!);
    }
  };

  return (
    <div className="m-8">
      <motion.div
        className="mx-auto w-fit flex items-center justify-center px-3 py-3 rounded-xl bg-theme-sub-alt"
        layout
      >
        {modes.map((m) => (
          <motion.button
            key={m}
            onClick={() => handleModeChange(m)}
            className={cn(
              "px-3 flex items-center transition-colors duration-200 text-sm hover:text-theme-text",
              mode === m
                ? "text-theme-main"
                : "text-theme-sub"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {m === "time" && <TbClockHour4 className="mr-2" />}
            {m === "words" && <MdOutlineFontDownload className="mr-2" />}
            {m}
          </motion.button>
        ))}
        <motion.div className="h-6 w-[4px] rounded-lg bg-theme-bg mx-2" layout />
        {mode === "time" &&
          timeOptions.map((t) => (
            <motion.button
              key={t}
              onClick={() => setModeOption(t)}
              className={cn(
                "px-3 min-w-[2rem] transition-colors duration-200 text-sm hover:text-theme-text",
                modeOption === t
                  ? "text-theme-main"
                  : "text-theme-sub"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t}
            </motion.button>
          ))}
        {mode === "words" &&
          wordOptions.map((w) => (
            <motion.button
              key={w}
              onClick={() => setModeOption(w)}
              className={cn(
                "px-3 min-w-[2rem] transition-colors duration-200 text-sm hover:text-theme-text",
                modeOption === w
                  ? "text-theme-main"
                  : "text-theme-sub"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {w}
            </motion.button>
          ))}
      </motion.div>
    </div>
  )
}