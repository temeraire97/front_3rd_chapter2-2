import { CartItem, Coupon, Product } from '../../../types';

const getCartItem = (cart: CartItem[], productId: string): CartItem | undefined => {
  return cart.find((item) => item.product.id === productId);
};

// 상품의 총 가격 계산 함수
const getItemTotal = (item: CartItem): number => {
  const { price } = item.product;
  const { quantity } = item;
  return price * quantity;
};

// 상품에 대해 적용 가능한 최대 할인율 계산 함수
export const getMaxApplicableDiscount = (item: CartItem): number => {
  const { quantity, product } = item;

  return product.discounts.reduce(
    (maxDiscount, discount): number =>
      quantity >= discount.quantity && discount.rate > maxDiscount ? discount.rate : maxDiscount,
    0,
  );
};

// 상품에 대한 할인 적용 후 총 가격 계산 함수
export const calculateItemTotal = (item: CartItem): number => {
  const itemTotal = getItemTotal(item);
  const maxDiscount = getMaxApplicableDiscount(item);
  return itemTotal * (1 - maxDiscount);
};

// totalBeforeDiscount와 totalAfterDiscount를 동시에 계산하는 함수
const calculateTotalsFromCart = (cart: CartItem[]) => {
  return cart.reduce(
    (totals, item) => {
      const itemTotal = getItemTotal(item);
      const discountedTotal = calculateItemTotal(item);

      totals.totalBeforeDiscount += itemTotal;
      totals.totalAfterDiscount += discountedTotal;

      return totals;
    },
    { totalBeforeDiscount: 0, totalAfterDiscount: 0 }, // 초기값
  );
};

// 쿠폰을 적용한 후의 가격을 계산하는 함수
const applyCoupon = (totalAfterDiscount: number, selectedCoupon: Coupon | null) => {
  if (!selectedCoupon) return totalAfterDiscount;

  if (selectedCoupon.discountType === 'amount') {
    return Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
  } else {
    return totalAfterDiscount * (1 - selectedCoupon.discountValue / 100);
  }
};

// 전체 총합을 계산하는 함수
export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  // totalBeforeDiscount와 totalAfterDiscount 동시 계산
  const { totalBeforeDiscount, totalAfterDiscount } = calculateTotalsFromCart(cart);

  // 쿠폰 적용 후의 최종 가격
  const finalTotalAfterDiscount = applyCoupon(totalAfterDiscount, selectedCoupon);

  // 전체 할인 계산
  const totalDiscount = totalBeforeDiscount - finalTotalAfterDiscount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(finalTotalAfterDiscount),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (cart: CartItem[], productId: string, newQuantity: number): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id !== productId) return item;

      const maxQuantity = item.product.stock;
      const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
      return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
    })
    .filter((item): item is CartItem => item !== null);
};

export const getRemainingStock = (cart: CartItem[], product: Product): number => {
  const cartItem = getCartItem(cart, product.id);
  return product.stock - (cartItem?.quantity || 0);
};

export const getAddedCart = (cart: CartItem[], product: Product): CartItem[] => {
  const existingItem = getCartItem(cart, product.id);
  if (!existingItem) return [...cart, { product, quantity: 1 }];

  return cart.map((item) =>
    item.product.id === product.id ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) } : item,
  );
};
