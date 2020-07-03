import React from 'react';
import ProductCard from 'components/ProductCard';
import { MissingProducts, ProductListingContainer } from './styled';

interface ProductListingProps {
    products: Product[];
    selectable?: boolean;
}

const ProductListing: React.FC<ProductListingProps> = ({ products, selectable }) => {
    if(products.length === 0) {
        return <MissingProducts>You don't have any products in this category</MissingProducts>
    }
    return (
        <ProductListingContainer>
            {products.map(p => (
                <ProductCard key={p.id} {...p} selectable={selectable} />
            ))}
        </ProductListingContainer>
    )
};

export default ProductListing;