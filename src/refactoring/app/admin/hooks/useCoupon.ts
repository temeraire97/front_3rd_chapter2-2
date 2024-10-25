import { useState } from 'react';
import { Coupon } from '@/types';
import { COUPON_INITIAL_STATE } from '@refactoring/constants';
import { parseInputValue } from '@refactoring/utils';
import { updateCouponField } from '@utils/adminProductUtils';

interface CouponHookProps {
  onCouponAdd: (newCoupon: Coupon) => void;
}
interface CouponHook {
  newCoupon: Coupon;
  setNewCoupon: (coupon: Coupon) => void;
  handleCouponInput: (e: React.ChangeEvent<HTMLInputElement>, key: string) => void;
  handleAddCoupon: () => void;
}

export const useCoupon = ({ onCouponAdd }: CouponHookProps): CouponHook => {
  const [newCoupon, setNewCoupon] = useState<Coupon>(COUPON_INITIAL_STATE);

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon(COUPON_INITIAL_STATE);
  };

  const handleCouponInput = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const parsedValue = parseInputValue(e);

    setNewCoupon(updateCouponField(newCoupon, { [key]: parsedValue }));
  };

  return {
    newCoupon,
    setNewCoupon,
    handleCouponInput,
    handleAddCoupon,
  };
};
