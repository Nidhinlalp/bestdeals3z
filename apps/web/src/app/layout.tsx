import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// =============================================================================
// Font — Inter
// =============================================================================
// Inter is the recommended open-source substitute for Airbnb Cereal VF.
// Per DESIGN-airbnb.md: "If Airbnb Cereal VF and Circular are unavailable,
// Inter is the closest open-source substitute."
//
// Variable font loaded for full weight axis support (400–700 range used in
// the Airbnb type scale).
// =============================================================================

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  // Load the weights used in the Airbnb type scale
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'BestDeal3Z — Gadgets, Toys, Home & Lifestyle',
    template: '%s | BestDeal3Z',
  },
  description:
    'Shop the best deals on gadgets, toys, home products, electronics, and lifestyle items. Order via WhatsApp for fast, personal service.',
  keywords: ['gadgets', 'toys', 'electronics', 'home products', 'lifestyle', 'deals'],
  metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    siteName: 'BestDeal3Z',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
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
