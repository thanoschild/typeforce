"use server";

import { getVerificationTokenByToken } from "@/actions/token";
import { getUserByEmail } from "@/actions/user";
import prisma from "db/src";

export const verification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { success: false, message: "Invalid token" };
  }

  const hasExpired = new Date(existingToken.expiresAt) < new Date();

  if (hasExpired) {
    return { success: false, message: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { success: false, message: "Email not found" };
  }

  await prisma.users.update({
    where: { id: existingUser.id },
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  await prisma.verification_tokens.delete({
    where: { id: existingToken.id },
  });

  return { success: true, message: "Your email has been successfully verified!" };
};
