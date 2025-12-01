import NextAuth from "next-auth";
import { cookies } from "next/headers";
import { getAuthOptions } from "@/entities/user";

export const runtime = "nodejs";

const authHandler = NextAuth(getAuthOptions(cookies));

export { authHandler as GET, authHandler as POST };
