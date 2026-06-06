import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MobileBottomNav } from '@/components/layout/mobile-bottom-nav';
import { MobileMenu } from '@/components/layout/mobile-menu';
import { CartDrawer } from '@/components/layout/cart-drawer';
import { SearchOverlay } from '@/components/layout/search-overlay';
import { WhatsAppFab } from '@/components/layout/whatsapp-fab';
import { QuickView } from '@/components/product/quick-view';
import { Toaster } from '@/components/ui/toaster';

// =============================================================================
// Font — Inter (open-source substitute for Airbnb Cereal VF, per DESIGN-airbnb.md)
// =============================================================================
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'BestDeal3Z — Gadgets, Electronics, Home, Toys & Lifestyle',
    template: '%s | BestDeal3Z',
  },
  description:
    'Shop premium gadgets, electronics, home, toys and lifestyle products. Fast, futuristic, and built for WhatsApp ordering.',
  keywords: [
    'gadgets',
    'electronics',
    'toys',
    'home products',
    'lifestyle',
    'deals',
    'whatsapp shopping',
  ],
  metadataBase: new URL(process.env['NEXT_PUBLIC_APP_URL'] ?? 'http://localhost:3000'),
  openGraph: { type: 'website', siteName: 'BestDeal3Z', locale: 'en_IN' },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        <main className="pb-safe-main min-h-[60vh]">{children}</main>
        <Footer />

        {/* Global overlays */}
        <MobileBottomNav />
        <WhatsAppFab />
        <CartDrawer />
        <SearchOverlay />
        <MobileMenu />
        <QuickView />
        <Toaster />
      </body>
    </html>
  );
}
