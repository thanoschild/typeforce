"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { cn } from "@/lib/utils";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"sign-in" | "sign-up">("sign-in");

  return (
    <div className="flex flex-grow flex-col items-center justify-center p-4">
      <div className="flex justify-center space-x-4 mb-8">
        <button
          onClick={() => setActiveTab("sign-in")}
          className={cn(
            "px-6 py-2 rounded-lg transition-colors",
            activeTab === "sign-in"
              ? "text-theme-main font-medium bg-theme-sub-alt"
              : "text-theme-sub hover:text-theme-text"
          )}
        >
          Sign In
        </button>
        <button
          onClick={() => setActiveTab("sign-up")}
          className={cn(
            "px-6 py-2 rounded-lg transition-colors",
            activeTab === "sign-up"
              ? "text-theme-main font-medium bg-theme-sub-alt"
              : "text-theme-sub hover:text-theme-text"
          )}
        >
          Sign Up
        </button>
      </div>

      <div className="w-full max-w-sm p-4">
        {activeTab === "sign-up" ? <RegisterForm /> : <LoginForm />}
      </div>
    </div>
  );
}
