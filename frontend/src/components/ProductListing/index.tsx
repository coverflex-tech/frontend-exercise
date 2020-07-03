import React from 'react';
import styled from 'styled-components';
import ProductCard from 'components/ProductCard';

interface ProductListingProps {
    products: Product[];
    selectable?: boolean;
}

const ProductListingContainer = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, 200px);
    gap: 40px;
    padding: 80px 0;
`;

const MissingProducts = styled.div`
    font-size: 32px;
    text-align: center;
    color: ${({ theme }) => theme.colors.darkGrey};
    margin: 80px 0;
    opacity: 0.4;
`;

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