"use server";

import bcrypt from "bcryptjs";
import { SignUpFormData } from "@/types/form";
import { validateForm } from "@/components/auth/validateForm";
import prisma from "db/src";
import { getUserByEmail, getUserByUserName } from "@/actions/user";
import { generateVerificationToken } from "./token";
import { sendVerificationEmail } from "@/lib/email";

export const register = async (data: SignUpFormData) => {
  const validatetion = validateForm(data);
  if (Object.keys(validatetion).length > 0) {
    return {
      status: 400,
      success: false,
      message: "Invalid Credentials",
      errors: validatetion,
    };
  }

  const { username, email } = data;

  const existingUserName = await getUserByUserName(username);
  if (existingUserName) {
    return { status: 400, success: false, message: "Username already taken" };
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { status: 400, success: false, message: "User already exists" };
  }

  // const hashedPassword = await bcrypt.hash(password, 10);
  // await prisma.users.create({
  //   data: {
  //     username,
  //     email,
  //     password: hashedPassword,
  //   },
  // });

  const verificationToken = await generateVerificationToken(data);
  await sendVerificationEmail(verificationToken.username, verificationToken.email, verificationToken.token);

  return {
    status: 200,
    success: true,
    message: "Confirmation email sent. Please verify your email.",
  };
};
