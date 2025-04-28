'use client'

import { verification } from "@/actions/verification";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { TbAlertTriangle } from "react-icons/tb";
import { RiLoader4Line } from "react-icons/ri";

type Props = {};

export default function Verification({}: Props) {
  const { themeColors } = useTheme();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");

  const validateToken = useCallback(() => {
    if(!token) {
      setSuccess(false);
      setMessage("Invalid token. Please check your email for the correct link.");
      return;
    }

    verification(token)
      .then((res) => {
        setSuccess(res.success);
        setMessage(res.message);
      })
      .catch((err) => {
        setSuccess(false);
        setMessage("Something went wrong!");
      });
  }, [token])

  useEffect(() => {
    validateToken();
  }, [validateToken]);

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full">
        <div className="rounded-xl overflow-hidden transition-all">
          <div className="p-6">
            <h2 className="text-3xl font-bold text-center text-theme-main mb-2">
              Email Verification
            </h2>
            <p className="text-center text-xl text-theme-text mb-6">
              We are confirming your email verification
            </p>
            <div className="flex flex-col items-center justify-center gap-6">
              {success === null ? (
                <RiLoader4Line className="text-2xl text-theme-text animate-spin"/>
              ) : (
                <>
                  <div
                    className={`
                      p-4 rounded-md flex items-center gap-x-3 text-sm
                      ${success 
                        ? 'text-theme-sub' 
                        : `text-theme-error-extra`}
                    `}
                    style={{
                        backgroundColor: success ? `${themeColors.sub}3A` : `${themeColors.error}3A`, // 1A is approx 10% opacity in hex
                    }}
                  >
                    {success ? (
                      <FaRegCheckCircle className="w-5 h-5 flex-shrink-0" />
                    ) : (
                      <TbAlertTriangle className="w-5 h-5 flex-shrink-0" />
                    )}
                    <p>{message}</p>
                  </div>
                  <Link
                    href="#"
                    className="text-sm text-theme-text hover:text-theme-sub transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      // Handle navigation to login
                      console.log('Navigate to login');
                    }}
                  >
                    Back to login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
