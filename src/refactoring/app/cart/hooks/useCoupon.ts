import { Coupon } from '@/types';
import { useState } from 'react';

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState(initialCoupons);

  const addCoupon = (coupon: Coupon) => {
    setCoupons([...coupons, coupon]);
  };

  return { coupons, addCoupon };
};
