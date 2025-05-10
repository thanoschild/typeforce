"use server";

import { getVerificationTokenByToken } from "@/actions/token";
import prisma from "db/src";

export const verification = async (token: string) => {
  const currentUser = await getVerificationTokenByToken(token);
  if (!currentUser) {
    return { success: false, message: "Invalid token" };
  }

  const hasExpired = new Date(currentUser.expiresAt) < new Date();
  if (hasExpired) {
    return { success: false, message: "Token has expired" };
  }

  await prisma.user.create({
    data: {
       name: currentUser.name ?? currentUser.username,
       username: currentUser.username,
       email: currentUser.email,
       password: currentUser.password,
    }
 });

  await prisma.verificationToken.delete({
    where: { id: currentUser.id },
  });

  return { success: true, message: "Your email has been successfully verified!" };
};
