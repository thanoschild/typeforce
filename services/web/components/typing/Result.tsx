"use client";

import { useTheme } from '@/context/ThemeContext';
import { useFont } from '@/context/FontContext';
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
} from "chart.js";
import React from "react";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
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
        label: "WPM",
        data: series,
        borderColor: themeColors.main,
        backgroundColor: `${themeColors.main}20`,
        tension: 0.4,
        cubicInterpolationMode: "monotone", 
        fill: true,
        pointRadius: 2,
      },
    ],
  } satisfies ChartData<"line">;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Words per Minute',
          color: themeColors.sub, // Add color for better visibility
          font: {
            size: 14,
            weight: 'bold',
            family: currentFont // Use the current font from context
          }
        },
        grid: { 
          color: themeColors.subAlt,
          drawBorder: false
        },
        ticks: {
          color: themeColors.sub // Add color for tick labels
        }
      },
      x: {
        title: {
          display: true,
          text: 'Time (seconds)',
          color: themeColors.sub,
          font: {
            size: 14,
            weight: 'bold',
            family: currentFont
          }
        },
        ticks: { 
          maxRotation: 0,
          color: themeColors.sub
        },
        grid: { 
          color: themeColors.subAlt,
          drawBorder: false
        }
      },
    },
    plugins: {
      legend: { display: false },
    },
} as const;
  
  console.log("wpmData", wpmData);

  return (
    <div className="space-y-6 px-12 py-6">
      {/* <h2 className="text-2xl font-bold">Result</h2> */}

      <div className="grid grid-cols-2 gap-4 text-xl font-bold text-theme-main">
        <div>
          <span className="text-theme-sub">Mode: </span>
          {mode} ({modeOption})
        </div>
        <div>
          <span className="text-theme-sub">Time:</span> {time}s
        </div>
        <div>
          <span className="text-theme-sub">WPM:</span> {wpm}
        </div>
        <div>
          <span className="text-theme-sub">Accuracy:</span> {accuracy.toFixed(2)}%
        </div>
      </div>

      <div className="w-full h-[250px]">
        <Line data={data} options={options} />
      </div>

      <button
        onClick={onRestart}
        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Restart
      </button>
    </div>
  );
}
