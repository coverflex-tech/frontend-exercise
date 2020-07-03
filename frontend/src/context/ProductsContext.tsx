import React, { useState, useContext, useEffect, useCallback } from 'react';
import listProducts from 'services/api/product/listProducts';
import AuthContext from './AuthContext';
import orderProducts from 'services/api/product/orderProducts';

interface ProductsContextType {
    availableProducts?: Product[];
    userProducts?: Product[];
    error?: string;
    selectedProducts: string[];
    checkoutCost: number;
    purchasing: boolean;
    toggleProduct: (id: string) => void;
    completePurchase: () => void;
}
const ProductsContext = React.createContext<ProductsContextType>({
    toggleProduct: () => {},
    completePurchase: () => {},
    selectedProducts: [],
    checkoutCost: 0,
    purchasing: false,
});

ProductsContext.displayName = 'ProductsContext';

export const ProductsContextProvider: React.FC = ({ children }) => {
  const { userDetails, getUserDetails } = useContext(AuthContext);
  const [availableProducts, setAvailableProducts] = useState<Product[]>();
  const [userProducts, setUserProducts] = useState<Product[]>();
  const [error, setError] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [checkoutCost, setCheckoutCost] = useState(0);
  const [purchasing, setPurchasing] = useState(false);

  const toggleProduct = useCallback((id: string) => {
    if(availableProducts) {
        const product = availableProducts.find(p => p.id === id);
        if(selectedProducts.includes(id)) {
            setSelectedProducts([...selectedProducts.filter(productId => productId !== id)]);
            setCheckoutCost(checkoutCost - (product ? product.price : 0));
            return;
        }
        setSelectedProducts([
            ...selectedProducts,
            id,
        ]);
        setCheckoutCost(checkoutCost + (product ? product.price : 0));
    }
  }, [availableProducts, checkoutCost, selectedProducts]);

  const updateProducts = useCallback(async () => {
      if(userDetails) {
        try {
            const { productIds: userProductIds } = userDetails;
            const productsResponse = (await listProducts()).data;
            const { products } = productsResponse;
            setAvailableProducts(products.filter(p => !userProductIds.includes(p.id)));
            setUserProducts(products.filter(p => userProductIds.includes(p.id)));
        }
        catch {
            setAvailableProducts([]);
            setError('Unable to retrieve product list');
        }
      }
        
    }, [userDetails]);

    const completePurchase = useCallback(async () => {
        if(userDetails) {
            const { userId } = userDetails;
            setPurchasing(true);
            try {
                await orderProducts({
                    userId,
                    products: selectedProducts,
                });
                getUserDetails(userId);
                updateProducts();
            } catch {
                setError('Unable to complete purchase');
            } finally {
                setPurchasing(false);
            }
        }
        
    }, [userDetails, selectedProducts, updateProducts, getUserDetails]);

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  return (
    <ProductsContext.Provider value={{ availableProducts, userProducts, error, selectedProducts, toggleProduct, checkoutCost, purchasing, completePurchase }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
