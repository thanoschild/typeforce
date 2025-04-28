"use client";

import { useState } from "react";
import { LuLogIn, LuCheck } from "react-icons/lu";
import AuthInput from "./AuthInput";
import SocialButton from "./SocialButton";
import { validateForm } from "@/components/auth/validateForm";
import { SignInFormData } from "@/types/form";


export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Partial<SignInFormData>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof SignInFormData>>(
    new Set()
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setTouchedFields((prev) => new Set(prev).add(name as keyof SignInFormData));
    const fieldsToValidate = {} as SignInFormData;
    touchedFields.forEach((field) => {
      fieldsToValidate[field] = field === name ? value : formData[field];
    });

    // Validate on change
    const validationErrors = validateForm({ ...formData, [name]: value });
    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name as keyof SignInFormData],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);
    setTouchedFields(
      new Set(Object.keys(formData) as Array<keyof SignInFormData>)
    );

    if (Object.keys(validationErrors).length === 0) {
      console.log("Sign In form submitted", formData);
      // Proceed with registration
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center text-theme-sub text-2xl font-light mb-6">
        <span>Sign In</span>
      </div>

      <div className="flex space-x-4">
        <SocialButton provider="google" />
        <SocialButton provider="github" />
      </div>

      <div className="flex items-center my-1.5">
        <div className="flex-grow h-1 bg-theme-sub-alt rounded-full"></div>
        <span className="px-4 text-theme-text">or</span>
        <div className="flex-grow h-1 bg-theme-sub-alt rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="flex items-center justify-between">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 border rounded ${
                formData.rememberMe
                  ? "bg-theme-sub border-theme-sub"
                  : "bg-theme-sub-alt border-theme-sub-alt"
              } flex items-center justify-center cursor-pointer`}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  rememberMe: !prev.rememberMe,
                }))
              }
            >
              {formData.rememberMe && (
                <LuCheck className="text-theme-bg font-extrabold text-xl" />
              )}
            </div>
            <label
              htmlFor="rememberMe"
              className="ml-2 text-gray-700 cursor-pointer"
            >
              remember me
            </label>
          </div>

          <div className="text-right">
            <a href="#" className="text-theme-sub hover:underline text-sm">
              forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-theme-sub-alt hover:bg-theme-text text-theme-text hover:text-theme-sub-alt flex items-center justify-center py-2.5 rounded-md transition-colors duration-200 mt-6"
        >
          <LuLogIn className="mr-2" size={20} />
          <span>sign in</span>
        </button>
      </form>
    </div>
  );
}