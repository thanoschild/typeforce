"use client";

import React from "react";
import { Test } from "@prisma/client";
import { getTestCountByDate } from "@/lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useTheme } from "@/context/ThemeContext";
import { useFont } from "@/context/FontContext";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type UserPerformanceProps = {
  data: Test[];
};

export default function UserPerformance({ data }: UserPerformanceProps) {
  const { themeColors } = useTheme();
  const { currentFont } = useFont();
  const testCount = getTestCountByDate(data);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const chartData = {
    labels: testCount.map((item) => formatDate(item.date)),
    datasets: [
      {
        type: "line" as const,
        label: "Tests Completed",
        data: testCount.map((item) => item.testCount),
        borderColor: themeColors.main,
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 3,
        tension: 0.3,
        fill: true,
        pointRadius: 2,
        order: 3,
      },
    ],
  } satisfies ChartData<"line">;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    animation: false,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Tests Completed",
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
          stepSize: 1,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
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
      legend: {
        display: false,
      },
    },
  } as const;

  return (
    <div className="flex flex-col gap-4">
      <span className="text-theme-text font-semibold text-xl">Performance Graph</span>
      <div className="bg-theme-sub-alt p-6 rounded-lg">
        <div className="h-[300px]">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </div>
  );
}
