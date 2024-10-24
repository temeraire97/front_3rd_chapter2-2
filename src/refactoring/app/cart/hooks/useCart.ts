// useCart.ts
import { useState } from 'react';
import { CartItem, Coupon, Product } from '@/types';
import { calculateCartTotal, updateCartItemQuantity, getRemainingStock, getAddedCart } from '@utils/cartUtils';

interface CartHook {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  applyCoupon: (coupon: Coupon) => void;
  calculateTotal: () => { totalBeforeDiscount: number; totalAfterDiscount: number; totalDiscount: number };
  selectedCoupon: Coupon | null;
}

export const useCart = (): CartHook => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const addToCart = (product: Product) => {
    const remainingStock = getRemainingStock(cart, product);
    if (remainingStock <= 0) return;

    setCart((prevCart) => getAddedCart(prevCart, product));
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) => updateCartItemQuantity(prevCart, productId, newQuantity));
  };

  const applyCoupon = (coupon: Coupon) => {
    setSelectedCoupon(coupon);
  };

  const calculateTotal = () => {
    return calculateCartTotal(cart, selectedCoupon);
  };

  return {
    cart,
    selectedCoupon,
    calculateTotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
  };
};
