// app/admin/products/page.tsx (Server Component)
import { cookies } from 'next/headers';
import { PrismaClient } from '@/lib/generated/prisma';
import jwt from 'jsonwebtoken';
import Link from 'next/link';
import { Trash2, Edit, Plus, LogOut, Store, Package } from 'lucide-react';
import DeleteButton from '../components/DeleteButton';
import ResponsiveSidebar from '../components/ResponsiveSidebar';

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
                ORDERS
              </h1>
              <div className="bg-yellow-400 text-black px-3 lg:px-4 py-1 inline-block font-mono text-xs lg:text-sm border-2 border-black">
                {products.length} ORDERS AVAILABLE
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
        <main className="bg-red-500 text-white px-4 lg:px-6 py-2 lg:py-3 font-black text-sm lg:text-base border-2 lg:border-4 border-black">
          finish this page later
        </main>

      {/* Floating decorative elements - Hidden on mobile */}
      <div className="hidden lg:block fixed bottom-4 right-4 w-8 h-8 bg-red-500 border-2 border-black rotate-45"></div>
      <div className="hidden lg:block fixed top-20 right-8 w-6 h-6 bg-blue-500 border-2 border-black"></div>
    </div></div>
  );
}