import React, { useContext } from 'react';
import ProductsContext from 'context/ProductsContext';
import SectionTitle from 'components/SectionTitle';
import ProductListing from 'components/ProductListing';
import AuthContext from 'context/AuthContext';
import Button from 'components/elements/Button';
import styled from 'styled-components';

const Actions = styled.div`
    display: flex;
    justify-content: center;
`;

const AvailableProducts = () => {
    const { availableProducts, checkoutCost, completePurchase } = useContext(ProductsContext);
    const { userDetails } = useContext(AuthContext);
    const isPurchaseDisabled = !userDetails || userDetails.balance < checkoutCost;

    return (
        <>
            <SectionTitle>Benefits you can take advantage of</SectionTitle>
            {availableProducts && <ProductListing products={availableProducts} selectable/>}
            <Actions>
                {availableProducts && availableProducts.length > 0 &&(
                    <Button disabled={isPurchaseDisabled} onClick={completePurchase}>Add benefits</Button>
                )}
            </Actions>
        </>
    )
};

export default AvailableProducts;
