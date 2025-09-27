// app/admin/products/page.tsx (Server Component)
import { cookies } from 'next/headers';
import { PrismaClient } from '@/lib/generated/prisma';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { Trash2, Edit, Plus, LogOut, Store, Package } from 'lucide-react';
import DeleteButton from './components/DeleteButton';
import ResponsiveSidebar from './components/ResponsiveSidebar';

const prisma = new PrismaClient();

export default async function AdminProductsPage({ params }: { params: { storeName: string } }) {
  
  const token = (await cookies()).get('token')?.value;
  const payload: any = jwt.verify(token!, process.env.JWT_SECRET!);
  const { storeName } = params;
  
  const products = await prisma.product.findMany({
    where: { storeId: payload.storeId },
  });

  const store = await prisma.store.findMany({
    where: { id: payload.storeId },
  });

  return (
    <div className="min-h-screen bg-yellow-200">
      {/* Responsive Sidebar */}
      <ResponsiveSidebar storeName={store[0]?.name ?? 'STORE'} />

      {/* Main Content - Responsive margins */}
      <div className="lg:ml-72 ml-0 pt-16 lg:pt-0">
        {/* Header */}
        <header className="bg-white border-b-4 lg:border-b-8 border-black p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-4xl font-black uppercase tracking-tight text-black mb-2">
                PRODUCT MANAGEMENT
              </h1>
              <div className="bg-yellow-400 text-black px-3 lg:px-4 py-1 inline-block font-mono text-xs lg:text-sm border-2 border-black">
                {products.length} PRODUCTS AVAILABLE
              </div>
            </div>
            <div className="flex space-x-2 lg:space-x-4">
              <Link 
              href={`/${store[0]?.name}`}
              className="bg-red-500 text-white px-4 lg:px-6 py-2 lg:py-3 font-black text-sm lg:text-base border-2 lg:border-4 border-black transform rotate-1 lg:rotate-2">
                LIVE STORE
              </Link>
            </div>
          </div>
        </header>

        {/* Products Grid */}
        <main className="p-4 lg:p-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white border-2 lg:border-4 border-black shadow-[4px_4px_0px_0px_#000000] lg:shadow-[8px_8px_0px_0px_#000000]">
                  {/* Product Image */}
                  <div className="relative">
                    <img 
                      src={product.image || '/placeholder-product.jpg'} 
                      alt={product.name}
                      className="w-full h-32 sm:h-40 lg:h-48 object-cover border-b-2 lg:border-b-4 border-black"
                    />
                    <div className="absolute top-1 lg:top-2 right-1 lg:right-2 bg-yellow-400 text-black px-1 lg:px-2 py-1 font-black text-xs border-1 lg:border-2 border-black">
                      #{product.id}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 lg:p-6">
                    <h3 className="text-lg lg:text-xl font-black uppercase mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 font-mono text-xs lg:text-sm mb-3 lg:mb-4 leading-relaxed line-clamp-2 lg:line-clamp-none">
                      {product.description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center justify-between mb-3 lg:mb-4">
                      <div className="bg-black text-white px-2 lg:px-4 py-1 lg:py-2 font-black text-sm lg:text-xl">
                        ${product.price}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="flex-1 bg-blue-500 text-white p-2 lg:p-3 font-black uppercase text-xs lg:text-sm border-2 lg:border-3 border-black hover:bg-white hover:text-blue-500 transition-colors flex items-center justify-center space-x-1 lg:space-x-2"
                      >
                        <Edit className="w-3 h-3 lg:w-4 lg:h-4" />
                        <span>EDIT</span>
                      </Link>
                      <DeleteButton 
                        productId={product.id}
                        className="flex-1 bg-red-500 text-white p-2 lg:p-3 font-black uppercase text-xs lg:text-sm border-2 lg:border-3 border-black hover:bg-white hover:text-red-500 transition-colors flex items-center justify-center space-x-1 lg:space-x-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-8 lg:py-16">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-200 border-2 lg:border-4 border-black mx-auto mb-4 lg:mb-6 flex items-center justify-center">
                <Package className="w-12 h-12 lg:w-16 lg:h-16 text-gray-400" />
              </div>
              <h3 className="text-xl lg:text-2xl font-black uppercase mb-2 lg:mb-4">NO PRODUCTS YET</h3>
              <p className="text-gray-600 font-mono text-sm lg:text-base mb-4 lg:mb-6">Start building your inventory</p>
              <Link 
                href="/admin/products/new"
                className="bg-red-500 text-white px-6 lg:px-8 py-3 lg:py-4 font-black uppercase text-sm lg:text-base border-2 lg:border-4 border-black hover:bg-white hover:text-red-500 transition-colors inline-block"
              >
                ADD YOUR FIRST PRODUCT
              </Link>
            </div>
          )}
        </main>
      </div>

      {/* Floating decorative elements - Hidden on mobile */}
      <div className="hidden lg:block fixed bottom-4 right-4 w-8 h-8 bg-red-500 border-2 border-black rotate-45"></div>
      <div className="hidden lg:block fixed top-20 right-8 w-6 h-6 bg-blue-500 border-2 border-black"></div>
    </div>
  );
}