import React from "react";

type AvatarProps = {
  name: string;
  image?: string;
};

export default function Avatar({ name, image }: AvatarProps) {
  const initials = name
    ? name.split(" ").length === 1
      ? name[0].toUpperCase()
      : name
          .split(" ")
          .map((part) => part[0].toUpperCase())
          .join("")
    : "?";

  return (
    <div className="w-8 h-8 rounded-full bg-theme-text flex items-center justify-center overflow-hidden text-theme-bg text-sm font-extrabold">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
}
