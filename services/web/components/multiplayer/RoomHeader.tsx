import React, { useCallback, useState } from "react";
import { useWebSocket } from "@/context/WebSocketContext";
import { MultiplayerHeaderProps } from "@/types/room";
import { useSession } from "next-auth/react";
import { showToast } from "@/components/core/Toast";
import { motion } from "framer-motion";
import { Copy, Hash, Hourglass, PlayCircle, Type } from "lucide-react";
import { LuMessageCircleCode } from "react-icons/lu";
import { FiCheck, FiCopy } from "react-icons/fi";
import { VscDebugStart } from "react-icons/vsc";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RoomHeader({
  roomData,
  isHost,
  isRaceStarted,
}: MultiplayerHeaderProps) {
  const { setWsRef } = useWebSocket();
  const { data: session } = useSession();
  const [isCopied, setIsCopied] = useState(false);

  const handleStartTest = () => {};

  const handleCopyInvite = useCallback(() => {
    if (!roomData?.code) return;

    try {
      const inviteUrl = `${window.location.origin}/multiplayer/room/${roomData.code}`;
      navigator.clipboard.writeText(inviteUrl);
      setIsCopied(true);
      showToast("success", "Success", "Invite link copied to clipboard!");

      setTimeout(() => {
        setIsCopied(false);
      }, 5000);
    } catch (error) {
      console.error("Error copying invite link:", error);
      showToast("error", "Error", "Failed to copy invite link");
    }
  }, [roomData?.code]);

  if (!roomData) return null;

  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-col md:flex-row items-center justify-between lg:items-center gap-4"
    >
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-theme-text flex items-center gap-x-3">
          {roomData.name}
          {roomData.mode === "words" ? (
            <span className="ml-2">({roomData.modeOption} words)</span>
          ) : (
            <span className="ml-2">({roomData.modeOption} seconds)</span>
          )}
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-theme-sub">
            <LuMessageCircleCode className="text-xl" />
            <span>Room Code: {roomData.code}</span>
            <button
              className=""
              onClick={handleCopyInvite}
              aria-label="Copy invite link"
            >
             {isCopied ? (
            <FiCheck className="text-xl font-bold text-theme-main" />
          ) : (
            <FiCopy className="text-xl font-bold text-theme-text hover:text-theme-main transition-colors" />
          )}
            </button>
          </div>
        </div>
      </div>
      <div className="">
        {isHost && (
          <button className="flex items-center justify-center gap-3 w-full lg:w-auto text-theme-text bg-theme-sub-alt hover:text-theme-sub-alt hover:bg-theme-text p-3 lg:px-8 font-semibold rounded-md text-sm" onClick={handleStartTest} disabled={isRaceStarted}>
            <VscDebugStart className="text-xl" />
            {isRaceStarted ? "Race in Progress" : "Start Race"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
