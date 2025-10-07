import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "20");

  // grab items for user's subscriptions, join userFeedItem to include isRead/isStarred
  const items = await prisma.userFeedItem.findMany({
    where: {
      subscription: {
        userId: session.user.id,
      },
    },
    include: {
      feedItem: {
        include: {
          feed: true,
        },
      },
      subscription: true,
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return NextResponse.json(items);
}
