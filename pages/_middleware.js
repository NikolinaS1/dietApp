import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(req, res) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (session && req.url == process.env.BASE_URL + '/') {
    return NextResponse.redirect(process.env.BASE_URL + '/account');
  }

  return NextResponse.next();
}
