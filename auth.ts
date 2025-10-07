import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { User } from '@/lib/definitions';
import bcrypt from 'bcrypt';
import postgres from 'postgres';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from 'next-auth';
import prisma from '@/lib/prisma';
import authConfig from "@/auth.config"
 
const isProd = process.env.NODE_ENV === "production";

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not set in environment variables.');
}
 
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
 
async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User[]>`SELECT * FROM users WHERE email=${email}`;
    console.log('Fetched user:', user);
    return user[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  ...authConfig,
  session: {
    strategy: 'jwt',
  },
  // providers: [
  //   Credentials({
  //     name: 'credentials',
  //     credentials: {
  //       email: { label: 'email', type: 'text' },
  //       password: { label: 'password', type: 'password' },
  //     },
  //     async authorize(credentials) {
  //       const parsedCredentials = z
  //         .object({ email: z.string().email(), password: z.string().min(6) })
  //         .safeParse(credentials);
 
  //       if (parsedCredentials.success) {
  //         const { email, password } = parsedCredentials.data;
  //         const user = await getUser(email);
  //         if (!user) return null;
  //         const passwordsMatch = await bcrypt.compare(password, user.password);
  //         if (passwordsMatch) return user;
  //       }

  //       console.error('Invalid credentials');
  //       return null;
  //     },
  //   }),
  //   GitHub,
  //   Google
  // ],
  callbacks: {
    // authorized({ auth, request: { nextUrl } }) {
      // Checking if the user is logged in
      // const isLoggedIn = !!auth?.user;
      // Determining if the user is currently on the dashboard
      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // Handling authorization logic based on user status and location
      // if (isOnDashboard) {
        // Redirecting unauthenticated users to the login page when attempting to access dashboard-related pages
        // return isLoggedIn;
      // } else if (isLoggedIn) {
        // Redirecting authenticated users to the dashboard if they attempt to access authentication-related pages like login/signup
        // return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));
      // }
      // Allowing access for other scenarios
      // return true;

    // },
    async jwt({ token, user }) {
      console.log('JWT callback - user:', user);
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback - token:', token);
      if (token && session.user) session.user.id = token.id as string;
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   // Ensuring the redirect URL is within the same origin for security reasons
    //   if (url.startsWith(baseUrl)) return url;
    //   // Defaulting to the base URL if the provided URL is external
    //   else if (url.startsWith('/')) return new URL(url, baseUrl).toString();
    //   return baseUrl;
    // }
  },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: isProd,
      },
    },
  }
});