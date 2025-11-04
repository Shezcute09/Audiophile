'use client';
import { Suspense } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, Package, Truck, Mail } from 'lucide-react';

// Component that uses useSearchParams - wrapped in Suspense
function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Success Icon & Message */}
          <div className="text-center mb-12">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">ORDER CONFIRMED</h1>
            <p className="text-gray-600 text-lg mb-2">
              Thank you for your order
            </p>
            {orderId && (
              <p className="text-lg font-semibold">
                Order ID: <span className="text-orange-500">#{orderId}</span>
              </p>
            )}
            <p className="text-gray-600 mt-4">
              A confirmation email has been sent to your email address.
            </p>
          </div>

          {/* Order Process Steps */}
          <div className="bg-gray-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-center">What happens next?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">Order Processing</h3>
                <p className="text-sm text-gray-600">
                  We're preparing your items for shipment. This usually takes 24 hours.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">Shipping</h3>
                <p className="text-sm text-gray-600">
                  Your order will be shipped within 1-2 business days with tracking.
                </p>
              </div>
              
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="font-bold mb-2">Delivery</h3>
                <p className="text-sm text-gray-600">
                  Expected delivery in 3-5 business days to your address.
                </p>
              </div>
            </div>
          </div>

          {/* Support Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold mb-4">Need Help?</h3>
            <div className="space-y-2 text-gray-600">
              <p>• Check your email for order confirmation and tracking details</p>
              <p>• Contact our support team at support@audiophile.com</p>
              <p>• Call us at +1 (555) 123-4567 during business hours</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-bold text-center rounded"
            >
              CONTINUE SHOPPING
            </Link>
            <Link 
              href="/headphones"
              className="bg-black hover:bg-gray-800 text-white px-8 py-4 font-bold text-center rounded"
            >
              BROWSE PRODUCTS
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// Main page component with Suspense boundary
export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <Layout>
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="animate-pulse">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </Layout>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}