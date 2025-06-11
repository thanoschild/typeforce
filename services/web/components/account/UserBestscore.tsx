import React, { useState } from "react";
import { User } from "@prisma/client";
import Button from "../core/Button";
import { getModeOptions, Mode } from "@/types/mode";
import { modes } from "@/constants";

interface UserBestscoreProps {
  user: User;
}

type BestTest = {
  wpm: number;
  accuracy: number;
  time: number;
  score: number;
};

export default function UserBestscore({ user }: UserBestscoreProps) {
  const [selectedMode, setSelectedMode] = useState<Mode>("words");
  const bestTest = user.bestTest as {
    words: Record<string, BestTest>;
    time: Record<string, BestTest>;
  };

  const renderScoreCard = (option: number, stats?: BestTest) => (
    <div key={option} className="bg-theme-bg rounded-lg p-4">
      <div className="text-theme-sub mb-2">
        {option} {selectedMode === "words" ? "words" : "seconds"}
      </div>

      <div className="space-y-1">
        <div className="text-2xl font-bold text-theme-main">
          {stats?.wpm.toFixed(2) || 0} WPM
        </div>
        <div className="text-theme-sub">
          Accuracy: {stats?.accuracy.toFixed(2) || 0}%
        </div>
        <div className="text-theme-sub">Time: {stats?.time || 0}s</div>
        <div className="text-theme-sub">
          Score: {stats?.score.toFixed(2) || 0}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <span className="text-theme-text font-semibold text-3xl">
        All Time Best Scores
      </span>

      <div className="bg-theme-sub-alt rounded-lg p-1">
        <div className="flex pt-4 pb-2 px-4 gap-4">
          {modes.map((mode) => (
            <Button
              key={mode}
              onClick={() => setSelectedMode(mode)}
              isSelected={selectedMode === mode}
              className={`max-w-[120px] ${
                selectedMode === mode ? "bg-theme-main text-theme-bg" : "bg-theme-bg text-theme-text"
              }`}
            >
              {mode}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 pb-4 px-4">
          {getModeOptions(selectedMode).map((option) =>
            renderScoreCard(
              option,
              bestTest?.[selectedMode as keyof typeof bestTest]?.[option]
            )
          )}
        </div>
      </div>
    </div>
  );
}
