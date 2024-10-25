import { useState } from 'react';
import { Product } from '@/types';

interface ProductHook {
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
}

export const useProducts = (initialProducts: Product[]): ProductHook => {
  const [products, setProducts] = useState(initialProducts);

  const updateProduct = (updateProduct: Product) => {
    setProducts((prevProd) => prevProd.map((product) => (product.id === updateProduct.id ? updateProduct : product)));
  };

  const addProduct = (newProduct: Product) => {
    setProducts((prevProd) => [...prevProd, newProduct]);
  };

  return { products, updateProduct, addProduct };
};
