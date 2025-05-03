import prisma from "db/src";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const { code } = await params;
    if (!code || code.length < 6) {
      return NextResponse.json(
        { error: "Invalid or missing code" },
        { status: 400 }
      );
    }

    const room = await prisma.room.findUnique({
      where: { code },
      select: {
        id: true,
        code: true,
        name: true,
        mode: true,
        modeOption: true,
      },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    console.error("Error fetching room: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
