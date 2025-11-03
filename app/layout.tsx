import type { Metadata } from 'next';
// import { GeistSans } from 'geist/font/sans';
import ConvexProviderWrapper from './convexClientProvider';
import { CartProvider } from '@/context/CartContext';
import './globals.css';

export const metadata: Metadata = {
  title: 'Audiophile - Premium Audio Equipment',
  description: 'Your premier destination for high-quality audio gear',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <ConvexProviderWrapper>
          <CartProvider>
            {children}
          </CartProvider>
        </ConvexProviderWrapper>
      </body>
    </html>
  );
}