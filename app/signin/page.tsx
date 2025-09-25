import { getCsrfToken } from "next-auth/react";
import Link from "next/link";

export default async function SignIn() {
  // For App Router sr, we might present buttons; simplest: link to NextAuth sign in
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
      <div className="space-y-3">
        <a href="/api/auth/signin/github" className="block py-2 px-4 bg-slate-800 text-white rounded text-center">Sign in with GitHub</a>
      </div>
    </div>
  );
}
