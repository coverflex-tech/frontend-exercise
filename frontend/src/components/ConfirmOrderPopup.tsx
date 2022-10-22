import React, { useMemo } from 'react'
import { useAppContext } from '../context/AppContext'
import { ProductArray } from '../interfaces'
import ConfirmOrderPopupStyle from './ConfirmOrderPopupStyle'
import { Button } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

interface ConfirmOrderPopupParams {
    products: ProductArray,
    onClose: Function,
    onPlaceOrderClick: Function
}
export default function ConfirmOrderPopup({ products, onClose, onPlaceOrderClick }: ConfirmOrderPopupParams) {
    const { theme, shoppingCart } = useAppContext()
    const { Container, Popup, Title, Content, ActionBar, Row, Close } = useMemo(() => ConfirmOrderPopupStyle(theme), [theme])
    const { padding05 } = theme

    return (
        <Container>
            <Popup>
                <Title>
                    <span>Confirm your order</span>
                    <Close onClick={() => onClose()}>
                        <CloseIcon />
                    </Close>
                </Title>
                <Content>
                    {shoppingCart.map((item: string, index: number) => (
                        <Row key={index}>
                            <label>{products.find(prod => prod.id === item)?.name}</label>
                            <span>{products.find(prod => prod.id === item)?.price} points</span>
                        </Row>
                    ))}
                    <hr style={{ marginTop: padding05 }}></hr>
                    <Row>
                        <label>Total:</label>
                        <span> {shoppingCart.reduce((prev: number, current: string) => {
                            return prev + (products.find(prod => prod.id === current)?.price || 0)
                        }, 0)} points</span>
                    </Row>
                </Content>
                <ActionBar>
                    <Button variant="outlined" fullWidth={true} onClick={() => onPlaceOrderClick(shoppingCart)} >Place order</Button>
                </ActionBar>
            </Popup>
        </Container>
    )
}

