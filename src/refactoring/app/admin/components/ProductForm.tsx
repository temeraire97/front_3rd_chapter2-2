import { useMemo } from 'react';
import { Product } from '@/types';
import { parseInputValue } from '@refactoring/utils';

interface ProductFormProps {
  showNewProductForm: boolean;
  newProduct: Omit<Product, 'id'>;
  setShowNewProductForm: (show: boolean) => void;
  setNewProduct: (product: Omit<Product, 'id'>) => void;
  handleAddNewProduct: () => void;
}

export const ProductForm = ({
  showNewProductForm,
  newProduct,
  setShowNewProductForm,
  setNewProduct,
  handleAddNewProduct,
}: ProductFormProps) => {
  const fields = useMemo(() => {
    const { name, price, stock } = newProduct;
    return [
      { id: 'productName', label: '상품명', type: 'text', value: name, key: 'name' },
      { id: 'productPrice', label: '가격', type: 'number', value: price, key: 'price' },
      { id: 'productStock', label: '재고', type: 'number', value: stock, key: 'stock' },
    ];
  }, [newProduct]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    const parsedValue = parseInputValue(e);

    setNewProduct({
      ...newProduct,
      [key]: parsedValue,
    });
  };

  return (
    <>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? '취소' : '새 상품 추가'}
      </button>

      {showNewProductForm && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
          {fields.map((field) => (
            <div key={field.id} className="mb-2">
              <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                value={field.value}
                onChange={(e) => handleOnChange(e, field.key)}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}

          <button onClick={handleAddNewProduct} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            추가
          </button>
        </div>
      )}
    </>
  );
};
