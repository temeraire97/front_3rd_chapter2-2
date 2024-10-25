import { Product, Discount } from '@/types';
import { ProductEditForm, ProductDiscount } from './index';

interface ProductItemProps {
  index: number;
  product: Product;
  openProductIds: Set<string>;
  editingProduct: Product | null;
  newDiscount: Discount;
  toggleProductAccordion: (productId: string) => void;
  handleProductNameUpdate: (productId: string, newName: string) => void;
  handlePriceUpdate: (productId: string, newPrice: number) => void;
  handleStockUpdate: (productId: string, newStock: number) => void;
  handleRemoveDiscount: (productId: string, index: number) => void;
  setNewDiscount: (discount: Discount) => void;
  handleAddDiscount: (productId: string) => void;
  handleEditComplete: () => void;
  handleEditProduct: (product: Product) => void;
}

export const ProductItem = ({
  index,
  product,
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
}: ProductItemProps) => {
  return (
    <div data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>
      {openProductIds.has(product.id) && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
            <ProductEditForm
              product={product}
              editingProduct={editingProduct}
              newDiscount={newDiscount}
              handleProductNameUpdate={handleProductNameUpdate}
              handlePriceUpdate={handlePriceUpdate}
              handleStockUpdate={handleStockUpdate}
              handleRemoveDiscount={handleRemoveDiscount}
              setNewDiscount={setNewDiscount}
              handleAddDiscount={handleAddDiscount}
              handleEditComplete={handleEditComplete}
            />
          ) : (
            <ProductDiscount product={product} handleEditProduct={handleEditProduct} />
          )}
        </div>
      )}
    </div>
  );
};
