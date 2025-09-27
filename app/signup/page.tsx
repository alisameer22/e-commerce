'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeName, setStoreName] = useState('');
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, storeName }),
    });

    if (res.ok) {
      router.push('/admin/products');
    } else {
      alert('Signup failed');
    }
  }

  return (
    <div className="min-h-screen bg-yellow-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] p-8">
      <div className="mb-8">
      <h1 className="text-4xl font-black uppercase tracking-tight mb-2">
        Create Your Store</h1>
        <div className="w-16 h-1 bg-black"></div>
          </div>
          <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="block text-sm font-bold uppercase tracking-wide">

        <input
          type="text"
          placeholder="Store Name"
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          value={storeName}
          onChange={e => setStoreName(e.target.value)}
          required
        /></div>
        <div className="block text-sm font-bold uppercase tracking-wide">

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        /></div>
        <div className="block text-sm font-bold uppercase tracking-wide">
        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 border-3 border-black bg-white text-lg font-mono focus:outline-none focus:shadow-[4px_4px_0px_0px_#000000] transition-shadow"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        /></div>
        <button className="w-full bg-black text-white text-xl font-black uppercase py-4 px-6 border-3 border-black hover:bg-white hover:text-black transition-colors duration-200 shadow-[4px_4px_0px_0px_#666666] hover:shadow-[4px_4px_0px_0px_#000000] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_#000000]">
          Sign Up
        </button>
      </form><div className="mt-9 flex justify-between items-center">
            <div className="w-8 h-8 bg-black"></div>
            <h1 className="text-xs font-mono uppercase tracking-widest opacity-80 ">Have an account?</h1>
            <button
              type="button"
              className="text-xs font-mono uppercase tracking-widest opacity-100 hover:underline"
              onClick={() => router.push('/login')}
            >
              Login Here!
            </button>
            <div className="w-8 h-8 bg-yellow-300 border-2 border-black"></div>
          </div>
        </div>
      </div>
      <div className="relative">
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 border-2 border-black"></div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-blue-500 border-2 border-black rotate-45"></div>
        </div>
      </div>
      
      </div>
  );
}
