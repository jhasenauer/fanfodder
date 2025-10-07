import "../styles/globals.css";
import { ReactNode } from "react";
import { auth } from "@/auth";
import Link from "next/link";

export const metadata = {
  title: "RSS Aggregator",
  description: "A simple RSS reader & aggregator",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="border-b bg-white/80 backdrop-blur sticky top-0 z-20">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <Link href="/" className="font-bold text-lg">FanFodder RSS</Link>
            <nav className="flex items-center gap-4">
              <Link href="/" className="text-sm">Reader</Link>
              <Link href="/manage" className="text-sm">Manage</Link>
              {session ? (
                <form action="/api/auth/signout" method="post">
                  <button type="submit" className="text-sm">Log Out</button>
                </form>
              ) : (
                <Link href="/login" className="text-sm">Log In</Link>
              )}
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
