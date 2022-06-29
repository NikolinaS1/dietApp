import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req, res) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) return NextResponse.redirect(process.env.NEXTAUTH_URL);
  return NextResponse.next();
}
