import React, { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import UserCardStyle from './UserCardStyle'
import { Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ProductArray } from '../interfaces'

interface UserCardParams {
    products: ProductArray,
    onPlaceOrderClick: Function
}
export default function UserCard({ products, onPlaceOrderClick }: UserCardParams) {
    const { theme, user, logout, shoppingCart } = useAppContext()
    const { Container } = useMemo(() => UserCardStyle(theme), [theme])

    return (
        <Container>
            <p><label>User</label> {user.user.user_id}</p>
            <p><label>Balance</label> {user.user.data.balance} points</p>
            {shoppingCart && shoppingCart.length > 0 &&
                <p style={{ display: 'flex', alignItems: 'center', gap: theme.padding04 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: theme.padding02, flex: '1' }}>
                        <ShoppingCartIcon color="primary" />
                        {shoppingCart.reduce((prev: number, current: string) => {
                            return prev + (products.find(prod => prod.id === current)?.price || 0)
                        }, 0)} points
                    </span>
                    <Button variant="contained" onClick={() => onPlaceOrderClick()} > Order ({shoppingCart.length})</Button>
                </p>}
            <Button variant="outlined" fullWidth={true} onClick={() => logout()} >Logout</Button>
        </Container>
    )
}

