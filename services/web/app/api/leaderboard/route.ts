import redis from "@/lib/redis";
import { LeaderboardDataType } from "@/types/leaderboard";
import { NextRequest, NextResponse } from "next/server";
import { APP_NAME } from "@/constants";
import { modes } from "@/constants";

async function getCombinedLeaderboard(
  timeFrame: string,
  limit: number
): Promise<LeaderboardDataType[]> {
  const leaderboardKey = `${APP_NAME}:leaderboard:${timeFrame}`;
  const userScores = new Map<string, { score: number; data: LeaderboardDataType }>();

  for (const mode of modes) {
    const modeKey = `${leaderboardKey}:${mode}`;
    const userIds = await redis.zrevrange(modeKey, 0, -1);
    if (!userIds.length) continue;

    const keys = userIds.map((userId) => `${modeKey}:${userId}`);
    const testDataList = await redis.mget(keys);

    for (let i = 0; i < testDataList.length; i++) {
      const data = testDataList[i];
      if (!data) continue;

      const parsed = JSON.parse(data);
      const score = Math.round(parsed.wpm * (parsed.accuracy / 100));
      const existing = userScores.get(parsed.userId);

      if (!existing || score > existing.score) {
        userScores.set(parsed.userId, {
          score,
          data: {
            rank: 0,
            username: parsed.username || "Anonymous",
            wpm: parsed.wpm,
            accuracy: parsed.accuracy,
            time: parsed.time,
            mode: parsed.mode,
          },
        });
      }
    }
  }

  return Array.from(userScores.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry, index) => ({
      ...entry.data,
      rank: index + 1,
    }));
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") || "all";
  const timeFrame = searchParams.get("timeFrame") || "alltime";
  const limit = parseInt(searchParams.get("limit") || "10");

  try {
    if(mode === "all") {
      const leaderboard = await getCombinedLeaderboard(timeFrame, limit);
      return NextResponse.json({ leaderboard });
    }

    const leaderboardKey = `${APP_NAME}:leaderboard:${timeFrame}:${mode}`;
    const userIds = await redis.zrevrange(leaderboardKey, 0, limit - 1);

    if (!userIds.length) {
      return NextResponse.json({ leaderboard: [] });
    }

    const keys = userIds.map((userId) => `${leaderboardKey}:${userId}`);
    const testDataList = await redis.mget(keys);

    const leaderboard: LeaderboardDataType[] = [];

    for (let i = 0; i < testDataList.length; i++) {
      const data = testDataList[i];
      if (!data) continue;

      const parsed = JSON.parse(data);

      leaderboard.push({
        rank: leaderboard.length + 1,
        username: parsed.username || "Anonymous",
        wpm: parsed.wpm,
        accuracy: parsed.accuracy,
        time: parsed.time,
        mode: parsed.mode,
      });
    }

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard" },
      { status: 500 }
    );
  }
}
