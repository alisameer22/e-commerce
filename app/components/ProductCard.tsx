'use client';

import { useCart } from "./CartProvider";

export default function ProductCard({ product, index }: { product: any, index: number }) {
  const { addToCart } = useCart();

  return (
    <div className="group relative">
      {/* Product Card */}
      <div className="bg-white border-4 border-black p-0 transform transition-all duration-200 hover:-translate-x-2 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_#000000]">
        
        {/* Product Image */}
        <div className="relative h-64 bg-gray-100 border-b-4 border-black overflow-hidden">
          <img
            src={product.image || '/placeholder-product.jpg'}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {/* Price Tag Overlay */}
          <div className="absolute top-4 right-4">
            <div className="bg-red-500 text-white px-3 py-2 font-black text-lg border-2 border-black transform rotate-12">
              ${typeof product.price === 'number' ? product.price.toFixed(0) : product.price}
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-6">
          <h3 className="text-xl font-black uppercase tracking-wide text-black mb-3 line-clamp-2">
            {product.name}
          </h3>
          
          <p className="text-gray-700 font-mono text-sm mb-6 line-clamp-2">
            {product.description || 'NO DESCRIPTION'}
          </p>

          {/* Action Button */}
          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-black text-white py-4 font-black text-lg uppercase tracking-wide border-4 border-black transition-all duration-200 hover:bg-white hover:text-black active:transform active:translate-x-1 active:translate-y-1"
          >
            ADD TO CART
          </button>
        </div>
      </div>

      {/* Accent Elements */}
      <div 
        className={`absolute -top-2 -right-2 w-8 h-8 ${
          index % 3 === 0 ? 'bg-yellow-400' : 
          index % 3 === 1 ? 'bg-red-500' : 'bg-blue-500'
        } border-2 border-black transform rotate-45`}
      ></div>
    </div>
  );
}