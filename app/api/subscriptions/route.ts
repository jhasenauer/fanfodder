import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

const subscriptions = [
  { id: 1, title: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { id: 2, title: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/feed/' },
];

export async function GET() {
  // return all user subscriptions
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });


  const feeds = await prisma.subscription.findMany({
    where: { userId: session.user.id },
    include: { feed: true },
    orderBy: { createdAt: 'desc' },
  }).then(subs => subs.map(sub => ({
    id: sub.feed.id,
    title: sub.feed.title,
    url: sub.feed.url,
  })));

  return NextResponse.json(feeds);
}