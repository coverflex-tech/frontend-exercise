import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    margin: 0 20px;
    svg {
        fill: ${({ theme }) => theme.colors.orange};
    }
`;

export const BalanceText = styled.div`
    margin-right: 5px;
`;
