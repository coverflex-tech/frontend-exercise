import React from 'react';
import styled from 'styled-components';
import { CurrencyBadge } from 'assets';
import netflixIcon from 'assets/netflix.png';
import spotifyIcon from 'assets/spotify.png';
import wortenIcon from 'assets/worten.png';
import tapIcon from 'assets/tap.jpg';
import healthInsuranceIcon from 'assets/health-insurance.png';
import equipmentInsuranceIcon from 'assets/equipment-insurance.jpg';

const PRODUCT_ICONS: {[key: string]: string} = {
    netflix: netflixIcon,
    spotify: spotifyIcon,
    worten: wortenIcon,
    tap: tapIcon,
    'health-insurance': healthInsuranceIcon,
    'equipment-insurance': equipmentInsuranceIcon,
};

const Card = styled.div`
    background-color: ${({ theme }) => theme.colors.lightGrey};
    padding: 20px;
    display: grid;
    grid-template-rows: 40px 75px 50px;
    row-gap: 25px;
    align-items: center;
    text-align: center;
    border-radius: 8px;
    opacity: 0.9;
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

const ProductCard: React.FC<Product> = ({ id, name, price }) => {
    return (
        <Card>
            <Title>{name}</Title>
            <ImageContainer>
                <img src={PRODUCT_ICONS[id]} alt={name} />
            </ImageContainer>
            <Price>{price}<CurrencyBadge/></Price>
        </Card>
    )
};

export default ProductCard;