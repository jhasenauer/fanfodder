"use client";
import React, { useState } from "react";
import axios from "axios";

export default function ManagePage() {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  async function addFeed(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/feeds", { url });
      setStatus("Added & subscribed!");
      setUrl("");
    } catch (err: any) {
      setStatus(err?.response?.data?.error || "Failed");
    }
  }

  return (
    <div className="max-w-xl bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-3">Add feed</h2>
      <form onSubmit={addFeed} className="space-y-3">
        <input value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="https://..." className="w-full border p-2 rounded" />
        <div>
          <button type="submit" className="px-4 py-2 bg-slate-800 text-white rounded">Subscribe</button>
        </div>
        {status && <div className="text-sm text-slate-600">{status}</div>}
      </form>
    </div>
  );
}
