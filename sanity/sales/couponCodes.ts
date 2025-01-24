export const COUPON_CODES = {
    BLESSED: "BLESSED",
    IQBALDAY: "IQBALDAY",
    AZADI78: "AZADI78"
} as const;

export type CouponCode = keyof typeof COUPON_CODES