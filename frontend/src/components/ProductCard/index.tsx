import React, { useContext } from 'react';
import styled from 'styled-components';
import { CurrencyBadge } from 'assets';
import netflixIcon from 'assets/netflix.png';
import spotifyIcon from 'assets/spotify.png';
import wortenIcon from 'assets/worten.png';
import tapIcon from 'assets/tap.jpg';
import healthInsuranceIcon from 'assets/health-insurance.png';
import equipmentInsuranceIcon from 'assets/equipment-insurance.jpg';
import ProductsContext from 'context/ProductsContext';
import Button from 'components/elements/Button';

const PRODUCT_ICONS: {[key: string]: string} = {
    netflix: netflixIcon,
    spotify: spotifyIcon,
    worten: wortenIcon,
    tap: tapIcon,
    'health-insurance': healthInsuranceIcon,
    'equipment-insurance': equipmentInsuranceIcon,
};

const Card = styled.div<{selected?: boolean}>`
    background-color: ${({ theme }) => theme.colors.lightGrey};
    padding: 20px;
    display: grid;
    grid-template-rows: 40px 75px 50px;
    row-gap: 25px;
    align-items: center;
    text-align: center;
    border-radius: 8px;
    opacity: 0.9;
    border: ${({ theme, selected }) => (selected ? `solid 2px ${theme.colors.orange}` : `solid 1px ${theme.colors.darkGrey}`)};
    button {
        width: 100%;
        padding: 16px 8px;
    }
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: 600;
`;

const ImageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        max-width: 75px;
        height: 60px;
    }
`;

const Price = styled.div`
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
        fill: ${({ theme }) => theme.colors.orange};
    }
`;

interface ProductCardProps extends Product {
    selectable?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, selectable }) => {
    const { toggleProduct, selectedProducts } = useContext(ProductsContext);
    const isSelected = selectable && selectedProducts.includes(id);

    return (
        <Card selected={isSelected}>
            <Title>{name}</Title>
            <ImageContainer>
                <img src={PRODUCT_ICONS[id]} alt={name} />
            </ImageContainer>
            <Price>{price}<CurrencyBadge/></Price>
            {selectable && (
                <Button onClick={() => toggleProduct(id)}>{isSelected ? 'Remove from cart' : 'Add to cart'}</Button>
            )}
        </Card>
    )
};

export default ProductCard;