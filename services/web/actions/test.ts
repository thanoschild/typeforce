"use server";

import { AddTestTypes } from "@/types/test";
import { getServerSession } from "next-auth";
import prisma from "db/src";
import { getUserByEmail } from "@/actions/user";
import { authOptions } from "@/lib/auth";
import { updateLeaderboards } from "./leaderboard";
import { User, Test } from "@prisma/client";

export const getTest = async (userId: string): Promise<Test[]> => {
   const tests = await prisma.test.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
   });
   
   return tests;
}

export const addTest = async ({
  wpm,
  accuracy,
  time,
  mode,
  modeOption,
}: AddTestTypes) => {
  try {
    if (!wpm || !accuracy || !time || !mode || !modeOption) {
      throw new Error("Missing required fields");
    }

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      throw new Error("Unauthorized: No valid session found");
    }

    const user = await getUserByEmail(session.user.email);
    if (!user) {
      throw new Error("User not found");
    }

    if (validateTest(wpm, accuracy, user)) {
      const test = await createTest({ wpm, accuracy, time, mode, modeOption }, user);
      void updateUserStats({ wpm, accuracy, time, mode, modeOption }, user);
      return {
        success: true,
        message: "Test added successfully",
        test,
      };
    } else {
      return {
        success: false,
        message: "Invalid test",
      };
    }
  } catch (error) {
    console.error("Error in adding test to db:", error);
    throw error;
  }
};

const createTest = async ({ wpm, accuracy, time, mode, modeOption }: AddTestTypes, user: User) => {
  if (!wpm || !accuracy || !time || !mode || !modeOption) {
    throw new Error("Missing required fields");
  }
  if (!user.id) {
    throw new Error("User ID is required");
  }


  const test = await prisma.test.create({
    data: {
      wpm: Number(wpm.toFixed(2)),
      accuracy: Number(accuracy.toFixed(2)),
      time: Math.round(time),
      mode,
      modeOption,
      userId: user.id,
    },
  });

  void updateLeaderboards(test, user.id, user.username);
  return test;
};

const validateTest = (wpm: number, accuracy: number, user: User) => {
  if (!user.AvgWpm || !user.AvgAccuracy) return true;
  const wpmDifference = user.AvgWpm - wpm;
  const accuracyDifference = user.AvgAccuracy - accuracy;
  return wpmDifference <= 30 && accuracyDifference <= 30;
};

const getBestTest = ({ wpm, accuracy, time, mode, modeOption }: AddTestTypes, user: User) => {
  const score = Number((wpm * (accuracy / 100)).toFixed(2));
  const currentBestTest = (user.bestTest as any) || {};

  if (!currentBestTest[mode]) {
    currentBestTest[mode] = {};
  }

  if (!currentBestTest[mode][modeOption]) {
    currentBestTest[mode][modeOption] = {
      wpm: 0,
      accuracy: 0,
      time: 0,
      score: 0,
    };
  }

  const currentScore = currentBestTest[mode][modeOption].score || 0;
  if (score > currentScore) {
    currentBestTest[mode][modeOption] = {
      wpm: Number(wpm.toFixed(2)),
      accuracy: Number(accuracy.toFixed(2)),
      time: Math.round(time),
      score,
    };
  }

  return currentBestTest;
};

const updateUserStats = async ({ wpm, accuracy, time, mode, modeOption }: AddTestTypes, user: User) => {
  const TestCount = user.TestCount || 0;
  const AvgWpm = user.AvgWpm || 0;
  const AvgAccuracy = user.AvgAccuracy || 0;
  const TotalTime = user.TotalTime || 0;

  const currentTestCount = TestCount + 1;
  const currentAvgWpm = Number(((AvgWpm * TestCount + wpm) / currentTestCount).toFixed(2));
  const currentAvgAccuracy = Number(((AvgAccuracy * TestCount + accuracy) / currentTestCount).toFixed(2));
  const currentTotalTime = TotalTime + time;
  const currentBestTest = getBestTest({ wpm, accuracy, time, mode, modeOption }, user);

  const updateUserStats = await prisma.user.update({
    where: { id: user.id },
    data: {
      AvgWpm: currentAvgWpm,
      AvgAccuracy: currentAvgAccuracy,
      TestCount: currentTestCount,
      TotalTime: currentTotalTime,
      bestTest: currentBestTest,
    },
  });
};