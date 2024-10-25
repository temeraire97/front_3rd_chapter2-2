import { Coupon } from '@/types';
import { CouponForm, CouponItem } from './components';

interface CouponSectionProps {
  coupons: Coupon[];
  newCoupon: Coupon;
  setNewCoupon: (newCoupon: Coupon) => void;
  handleAddCoupon: () => void;
}

export const CouponSection = ({ coupons, newCoupon, setNewCoupon, handleAddCoupon }: CouponSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponForm newCoupon={newCoupon} setNewCoupon={setNewCoupon} handleAddCoupon={handleAddCoupon} />
        <div>
          <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
          <div className="space-y-2">
            {coupons.map((coupon, index) => (
              <CouponItem key={coupon.code} index={index} coupon={coupon} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
