import redis from "@/lib/redis";
import { Test } from "@prisma/client";
import { APP_NAME } from "@/constants";

export const updateLeaderboards = async (test: Test, userId: string, username: string) => {
  const { accuracy, wpm, mode, createdAt } = test;
  const score = Math.round(wpm * (accuracy / 100));

  const dailyKey = `${APP_NAME}:leaderboard:daily:${mode}`;
  const allTimeKey = `${APP_NAME}:leaderboard:alltime:${mode}`;

  const dailyDataKey = `${APP_NAME}:leaderboard:daily:${mode}:${userId}`;
  const allTimeDataKey = `${APP_NAME}:leaderboard:alltime:${mode}:${userId}`;

  const [prevDailyScore, prevAllTimeScore] = await Promise.all([
    redis.zscore(dailyKey, userId),
    redis.zscore(allTimeKey, userId),
  ]);
  
  const testWithUsername = {
    ...test,
    username
  };
  const testString = JSON.stringify(testWithUsername);

  // DAILY UPDATE
  if (!prevDailyScore || score > Number(prevDailyScore)) {
    await redis.zadd(dailyKey, score, userId);
    await redis.set(dailyDataKey, testString, 'EX', 86400);
  }

  // ALL-TIME UPDATE
  if (!prevAllTimeScore || score > Number(prevAllTimeScore)) {
    await redis.zadd(allTimeKey, score, userId);
    await redis.set(allTimeDataKey, testString);
  }
};