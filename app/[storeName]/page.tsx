// app/[storeName]/page.tsx
import { Prisma, PrismaClient } from '@/lib/generated/prisma';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface Props {
  params: { storeName: string };
}

export default async function Storefront({ params }: Props) {
  const store = await prisma.store.findFirst({
    where: { name: decodeURIComponent(params.storeName) },
    include: { products: true },
  });

  if (!store) return notFound();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{store.name} – Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {store.products.map((product) => (
          <div key={product.id} className="border rounded p-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover mb-2 rounded"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm mt-1">{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
