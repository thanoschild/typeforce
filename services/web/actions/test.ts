"use server";

import { AddTestTypes } from "@/types/test";
import { getServerSession } from "next-auth";
import prisma from "db/src";
import { getUserByEmail } from "@/actions/user";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { updateLeaderboards } from "./leaderboard";


export const addTest = async({ wpm, accuracy, time, mode, modeOption }: AddTestTypes) => {
    try {
      if (!wpm || !accuracy || !time || !mode || !modeOption) {
        throw new Error("Missing required fields");
      }

      const session = await getServerSession(authOptions);
      console.log("Session:", session);
      
      if (!session?.user?.email) {
        throw new Error("Unauthorized: No valid session found");
      }

      const user = await getUserByEmail(session.user.email);
      if (!user) {
        throw new Error("User not found");
      }

      const test = await prisma.test.create({
        data: {
          wpm: Math.round(wpm),
          accuracy: Number(accuracy.toFixed(2)),
          time: Math.round(time),
          mode,
          modeOption,
          userId: user.id,
        },
      });

      void updateLeaderboards(test, user.id, user.username);

      return test;
    } catch (error) {
      console.error("Error in adding test to db:", error);
      throw error;
    }
}