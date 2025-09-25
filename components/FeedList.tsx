"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

type UserFeedItem = {
  id: string;
  isRead: boolean;
  isStarred: boolean;
  feedItem: {
    id: string;
    title?: string;
    link?: string;
    contentSnippet?: string;
    feed: { title?: string };
  };
};

export default function FeedList() {
  const [items, setItems] = useState<UserFeedItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get("/api/user/items").then((r) => {
      setItems(r.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!items.length) return <div>No items yet — subscribe to a feed!</div>;

  return (
    <div className="space-y-3">
      {items.map(i => (
        <article key={i.id} className="p-3 border rounded hover:shadow-sm">
          <div className="flex justify-between">
            <h3 className="font-medium">{i.feedItem.title}</h3>
            <div className="flex gap-2 text-sm">
              <button className="px-2" onClick={() => { /* toggle read */ }}>Mark Read</button>
              <button className="px-2" onClick={() => { /* toggle star */ }}>Star</button>
            </div>
          </div>
          <p className="text-sm text-slate-600">{i.feedItem.contentSnippet}</p>
          <div className="text-xs text-slate-500 mt-2">Source: {i.feedItem.feed.title}</div>
        </article>
      ))}
    </div>
  );
}
