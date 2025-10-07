import { NextResponse } from 'next/server';
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { getToken } from "next-auth/jwt";

const subscriptions = [
  { id: 1, title: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
  { id: 2, title: 'Smashing Magazine', url: 'https://www.smashingmagazine.com/feed/' },
];

export async function GET(req: Request) {
  // return all user subscriptions
  console.log('Fetching user subscriptions');
  const session = await auth();
  console.log(session == null ? 'No session' : 'Session exists');
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log('Token:', token);
  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }
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