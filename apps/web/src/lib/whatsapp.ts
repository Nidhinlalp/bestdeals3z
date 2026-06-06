import { siteConfig } from '@/data/content';
import type { Product } from '@/data/types';
import type { CartItem } from '@/store/cart.store';
import { formatPrice, whatsappLink } from './utils';

/** Single-product enquiry/order message. */
export function productOrderMessage(product: Product, qty: number, variant?: string): string {
  const lines = [
    `Hi ${siteConfig.name}! 👋`,
    '',
    `I'd like to order:`,
    `• ${product.name}${variant ? ` (${variant})` : ''}`,
    `• Qty: ${qty}`,
    `• Price: ${formatPrice(product.price)}`,
    '',
    `Total: ${formatPrice(product.price * qty)}`,
    '',
    `Please confirm availability and delivery. Thank you!`,
  ];
  return lines.join('\n');
}

/** Full-cart order message. */
export function cartOrderMessage(items: CartItem[], subtotal: number, shipping: number): string {
  const lines = [
    `Hi ${siteConfig.name}! 👋`,
    '',
    `I'd like to place this order:`,
    '',
    ...items.map(
      (i, n) =>
        `${n + 1}. ${i.name}${i.variant ? ` (${i.variant})` : ''} × ${i.quantity} — ${formatPrice(
          i.price * i.quantity
        )}`
    ),
    '',
    `Subtotal: ${formatPrice(subtotal)}`,
    `Shipping: ${shipping === 0 ? 'FREE' : formatPrice(shipping)}`,
    `Total: ${formatPrice(subtotal + shipping)}`,
    '',
    `Please confirm and share payment details. Thanks!`,
  ];
  return lines.join('\n');
}

/** Checkout message including customer details. */
export function checkoutMessage(params: {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  name: string;
  phone: string;
  address: string;
  area: string;
  note?: string;
}): string {
  const { items, subtotal, shipping, name, phone, address, area, note } = params;
  const lines = [
    `Hi ${siteConfig.name}! 👋  New order:`,
    '',
    `👤 ${name}`,
    `📱 ${phone}`,
    `📍 ${address}${area ? `, ${area}` : ''}`,
    '',
    `🛍️ Items:`,
    ...items.map(
      (i, n) =>
        `${n + 1}. ${i.name}${i.variant ? ` (${i.variant})` : ''} × ${i.quantity} — ${formatPrice(
          i.price * i.quantity
        )}`
    ),
    '',
    `Subtotal: ${formatPrice(subtotal)}`,
    `Shipping: ${shipping === 0 ? 'FREE' : formatPrice(shipping)}`,
    `Total: ${formatPrice(subtotal + shipping)}`,
    ...(note ? ['', `📝 Note: ${note}`] : []),
    '',
    `Please confirm. Thank you!`,
  ];
  return lines.join('\n');
}

export const waHref = (message: string) => whatsappLink(siteConfig.whatsappNumber, message);
