import React from "react";
import  Button  from "@/components/core/Button";
import { motion } from "framer-motion";
import { modes } from "@/constants";
import { IoEarthOutline } from "react-icons/io5";
import { FaRegHourglass } from "react-icons/fa6";
import { LuLayoutGrid } from "react-icons/lu";
import { TbClockHour4 } from "react-icons/tb";
import { MdOutlineFontDownload } from "react-icons/md";

interface SidebarProps {
  isAllTime: boolean;
  setIsAllTime: (isAllTime: boolean) => void;
  selectedMode: string;
  setSelectedMode: (mode: string) => void;
}

export default function Sidebar({
  isAllTime,
  setIsAllTime,
  selectedMode,
  setSelectedMode,
}: SidebarProps) {
  return (
    <div className="bg-theme-sub-alt p-4 rounded-lg">
      <div className="space-y-4">
        <Button
          icon={<IoEarthOutline />}
          isSelected={isAllTime}
          onClick={() => setIsAllTime(true)}
          variant="primary"
        >
          All Time
        </Button>

         <Button
          icon={<FaRegHourglass />}
          isSelected={!isAllTime}
          onClick={() => setIsAllTime(false)}
          variant="primary"
        >
          Daily
        </Button>

        <motion.div
          className="h-[4px] w-full rounded-lg bg-theme-bg my-2"
          layout
        />

        <Button
          icon={<LuLayoutGrid />}
          isSelected={selectedMode === "all"}
          onClick={() => setSelectedMode("all")}
          variant="primary"
        >
          All Modes
        </Button>


        {modes.map((mode) => (
          <Button
            key={mode}
            icon={mode == "time" ? <TbClockHour4 /> : <MdOutlineFontDownload/>}
            isSelected={selectedMode === mode}
            onClick={() => setSelectedMode(mode)}
            variant="primary"
          >
            {mode}
          </Button>
        ))}
      </div>
    </div>
  );
}
