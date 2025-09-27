'use client';

import { useState } from 'react';
import { Plus, Package, LogOut, Store, Menu, X } from 'lucide-react';
import Link from 'next/link';

export default function ResponsiveSidebar({ 
  storeName 
}: { 
  storeName: string 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-black border-b-4 border-white p-4 z-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-400 border-2 border-white flex items-center justify-center">
            <Store className="w-4 h-4 text-black" />
          </div>
          <div>
            <h2 className="text-white font-black text-sm uppercase">{storeName}</h2>
            <div className="text-yellow-400 text-xs font-mono">ADMIN</div>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-white p-2"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-black border-r-4 border-white transform transition-transform duration-300 z-50 ${
        mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 pt-20">
          <nav className="space-y-3">
            <Link 
              href="/admin/products/new"
              className="w-full bg-red-500 text-white p-3 font-black uppercase text-sm border-3 border-white hover:bg-white hover:text-red-500 transition-colors flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Plus className="w-5 h-5" />
              <span>ADD PRODUCT</span>
            </Link>

            <Link 
              href="/admin/products/"
              className="w-full bg-white text-black p-3 font-black uppercase text-sm border-3 border-yellow-400 flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Package className="w-5 h-5" />
              <span>PRODUCTS</span>
            </Link>
            <Link 
              href="/admin/products/ORDERS"
              className="w-full bg-white text-black p-3 font-black uppercase text-sm border-3 border-yellow-400 flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Package className="w-5 h-5" />
              <span>ORDERS</span>
            </Link>

            <form action="/api/auth/logout" method="POST" className="w-full">
              <button 
                type="submit"
                className="w-full bg-gray-800 text-white p-3 font-black uppercase text-sm border-3 border-white hover:bg-white hover:text-gray-800 transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>LOGOUT</span>
              </button>
            </form>
          </nav>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block fixed left-0 top-0 h-full bg-black border-r-8 border-white w-72 z-40">
        <div className="p-6">
          {/* Store Logo/Name */}
          <div className="mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-400 border-4 border-white flex items-center justify-center">
                <Store className="w-6 h-6 text-black" />
              </div>
              <div>
                <h2 className="text-white font-black text-xl uppercase">{storeName}</h2>
                <div className="text-yellow-400 text-xs font-mono">ADMIN PANEL</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="space-y-4">
            <Link 
              href="/admin/products/new"
              className="w-full bg-red-500 text-white p-4 font-black uppercase border-4 border-white hover:bg-white hover:text-red-500 transition-colors flex items-center space-x-3"
            >
              <Plus className="w-6 h-6" />
              <span>ADD PRODUCT</span>
            </Link>
            
            <Link 
              href="/admin/products/"
              className="w-full bg-white text-black p-4 font-black uppercase border-4 border-yellow-400 flex items-center space-x-3"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Package className="w-6 h-6" />
              <span>PRODUCTS</span>
            </Link>
<Link 
              href="/admin/products/orders"
              className="w-full black text-white p-3 font-black uppercase text-sm border-3 border-yellow-400 flex items-center space-x-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Package className="w-5 h-5" />
              <span>ORDERS</span>
            </Link>
            <form action="/api/auth/logout" method="POST" className="w-full">
              <button 
                type="submit"
                className="w-full bg-gray-800 text-white p-4 font-black uppercase border-4 border-white hover:bg-white hover:text-gray-800 transition-colors flex items-center space-x-3"
              >
                <LogOut className="w-6 h-6" />
                <span>LOGOUT</span>
              </button>
            </form>
          </nav>
        </div>
      </div>
    </>
  );
}