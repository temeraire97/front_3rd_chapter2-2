import { memo, useMemo } from 'react';
import { Product, Discount } from '@/types';

interface Props {
  product: Product;
  remainingStock: number;
  addToCart: (product: Product) => void;
}

const getMaxDiscount = (discounts: Discount[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

const DiscountList = memo(({ discounts }: { discounts: Discount[] }) => {
  return (
    <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
      {discounts.map((discount, index) => (
        <li key={index}>
          {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
        </li>
      ))}
    </ul>
  );
});

DiscountList.displayName = 'DiscountList';

export const ProductItem = ({ product, remainingStock, addToCart }: Props) => {
  const maxDiscount = useMemo(() => getMaxDiscount(product.discounts), [product.discounts]);

  return (
    <div data-testid={`product-${product.id}`} className="bg-white p-3 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">{product.price.toLocaleString()}원</span>
      </div>

      <div className="text-sm text-gray-500 mb-2">
        <span className={`font-medium ${remainingStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
          재고: {remainingStock}개
        </span>
        {product.discounts.length > 0 && (
          <span className="ml-2 font-medium text-blue-600">최대 {(maxDiscount * 100).toFixed(0)}% 할인</span>
        )}
      </div>

      {product.discounts.length > 0 && <DiscountList discounts={product.discounts} />}

      <button
        onClick={() => addToCart(product)}
        className={`w-full px-3 py-1 rounded ${
          remainingStock > 0
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        disabled={remainingStock <= 0}
      >
        {remainingStock > 0 ? '장바구니에 추가' : '품절'}
      </button>
    </div>
  );
};
