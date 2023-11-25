import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = [/^\/$/];
export default async function middleware(req: NextRequest) {
  // Get the pathname of the request (e.g. /, /auth/signin)
  const path = req.nextUrl.pathname;

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session && protectedRoutes.some((route) => path.match(route))) {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  } else if (session && path === '/auth/signin') {
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}
