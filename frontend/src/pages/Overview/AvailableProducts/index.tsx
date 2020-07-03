import React, { useContext } from 'react';
import ProductsContext from 'context/ProductsContext';
import SectionTitle from 'components/SectionTitle';
import ProductListing from 'components/ProductListing';

const AvailableProducts = () => {
    const { availableProducts } = useContext(ProductsContext);
    return (
        <>
            <SectionTitle>Benefits you can take advantage of</SectionTitle>
            {availableProducts && <ProductListing products={availableProducts}/>}
        </>
    )
};

export default AvailableProducts;
