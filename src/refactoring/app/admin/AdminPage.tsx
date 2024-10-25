import { Coupon, Product } from '@/types';

import { useProduct, useCoupon } from './hooks';

import { ProductSection } from './Product';
import { CouponSection } from './Coupon';

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({ products, coupons, onProductUpdate, onProductAdd, onCouponAdd }: Props) => {
  const {
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
  } = useProduct({ products, onProductUpdate, onProductAdd });
  const { newCoupon, setNewCoupon, handleAddCoupon } = useCoupon({ onCouponAdd });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductSection
          products={products}
          showNewProductForm={showNewProductForm}
          newProduct={newProduct}
          openProductIds={openProductIds}
          editingProduct={editingProduct}
          newDiscount={newDiscount}
          setShowNewProductForm={setShowNewProductForm}
          setNewProduct={setNewProduct}
          handleAddNewProduct={handleAddNewProduct}
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
        <CouponSection
          coupons={coupons}
          newCoupon={newCoupon}
          setNewCoupon={setNewCoupon}
          handleAddCoupon={handleAddCoupon}
        />
      </div>
    </div>
  );
};
