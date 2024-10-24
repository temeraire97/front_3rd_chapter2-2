import { Coupon } from '@/types';

interface CouponOptionProps {
  coupon: Coupon;
  index: number;
}
interface SelectedCouponProps {
  selectedCoupon: Coupon | null;
}

export const CouponOption = ({ coupon, index }: CouponOptionProps) => (
  <option value={index}>
    {coupon.name} - {coupon.discountType === 'amount' ? `${coupon.discountValue}원` : `${coupon.discountValue}%`}
  </option>
);

export const SelectedCoupon = ({ selectedCoupon }: SelectedCouponProps) =>
  selectedCoupon && (
    <p className="text-green-600">
      적용된 쿠폰: {selectedCoupon.name}(
      {selectedCoupon.discountType === 'amount'
        ? `${selectedCoupon.discountValue}원`
        : `${selectedCoupon.discountValue}%`}{' '}
      할인)
    </p>
  );
