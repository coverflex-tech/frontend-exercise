import React, { useContext } from 'react';
import ProductsContext from 'context/ProductsContext';
import SectionTitle from 'components/SectionTitle';
import ProductListing from 'components/ProductListing';

const UserProducts = () => {
    const { userProducts } = useContext(ProductsContext);
    return (
        <>
            <SectionTitle>Your own benefits</SectionTitle>
            {userProducts && <ProductListing products={userProducts}/>}
        </>
    )
};

export default UserProducts;
