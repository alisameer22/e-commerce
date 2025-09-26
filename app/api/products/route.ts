// app/api/products/route.ts

import { PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
// Function to get storeId from JWT token
// This function extracts the storeId from the JWT token stored in cookies.
async function getStoreIdFromToken(): Promise<string | null> {
  const token = (await cookies()).get('token')?.value;
  if (!token) return null;

  try {
    type NewType = any;

    const payload: NewType = jwt.verify(token, process.env.JWT_SECRET!);
    return payload.storeId;
  } catch {
    return null;
  }
}

export async function GET() {
  const storeId = await getStoreIdFromToken();
  if (!storeId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const products = await prisma.product.findMany({
    where: { storeId },
  });

  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const storeId = await getStoreIdFromToken();
  if (!storeId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { name, description, price, image } = body;

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      image,
      storeId, // 👈 now it's scoped to this user's store
    },
  });

  return NextResponse.json(product);
}
