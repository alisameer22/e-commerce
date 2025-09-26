'use client';

import { useCart } from "./CartProvider";

export default function CartButton() {
  const { getTotalItems, setIsCartOpen } = useCart();
  const totalItems = getTotalItems();

  return (
    <button 
      onClick={() => setIsCartOpen(true)}
      className="relative bg-red-500 text-white px-6 py-3 font-black text-lg border-4 border-black transform -rotate-1 hover:rotate-0 transition-transform duration-200"
    >
      CART
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black w-8 h-8 rounded-none border-2 border-black flex items-center justify-center font-black text-sm">
          {totalItems}
        </span>
      )}
    </button>
  );
}