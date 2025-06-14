'use client'

import React, { useEffect } from "react";
import { LeaderboardDataType } from "@/types/leaderboard";
import { LuCrown } from "react-icons/lu";
import Input from "../core/Input";

interface LeaderboardTableProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  leaderboardData: LeaderboardDataType[];
  countdown: number;
}

export default function LeaderboardTable({
  searchTerm,
  setSearchTerm,
  leaderboardData,
  countdown,
}: LeaderboardTableProps) {
  useEffect(() => {
    if (countdown === 30) {
      setSearchTerm('');
    }
  }, [countdown, setSearchTerm]);

  return (
    <div className="rounded-lg overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="text-theme-sub">
          Next Refresh in: <span className="font-medium">{countdown}</span>
        </div>
        <Input
          key={""}
          type="text"
          placeholder="Search username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-theme-sub-alt text-theme-text placeholder:text-theme-sub w-96 px-3 py-2 rounded-md focus:border-theme-text"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-theme-sub">
              <th className="py-3 px-4">Rank</th>
              <th className="py-3 px-4">name</th>
              <th className="py-3 px-4 text-right">wpm</th>
              <th className="py-3 px-4 text-right">accuracy</th>
              <th className="py-3 px-4 text-right">Time</th>
              <th className="py-3 px-4 text-right">Mode</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.length > 0 ? (
              leaderboardData.map((user) => (
                <tr
                  key={user.rank}
                  className={`rounded-lg text-theme-text ${
                    user.rank % 2 === 1 ? "bg-theme-sub-alt" : ""
                  }`}
                >
                  <td className="py-4 px-4 relative first:rounded-l-lg">
                    {user.rank <= 3 && (
                      <span
                        className={`absolute left-4 ${getMedalColor(
                          user.rank
                        )}`}
                      >
                        <LuCrown className="text-lg" />
                      </span>
                    )}
                    <span className={user.rank <= 3 ? "pl-6" : ""}>
                      {user.rank}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span>{user.username}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-right">
                    {user.wpm.toFixed(2)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    {user.accuracy.toFixed(2)}%
                  </td>
                  <td className="py-4 px-4 text-right">{user.time}s</td>
                  <td className="py-4 px-4 text-right whitespace-nowrap last:rounded-r-lg">
                    {user.mode}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-8 text-theme-sub bg-theme-sub-alt first:rounded-l-lg last:rounded-r-lg">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const getMedalColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "text-amber-500";
    case 2:
      return "text-gray-500";
    case 3:
      return "text-yellow-400";
    default:
      return "text-gray-400";
  }
};
