// app/admin/products/page.tsx (Server Component)
import { cookies } from 'next/headers';
import {  PrismaClient } from '@/lib/generated/prisma';
import jwt from 'jsonwebtoken';
import Link from 'next/link';

const prisma = new PrismaClient();
export default async function AdminProductsPage() {
  const token = (await cookies()).get('token')?.value;
  const payload: any = jwt.verify(token!, process.env.JWT_SECRET!);

  const products = await prisma.product.findMany({
    where: { storeId: payload.storeId },
  });

  return (
    
    <div className="p-6">
      <Link className="bg-black text-white px-1 py-1 rounded" href={'/admin/products/new'} > add products </Link>
      <h1 className="text-2xl font-bold mb-4">Your Products</h1>
      <ul className="space-y-2">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded">
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
