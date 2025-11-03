'use client';
import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, X } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();

  const shipping = 50;
  const vatRate = 0.2;
  const vat = getCartTotal() * vatRate;
  const grandTotal = getCartTotal() + shipping + vat;

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-8">Your Cart is Empty</h1>
            <Link href="/" className="bg-orange-500 text-white px-8 py-4 font-bold">
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">SHOPPING CART</h1>
          
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-sm border mb-8">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-6 border-b last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-xs">IMG</span>
                  </div>
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="text-gray-600">${item.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-gray-100 px-3 py-2">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="hover:text-orange-500"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="hover:text-orange-500"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-gray-100 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span>VAT (20%):</span>
                <span>${vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                <span>Grand Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={clearCart}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-black py-3 px-6 rounded font-bold"
              >
                Clear Cart
              </button>
              <Link 
                href="/checkout"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded font-bold text-center"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}