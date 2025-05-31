"use client";

import { useEffect, useState, useTransition } from "react";
import { LuLogIn } from "react-icons/lu";
import Input from "../core/Input";
import SocialButton from "./SocialButton";
import { validateForm } from "@/lib/validation";
import { SignInFormData } from "@/types/form";
import { FaCheck } from "react-icons/fa";
import { login } from "@/actions/login";
import { signIn } from "next-auth/react";
import { showToast } from "@/components/core/Toast";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants";
import { useSearchParams } from "next/navigation";
import { RiLoader4Line } from "react-icons/ri";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Partial<SignInFormData>>({});
  const [touchedFields, setTouchedFields] = useState<Set<keyof SignInFormData>>(
    new Set()
  );
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
 
  useEffect(() => {
    if (!error) return;

    if (error.startsWith("provider_error")) {
      showToast("error", "Authentication Error", `Account already exists, but its using a different authentication method. Try sigining in with different method.`);
    } else if (error === "internal_error") {
      showToast("error", "Authentication Error", "An unexpected error occurred. Please try again.");
    }
  }, [error]);

  const handleSocialSignIn = async (provider: "google" | "github") => {
    try {
      const result = await signIn(provider, {
        redirect: false,
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
  
      if (result?.error) {
        showToast(
          "error",
          "Authentication Error",
          `An error occurred while signing in with ${provider}. Please try again.`
        );
      } 
      if(result?.ok) {
        showToast('success', 'Success', 'Successfully signed in with ' + provider);
      }
      console.log("Social sign-in result:", result);
    } catch (error) {
      showToast("error", "Error", "An unexpected error occurred.");
    }
  };

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
      startTransition(async () => {
        try {
          const result = await login(formData);

          if (result.success) {
            await signIn("credentials", {
              email: formData.email,
              password: formData.password,
              redirect: true,
              callbackUrl: DEFAULT_LOGIN_REDIRECT,
            });
            showToast("success", "Success", "Logged in successfully!");
          } else {
            showToast("error", "Error", result.message);
          }
        } catch (error) {
          showToast("error", "Error", "An unexpected error occurred.");
        }
      });
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-center text-theme-sub text-2xl font-light mb-6">
        <span>Sign In</span>
      </div>

      <div className="flex space-x-4">
        <SocialButton
          provider="google"
          onClick={() => handleSocialSignIn("google")}
        />
        <SocialButton
          provider="github"
          onClick={() => handleSocialSignIn("github")}
        />
      </div>

      <div className="flex items-center my-1.5">
        <div className="flex-grow h-1 bg-theme-sub-alt rounded-full"></div>
        <span className="px-4 text-theme-text">or</span>
        <div className="flex-grow h-1 bg-theme-sub-alt rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <Input
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
          <Input
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
              className={`w-5 h-5 rounded bg-theme-sub-alt ${
                formData.rememberMe ? "" : "border-theme-sub-alt"
              } flex items-center justify-center cursor-pointer`}
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  rememberMe: !prev.rememberMe,
                }))
              }
            >
              {formData.rememberMe && <FaCheck className="text-theme-text" />}
            </div>
            <label
              htmlFor="rememberMe"
              className="ml-2 text-theme-text cursor-pointer"
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
          disabled={isPending}
          className="w-full bg-theme-sub-alt hover:bg-theme-text text-theme-text hover:text-theme-sub-alt flex items-center justify-center py-2.5 rounded-md transition-colors duration-200 mt-6"
        >
          {isPending ? (
            <RiLoader4Line className="text-2xl text-theme-text animate-spin" />
          ) : (
            <>
              <LuLogIn className="mr-2" size={20} />
              <span>sign in</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}