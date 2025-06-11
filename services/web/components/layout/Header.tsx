"use client";

import React, { useState } from "react";
import { BiLogInCircle } from "react-icons/bi";
import { twJoin } from "tailwind-merge";
import { LogoIcon } from "@/components/core/LogoIcon";
import { Text } from "@/components/core/Text";
import { Tooltip } from "../core/Tooltip";
import Link from "next/link";
import { Avatar } from "../profile/Avatar";
import { AUTH_LINK, NaveLinks } from "@/constants";
import { useSession } from "next-auth/react";
import { RiLoader4Line } from "react-icons/ri";
import { APP_NAME } from "@/constants";
import { useTypingTest } from "@/context/TypingContext";

export function Header() {
  const { setResetTestFlag } = useTypingTest();
  const [isUserTyping, setIsUserTyping] = useState(false);
  const { data: session, status } = useSession();

  const handleNavClick = () => {
    setResetTestFlag(true);
  };

  return (
    <main className="w-full py-8 z-10 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={twJoin(
            "flex cursor-pointer items-center gap-2 transition-transform active:translate-y-0.5"
          )}
        >
          <LogoIcon
            variant="main"
            className={twJoin(
              "animate-fade-in pt-2 ml-4",
              isUserTyping ? "text-sub" : "text-main"
            )}
          />
          <div className="flex flex-col">
            <Text className="relative text-[32px] leading-none">
              <Link
                href={"/"}
                className={`font-lexend-deca ${
                  isUserTyping ? "text-theme-sub" : "text-theme-text"
                }`}
                onClick={handleNavClick}
              >
                {APP_NAME}
              </Link>
            </Text>
          </div>
        </div>

        {/* Navigation and User Section */}
        <div className="flex items-center gap-3 pt-1">
          {NaveLinks.map(({ label, href, icon }) => (
            <Tooltip key={label} label={label}>
              <Link
                href={href}
                className="px-2"
                onClick={() => href === "/" && handleNavClick()}
              >
                <span className="">{icon}</span>
              </Link>
            </Tooltip>
          ))}
        </div>
      </div>

      <div className="flex items-center pt-1">
        <div className="cursor-pointer px-2 group-hover:text-theme-text">
          {status === "loading" ? (
            <div className="">
              <RiLoader4Line className="text-xl text-theme-sub hover:text-theme-text animate-spin" />
            </div>
          ) : session?.user ? (
            <Avatar user={session.user} />
          ) : (
            <Tooltip label="SignIn">
              <Link href={AUTH_LINK}>
                <BiLogInCircle className="text-xl text-theme-sub hover:text-theme-text" />
              </Link>
            </Tooltip>
          )}
        </div>
      </div>
    </main>
  );
}
