import React, { useState, useTransition } from "react";
import { RiLoader4Line } from "react-icons/ri";
import { showToast } from "../core/Toast";
import { LuLogIn } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function JoinRoom() {
  const [isPending, startTransition] = useTransition();
  const [roomId, setRoomId] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      showToast("error", "Authentication Required", "Please sign in to join a room");
      router.push("/auth");
      return;
    }

    if (roomId.trim().length < 6) {
      showToast("error", "Error", "Room name must be at least 6 characters");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(`/api/room/${roomId}`);
        const room = await response.json();

        if(response.ok) {
          router.push(`/multiplayer/room/${roomId}`);
          showToast("success", "Success", "Joined room successfully!");
        } else {
          showToast('error', "Error", `${room.error || "Room not found!"}`);
        }
      } catch (error) {
        console.error(error);
        showToast('error', 'Error', "Something went wrong!");
      }
    });
  };

  return (
    <div className="rounded-xl bg-theme-bg w-full max-w-[500px] space-y-4">
      <div className="flex items-center justify-center gap-3 text-theme-main">
        <h1 className="text-2xl font-bold">Join Room</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Room Name"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              className="w-full rounded-md bg-theme-sub-alt px-4 p-2 text-theme-text placeholder-theme-sub outline-none ring-0 transition-all focus:ring-2 focus:ring-theme-text"
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
                <LuLogIn className="font-bold" />
                <span>Join Room</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
