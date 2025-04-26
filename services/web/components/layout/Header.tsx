"use client";

import React, { useEffect, useState } from "react";
import { TbKeyboard } from "react-icons/tb";
import { LuCrown } from "react-icons/lu";
import { RiInformation2Line, RiLoaderLine } from "react-icons/ri";
import { IoSettingsOutline, IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineFontDownload } from "react-icons/md";
import { MdOutlineSettings } from "react-icons/md";
import { BiLogInCircle, BiLogOutCircle } from "react-icons/bi";
import { twJoin } from "tailwind-merge";
import { LogoIcon } from "@/components/core/LogoIcon";
import { Text } from "@/components/core/Text";
import { Tooltip } from "../core/Tooltip";
import Link from "next/link";
import { Avatar } from "../profile/Avatar";
import { Button } from "@/components/ui/button";
import { NaveLinks } from "@/constants";

interface UserType {
  name: string;
  avatarURL: string;
}

// Dummy data for development
const userData: UserType | null = null;
// const userData: UserType = {
//   name: 'John Doe',
//   avatarURL: 'https://gravatar.com/avatar/c663c26824159f2c33d812557ada7e3a?s=400&d=robohash&r=x'
// };
const isLoading = false;


const testId: string = "testId";

export function Header() {
  const [user, setUser] = useState<UserType | null>(userData);
  const [isUserTyping, setIsUserTyping] = useState(false);

  return (
      <main className="w-full h-20 z-10 flex items-center justify-between gap-3">
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
                <Text
                  className="absolute -top-1 left-1 text-[10px] leading-none font-lexend-deca"
                  dimmed={true}
                >
                  monkey see
                </Text>
                <span
                  className={`font-semibold font-lexend-deca ${
                    isUserTyping ? "text-theme-sub" : "text-theme-text"
                  }`}
                >
                  monkeytype
                </span>
              </Text>
            </div>
          </div>

          {/* Navigation and User Section */}
          <div className="flex items-center gap-3 pt-1">
            {NaveLinks.map(({ label, href, icon }) => (
              <Tooltip key={label} label={label}>
                <Link href={href} className="px-2">
                  <span className="text-xl">{icon}</span>
                </Link>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="flex items-center pt-1">
          {user && (
            <Button asChild className="px-2 text-sm" variant="ghost">
              <Link href="/account">
                <Avatar
                  className="border-0 bg-sub-alt"
                  expandable={false}
                  imageProps={{
                    src: user.avatarURL,
                    height: 20,
                    width: 20,
                    alt: user.name,
                  }}
                />
                <span>{user.name}</span>
              </Link>
            </Button>
          )}
          <Tooltip label={`Sign ${user ? "out" : "in"}`}>
            {user ? (
              isLoading ? (
                <div className="p-2 text-xl">
                  <RiLoaderLine className="animate-spin text-main" />
                </div>
              ) : (
                <span className="">
                  <BiLogOutCircle />
                </span>
              )
            ) : (
              <Link href="/login">
                <BiLogInCircle className="text-xl text-theme-sub hover:text-theme-text" />
              </Link>
            )}
          </Tooltip>
        </div>
      </main>
  );
}
