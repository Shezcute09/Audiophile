'use client';
import Layout from '@/components/Layout';
import { products } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/context/CartContext';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = products.find(p => p.id === params.id);
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <h1>Product not found</h1>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image
    };
    addToCart(cartItem);
    // Optional: Show confirmation or redirect to cart
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => router.back()}
          className="text-gray-500 hover:text-orange-500 mb-8"
        >
          Go Back
        </button>
        
        {/* Product Main Section */}
        <div className="flex flex-col lg:flex-row gap-20 mb-32">
          {/* Product Image */}
          <div className="flex-1 bg-gray-100 rounded-lg h-96 flex items-center justify-center">
            <span className="text-gray-400">Product Image: {product.name}</span>
          </div>
          
          {/* Product Info */}
          <div className="flex-1">
            {product.isNew && (
              <span className="text-orange-500 tracking-widest text-sm font-bold">NEW PRODUCT</span>
            )}
            <h1 className="text-4xl font-bold my-6">{product.name}</h1>
            <p className="text-gray-600 mb-8">{product.description}</p>
            <p className="text-lg font-bold mb-8">${product.price}</p>
            
            {/* Add to Cart Section */}
            <div className="flex gap-4">
              <div className="flex items-center gap-4 bg-gray-100 px-4 py-2">
                <button 
                  onClick={decrementQuantity}
                  className="text-gray-500 hover:text-orange-500 text-lg"
                >
                  -
                </button>
                <span className="font-bold w-8 text-center">{quantity}</span>
                <button 
                  onClick={incrementQuantity}
                  className="text-gray-500 hover:text-orange-500 text-lg"
                >
                  +
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-bold"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>

        {/* Features & In the Box */}
        <div className="flex flex-col lg:flex-row gap-32 mb-32">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-8">FEATURES</h2>
            <p className="text-gray-600 whitespace-pre-line">{product.features}</p>
          </div>
          
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-8">IN THE BOX</h2>
            <div className="space-y-2">
              {product.includes?.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-orange-500 font-bold">{item.quantity}x</span>
                  <span className="text-gray-600">{item.item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mb-32">
          <h2 className="text-3xl font-bold mb-8 text-center">GALLERY</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
              <span className="text-gray-400">Gallery Image 1</span>
            </div>
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
              <span className="text-gray-400">Gallery Image 2</span>
            </div>
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center md:col-span-2">
              <span className="text-gray-400">Gallery Image 3</span>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">YOU MAY ALSO LIKE</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products
              .filter(p => p.category === product.category && p.id !== product.id)
              .slice(0, 3)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="text-center">
                  <div className="bg-gray-100 rounded-lg h-48 mb-8 flex items-center justify-center">
                    <span className="text-gray-400">Related Product</span>
                  </div>
                  <h3 className="font-bold text-lg mb-4">{relatedProduct.name}</h3>
                  <Link 
                    href={`/product/${relatedProduct.id}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 font-bold inline-block"
                  >
                    SEE PRODUCT
                  </Link>
                </div>
              ))
            }
          </div>
        </div>

        {/* Category Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'HEADPHONES', href: '/headphones' },
            { name: 'SPEAKERS', href: '/speakers' },
            { name: 'EARPHONES', href: '/earphones' }
          ].map((category) => (
            <div key={category.name} className="bg-gray-100 rounded-lg p-8 text-center relative h-40">
              <h3 className="font-bold text-lg">{category.name}</h3>
              <Link href={category.href} className="text-gray-500 hover:text-orange-500 mt-4 font-bold text-sm inline-block">
                SHOP →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}