import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { isRead, isStarred } = body;

  const ufi = await prisma.userFeedItem.findUnique({
    where: { id: params.id },
    include: { subscription: true },
  });

  if (!ufi || ufi.subscription.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const updated = await prisma.userFeedItem.update({
    where: { id: params.id },
    data: {
      isRead: typeof isRead === "boolean" ? isRead : undefined,
      isStarred: typeof isStarred === "boolean" ? isStarred : undefined,
    },
  });

  return NextResponse.json(updated);
}
