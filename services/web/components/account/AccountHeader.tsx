import React from "react";
import { User } from "@prisma/client";
import Avatar from "../core/Avatar";

interface AccountHeaderProps {
  user: User;
}

export default function AccountHeader({ user }: AccountHeaderProps) {
  console.log("user: ", user.createdAt);

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = date
      .toLocaleDateString("en-US", options)
      .replace(",", "");
    return formattedDate;
  };

  return (
      <div className="flex items-center gap-3 flex-1">
        <Avatar
          name={user.username}
          image={user.image || ""}
          size="dxl"
          className="border-2 border-theme-sub"
          imageClassName=""
        />
        <div className="flex flex-col gap-1">
          <span className="text-xl text-theme-text font-bold text-left">{user.username}</span>
          <span className="text-theme-sub">Joined {formatDate(user.createdAt)}</span>
        </div>
      </div>
  );
}