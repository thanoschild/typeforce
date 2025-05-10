import { SignUpFormData } from "@/types/form";
import { SignInFormData } from "@/types/form";
import { RoomFormData } from "@/types/room";
import { modes } from "@/constants";

type FormData = SignUpFormData | SignInFormData;

export function validateForm<T extends FormData>(data: T): Partial<T> {
  const errors: Partial<T> = {};

  // Email validation for both forms
  if (!data.email) {
      errors.email = "Email is required" as any;
  } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      errors.email = "Email is invalid" as any;
  }

  // Password validation for both forms
  if (!data.password) {
      errors.password = "Password is required" as any;
  } else if (data.password.length < 6) {
      errors.password = "Password must be at least 6 characters" as any;
  }

  // Registration specific validations
  if ('username' in data) {
      if (!data.username) {
          (errors as Partial<SignUpFormData>).username = "Username is required";
      } else if (data.username.length < 4) {
          (errors as Partial<SignUpFormData>).username = "Username must be at least 4 characters";
      }

      if ('verifyPassword' in data) {
          if (!data.verifyPassword) {
              (errors as Partial<SignUpFormData>).verifyPassword = "Please confirm your password";
          } else if (data.password !== data.verifyPassword) {
              (errors as Partial<SignUpFormData>).verifyPassword = "Passwords do not match";
          }
      }
  }

  return errors;
}

export function validateRoomForm(data: RoomFormData) {
    const errors: Partial<RoomFormData> = {};
    if(!data.name) {
        errors.name = "Room name is required";
    } else if(data.name.length < 4) {
        errors.name = "Room name must be at least 4 characters";
    }

    return errors;
}