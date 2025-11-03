'use client';
import Layout from '@/components/Layout';
import { useCart } from '@/context/CartContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const checkoutSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  postcode: z.string().min(3, 'Postcode must be at least 3 characters'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  paymentMethod: z.enum(['cash', 'card']),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useCart();
  const createOrder = useAction(api.orders.createOrder);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cash',
    },
  });

  const shipping = 50;
  const vatRate = 0.2;
  const vat = getCartTotal() * vatRate;
  const grandTotal = getCartTotal() + shipping + vat;

  const onSubmit = async (data: CheckoutFormData) => {
    setIsLoading(true);
    try {
      // Create order in Convex using Action
      const orderId = await createOrder({
        customerDetails: {
          name: data.name,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          postcode: data.postcode,
          country: data.country,
          paymentMethod: data.paymentMethod,
        },
        items: cart,
        totals: {
          subtotal: getCartTotal(),
          shipping: shipping,
          vat: vat,
          grandTotal: grandTotal,
        },
      });

      // Clear cart and redirect to success page
      clearCart();
      router.push(`/order-confirmation?orderId=${orderId}`);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <p>Your cart is empty. Please add some items to proceed.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Column - Checkout Form */}
          <div className="bg-white rounded-lg p-8">
            <h1 className="text-3xl font-bold mb-8">CHECKOUT</h1>

            {/* Billing Details */}
            <section className="mb-12">
              <h2 className="text-lg font-bold text-orange-500 mb-6">BILLING DETAILS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Name</label>
                  <input
                    {...register('name')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                    placeholder="Alexei Ward"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input
                    {...register('email')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                    placeholder="alexei@mail.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Phone Number</label>
                  <input
                    {...register('phone')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                    placeholder="+1 202-555-0136"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              </div>
            </section>

            {/* Shipping Info */}
            <section className="mb-12">
              <h2 className="text-lg font-bold text-orange-500 mb-6">SHIPPING INFO</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Address</label>
                  <input
                    {...register('address')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                    placeholder="1137 Williams Avenue"
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">City</label>
                    <input
                      {...register('city')}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                      placeholder="New York"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-2">Post Code</label>
                    <input
                      {...register('postcode')}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                      placeholder="10001"
                    />
                    {errors.postcode && <p className="text-red-500 text-sm mt-1">{errors.postcode.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Country</label>
                  <input
                    {...register('country')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                    placeholder="United States"
                  />
                  {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country.message}</p>}
                </div>
              </div>
            </section>

            {/* Payment Details */}
            <section>
              <h2 className="text-lg font-bold text-orange-500 mb-6">PAYMENT DETAILS</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Payment Method</label>
                </div>
                <div className="space-y-4">
                  <label className="flex items-center gap-4 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer">
                    <input
                      type="radio"
                      value="cash"
                      {...register('paymentMethod')}
                      className="text-orange-500"
                    />
                    <span>Cash on Delivery</span>
                  </label>

                  <label className="flex items-center gap-4 border border-gray-300 rounded-lg px-4 py-3 cursor-pointer">
                    <input
                      type="radio"
                      value="card"
                      {...register('paymentMethod')}
                      className="text-orange-500"
                    />
                    <span>Credit Card</span>
                  </label>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-lg p-8 h-fit">
            <h2 className="text-2xl font-bold mb-8">SUMMARY</h2>

            {/* Cart Items */}
            <div className="space-y-6 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-xs">IMG</span>
                    </div>
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                  </div>
                  <div className="text-gray-600">
                    x{item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing */}
            <div className="space-y-3 mb-8">
              <div className="flex justify-between">
                <span className="text-gray-600">TOTAL</span>
                <span className="font-bold">${getCartTotal()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">SHIPPING</span>
                <span className="font-bold">${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">VAT (INCLUDED)</span>
                <span className="font-bold">${vat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold mt-4 pt-4 border-t">
                <span>GRAND TOTAL</span>
                <span className="text-orange-500">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-4 px-8 rounded font-bold"
            >
              {isLoading ? 'PROCESSING...' : 'CONTINUE & PAY'}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}