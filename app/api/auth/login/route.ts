import { NextResponse } from 'next/server';
import { Prisma, PrismaClient } from '@/lib/generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { error } from 'console';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({where: { email }, });
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return NextResponse.json ({ error: 'Invalid password' }, { status: 401 });

  const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET!,
      { expiresIn: '7d', }
  );

  const res = NextResponse.json({ success: true });
  res.cookies.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return res;
}