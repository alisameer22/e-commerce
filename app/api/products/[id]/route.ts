import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@/lib/generated/prisma';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    const productId = params.id;

    // Verify the product belongs to the user's store
    const product = await prisma.product.findFirst({
      where: {
        id: productId,
        storeId: payload.storeId,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Delete the product
    await prisma.product.delete({
      where: { id: productId },
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' }, 
      { status: 500 }
    );
  }
} export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication
    const token = (await cookies()).get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const payload: any = jwt.verify(token, process.env.JWT_SECRET!);
    const productId = params.id;
    const body = await request.json();

    // Verify the product belongs to the user's store
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        storeId: payload.storeId,
      },
    });

    if (!existingProduct) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name: body.name,
        description: body.description,
        price: parseFloat(body.price),
        image: body.image,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' }, 
      { status: 500 }
    );
  }
}