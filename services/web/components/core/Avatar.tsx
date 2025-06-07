import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface AvatarProps {
  name: string;
  image?: string;
  className?: string;
  imageClassName?: string;
  size?: "sm" | "md" | "lg" | "xl" | "dxl";
}

const sizeClasses = {
  sm: "w-6 h-6 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
  dxl: "w-20 h-20 text-2xl",
};

export default function Avatar({
  name,
  image,
  className,
  imageClassName,
  size = "md",
}: AvatarProps) {
  const initials = name
    ? name.split(" ").length === 1
      ? name[0].toUpperCase()
      : name
          .split(" ")
          .map((part) => part[0].toUpperCase())
          .join("")
    : "?";

console.log("url: ", image)

  return (
    <div
      className={cn(
        "rounded-full bg-theme-text flex items-center justify-center overflow-hidden text-theme-bg font-extrabold relative",
        sizeClasses[size],
        className
      )}
    >
      {image ? (
        <Image
          src={image}
          alt={name}
          fill
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        initials
      )}
    </div>
  );
}
