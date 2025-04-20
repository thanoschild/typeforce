import prisma from "db/src";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await prisma.verification_tokens.findFirst({
      where: {
        email,
      },
    });

    return token;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await prisma.verification_tokens.findFirst({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};
