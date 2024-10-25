import { useState } from 'react';
import { Coupon } from '@/types';

interface CouponHookProps {
  onCouponAdd: (newCoupon: Coupon) => void;
}
interface CouponHook {
  newCoupon: Coupon;
  setNewCoupon: (coupon: Coupon) => void;
  handleAddCoupon: () => void;
}

export const useCoupon = ({ onCouponAdd }: CouponHookProps): CouponHook => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: '',
    code: '',
    discountType: 'percentage',
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: '',
      code: '',
      discountType: 'percentage',
      discountValue: 0,
    });
  };

  return {
    newCoupon,
    setNewCoupon,
    handleAddCoupon,
  };
};
