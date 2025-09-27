// app/[storeName]/page.tsx
import { PrismaClient } from '@/lib/generated/prisma';
import { notFound } from 'next/navigation';
import CartProvider from '../components/CartProvider';
import CartButton from '../components/CartButton';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/CartModal';
import ScrollingHeader from '../components/ScrollingHeader';

const prisma = new PrismaClient();

type PageProps = {
  params: Promise<{ storeName: string }>;
};

export default async function Storefront({ params }: PageProps) {

  const { storeName } = await params;
     
  const store = await prisma.store.findFirst({
    where: { name: decodeURIComponent(storeName) },
    include: { products: true },
  });

  if (!store) return notFound();

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        {/* Scrolling Header - Responsive */}
        <ScrollingHeader store={store} />

        {/* Main Content - Reduced top padding for mobile */}
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pt-20 sm:pt-28 lg:pt-44">
          {store.products.length === 0 ? (
            <div className="text-center py-16 sm:py-24">
              <div className="bg-black text-white p-6 sm:p-8 inline-block transform -rotate-1">
                <div className="text-4xl sm:text-6xl mb-4">🏪</div>
                <h3 className="text-xl sm:text-2xl font-black uppercase">NO PRODUCTS</h3>
              </div>
              <p className="text-lg sm:text-xl font-mono mt-6">COMING SOON...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {store.products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </main>

        <CartModal />

        {/* Footer - Responsive */}
        <footer className="border-t-2 lg:border-t-4 border-black bg-black text-white mt-12 sm:mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400"></div>
                <p className="font-black text-base sm:text-lg uppercase tracking-wide">
                  © 2024 {store.name}
                </p>
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-500"></div>
              </div>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-8 font-mono text-xs sm:text-sm">
                <span className="bg-white text-black px-2 sm:px-3 py-1">SECURE</span>
                <span className="bg-white text-black px-2 sm:px-3 py-1">FAST</span>
                <span className="bg-white text-black px-2 sm:px-3 py-1">EASY</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}