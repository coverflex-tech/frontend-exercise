import React, { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import ProductCardStyle from './ProductCardStyle'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function ProductCard({ product, isSubscribed, onClick }: any) {
    const { theme, shoppingCart } = useAppContext()
    const { Container, Left, Right } = useMemo(() => ProductCardStyle(theme), [theme])

    return (
        <Container onClick={onClick}>
            <Left>
                <label>
                    {product.name}
                </label>
                <strong>
                    {product.price} points
                </strong>
            </Left>
            <Right>
                {isSubscribed ?
                    <DoneOutlineIcon color='success'></DoneOutlineIcon> :
                    shoppingCart.includes(product.id) ?
                        <ShoppingBasketIcon color="warning"></ShoppingBasketIcon> :
                        <ShoppingCartIcon color="primary"></ShoppingCartIcon>}
            </Right>
        </Container>
    )
}

