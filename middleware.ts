// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const url = req.nextUrl;

  if (url.pathname.startsWith('/admin')) {
    if (!token) return NextResponse.redirect(new URL('/login', req.url));

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;
      if (!payload?.storeId) {
        return NextResponse.redirect(new URL('/unauthorized', req.url));
      }

      // Add storeId to request (optional enhancement)
      req.headers.set('x-store-id', payload.storeId);
    } catch (e) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
