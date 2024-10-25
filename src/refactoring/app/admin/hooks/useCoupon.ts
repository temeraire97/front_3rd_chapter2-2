import { useState } from 'react';
import { Coupon } from '@/types';
import { COUPON_INITIAL_STATE } from '@refactoring/constants';

interface CouponHookProps {
  onCouponAdd: (newCoupon: Coupon) => void;
}
interface CouponHook {
  newCoupon: Coupon;
  setNewCoupon: (coupon: Coupon) => void;
  handleAddCoupon: () => void;
}

export const useCoupon = ({ onCouponAdd }: CouponHookProps): CouponHook => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(COUPON_INITIAL_STATE);

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon(COUPON_INITIAL_STATE);
  };

  return {
    newCoupon,
    setNewCoupon,
    handleAddCoupon,
  };
};
