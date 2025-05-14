"use client";

import React, { useMemo, useState, useTransition } from "react";
import { SelectDropdown } from "./SelectDropdown";
import { useTypingTest } from "@/context/TypingContext";
import { RoomFormData } from "@/types/room";
import { Mode, getModeOptions } from "@/types/mode";
import { modes } from "@/constants";
import { showToast } from "../core/Toast";
import { RiLoader4Line } from "react-icons/ri";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

type Props = {};

export default function CreateRoom({}: Props) {
  const [isPending, startTransition] = useTransition();
  const {
    mode,
    setMode,
    modeOption,
    setModeOption,
    raceCompleted,
    setRaceCompleted,
  } = useTypingTest();
  const router = useRouter();
  const [roomData, setRoomData] = useState<RoomFormData>({
    name: "",
    mode: "words",
    modeOption: 10,
  });

  const currentModeOptions = useMemo(() => {
    return getModeOptions(mode as Mode);
  }, [mode]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (roomData.name.trim().length < 6) {
      showToast("error", "Error", "Room name must be at least 6 characters");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch("api/room", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify(roomData)
        });
        const room = await response.json();
        router.push(`/multiplayer/room/${room.code}`);
        showToast("success", "Success", "Room created successfully!");
      } catch (error) {
        console.error("Unable to create room", error);
        showToast("error", "Error", "Something went wrong!");
      }
    });
    console.log("Room data", roomData);
  };

  return (
    <div className="rounded-xl bg-theme-bg w-full max-w-[500px] space-y-4">
      <div className="flex items-center justify-center gap-3 text-theme-main">
        <h1 className="text-2xl font-bold">Create Room</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Room Name"
              value={roomData.name}
              onChange={(e) =>
                setRoomData((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="w-full rounded-md bg-theme-sub-alt px-4 p-2 text-theme-text placeholder-theme-sub outline-none ring-0 transition-all focus:ring-2 focus:ring-theme-text"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SelectDropdown<Mode>
              value={mode as Mode}
              onChange={(value) => {
                const defaultOption = getModeOptions(value)[0];
                setRoomData((prev) => ({
                  ...prev,
                  mode: value,
                  modeOption: getModeOptions(value)[0],
                }));
                setMode(value);
                setModeOption(defaultOption);
              }}
              options={modes}
              placeholder="Select Mode"
            />

            <SelectDropdown<number>
              value={modeOption as number}
              onChange={(value) => {
                setRoomData((prev) => ({
                  ...prev,
                  modeOption: value,
                }));
                setModeOption(value);
              }}
              options={currentModeOptions}
              placeholder="Select Option"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="group relative mt-4 flex gap-2 w-full items-center justify-center rounded-md bg-theme-sub-alt p-2 font-semibold text-center text-theme-text transition-all"
          >
            {isPending ? (
              <RiLoader4Line className="text-2xl text-theme-text animate-spin" />
            ) : (
              <>
                <FaPlus className="font-bold" />
                <span>Create Room</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
