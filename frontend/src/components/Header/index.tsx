import React from 'react';
import { CoverFlexLogo, LogoutIcon } from 'assets';
import Balance from 'components/Balance';
import Button from 'components/elements/Button';
import { HeaderWrapper, HeaderEnding, BalanceLabel } from './styled';

interface HeaderProps {
    balance: number;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ balance, onLogout }) => {
    return (
        <HeaderWrapper>
            <CoverFlexLogo />
            <HeaderEnding>
                <BalanceLabel>Balance:</BalanceLabel>
                <Balance balance={balance} />
                <Button isLink onClick={onLogout}>
                    <LogoutIcon />
                </Button>
            </HeaderEnding>
        </HeaderWrapper>
    )
};

export default Header;