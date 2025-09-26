// app/products/[id]/page.tsx
import { Prisma, PrismaClient } from '@/lib/generated/prisma';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: PageProps) {
  const product = await prisma.product.findUnique({
    where: { id: (await params).id },
  });

  if (!product) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-700">{product.description}</p>
      <p className="mt-2 font-semibold">${product.price}</p>
    </div>
  );
}
