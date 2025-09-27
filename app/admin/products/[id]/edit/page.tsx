import { cookies } from 'next/headers';
import { PrismaClient } from '@/lib/generated/prisma';
import jwt from 'jsonwebtoken';
import { notFound } from 'next/navigation';
import EditProductForm from './EditProductForm';

const prisma = new PrismaClient();

export default async function EditProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const token = (await cookies()).get('token')?.value;
  const payload: any = jwt.verify(token!, process.env.JWT_SECRET!);
  
  const product = await prisma.product.findFirst({
    where: {
      id: params.id,
      storeId: payload.storeId, // Ensure user can only edit their own products
    },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-yellow-200 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-8">
          <h1 className="text-4xl font-black uppercase mb-6">EDIT PRODUCT</h1>
          <EditProductForm product={product} />
        </div>
      </div>
    </div>
  );
}