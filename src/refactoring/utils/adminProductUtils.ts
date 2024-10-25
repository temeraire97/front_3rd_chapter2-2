import { Product } from '@/types';

export const updateProductField = (product: Product | null, updatedFields: Partial<Product>): Product | null => {
  if (product) {
    return { ...product, ...updatedFields };
  }
  return product;
};
export const findAndUpdateProduct = (
  products: Product[],
  productId: string,
  updatedFields: Partial<Product>,
): Product | null => {
  const product = products.find((p) => p.id === productId);
  if (!product) return null;

  return updateProductField(product, updatedFields);
};
