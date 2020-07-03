import styled from 'styled-components';
import Button from 'components/elements/Button';

export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.white};
`;

export const HeaderEnding = styled.div`
    display: flex;
    align-items: center;
    ${Button} {
        margin-left: 30px;
        padding: 0 10px;
        svg {
            fill: ${({ theme }) => theme.colors.red};
            opacity: 0.6;
        }
    }
`;

export const BalanceLabel = styled.span`
    font-size: 18px;
    margin-right: 5px;
    font-weight: 600;
`