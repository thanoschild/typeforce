"use client";

import React, { useCallback, useEffect } from "react";
import { RaceProps } from "@/types/race";
import { MemberProgressProps } from "@/types/member";
import Avatar from "../core/Avatar";
import { useWebSocket } from "@/context/WebSocketContext";
import { useSession } from "next-auth/react";
import Interface from "./Interface";

export default function Race({
  members,
  isRaceStarted,
  setIsRaceStarted,
  roomData,
  raceText,
}: RaceProps) {
  const { wsRef } = useWebSocket();
  const { data: session } = useSession();

  useEffect(() => {
    let isAllTypistFinished = false;

    if (members.length > 0) {
      isAllTypistFinished = members.every(
        (member) => member.progress?.progress === 100
      );
    }

    if (isAllTypistFinished) {
      setTimeout(() => {
        setIsRaceStarted(false);
      }, 5000);
    }
  }, [members, setIsRaceStarted]); // need to test this

  const handleProgressUpdate = useCallback(
    (wpm: number, accuracy: number, progress: number) => {
      if (!roomData?.code || !session?.user?.id) return;

      if (isRaceStarted && wsRef?.readyState === WebSocket.OPEN) {
        try {
          wsRef.send(
            JSON.stringify({
              type: "UPDATE_PROGRESS",
              userId: session.user.id,
              roomCode: roomData.code,
              progress: {
                wpm,
                accuracy,
                progress,
              },
            })
          );
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }
    },
    [isRaceStarted, wsRef, session?.user?.id, roomData?.code]
  );

  if(!roomData) return null;

  const sortedMembers = [...members].sort((a, b) => {
    const progressA = a.progress?.progress || 0;
    const progressB = b.progress?.progress || 0;
    return progressB - progressA;
  });

  return (
    <div className="lg:col-span-3">
      <div className="bg-theme-sub-alt rounded-xl mb-6">
        <div className="space-y-4 p-6">
          {sortedMembers.map((member) => (
            <MemberProgress key={member.id} member={member} />
          ))}
        </div>
      </div>

      <Interface
        mode={roomData.mode}
        modeOption={roomData.modeOption}
        text={raceText}
        onProgress={handleProgressUpdate}
      />
    </div>
  );
}

const MemberProgress = ({ member }: MemberProgressProps) => {
  const progress = member.progress?.progress || 0;
  const wpm = member.progress?.wpm || 0;
  const accuracy = member.progress?.accuracy || 0;

  return (
    <div className="flex items-center gap-4">
      <div className="w-[250px] flex items-center gap-3">
        <Avatar name={member.username} image={member.image} />
        <div>
          <p className="font-medium text-theme-text truncate max-w-[180px]">{member.username}</p>
          <div className="text-sm flex items-center">
            {wpm > 0 && (
              <div className="flex items-center">
                <span className="text-theme-main">{Math.round(wpm)}</span>
                <span className="ml-1 text-theme-sub">wpm</span>
              </div>
            )}
            {accuracy > 0 && (
              <div className="flex items-center ml-4">
                <span className="text-theme-main">{Math.round(accuracy)}%</span>
                <span className="ml-1 text-theme-sub">acc</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="h-2 bg-theme-bg rounded-full overflow-hidden">
          <div
            className="h-full bg-theme-main transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
