import React, { useContext } from 'react';
import { CurrencyBadge } from 'assets';
import netflixIcon from 'assets/netflix.png';
import spotifyIcon from 'assets/spotify.png';
import wortenIcon from 'assets/worten.png';
import tapIcon from 'assets/tap.jpg';
import healthInsuranceIcon from 'assets/health-insurance.png';
import equipmentInsuranceIcon from 'assets/equipment-insurance.jpg';
import ProductsContext from 'context/ProductsContext';
import Button from 'components/elements/Button';
import { Card, Title, ImageContainer, Price } from './styled';

const PRODUCT_ICONS: {[key: string]: string} = {
    netflix: netflixIcon,
    spotify: spotifyIcon,
    worten: wortenIcon,
    tap: tapIcon,
    'health-insurance': healthInsuranceIcon,
    'equipment-insurance': equipmentInsuranceIcon,
};

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