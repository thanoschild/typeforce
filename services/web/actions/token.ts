import { SignUpFormData } from "@/types/form";
import prisma from "db/src";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const token = await prisma.verificationToken.findFirst({
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
    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const generateVerificationToken = async (data: SignUpFormData) => {
  const { username, email, password } = data;
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = await prisma.verificationToken.create({
    data: {
      username,
      token,
      expiresAt: expires,
      email,
      password: hashedPassword,
    },
  });

  return verificationToken;
};


