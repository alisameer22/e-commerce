'use client';

import { useCart } from "./CartProvider";

export default function CartModal() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice 
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsCartOpen(false)}
      ></div>
      
      {/* Cart Content */}
      <div className="relative bg-white border-8 border-black max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Cart Header */}
        <div className="bg-black text-white p-6 flex justify-between items-center">
          <h2 className="text-3xl font-black uppercase">YOUR CART</h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="bg-red-500 text-white w-10 h-10 font-black text-xl border-2 border-white hover:bg-white hover:text-red-500 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-2xl font-black uppercase">CART IS EMPTY</p>
              <p className="font-mono mt-2">ADD SOME PRODUCTS!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 p-4 border-2 border-black">
                  <img 
                    src={item.image || '/placeholder-product.jpg'} 
                    alt={item.name}
                    className="w-16 h-16 object-cover border-2 border-black"
                  />
                  <div className="flex-1">
                    <h3 className="font-black uppercase text-sm">{item.name}</h3>
                    <p className="font-mono text-sm">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="bg-red-500 text-white w-8 h-8 font-black border-2 border-black hover:bg-white hover:text-red-500"
                    >
                      -
                    </button>
                    <span className="font-black text-lg px-2">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-green-500 text-white w-8 h-8 font-black border-2 border-black hover:bg-white hover:text-green-500"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="bg-black text-white w-8 h-8 font-black border-2 border-black hover:bg-white hover:text-black ml-2"
                    >
                      ×
                    </button>
                  </div>
                  <div className="font-black text-lg">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Footer */}
        {cart.length > 0 && (
          <div className="border-t-4 border-black p-6 bg-yellow-400">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-black uppercase">TOTAL:</span>
              <span className="text-3xl font-black">${getTotalPrice().toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-4 font-black text-xl uppercase tracking-wide border-4 border-black hover:bg-white hover:text-black transition-colors">
              CHECKOUT NOW
            </button>
          </div>
        )}
      </div>
    </div>
  );
}