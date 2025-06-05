import React from "react";
import StatCard from "../core/StatCard";
import { User } from "@prisma/client";
import { FiActivity, FiTarget, FiBarChart2, FiClock } from "react-icons/fi";

interface AccountHeaderProps {
  user: User;
}

export default function UserStats({user}: AccountHeaderProps) {
   const formatTime = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, '0');
  const mins = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');

  return `${hrs}:${mins}:${secs}`;
};

  return (
    <div className="flex flex-col gap-4">
      <span className='text-theme-text font-semibold text-xl'>Typing Stats</span>
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <StatCard
        title="AVERAGE WPM"
        value={user.AvgWpm || "N/A"}
        icon={<FiActivity className="text-theme-sub text-4xl" />}
        className="bg-theme-sub-alt transition-colors"
      />
      <StatCard
        title="ACCURACY"
        value={user.AvgAccuracy || "N/A"}
        icon={<FiTarget className="text-theme-sub text-4xl" />}
        className="bg-theme-sub-alt transition-colors"
      />
      <StatCard
        title="TESTS COMPLETED"
        value={user.TestCount || "N/A"}
        icon={<FiBarChart2 className="text-theme-sub text-4xl" />}
        className="bg-theme-sub-alt transition-colors"
      />
      <StatCard
        title="TIME TYPING"
        value={formatTime(user.TotalTime || 0) || "N/A"}
        icon={<FiClock className="text-theme-sub text-4xl" />}
        className="bg-theme-sub-alt transition-colors"
      />
    </div>
     </div>
  );
}
