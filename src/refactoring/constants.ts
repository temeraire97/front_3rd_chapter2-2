import { Product, Coupon } from '@/types';

export const COUPON_INITIAL_STATE: Coupon = {
  name: '',
  code: '',
  discountType: 'percentage',
  discountValue: 0,
};

export const PRODUCT_INITIAL_STATE: Omit<Product, 'id'> = {
  name: '',
  price: 0,
  stock: 0,
  discounts: [],
};
