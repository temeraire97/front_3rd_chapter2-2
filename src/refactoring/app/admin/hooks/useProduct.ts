// useProduct.ts
import { useState } from 'react';

import { Product, Discount } from '@/types';
import { PRODUCT_INITIAL_STATE } from '@/refactoring/constants';
import { toggleSet } from '@/refactoring/utils';
import { updateProductField, findAndUpdateProduct } from '@utils/adminProductUtils';

interface ProductHookInitialProps {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}
interface ProductHook {
  showNewProductForm: boolean;
  newProduct: Omit<Product, 'id'>;
  openProductIds: Set<string>;
  editingProduct: Product | null;
  newDiscount: Discount;
  setShowNewProductForm: (show: boolean) => void;
  setNewProduct: (product: Omit<Product, 'id'>) => void;
  setNewDiscount: (discount: Discount) => void;
  handleAddNewProduct: () => void;
  toggleProductAccordion: (productId: string) => void;
  handleProductNameUpdate: (productId: string, newName: string) => void;
  handlePriceUpdate: (productId: string, newPrice: number) => void;
  handleStockUpdate: (productId: string, newStock: number) => void;
  handleEditComplete: () => void;
  handleEditProduct: (product: Product) => void;
  handleRemoveDiscount: (productId: string, index: number) => void;
  handleAddDiscount: (productId: string) => void;
}

export const useProduct = ({ products, onProductUpdate, onProductAdd }: ProductHookInitialProps): ProductHook => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>(PRODUCT_INITIAL_STATE);
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => toggleSet(prev, productId));
  };
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct(updateProductField(editingProduct, { name: newName }));
    }
  };

  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct(updateProductField(editingProduct, { price: newPrice }));
    }
  };
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };
  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = findAndUpdateProduct(products, productId, { stock: newStock });
    if (updatedProduct) {
      onProductUpdate(updatedProduct);
      setEditingProduct(updatedProduct);
    }
  };
  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct(PRODUCT_INITIAL_STATE);
    setShowNewProductForm(false);
  };
  const handleAddDiscount = (productId: string) => {
    const updatedProduct = findAndUpdateProduct(products, productId, {
      discounts: [...(editingProduct?.discounts || []), newDiscount],
    });
    if (updatedProduct) {
      onProductUpdate(updatedProduct);
      setEditingProduct(updatedProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };
  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: updatedProduct.discounts.filter((_, i) => i !== index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return {
    showNewProductForm,
    newProduct,
    openProductIds,
    editingProduct,
    newDiscount,
    setShowNewProductForm,
    setNewProduct,
    setNewDiscount,
    handleAddNewProduct,
    toggleProductAccordion,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleEditComplete,
    handleEditProduct,
    handleRemoveDiscount,
    handleAddDiscount,
  };
};
