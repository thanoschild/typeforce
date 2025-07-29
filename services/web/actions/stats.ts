'use server'

import prisma from "db/src";


export const incrementStat = async (field: 'testStarted' | 'testCompleted' | 'typingTime' | 'totalUsers', value: number = 1) => {
  try {
    const existingStats = await prisma.stats.findFirst();
    
    if (existingStats) {
      return await prisma.stats.update({
        where: { id: existingStats.id },
        data: {
          [field]: {
            increment: value
          }
        }
      });
    } else {
      return await prisma.stats.create({
        data: {
          [field]: value
        }
      });
    }
  } catch (error) {
    console.error(`Error incrementing ${field}:`, error);
    throw error;
  }
};