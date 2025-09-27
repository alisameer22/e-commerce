'use client';
import { PrismaClient } from '@/lib/generated/prisma';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Trash2, Edit, Plus, LogOut, Store, Package } from 'lucide-react';
import ClientSidebar from '../components/ResponsiveSidebar';
import ResponsiveSidebar from '../components/ResponsiveSidebar';

const prisma = new PrismaClient();

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(form),
    });
    router.push('/admin/products');
  };

  return (
    <div className="min-h-screen bg-yellow-200">
      <ResponsiveSidebar storeName={Store ? Store.name : 'STORE'} />
      {/* Main Content */}
       <div className="lg:ml-72 ml-0 pt-16 lg:pt-0">
        {/* Header */}
        <header className="bg-white border-b-8 border-black p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight text-black mb-2">
                ADD NEW PRODUCT
              </h1>
              
            </div>

          </div>
        </header>
        {/* Products Grid */}
        <main className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          required
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          required
        />
        <div className="flex space-x-4">
        <button
          type="submit"
          className="flex-1 bg-blue-500 text-white p-4 font-black uppercase border-3 border-black hover:bg-white hover:text-blue-500 transition-colors disabled:opacity-50"
        >
          Add Product
        </button><Link
          href="/admin/products"
          className="flex-1 bg-gray-500 text-white p-4 font-black uppercase border-3 border-black hover:bg-white hover:text-gray-500 transition-colors flex items-center justify-center"
        >
          CANCEL
        </Link></div>
        
      </form></main>
    </div>
    </div>
  );
}
