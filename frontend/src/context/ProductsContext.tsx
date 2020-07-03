import React, { useState, useContext, useEffect, useCallback } from 'react';
import listProducts from 'services/api/product/listProducts';
import AuthContext from './AuthContext';

interface ProductsContextType {
    availableProducts?: Product[];
    userProducts?: Product[];
    error?: string;
}
const ProductsContext = React.createContext<ProductsContextType>({});

ProductsContext.displayName = 'ProductsContext';

export const ProductsContextProvider: React.FC = ({ children }) => {
  const { userDetails } = useContext(AuthContext);
  const [availableProducts, setAvailableProducts] = useState<Product[]>();
  const [userProducts, setUserProducts] = useState<Product[]>();
  const [error, setError] = useState('');

  const updateProducts = useCallback(async () => {
      if(userDetails) {
        try {
            const { user: {
                data: {
                    product_ids: userProductIds
                }
            }} = userDetails;
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

  useEffect(() => {
    updateProducts();
  }, [updateProducts]);

  return (
    <ProductsContext.Provider value={{ availableProducts, userProducts, error }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
