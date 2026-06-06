'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data';
import { waHref } from '@/lib/whatsapp';

export function WhatsAppFab() {
  return (
    <motion.a
      href={waHref(`Hi ${siteConfig.name}! I'd like some help choosing a product.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
      className="bottom-safe-fab group fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,0.6)] lg:right-6"
    >
      <span className="animate-pulse-glow absolute inset-0 rounded-full" />
      <MessageCircle className="h-7 w-7 fill-white/15" />
      <span className="bg-ink text-caption pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full px-3 py-1.5 text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 lg:block">
        Need help? Chat with us
      </span>
    </motion.a>
  );
}
