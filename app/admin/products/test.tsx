// app/admin/products/page.tsx (Server Component)
import { cookies } from 'next/headers';
import { PrismaClient } from '@/lib/generated/prisma';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { Trash2, Edit, Plus, LogOut, Store, Package } from 'lucide-react';
import DeleteButton from './components/DeleteButton';

const prisma = new PrismaClient();

export default async function AdminProductsPage({ params }: { params: { storeName: string } }) {
  const token = (await cookies()).get('token')?.value;
  const payload: any = jwt.verify(token!, process.env.JWT_SECRET!);
  const { storeName } = params;
  
  const products = await prisma.product.findMany({
    where: { storeId: payload.storeId },
  });

  const store = await prisma.store.findFirst({
    where: { name: decodeURIComponent(storeName) },
  });

  return (
    <div className="min-h-screen bg-yellow-200">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full bg-black border-r-8 border-white w-72 z-50">
        <div className="p-6">
          {/* Store Logo/Name */}
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400 border-4 border-white flex items-center justify-center">
                <Store className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-white font-black text-xl uppercase">
                  {store ? store.name : 'STORE'}
                </h2>
                <div className="text-yellow-400 text-xs font-mono">ADMIN PANEL</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            <Link 
              href="/admin/products/new"
              className="w-full bg-red-500 text-white p-4 font-black uppercase border-4 border-white hover:bg-white hover:text-red-500 transition-colors flex items-center space-x-3 block text-center"
            >
              <Plus className="w-6 h-6" />
              <span>ADD PRODUCT</span>
            </Link>

            <div className="w-full bg-white text-black p-4 font-black uppercase border-4 border-yellow-400 flex items-center space-x-3">
              <Package className="w-6 h-6" />
              <span>PRODUCTS</span>
            </div>

            <form action="/api/auth/logout" method="POST" className="w-full">
              <button 
                type="submit"
                className="w-full bg-gray-800 text-white p-4 font-black uppercase border-4 border-white hover:bg-white hover:text-gray-800 transition-colors flex items-center space-x-3"
              >
                <LogOut className="w-6 h-6" />
                <span>LOGOUT</span>
              </button>
            </form>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-72">
        {/* Header */}
        <header className="bg-white border-b-8 border-black p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-black mb-2">
                PRODUCT MANAGEMENT
              </h1>
              <div className="bg-yellow-400 text-black px-4 py-1 inline-block font-mono text-sm border-2 border-black">
                {products.length} PRODUCTS AVAILABLE
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="bg-red-500 text-white px-6 py-3 font-black border-4 border-black transform rotate-2">
                LIVE STORE
              </div>
            </div>
          </div>
        </header>

        {/* Products Grid */}
        <main className="p-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000]">
                  {/* Product Image */}
                  <div className="relative">
                    <img 
                      src={product.image || '/placeholder-product.jpg'} 
                      alt={product.name}
                      className="w-full h-48 object-cover border-b-4 border-black"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 font-black text-xs border-2 border-black">
                      #{product.id}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-black uppercase mb-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 font-mono text-sm mb-4 leading-relaxed">
                      {product.description || 'No description available'}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="bg-black text-white px-4 py-2 font-black text-xl">
                        ${product.price}
                      </div>
                      
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="flex-1 bg-blue-500 text-white p-3 font-black uppercase border-3 border-black hover:bg-white hover:text-blue-500 transition-colors flex items-center justify-center space-x-2"
                      >
                        <Edit className="w-4 h-4" />
                        <span>EDIT</span>
                      </Link>
                      <DeleteButton 
                        productId={product.id}
                        className="flex-1 bg-red-500 text-white p-3 font-black uppercase border-3 border-black hover:bg-white hover:text-red-500 transition-colors flex items-center justify-center space-x-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-gray-200 border-4 border-black mx-auto mb-6 flex items-center justify-center">
                <Package className="w-16 h-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-black uppercase mb-4">NO PRODUCTS YET</h3>
              <p className="text-gray-600 font-mono mb-6">Start building your inventory</p>
              <Link 
                href="/admin/products/new"
                className="bg-red-500 text-white px-8 py-4 font-black uppercase border-4 border-black hover:bg-white hover:text-red-500 transition-colors inline-block"
              >
                ADD YOUR FIRST PRODUCT
              </Link>
            </div>
          )}
        </main>
      </div>

      {/* Floating decorative elements */}
      <div className="fixed bottom-4 right-4 w-8 h-8 bg-red-500 border-2 border-black rotate-45"></div>
      <div className="fixed top-20 right-8 w-6 h-6 bg-blue-500 border-2 border-black"></div>
    </div>
  );
}