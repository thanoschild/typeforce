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
