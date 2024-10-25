import { Product, Discount } from '@/types';
import { ProductForm, ProductItem } from './components';

interface ProductSectionProps {
  showNewProductForm: boolean;
  setShowNewProductForm: (show: boolean) => void;
  newProduct: Omit<Product, 'id'>;
  setNewProduct: (newProduct: Omit<Product, 'id'>) => void;
  handleAddNewProduct: () => void;
  products: Product[];
  openProductIds: Set<string>;
  editingProduct: Product | null;
  newDiscount: Discount;
  toggleProductAccordion: (productId: string) => void;
  handleProductNameUpdate: (productId: string, newName: string) => void;
  handlePriceUpdate: (productId: string, newPrice: number) => void;
  handleStockUpdate: (productId: string, newStock: number) => void;
  handleRemoveDiscount: (productId: string, discountIndex: number) => void;
  setNewDiscount: (discount: Discount) => void;
  handleAddDiscount: (productId: string) => void;
  handleEditComplete: () => void;
  handleEditProduct: (product: Product) => void;
}

export const ProductSection = ({
  showNewProductForm,
  setShowNewProductForm,
  newProduct,
  setNewProduct,
  handleAddNewProduct,
  products,
  openProductIds,
  editingProduct,
  newDiscount,
  toggleProductAccordion,
  handleProductNameUpdate,
  handlePriceUpdate,
  handleStockUpdate,
  handleRemoveDiscount,
  setNewDiscount,
  handleAddDiscount,
  handleEditComplete,
  handleEditProduct,
}: ProductSectionProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <ProductForm
        showNewProductForm={showNewProductForm}
        setShowNewProductForm={setShowNewProductForm}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        handleAddNewProduct={handleAddNewProduct}
      />
      <div className="space-y-2">
        {products.map((product, index) => (
          <ProductItem
            key={product.id}
            index={index}
            product={product}
            openProductIds={openProductIds}
            editingProduct={editingProduct}
            newDiscount={newDiscount}
            toggleProductAccordion={toggleProductAccordion}
            handleProductNameUpdate={handleProductNameUpdate}
            handlePriceUpdate={handlePriceUpdate}
            handleStockUpdate={handleStockUpdate}
            handleRemoveDiscount={handleRemoveDiscount}
            setNewDiscount={setNewDiscount}
            handleAddDiscount={handleAddDiscount}
            handleEditComplete={handleEditComplete}
            handleEditProduct={handleEditProduct}
          />
        ))}
      </div>
    </div>
  );
};
