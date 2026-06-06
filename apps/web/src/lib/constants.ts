export const FREE_SHIPPING_THRESHOLD = 999;
export const FLAT_SHIPPING_FEE = 49;

export function shippingFor(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING_FEE;
}

/** Demo promo codes recognised by the cart UI (mock only). */
export const PROMO_CODES: Record<string, { off: number; label: string }> = {
  WELCOME10: { off: 0.1, label: '10% off your order' },
  FLASH15: { off: 0.15, label: '15% weekend flash discount' },
};
