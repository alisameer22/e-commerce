// app/[storeName]/page.tsx
import {  PrismaClient } from '@/lib/generated/prisma';
import { notFound } from 'next/navigation';
import CartProvider from '../components/CartProvider';
import CartButton from '../components/CartButton';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';

const prisma = new PrismaClient();

type PageProps = {
  params: Promise<{ storeName: string }>;
};

export default async function Storefront({ params }: PageProps) {
  // Await the params since they're now a Promise in Next.js 15
  const { storeName } = await params;
  
  const store = await prisma.store.findFirst({
    where: { name: decodeURIComponent(storeName) },
    include: { products: true },
  });

  if (!store) return notFound();

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        {/* Header */}
        <header className="border-b-4 border-black bg-white sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tight text-black">
                  {store.name}
                </h1>
                <div className="mt-2 bg-black text-white px-3 py-1 inline-block font-mono text-sm">
                  PREMIUM COLLECTION
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-yellow-400 text-black px-6 py-3 font-black text-lg border-4 border-black transform rotate-2">
                  {store.products.length} ITEMS
                </div>
                <CartButton />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-6 py-12">
          {store.products.length === 0 ? (
            <div className="text-center py-24">
              <div className="bg-black text-white p-8 inline-block transform -rotate-1">
                <div className="text-6xl mb-4">🏪</div>
                <h3 className="text-2xl font-black uppercase">NO PRODUCTS</h3>
              </div>
              <p className="text-xl font-mono mt-6">COMING SOON...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {store.products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </main>

        <CartModal />

        {/* Footer */}
        <footer className="border-t-4 border-black bg-black text-white mt-16">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-4 h-4 bg-yellow-400"></div>
                <p className="font-black text-lg uppercase tracking-wide">
                  © 2024 {store.name}
                </p>
                <div className="w-4 h-4 bg-red-500"></div>
              </div>
              <div className="flex justify-center space-x-8 font-mono text-sm">
                <span className="bg-white text-black px-3 py-1">SECURE</span>
                <span className="bg-white text-black px-3 py-1">FAST</span>
                <span className="bg-white text-black px-3 py-1">EASY</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
