import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { generateRoomCode } from "@/lib/utils";
import prisma from "db/src";

export async function POST(request: NextRequest) {
  try {
    const { name, mode, modeOption } = await request.json();
    if (name.trim().length < 6) {
      return NextResponse.json(
        { msg: "Room name must be at least 6 characters" },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session || !session?.user.email || !session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized: No valid session found" },
        { status: 401 }
      );
    }

    const roomCode = generateRoomCode();
    const room = await prisma.room.create({
      data: {
        code: roomCode,
        name,
        mode,
        modeOption: Number(modeOption),
        userId: session?.user?.id,
      },
    });

    return NextResponse.json(room, {status: 200});
  } catch (error) {
    console.error("Error creating room: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};


export async function GET(request: NextRequest) {
  try {
    const room = await prisma.room.findMany({
      select: {
        id: true,
        code: true,
        name: true,
        mode: true,
        modeOption: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching public rooms: ", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};