'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <input
          name="image"
          placeholder="Image URL"
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
