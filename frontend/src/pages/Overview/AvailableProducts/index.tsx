import React, { useContext } from 'react';
import ProductsContext from 'context/ProductsContext';
import SectionTitle from 'components/SectionTitle';
import ProductListing from 'components/ProductListing';
import AuthContext from 'context/AuthContext';
import Button from 'components/elements/Button';
import styled from 'styled-components';
import { CurrencyBadge } from 'assets';

const Actions = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Description = styled.div`
    display: flex;
    align-items: center;
    span {
        margin: 0 5px;
    }
    svg {
        fill: ${({ theme }) => theme.colors.orange};
    }
`;

const AvailableProducts = () => {
    const { availableProducts, checkoutCost, completePurchase, selectedProducts } = useContext(ProductsContext);
    const { userDetails } = useContext(AuthContext);
    const isPurchaseDisabled = selectedProducts.length === 0 ||
        !userDetails || 
        userDetails.balance < checkoutCost;

    return (
        <>
            <SectionTitle>Benefits you can take advantage of</SectionTitle>
            {availableProducts && <ProductListing products={availableProducts} selectable/>}
            <Actions>
                {checkoutCost > 0 && (
                    <Description>
                        <strong>Cost:</strong>
                        <span>{checkoutCost}</span>
                        <CurrencyBadge />
                    </Description>
                )}
                {availableProducts && availableProducts.length > 0 &&(
                    <Button disabled={isPurchaseDisabled} onClick={completePurchase}>Add benefits</Button>
                )}
            </Actions>
        </>
    )
};

export default AvailableProducts;
