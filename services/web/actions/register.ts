'use server'

import bcrypt from "bcryptjs";
import { SignUpFormData } from '@/types/form';
import { validateForm } from "@/components/auth/validateForm";
import prisma from "db/src";
import { getUserByEmail } from "@/actions/user";
import { generateVerificationToken } from "./token";
import { sendVerificationEmail } from "@/lib/email";


export const register = async (data: SignUpFormData) => {
   const validatetion = validateForm(data);
   if (Object.keys(validatetion).length > 0) {
      return {
         status: 400,
         success: false,
         message: "Invalid Credentials",
         errors: validatetion
      }
   }

   const { username, email, password } = data;

   const existingUser = await getUserByEmail(email);
   if (existingUser) {
    return {status: 400, success: false, message: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.users.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);
  
  return {
    status: 200,
    success: true,
    message: "Confirmation email sent",
  };
}