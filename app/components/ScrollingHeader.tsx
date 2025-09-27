'use client';

import { useState, useEffect } from 'react';
import CartButton from './CartButton';

interface Store {
  name: string;
  products: any[];
}

export default function ScrollingHeader({ store }: { store: Store }) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 border-b-2 lg:border-b-4 border-black bg-white transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Mobile Compact Header */}
      <div className="sm:hidden px-4 py-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-black uppercase text-black leading-tight">
              {store.name}
            </h1>
            <div className="bg-yellow-400 text-black px-2 py-0.5 text-xs font-black border border-black inline-block">
              {store.products.length} ITEMS
            </div>
          </div>
          <CartButton />
        </div>
      </div>

      {/* Tablet & Desktop Header */}
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-6 py-4 lg:py-8">
          <div className="flex flex-row items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-5xl font-black uppercase tracking-tight text-black leading-tight">
                {store.name}
              </h1>
              <div className="mt-2 bg-black text-white px-3 py-1 inline-block font-mono text-sm">
                PREMIUM COLLECTION
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-400 text-black px-4 lg:px-6 py-2 lg:py-3 font-black text-base lg:text-lg border-2 lg:border-4 border-black transform rotate-1 lg:rotate-2">
                {store.products.length} ITEMS
              </div>
              <CartButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}