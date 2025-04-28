"use client";

import { useState, useTransition } from "react";
import { LuUserPlus } from "react-icons/lu";
import AuthInput from "./AuthInput";
import { validateForm } from "@/components/auth/validateForm";
import { SignUpFormData } from "@/types/form";
import { register } from "@/actions/register";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [errors, setErrors] = useState<Partial<SignUpFormData>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof SignUpFormData>>(new Set());
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setTouchedFields(prev => new Set(prev).add(name as keyof SignUpFormData));

    const fieldsToValidate = {} as SignUpFormData;
    touchedFields.forEach(field => {
      fieldsToValidate[field] = field === name ? value : formData[field];
    });

    // Validate on change
    const validationErrors = validateForm({ ...formData, [name]: value });
    setErrors(prev => ({
      ...prev,
      [name]: validationErrors[name as keyof SignUpFormData]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setTouchedFields(new Set(Object.keys(formData) as Array<keyof SignUpFormData>));

    if (Object.keys(validationErrors).length === 0) {
      startTransition(async () => {
        try {
          const result = await register(formData);
  
        //   if (result.success) {
        //     toast.success(result.message);
        //   } else {
        //     toast.error(result.message);
        //   }
        } catch (error) {
          console.error("Registration error:", error);
        //   toast.error("An unexpected error occurred.");
        }
      });
    }
  };

  console.log(errors);

  return (
    <div className="w-full mx-auto">
      <div className="flex items-center justify-center text-theme-sub text-2xl font-light mb-6">
        <span>Sign Up</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <AuthInput
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
          />
          {errors.username && (
            <p className="text-sm text-theme-error px-1">{errors.username}</p>
          )}
        </div>

        <div className="space-y-1">
          <AuthInput
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email"
          />
          {errors.email && (
            <p className="text-sm text-theme-error px-1">{errors.email}</p>
          )}
        </div>

        {/* <AuthInput
          name="verifyEmail"
          type="email"
          value={formData.verifyEmail}
          onChange={handleChange}
          placeholder="verify email"
          highlight={true}
        /> */}

        <div className="space-y-1">
          <AuthInput
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
          />
          {errors.password && (
            <p className="text-sm text-theme-error px-1">{errors.password}</p>
          )}
        </div>

        <div className="space-y-1">
          <AuthInput
            name="verifyPassword"
            type="password"
            value={formData.verifyPassword}
            onChange={handleChange}
            placeholder="verify password"
          />
          {errors.verifyPassword && (
            <p className="text-sm text-theme-error px-1">
              {errors.verifyPassword}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-theme-sub-alt hover:bg-theme-text text-theme-text hover:text-theme-sub-alt flex items-center justify-center py-2.5 rounded-md transition-colors duration-200 mt-6"
        >
          <LuUserPlus className="mr-2" size={20} />
          <span>sign up</span>
        </button>
      </form>
    </div>
  );
}
