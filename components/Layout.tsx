'use client';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { getCartCount } = useCart();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center">
            <button className="md:hidden">☰</button>
            <Link href="/" className="text-2xl font-bold">
              audiophile
            </Link>
            <nav className="hidden md:flex gap-8">
              <Link href="/" className="hover:text-orange-500">HOME</Link>
              <Link href="/headphones" className="hover:text-orange-500">HEADPHONES</Link>
              <Link href="/speakers" className="hover:text-orange-500">SPEAKERS</Link>
              <Link href="/earphones" className="hover:text-orange-500">EARPHONES</Link>
            </nav>
            <Link href="/cart" className="relative">
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-2xl font-bold mb-8">audiophile</div>
              <p className="text-gray-400 max-w-md">
                Audiophile is an all in one stop to fulfill your audio needs. 
                We're a small team of music lovers and sound specialists.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-gray-400">
            <p>Copyright 2024. All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}