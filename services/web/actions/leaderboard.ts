import redis from "@/lib/redis";
import { Test } from "@prisma/client";
import { APP_NAME } from "@/constants";

export const updateLeaderboards = async (test: Test, userId: string, username: string) => {
  const { accuracy, wpm, mode, createdAt } = test;
  const score = Number((wpm * (accuracy / 100)).toFixed(2));
  
  const today = new Date().toISOString().split("T")[0];
  const dailyKey = `${APP_NAME}:leaderboard:daily:${mode}:${today}`;
  const allTimeKey = `${APP_NAME}:leaderboard:alltime:${mode}`;

  const dailyDataKey = `${APP_NAME}:leaderboard:daily:${mode}:${today}:${userId}`;
  const allTimeDataKey = `${APP_NAME}:leaderboard:alltime:${mode}:${userId}`;

  const [prevDailyScore, prevAllTimeScore] = await Promise.all([
    redis.zscore(dailyKey, userId),
    redis.zscore(allTimeKey, userId),
  ]);
  
  const testWithUsername = {
    ...test,
    username,
    score
  };
  const testString = JSON.stringify(testWithUsername);

  // DAILY UPDATE
  if (!prevDailyScore || score > Number(prevDailyScore)) {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setUTCHours(24, 0, 0, 0); // Midnight UTC of next day
    const secondsUntilEndOfDay = Math.floor((tomorrow.getTime() - now.getTime()) / 1000);

    await redis.zadd(dailyKey, score, userId);
    await redis.set(dailyDataKey, testString, 'EX', secondsUntilEndOfDay);

    const ttl = await redis.ttl(dailyKey);
    if (ttl === -1) {
      await redis.expire(dailyKey, secondsUntilEndOfDay);
    }
  }

  // ALL-TIME UPDATE
  if (!prevAllTimeScore || score > Number(prevAllTimeScore)) {
    await redis.zadd(allTimeKey, score, userId);
    await redis.set(allTimeDataKey, testString);
  }
};