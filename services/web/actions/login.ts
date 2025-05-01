"use server";

import bcrypt from "bcryptjs";
import { SignInFormData } from "@/types/form";
import { validateForm } from "@/components/auth/validateForm";
import { getUserByEmail } from "./user";

export const login = async (data: SignInFormData) => {
  const validatetion = validateForm(data);
  if (Object.keys(validatetion).length > 0) {
    return {
      status: 400,
      success: false,
      message: "Invalid Credentials",
      errors: validatetion,
    };
  }

  const { email, password } = data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email) {
    return { success: false, message: "User does not exist" };
  }

  if(!existingUser.password) {
    return { success: false, message: "Email/password is incorrect or your account does not have password authentication enable."};
  }

  try {
    const passwordsMatch = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordsMatch) {
      return { success: false, message: "Invalid credentials" };
    }

    return { success: true, message: "Logged in successfully!" };
  } catch (error) {
    return { success: false, message: "Internal server error!" };
  }
};
