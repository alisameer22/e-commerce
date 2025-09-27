// app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';

// This route handles user logout by clearing the JWT token cookie
export async function POST() {
  try {
    const res = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
    
    // Clear the token cookie by setting it to expire immediately
    res.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0, // This expires the cookie immediately
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Failed to logout' }, 
      { status: 500 }
    );
  }
}

// Also handle GET requests in case someone navigates to the logout URL directly
export async function GET() {
  try {
    const res = NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
    
    // Clear the token cookie
    res.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 0,
      path: '/',
    });

    return res;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
  }
}