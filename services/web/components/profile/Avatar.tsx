"use client";

import { getUserByEmail } from "@/actions/user";
import { USER_STATS_LINK } from "@/constants";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { RiBarChart2Line, RiEarthLine, RiLogoutBoxLine, RiSettings3Line } from "react-icons/ri";

interface AvatarProps {
  user: {
    id: string;
    email: string;
    image?: string | null;
  };
  className?: string;
}

export function Avatar({ user }: AvatarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [currUser, setCurrUser] = useState<User | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (user?.email) {
        const result = await getUserByEmail(user.email);
        setCurrUser(result);
      }
    };

    fetchUser();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        className="flex items-center gap-2 text-sm text-theme-sub hover:text-theme-text"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <FaRegUser />
        <span>{currUser?.username}</span>
      </button>
      {showDropdown && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-52 bg-theme-sub-alt text-theme-text rounded-md z-20 border-2 border-theme-bg text-sm">
          
            <Link
              href={USER_STATS_LINK}
              className="flex items-center px-4 py-2 rounded-md hover:text-theme-bg hover:bg-theme-text"
            >
              <RiBarChart2Line className="mr-2" />
              User stats
            </Link>
            <Link
              href="/profile"
              className="flex items-center px-4 py-2 rounded-md hover:text-theme-bg hover:bg-theme-text"
            >
              <RiEarthLine className="mr-2" />
              Public profile
            </Link>
            <Link
              href="/settings"
              className="flex items-center px-4 py-2 rounded-md hover:text-theme-bg hover:bg-theme-text"
            >
              <RiSettings3Line className="mr-2" />
              Account settings
            </Link>
            <button
              onClick={() => signOut()}
              className="w-full text-left flex items-center px-4 py-2 rounded-md hover:text-theme-bg hover:bg-theme-text"
            >
              <RiLogoutBoxLine className="mr-2" />
              Sign out
            </button>
          </div>
      )}
    </div>
  );
}
