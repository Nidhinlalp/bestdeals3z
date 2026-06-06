import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Inter — open-source substitute for Airbnb Cereal VF (per DESIGN-airbnb.md)
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'BestDeal3Z Admin',
    template: '%s | BestDeal3Z Admin',
  },
  description: 'BestDeal3Z admin panel — manage products, orders, and catalog.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
