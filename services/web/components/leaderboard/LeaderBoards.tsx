"use client";

import { LeaderboardDataType } from "@/types/leaderboard";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Button from "../core/Button";
import {
  Activity,
  ArrowRight,
  Badge,
  CrownIcon,
  Hourglass,
  Link,
  LoaderPinwheel,
  Medal,
} from "lucide-react";
import Dropdown from "../core/Dropdown";
import { modes } from "@/constants";

type Props = {};

export default function LeaderBoards({}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAllTime, setIsAllTime] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMode, setSelectedMode] = useState("all");
  const [error, setError] = useState<null | string>(null);
  const [countdown, setCountdown] = useState(30);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardDataType[]>(
    []
  );

  const fetchLeaderboard = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      setCountdown(30);
      const timeFrame = isAllTime ? "alltime" : "daily";
      const response = await fetch(
        `/api/leaderboard?mode=${selectedMode}&timeFrame=${timeFrame}&limit=10`,
        {
          headers: {
            "Cache-Control": "no-store",
          },
        }
      );
      const data = await response.json();
      if (Array.isArray(data.leaderboard)) {
        setLeaderboardData(data.leaderboard);
      } else {
        setLeaderboardData([]);
      }
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setError("Failed to fetch leaderboard");
      setLeaderboardData([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAllTime, selectedMode]);

  useEffect(() => {
    fetchLeaderboard();

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    const fetchInterval = setInterval(() => {
      fetchLeaderboard();
    }, 30000);

    return () => {
      clearInterval(countdownInterval);
      clearInterval(fetchInterval);
    };
  }, [isAllTime, selectedMode, fetchLeaderboard]);

  const filteredData = leaderboardData.filter((entry) =>
    entry?.username?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-5xl mx-auto space-y-8 pb-8 px-4 sm:px-6 lg:px-8 mt-7"
    >
      <motion.div variants={itemVariants}>
        <div className="bg-neutral-900/50 border-neutral-800 shadow-lg">
          <div className="pb-2">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
              <div className="text-xl sm:text-2xl flex items-center space-x-3 text-neutral-200">
                <CrownIcon className="size-6 sm:size-8 text-yellow-400" />
                <span>Leaderboard</span>
                {/* <Badge variant="secondary" className="text-xs sm:text-sm">
                  Updates in {countdown}s
                </Badge> */}
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <div className="w-full flex items-center space-x-1 bg-neutral-800 rounded-md p-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full text-xs sm:text-sm ${
                      isAllTime
                        ? "bg-neutral-700 text-neutral-200"
                        : "text-neutral-400"
                    }`}
                    onClick={() => setIsAllTime(true)}
                  >
                    <Activity className="size-3 sm:size-4 mr-1" />
                    All-Time
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`w-full text-xs sm:text-sm ${
                      !isAllTime
                        ? "bg-neutral-700 text-neutral-200"
                        : "text-neutral-400"
                    }`}
                    onClick={() => setIsAllTime(false)}
                  >
                    <Hourglass className="size-3 sm:size-4 mr-1" />
                    Daily
                  </Button>
                </div>
                <Dropdown
                  options={modes}
                  selected={selectedMode}
                  onSelect={setSelectedMode}
                />
              </div>
            </div>
          </div>
          <div>
            <div className="mb-4">
              {/* <Input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-neutral-800 border-neutral-700 text-gray-100 w-full"
              /> */}
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <LoaderPinwheel className="animate-spin mx-auto size-10 text-yellow-400" />
              ) : error ? (
                <div className="text-red-400 text-center py-8">{error}</div>
              ) : (
                <div className="h-[300px] overflow-y-auto pr-4">
                  <table className="w-full text-left border-collapse">
                    <thead className="sticky top-0 bg-neutral-900">
                      <tr className="border-b border-neutral-700">
                        <th className="text-gray-300 py-2 px-3">Rank</th>
                        <th className="text-gray-300 py-2 px-3">Name</th>
                        <th className="text-gray-300 py-2 px-3">WPM</th>
                        <th className="text-gray-300 py-2 px-3 hidden sm:table-cell">
                          Accuracy
                        </th>
                        <th className="text-gray-300 py-2 px-3 hidden md:table-cell">
                          Time
                        </th>
                        <th className="text-gray-300 py-2 px-3 hidden lg:table-cell">
                          Mode
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((entry) => (
                        <tr
                          key={entry.rank}
                          className="hover:bg-neutral-800/50 border-b border-neutral-800"
                        >
                          <td className="text-gray-100 font-medium py-2 px-3">
                            {entry.rank <= 3 ? (
                              <Medal
                                className={`h-5 w-5 ${getMedalColor(
                                  entry.rank
                                )}`}
                              />
                            ) : (
                              entry.rank
                            )}
                          </td>
                          <td className="text-gray-100 py-2 px-3">
                            {entry.username}
                          </td>
                          <td className="text-sky-400 py-2 px-3">
                            {entry.wpm}
                          </td>
                          <td className="text-emerald-400 py-2 px-3 hidden sm:table-cell">
                            {entry.accuracy}%
                          </td>
                          <td className="text-violet-400 py-2 px-3 hidden md:table-cell">
                            {entry.time}s
                          </td>
                          <td className="text-gray-300 py-2 px-3 hidden lg:table-cell">
                            {entry.mode}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="flex justify-center">
        <Button size="md" className="w-full sm:w-auto">
          <Link href="/type">
            Start New Race
            <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
}

const getMedalColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "text-yellow-400";
    case 2:
      return "text-gray-400";
    case 3:
      return "text-amber-600";
    default:
      return "text-gray-400";
  }
};
