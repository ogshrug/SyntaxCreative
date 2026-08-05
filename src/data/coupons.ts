export interface Coupon {
  code: string;
  description: string;
  kind: 'ticket';
  discountPercent: number;
}

export const coupons: Coupon[] = [
  {
    code: 'BURN30',
    description: '30% off Burning Man tickets',
    kind: 'ticket',
    discountPercent: 30,
  },
];

export function findCoupon(code: string): Coupon | undefined {
  const normalized = code.trim().toUpperCase();
  return coupons.find((c) => c.code.toUpperCase() === normalized);
}

export function isValidMembershipNumber(code: string): boolean {
  const num = Number(code.trim());
  return Number.isInteger(num) && num % 2 === 0;
}
