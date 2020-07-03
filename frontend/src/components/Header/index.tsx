import React from 'react';
import styled from 'styled-components';
import { CoverFlexLogo, LogoutIcon } from 'assets';
import Balance from 'components/Balance';
import Button from 'components/elements/Button';

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: ${({ theme }) => theme.colors.white};
`;

const HeaderEnding = styled.div`
    display: flex;
    ${Button} {
        margin-left: 30px;
        padding: 0 10px;
        svg {
            fill: ${({ theme }) => theme.colors.red};
            opacity: 0.6;
        }
    }
`;

interface HeaderProps {
    balance: number;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ balance, onLogout }) => {
    return (
        <HeaderWrapper>
            <CoverFlexLogo />
            <HeaderEnding>
                <Balance balance={balance} />
                <Button isLink onClick={onLogout}>
                    <LogoutIcon />
                </Button>
            </HeaderEnding>
        </HeaderWrapper>
    )
};

export default Header;