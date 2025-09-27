'use client';

import { useCart } from "./CartProvider";

export default function ProductCard({ product, index }: { product: any, index: number }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white border-2 lg:border-4 border-black shadow-[4px_4px_0px_0px_#000000] lg:shadow-[8px_8px_0px_0px_#000000] transform hover:scale-105 transition-transform">
      {/* Product Image - Responsive */}
      <div className="relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 sm:h-56 lg:h-64 object-cover border-b-2 lg:border-b-4 border-black"
        />
        {/* Price tag - Responsive */}
        <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 lg:px-3 py-1 font-black text-xs lg:text-sm border-2 border-black transform rotate-2">
          ${product.price}
        </div>
      </div>
      
      {/* Product Info - Responsive padding */}
      <div className="p-4 lg:p-6">
        <h3 className="text-lg sm:text-xl lg:text-2xl font-black uppercase mb-2 leading-tight">
          {product.name}
        </h3>
        <p className="text-gray-600 font-mono text-sm lg:text-base mb-4 leading-relaxed">
          {product.description}
        </p>
        
        {/* Add to Cart Button - Responsive */}
        <button
        onClick={() => addToCart(product)}
        className="w-full bg-black text-white p-3 lg:p-4 font-black uppercase text-sm lg:text-base border-2 lg:border-4 border-black hover:bg-white hover:text-black transition-colors">
          ADD TO CART
        </button>
      </div>
    </div>
  );
}