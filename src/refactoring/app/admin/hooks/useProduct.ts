// useProduct.ts
import { useState } from 'react';
import { Product, Discount } from '@/types';

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
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    price: 0,
    stock: 0,
    discounts: [],
  });
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, name: newName };
      setEditingProduct(updatedProduct);
    }
  };
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, price: newPrice };
      setEditingProduct(updatedProduct);
    }
  };
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };
  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };
  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: '',
      price: 0,
      stock: 0,
      discounts: [],
    });
    setShowNewProductForm(false);
  };
  const handleAddDiscount = (productId: string) => {
    const updatedProduct = products.find((p) => p.id === productId);
    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
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
