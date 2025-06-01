"use client";

import { LeaderboardDataType } from "@/types/leaderboard";
import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { LuCrown } from "react-icons/lu";
import { motion } from "framer-motion";
import LeaderboardTable from "./LeaderboardTable";

export default function LeaderboardPage() {
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
    // Initial fetch when dependencies change
    fetchLeaderboard();
  }, [isAllTime, selectedMode, fetchLeaderboard]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  // Separate useEffect for periodic fetch
  useEffect(() => {
    const fetchInterval = setInterval(fetchLeaderboard, 30000); // 5 minutes
    return () => clearInterval(fetchInterval);
  }, [fetchLeaderboard]);

  const filteredData = leaderboardData.filter((entry) =>
    entry?.username?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="">
      <div className="mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Sidebar
              isAllTime={isAllTime}
              setIsAllTime={setIsAllTime}
              selectedMode={selectedMode}
              setSelectedMode={setSelectedMode}
            />
          </div>
          <div className="md:col-span-3">
            <div className="flex items-center gap-2 mb-2">
              <LuCrown className="w-6 h-6 text-theme-text" />
              <h1 className="text-2xl font-bold text-theme-text">
                Leaderboard
              </h1>
            </div>
            <motion.div
              className="h-[4px] w-full rounded-lg bg-theme-sub-alt my-2"
              layout
            />
            {/* <LeaderboardHeader category={category} time={time} /> */}
            <LeaderboardTable
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              leaderboardData={filteredData}
              countdown={countdown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
