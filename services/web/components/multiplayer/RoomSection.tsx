'use client'

import { useEffect, useState, use, useCallback } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import useSocket from "@/hooks/useSocket";
import { Room as RoomType } from "@prisma/client";
import { Member } from "@/types/member";
import { RiLoader4Line } from "react-icons/ri";
import RoomHeader from "./RoomHeader";
import Chat from "./RoomChat";
import Members from "./RoomMembers";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

interface RoomSectionProps {
  code: string;
}

export default function RoomSection({ code }: RoomSectionProps) {
  const { data: session, status } = useSession();
  const [roomData, setRoomData] = useState<RoomType | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isRaceStarted, setIsRaceStarted] = useState(false);

  const socket = useSocket();

  useEffect(() => {
    const getRoomData = async () => {
      const response = await fetch(`/api/room/${code}`);
      const data = await response.json();
      setRoomData(data);
    };

    if (code) {
      getRoomData();
    }
  }, [code]);

  const joinRoom = useCallback(() => {
    if (status === "loading") return;
    if (!session?.user || !socket) return;

    socket.send(
      JSON.stringify({
        type: "JOIN_ROOM",
        userId: session?.user?.id,
        roomCode: code,
        userData: {
          username: session?.user?.username,
          image: session?.user?.image,
        },
      })
    );

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "ROOM_MEMBERS":
          setMembers(data.members);
          break;
      }
    };
  }, [code, socket, status]);

  useEffect(() => {
    joinRoom();
  }, [joinRoom]);

  if (status === "loading") {
    return (
      <div className="h-screen grid place-items-center">
        <RiLoader4Line className="text-2xl text-theme-text animate-spin" />
      </div>
    );
  }

  const isHost = members.some(
    (member) => member.id === session?.user?.id && member.isHost
  );

  console.log("members: ", members)

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full mx-auto space-y-8 pb-16 px-4 sm:px-6 lg:px-8">
      <RoomHeader
          roomData={roomData}
          isHost={isHost}
          isRaceStarted={isRaceStarted}
        />

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {isRaceStarted ? (
            // <Race
            //   members={members}
            //   isRaceStarted={isRaceStarted}
            //   setIsRaceStarted={setIsRaceStarted}
            //   roomData={roomData}
            //   raceText={raceText}
            // />
            <></>
          ) : (
            <>
              <Chat code={code} />
              <Members members={members} />
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}