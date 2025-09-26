// app/api/auth/signup/route.ts
// basic signup route for a Next.js application using Prisma and bcrypt
// This route handles user registration, including email and password validation,
// password hashing, and storing user data in the database.

import { PrismaClient } from '@/lib/generated/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const { email, password, storeName } = await req.json();

    // Check if user already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user= await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            store: {
                create: {
                    name: storeName,
                },
            },
        },
        include: {
            store: true,
        },
    });

    const token = jwt.sign(
        {userId: user.id, isAdmin: false, storeId: user.store?.id},
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
    );

    const res = NextResponse.json({ success: true });
    res.cookies.set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    });

    return res;
    
}