'use client';
import Layout from '@/components/Layout';
import { products } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/context/CartContext';
import Link from 'next/link';

export default function Home() {
  const { addToCart } = useCart();

  const handleAddToCart = (product: typeof products[0]) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };
    addToCart(cartItem);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-black text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-gray-400 uppercase tracking-widest mb-4">New Product</p>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">XX99 Mark II Headphones</h1>
          <p className="text-gray-300 max-w-md mx-auto mb-8">
            Experience natural, lifelike audio and exceptional build quality made for the passionate music enthusiast.
          </p>
          <button 
            onClick={() => handleAddToCart(products[0])}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-bold"
          >
            ADD TO CART
          </button>
        </div>
      </section>

      {/* Product Categories */}
      
<section className="container mx-auto px-4 py-20">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[
      { name: 'HEADPHONES', href: '/headphones', image: '/images/category-headphones.jpg' },
      { name: 'SPEAKERS', href: '/speakers', image: '/images/category-speakers.jpg' },
      { name: 'EARPHONES', href: '/earphones', image: '/images/category-earphones.jpg' }
    ].map((category) => (
      <div key={category.name} className="bg-gray-100 rounded-lg p-8 text-center relative h-40">
        <h3 className="font-bold text-lg">{category.name}</h3>
        <Link href={category.href} className="text-gray-500 hover:text-orange-500 mt-4 font-bold text-sm inline-block">
          SHOP →
        </Link>
      </div>
    ))}
  </div>
</section>

      {/* Product Listings */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg p-6 text-center">
              <div className="bg-gray-100 h-48 mb-4 rounded-lg flex items-center justify-center">
                <span className="text-gray-400">[Image]</span>
              </div>
              <h3 className="font-bold text-lg mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">${product.price}</p>
              <button 
                onClick={() => handleAddToCart(product)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}