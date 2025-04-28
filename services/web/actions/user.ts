"use server";

import prisma from "db/src";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw new Error("Unable to fetch user");
  }
};

export const getUserByUserName = async (username: string) => {
  try {
    const user = await prisma.users.findFirst({
      where: {
        username: {
          equals: username
        }
      },
      select: {
        id: true,
        username: true,
        email: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return user;
  } catch (error) {
    console.log("Error fetching user by username:", error);
    throw new Error("Unable to fetch user");
  }
};