import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  // 👀 Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      console.log('⛔ No token, redirecting to /login');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);

      // 🛑 If token doesn’t include storeId, block access
      if (!payload?.storeId) {
        console.log('⛔ Token exists but no storeId — redirecting to /unauthorized');
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      console.log('✅ Authenticated:', payload);
      return NextResponse.next();
    } catch (err) {
      console.error('⛔ Invalid token:', err);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // ✅ Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Only match /admin/** routes
};
