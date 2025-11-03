'use client';
import Layout from '@/components/Layout';
import { products } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { CartItem } from '@/context/CartContext';
import Link from 'next/link';

export default function EarphonesPage() {
    const { addToCart } = useCart();
    const earphones = products.filter(product => product.category === 'earphones');

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
            <div className="bg-black text-white py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-center">EARPHONES</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="space-y-32">
                    {earphones.map((product, index) => (
                        <div key={product.id} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-20`}>
                            <div className="flex-1 bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                                <span className="text-gray-400">Product Image: {product.name}</span>
                            </div>

                            <div className="flex-1 text-center lg:text-left">
                                {product.isNew && (
                                    <span className="text-orange-500 tracking-widest text-sm font-bold">NEW PRODUCT</span>
                                )}
                                <h2 className="text-4xl font-bold my-6">{product.name}</h2>
                                <p className="text-gray-600 mb-8">{product.description}</p>
                
                                <Link
                                    href={`/product/${product.id}`}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-bold inline-block"
                                >
                                    SEE PRODUCT
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 py-20">
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