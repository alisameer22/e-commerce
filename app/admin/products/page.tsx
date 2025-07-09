// app/admin/products/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin - Products</h1>
      <ul className="space-y-2">
        {products.map((product: any) => (
          <li key={product.id} className="border p-4 rounded-lg">
            <strong>{product.name}</strong>
            <p>{product.description}</p>
            <p>${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
