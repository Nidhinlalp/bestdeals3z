// =============================================================================
// Mock content — site config, nav, testimonials, FAQs, banners, offers, brand
// =============================================================================

import { img } from '@/lib/utils';
import type { Collection, Faq, Offer, PromoBanner, Testimonial } from './types';

export const siteConfig = {
  name: 'BestDeal3Z',
  tagline: 'The future of everyday shopping',
  description:
    'Gadgets, electronics, home, toys and lifestyle — handpicked, fairly priced, and delivered fast. Order in seconds on WhatsApp.',
  whatsappNumber: '+91 98765 43210',
  phone: '+91 98765 43210',
  email: 'hello@bestdeal3z.com',
  address: 'Infopark Phase 1, Kochi, Kerala 682030, India',
  hours: 'Mon – Sat · 9:00 AM – 9:00 PM IST',
  socials: [
    { name: 'Instagram', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'Twitter', href: '#' },
    { name: 'Youtube', href: '#' },
  ],
} as const;

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/categories' },
  { label: 'Deals', href: '/deals' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
];

export interface TrustBadge {
  icon: string;
  title: string;
  subtitle: string;
}

export const trustBadges: TrustBadge[] = [
  { icon: 'Truck', title: 'Fast delivery', subtitle: '2–4 day shipping, pan-India' },
  { icon: 'ShieldCheck', title: 'Secure & genuine', subtitle: '100% authentic products' },
  { icon: 'RotateCcw', title: 'Easy returns', subtitle: '7-day no-questions returns' },
  { icon: 'MessageCircle', title: 'WhatsApp support', subtitle: 'Real humans, instant replies' },
];

export const stats = [
  { value: 120000, suffix: '+', label: 'Happy customers' },
  { value: 4.8, suffix: '/5', label: 'Average rating', decimals: 1 },
  { value: 2500, suffix: '+', label: 'Products curated' },
  { value: 48, suffix: 'h', label: 'Avg. dispatch time' },
];

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Ananya Menon',
    location: 'Bengaluru',
    avatar: img('avatar-ananya', 200, 200),
    rating: 5,
    quote:
      'Ordered the Aurora earbuds at 11pm over WhatsApp and they arrived in two days. The ANC is unreal for the price. This is now my go-to store.',
    product: 'Aurora Wireless Earbuds Pro',
  },
  {
    id: 't2',
    name: 'Rohan Kapoor',
    location: 'Mumbai',
    avatar: img('avatar-rohan', 200, 200),
    rating: 5,
    quote:
      'The checkout is so fast it feels illegal. Picked a smartwatch, messaged on WhatsApp, done. Packaging was premium too.',
    product: 'Pulse Smartwatch X2',
  },
  {
    id: 't3',
    name: 'Fatima Sheikh',
    location: 'Hyderabad',
    avatar: img('avatar-fatima', 200, 200),
    rating: 4,
    quote:
      'Love how clean the site feels on my phone. Found a gift for my nephew in under a minute and the RC car was a huge hit.',
    product: 'Speed Track RC Racer',
  },
  {
    id: 't4',
    name: 'Karthik Nair',
    location: 'Kochi',
    avatar: img('avatar-karthik', 200, 200),
    rating: 5,
    quote:
      'Genuinely the smoothest shopping experience I have had. Real prices, real photos, and support actually replied in seconds.',
    product: 'Voyage 30L Travel Backpack',
  },
  {
    id: 't5',
    name: 'Priya Desai',
    location: 'Pune',
    avatar: img('avatar-priya', 200, 200),
    rating: 5,
    quote:
      'The diffuser transformed my living room and the app control is lovely. Returns were painless when I wanted a second colour.',
    product: 'Aura Smart Aroma Diffuser',
  },
  {
    id: 't6',
    name: 'Aditya Verma',
    location: 'Delhi',
    avatar: img('avatar-aditya', 200, 200),
    rating: 5,
    quote:
      'Fast, modern, and trustworthy. The flash sale prices are the real deal — I have ordered four times this month.',
    product: 'Cosmo 20K Magnetic Power Bank',
  },
];

export const faqs: Faq[] = [
  {
    id: 'f1',
    category: 'Orders',
    question: 'How do I place an order?',
    answer:
      'Browse, add items to your cart, then tap “Order on WhatsApp”. Your cart is turned into a ready-to-send message — just hit send and our team confirms your order, payment options and delivery in minutes.',
  },
  {
    id: 'f2',
    category: 'WhatsApp',
    question: 'Why do you use WhatsApp for checkout?',
    answer:
      'It is faster and more personal. You get instant answers about stock, sizes and delivery, can share your address once, and reorder anytime with a single message — no long forms or account creation.',
  },
  {
    id: 'f3',
    category: 'Shipping',
    question: 'How long does delivery take?',
    answer:
      'Most orders are dispatched within 48 hours and delivered in 2–4 business days across India. Metro cities are often next-day. You will get tracking updates right on WhatsApp.',
  },
  {
    id: 'f4',
    category: 'Shipping',
    question: 'Do you offer free shipping?',
    answer:
      'Yes — shipping is free on all orders above ₹999. Orders below that carry a flat ₹49 delivery fee, shown clearly before you confirm.',
  },
  {
    id: 'f5',
    category: 'Products',
    question: 'Are your products genuine?',
    answer:
      'Always. Every product is sourced from authorised suppliers and quality-checked before dispatch. If anything feels off, our returns team makes it right immediately.',
  },
  {
    id: 'f6',
    category: 'Returns',
    question: 'What is your return policy?',
    answer:
      'You have 7 days from delivery to request a return or exchange on unused items in original packaging. Start it with one WhatsApp message and we arrange a pickup.',
  },
  {
    id: 'f7',
    category: 'Returns',
    question: 'How are refunds processed?',
    answer:
      'Once your return is picked up and inspected, refunds are issued to your original payment method within 3–5 business days, or instantly as store credit if you prefer.',
  },
  {
    id: 'f8',
    category: 'Products',
    question: 'Do products come with a warranty?',
    answer:
      'Electronics and gadgets carry the manufacturer’s warranty, with details listed on each product page. We also help you raise warranty claims directly through WhatsApp.',
  },
];

export const promoBanners: PromoBanner[] = [
  {
    id: 'b1',
    eyebrow: 'Mega Tech Days',
    title: 'Up to 45% off premium audio',
    subtitle: 'Earbuds, headphones & speakers tuned to perfection.',
    cta: 'Shop audio',
    href: '/categories/audio',
    image: img('promo-audio', 1200, 900),
    theme: 'dark',
  },
  {
    id: 'b2',
    eyebrow: 'New season',
    title: 'Upgrade your everyday carry',
    subtitle: 'Bags, wallets and lifestyle staples built to last.',
    cta: 'Explore lifestyle',
    href: '/categories/lifestyle',
    image: img('promo-lifestyle', 1200, 900),
    theme: 'light',
  },
  {
    id: 'b3',
    eyebrow: 'Smart home',
    title: 'Make your space glow',
    subtitle: 'Lighting, diffusers and comfort, beautifully designed.',
    cta: 'Shop home',
    href: '/categories/home',
    image: img('promo-home', 1200, 900),
    theme: 'brand',
  },
];

export const offers: Offer[] = [
  {
    id: 'o1',
    title: 'First order treat',
    description: 'Flat 10% off your very first order — applied at WhatsApp checkout.',
    code: 'WELCOME10',
    discount: '10% OFF',
    expiresLabel: 'Always on for new shoppers',
    accent: '#ff385c',
  },
  {
    id: 'o2',
    title: 'Weekend flash',
    description: 'Extra 15% off everything in the Deals hub this weekend only.',
    code: 'FLASH15',
    discount: '15% OFF',
    expiresLabel: 'Ends Sunday midnight',
    accent: '#7c3aed',
  },
  {
    id: 'o3',
    title: 'Bundle & save',
    description: 'Buy any two gadgets and save ₹500 instantly on the pair.',
    code: 'BUNDLE500',
    discount: '₹500 OFF',
    expiresLabel: 'Limited-time offer',
    accent: '#0ea5e9',
  },
  {
    id: 'o4',
    title: 'Free shipping',
    description: 'Spend ₹999 or more and shipping is on us, every single time.',
    code: 'No code needed',
    discount: 'FREE SHIP',
    expiresLabel: 'On orders above ₹999',
    accent: '#059669',
  },
];

export const collections: Collection[] = [
  {
    id: 'col1',
    slug: 'work-from-anywhere',
    title: 'Work from anywhere',
    subtitle: 'The kit for a productive day, wherever you land.',
    image: img('collection-work', 1200, 800),
    productSlugs: [
      'voyage-30l-travel-backpack',
      'flux-7-in-1-usb-c-hub',
      'cosmo-20k-magnetic-power-bank',
      'zenith-over-ear-headphones',
    ],
  },
  {
    id: 'col2',
    slug: 'gift-it',
    title: 'Gift it',
    subtitle: 'Crowd-pleasers that always land well.',
    image: img('collection-gift', 1200, 800),
    productSlugs: [
      'cloud-plush-bear',
      'aurora-wireless-earbuds-pro',
      'solstice-polarised-sunglasses',
      'galaxy-500-piece-building-set',
    ],
  },
  {
    id: 'col3',
    slug: 'level-up-home',
    title: 'Level up home',
    subtitle: 'Small upgrades, big everyday joy.',
    image: img('collection-home', 1200, 800),
    productSlugs: [
      'aura-smart-aroma-diffuser',
      'lumen-smart-desk-lamp',
      'cloud-memory-foam-pillow',
      'nest-ceramic-cookware-set',
    ],
  },
];

// ---------------------------------------------------------------------------
// Brand / About content
// ---------------------------------------------------------------------------

export const brand = {
  story: [
    'BestDeal3Z started with a simple frustration: shopping online had become slow, cluttered and impersonal. Endless forms, fake discounts, and support that never replied.',
    'So we built the opposite. A fast, beautiful storefront with honest prices, real product photos, and a checkout that takes seconds — powered by the app you already use every day, WhatsApp.',
    'Today we curate thousands of products across electronics, gadgets, home, toys and lifestyle, and hand-pick every one for quality and value. No clutter, no gimmicks — just the good stuff, delivered fast.',
  ],
  mission:
    'To make premium, everyday products effortless to discover and delightful to buy — for a new generation that values speed, design and trust.',
  values: [
    {
      icon: 'BadgeCheck',
      title: 'Honest pricing',
      text: 'Real discounts on real prices. What you see is what you pay — always.',
    },
    {
      icon: 'Zap',
      title: 'Built for speed',
      text: 'From browsing to checkout in seconds. Your time matters to us.',
    },
    {
      icon: 'Heart',
      title: 'Customer-obsessed',
      text: 'Real humans on WhatsApp who actually help, before and after you buy.',
    },
    {
      icon: 'Leaf',
      title: 'Thoughtfully curated',
      text: 'Every product is hand-picked and quality-checked. No filler.',
    },
  ],
  whyChooseUs: [
    'Hand-picked, quality-checked products across every category',
    'Lightning-fast WhatsApp checkout — no accounts, no long forms',
    'Genuine products from authorised suppliers only',
    '7-day easy returns and instant refund options',
    'Free shipping on orders above ₹999, pan-India delivery',
    'Real human support, 6 days a week',
  ],
};

export const policies = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated 1 June 2026',
    intro:
      'Your privacy matters to us. This policy explains what information we collect, how we use it, and the choices you have. This is mock content for UI review.',
    sections: [
      {
        heading: 'Information we collect',
        body: 'We collect the details you share to fulfil your order — your name, phone number, delivery address and order preferences shared via WhatsApp. We also collect basic, anonymised usage analytics to improve the store experience.',
      },
      {
        heading: 'How we use your information',
        body: 'Your information is used solely to process and deliver your orders, provide support, and send you relevant updates about your purchase. We never sell your personal data to third parties.',
      },
      {
        heading: 'Cookies & analytics',
        body: 'We use lightweight cookies to remember your cart and wishlist, and privacy-friendly analytics to understand which products shoppers love. You can clear these at any time from your browser.',
      },
      {
        heading: 'Your rights',
        body: 'You can request access to, correction of, or deletion of your personal data at any time by messaging us on WhatsApp or emailing our support team.',
      },
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    updated: 'Last updated 1 June 2026',
    intro:
      'By using BestDeal3Z, you agree to the terms below. Please read them carefully. This is mock content for UI review.',
    sections: [
      {
        heading: 'Use of the store',
        body: 'You agree to use the store for lawful purposes only and to provide accurate information when placing an order. Prices and availability are subject to change without notice.',
      },
      {
        heading: 'Orders & confirmation',
        body: 'An order is confirmed only once our team acknowledges it on WhatsApp. We reserve the right to decline or cancel orders in cases of pricing errors or stock unavailability.',
      },
      {
        heading: 'Pricing',
        body: 'All prices are listed in Indian Rupees and include applicable taxes unless stated otherwise. Promotional prices are valid only for the stated period.',
      },
      {
        heading: 'Limitation of liability',
        body: 'BestDeal3Z is not liable for indirect or consequential damages arising from the use of products beyond their intended purpose or manufacturer guidelines.',
      },
    ],
  },
  shipping: {
    title: 'Shipping Policy',
    updated: 'Last updated 1 June 2026',
    intro:
      'Everything you need to know about how and when your order reaches you. This is mock content for UI review.',
    sections: [
      {
        heading: 'Delivery timelines',
        body: 'Orders are dispatched within 48 hours. Metro cities typically receive orders in 1–2 days, and the rest of India within 2–4 business days.',
      },
      {
        heading: 'Shipping charges',
        body: 'Shipping is free on all orders above ₹999. A flat ₹49 fee applies to smaller orders and is always shown before you confirm.',
      },
      {
        heading: 'Order tracking',
        body: 'Once dispatched, you receive a tracking link directly on WhatsApp, with proactive updates at every milestone until delivery.',
      },
      {
        heading: 'Delays',
        body: 'In rare cases of weather, festivals or courier delays, timelines may extend slightly. We keep you informed throughout.',
      },
    ],
  },
  returns: {
    title: 'Return & Exchange Policy',
    updated: 'Last updated 1 June 2026',
    intro:
      'We want you to love what you buy. If something is not right, here is how we make it easy. This is mock content for UI review.',
    sections: [
      {
        heading: '7-day returns',
        body: 'You can request a return or exchange within 7 days of delivery for unused items in their original packaging. Just message us on WhatsApp to start.',
      },
      {
        heading: 'Free pickups',
        body: 'We arrange a free reverse pickup from your doorstep for eligible returns — no need to find a courier yourself.',
      },
      {
        heading: 'Refunds',
        body: 'Refunds are processed within 3–5 business days of inspection to your original payment method, or instantly as store credit.',
      },
      {
        heading: 'Non-returnable items',
        body: 'For hygiene and safety reasons, certain personal-care and intimate items are non-returnable unless they arrive damaged or defective.',
      },
    ],
  },
};
