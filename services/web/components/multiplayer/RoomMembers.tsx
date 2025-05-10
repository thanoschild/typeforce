import React from "react";
import { Member as MemberType } from "@/types/member";
import { Users } from "lucide-react";
import { FiUsers } from "react-icons/fi";

interface MembersSectionProps {
  members: MemberType[];
}

interface MemberAvatarProps {
  name: string;
  image: string;
}

const MemberAvatar = ({ name = "", image }: MemberAvatarProps) => {
  const initials = name
    ? name.split(" ").length === 1
      ? name[0].toUpperCase()
      : name
          .split(" ")
          .map((part) => part[0].toUpperCase())
          .join("")
    : "?";

  return (
    <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center overflow-hidden text-white text-sm font-medium">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        initials
      )}
    </div>
  );
};

export default function Members({ members }: MembersSectionProps) {
  console.log("member: ", members);
  return (
    <div className="bg-theme-sub-alt rounded-xl p-4 text-theme-text">
      <div className="flex items-center gap-x-3 mb-4">
        <FiUsers className="size-8" />
        <h2 className="text-xl font-semibold">Typists ({members.length})</h2>
      </div>
      <div className="h-[460px] overflow-y-auto pr-2 space-y-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="flex items-center justify-between p-2 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <MemberAvatar name={member.username} image={member.image || ""} />
              <div className="text-sm text-theme-text font-medium">
                {member.username}
                {member.isHost && (
                  <span className="ml-2 text-xs text-theme-main font-normal">
                    (Host)
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
