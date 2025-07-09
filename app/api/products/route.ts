// app/api/products/route.ts
import { Prisma, PrismaClient } from '@/lib/generated/prisma';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, description, price, image } = body;

  const product = await prisma.product.create({
    data: { name, description, price: parseFloat(price), image },
  });

  return NextResponse.json(product);
}
