"use client";

import { useTheme } from "@/context/ThemeContext";
import { useFont } from "@/context/FontContext";
import { motion } from "framer-motion";
import { SiSpeedtest } from "react-icons/si";
import { TbTargetArrow } from "react-icons/tb";
import { TbClockHour4 } from "react-icons/tb";
import { GrPowerCycle } from "react-icons/gr";
import { Tooltip as UserToolTip } from "../core/Tooltip";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  Filler,
} from "chart.js";
import React from "react";
import StatCard from "../core/StatCard";
import { Button } from "../ui/button";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Filler
);

export type ResultProps = {
  wpm: number;
  accuracy: number;
  time: number; // total secs
  wpmData: { time: number; wpm: number }[]; // ← array you already collect
  onRestart: () => void;
  mode: string;
  modeOption: number;
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Result({
  wpm,
  accuracy,
  time,
  wpmData,
  onRestart,
  mode,
  modeOption,
}: ResultProps) {
  const { themeColors } = useTheme();
  const { currentFont } = useFont();
  const buckets = new Map<number, number[]>();

  wpmData.forEach(({ time, wpm /* already WPS */ }) => {
    const arr = buckets.get(time) ?? [];
    arr.push(wpm);
    buckets.set(time, arr);
  });

  const secs = [...buckets.keys()].sort((a, b) => a - b);

  const series = secs.map((sec) => {
    const vals = buckets.get(sec)!;
    const avg = vals.reduce((a, v) => a + v, 0) / vals.length;
    return +avg.toFixed(2);
  });

  const data = {
    labels: secs.map((s) => `${s}s`),
    datasets: [
      {
        type: "line" as const,
        label: " WPM",
        data: series,
        borderColor: themeColors.main,
        backgroundColor: "rgba(0, 0, 0, 0.1)", // Add transparency to the fill color
        borderWidth: 3,
        tension: 0.3,
        fill: true, // This enables the fill
        pointRadius: 2,
        order: 3,
      },
    ],
  } satisfies ChartData<"line">;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: "index" },
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Words per Minute",
          color: themeColors.sub,
          font: {
            size: 14,
            weight: "bold",
            family: currentFont,
          },
        },
        grid: {
          color: themeColors.subAlt,
          border: false,
        },
        ticks: {
          color: themeColors.sub,
        },
      },
      x: {
        title: {
          display: true,
          text: "Time (seconds)",
          color: themeColors.sub,
          font: {
            size: 14,
            weight: "bold",
            family: currentFont,
          },
        },
        ticks: {
          maxRotation: 0,
          color: themeColors.sub,
        },
        grid: {
          color: themeColors.subAlt,
          drawBorder: false,
        },
      },
    },
    plugins: {
      legend: { display: false },
    },
  } as const;

  console.log("wpmData", wpmData);

  return (
    <div className="space-y-10 px-12 py-8 flex flex-col items-center justify-center w-full">
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-24"
      >
        <StatCard
          icon={<SiSpeedtest className="text-theme-sub text-7xl" />}
          title="WPM"
          value={wpm}
        />
        <StatCard
          icon={<TbTargetArrow className="text-theme-sub text-7xl" />}
          title="Accuracy"
          value={`${accuracy.toFixed(2)}%`}
        />
        <StatCard
          icon={<TbClockHour4 className="text-theme-sub text-7xl" />}
          title="Time"
          value={`${time}s`}
        />
      </motion.div>

      <div className="relative h-[250px] w-full">
        <Line
          data={data}
          options={options}
          className="!w-full"
        />
      </div>

      <UserToolTip label="Restart Test">
        <Button
          onClick={onRestart}
          className="rounded hover:text-theme-main transition-colors px-4 py-2 [&>svg]:!size-8"
          variant="link"
        >
          <GrPowerCycle className="w-10 h-10 text-theme-sub hover:text-theme-main stroke-[2]" />
        </Button>
      </UserToolTip>
    </div>
  );
}
