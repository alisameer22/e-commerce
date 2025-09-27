'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function EditProductForm({ 
  product 
}: { 
  product: any 
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product.name || '',
    description: product.description || '',
    price: product.price?.toString() || '',
    image: product.image || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT', // or PATCH
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        const error = await res.json();
        alert(`Failed to update product: ${error.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Failed to update product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">
          PRODUCT NAME
        </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">
          DESCRIPTION
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow resize-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">
          PRICE ($)
        </label>
        <input
          name="price"
          type="number"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-bold uppercase tracking-wide mb-2">
          IMAGE URL
        </label>
        <input
          name="image"
          type="url"
          value={form.image}
          onChange={handleChange}
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          required
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-500 text-white p-4 font-black uppercase border-3 border-black hover:bg-white hover:text-blue-500 transition-colors disabled:opacity-50"
        >
          {loading ? 'UPDATING...' : 'UPDATE PRODUCT'}
        </button>
        
        <Link
          href="/admin/products"
          className="flex-1 bg-gray-500 text-white p-4 font-black uppercase border-3 border-black hover:bg-white hover:text-gray-500 transition-colors flex items-center justify-center"
        >
          CANCEL
        </Link>
      </div>
    </form>
  );
}