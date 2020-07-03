import React from 'react';
import { CurrencyBadge } from 'assets';
import { Container, BalanceText } from './styled';

interface BalanceProps {
    balance: number;
}

const Balance: React.FC<BalanceProps> = ({ balance }) => (
    <Container>
        <BalanceText>{balance}</BalanceText>
        <CurrencyBadge />
    </Container>
)

export default Balance