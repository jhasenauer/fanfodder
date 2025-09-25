import { NextRequest, NextResponse } from "next/server";
import Parser from "rss-parser";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

const parser = new Parser();

export async function GET(req: NextRequest) {
  // return all feeds (public)
  const feeds = await prisma.feed.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(feeds);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { url } = body;
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  // check if feed exists
  let feed = await prisma.feed.findUnique({ where: { url } });
  if (!feed) {
    // parse feed
    try {
      const parsed = await parser.parseURL(url);
      feed = await prisma.feed.create({
        data: {
          url,
          title: parsed.title,
          description: parsed.description,
          link: parsed.link,
          icon: (parsed.image && parsed.image.url) || undefined,
          lastFetched: new Date(),
        },
      });

      // create items
      const createItems = parsed.items.map((it) => ({
        feedId: feed!.id,
        guid: it.guid || it.link || it.isoDate || it.title || Math.random().toString(36),
        title: it.title,
        link: it.link,
        content: it.content,
        contentSnippet: it.contentSnippet,
        isoDate: it.isoDate ? new Date(it.isoDate) : undefined,
        author: it.creator || it.author,
      })).filter(Boolean);

      for (const item of createItems) {
        try {
          await prisma.feedItem.create({
            data: item as any,
          });
        } catch (e) {
          // ignore duplicates via unique constraint
        }
      }
    } catch (err) {
      return NextResponse.json({ error: "Failed to parse feed" }, { status: 400 });
    }
  }

  // create subscription for user (if not exists)
  const already = await prisma.subscription.findUnique({
    where: {
      userId_feedId: {
        userId: session.user.id,
        feedId: feed.id,
      },
    },
  }).catch(() => null);

  if (!already) {
    await prisma.subscription.create({
      data: {
        userId: session.user.id,
        feedId: feed.id,
      },
    });
  }

  return NextResponse.json({ feed });
}
