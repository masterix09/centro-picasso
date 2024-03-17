import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth/next";

export const handler = NextAuth(authOptions) as never;

export { handler as GET, handler as POST}