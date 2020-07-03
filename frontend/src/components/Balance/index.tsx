import React from 'react';
import styled from 'styled-components';
import { CurrencyBadge } from 'assets';

interface BalanceProps {
    balance: number;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 0 20px;
    svg {
        fill: ${({ theme }) => theme.colors.orange};
    }
`;

const BalanceText = styled.div`
    margin-right: 5px;
`;

const Balance: React.FC<BalanceProps> = ({ balance }) => (
    <Container>
        <BalanceText>{balance}</BalanceText>
        <CurrencyBadge />
    </Container>
)

export default Balance